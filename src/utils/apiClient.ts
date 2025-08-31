import { createNetworkError, createAPIError, handleGlobalError } from './errorHandler';

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  success: boolean;
}

export interface RequestConfig {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  headers?: Record<string, string>;
}

class ApiClient {
  private baseURL: string;
  private defaultTimeout: number = 10000;
  private defaultRetries: number = 3;
  private defaultRetryDelay: number = 1000;

  constructor(baseURL: string = '') {
    this.baseURL = baseURL;
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async makeRequest<T>(
    url: string,
    options: RequestInit = {},
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const {
      timeout = this.defaultTimeout,
      retries = this.defaultRetries,
      retryDelay = this.defaultRetryDelay,
      headers = {}
    } = config;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const requestOptions: RequestInit = {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
        ...options.headers
      }
    };

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        clearTimeout(timeoutId);
        
        const response = await fetch(`${this.baseURL}${url}`, requestOptions);
        
        if (!response.ok) {
          const errorText = await response.text();
          const apiError = createAPIError(
            `API request failed: ${response.status} ${response.statusText}`,
            response.status,
            { url, attempt, responseText: errorText }
          );
          
          if (attempt === retries) {
            handleGlobalError(apiError);
            return { success: false, error: apiError.userMessage };
          }
          
          lastError = new Error(apiError.message);
          await this.delay(retryDelay * Math.pow(2, attempt)); // Exponential backoff
          continue;
        }

        const data = await response.json();
        return { success: true, data };

      } catch (error) {
        lastError = error as Error;
        
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            const timeoutError = createNetworkError(
              `Request timeout after ${timeout}ms`,
              { url, attempt }
            );
            handleGlobalError(timeoutError);
            return { success: false, error: timeoutError.userMessage };
          }
          
          if (!navigator.onLine) {
            const offlineError = createNetworkError(
              'No internet connection',
              { url, attempt }
            );
            return { success: false, error: offlineError.userMessage };
          }
        }

        if (attempt === retries) {
          const networkError = createNetworkError(
            `Network request failed after ${retries + 1} attempts: ${lastError?.message}`,
            { url, attempts: attempt + 1 }
          );
          handleGlobalError(networkError);
          return { success: false, error: networkError.userMessage };
        }

        await this.delay(retryDelay * Math.pow(2, attempt));
      }
    }

    return { success: false, error: 'Request failed after all retry attempts' };
  }

  async get<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(url, { method: 'GET' }, config);
  }

  async post<T>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(
      url,
      {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined
      },
      config
    );
  }

  async put<T>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(
      url,
      {
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined
      },
      config
    );
  }

  async delete<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(url, { method: 'DELETE' }, config);
  }
}

export const apiClient = new ApiClient();