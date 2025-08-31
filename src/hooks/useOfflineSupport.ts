import { useState, useEffect } from 'react';

export interface OfflineState {
  isOnline: boolean;
  wasOffline: boolean;
  offlineQueue: Array<{
    id: string;
    action: () => Promise<void>;
    description: string;
    timestamp: Date;
  }>;
}

export const useOfflineSupport = () => {
  const [offlineState, setOfflineState] = useState<OfflineState>({
    isOnline: navigator.onLine,
    wasOffline: false,
    offlineQueue: []
  });

  useEffect(() => {
    const handleOnline = () => {
      setOfflineState(prev => ({
        ...prev,
        isOnline: true,
        wasOffline: prev.wasOffline || !prev.isOnline
      }));
    };

    const handleOffline = () => {
      setOfflineState(prev => ({
        ...prev,
        isOnline: false
      }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const addToOfflineQueue = (action: () => Promise<void>, description: string) => {
    const queueItem = {
      id: `offline_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      action,
      description,
      timestamp: new Date()
    };

    setOfflineState(prev => ({
      ...prev,
      offlineQueue: [...prev.offlineQueue, queueItem]
    }));

    return queueItem.id;
  };

  const processOfflineQueue = async () => {
    if (!offlineState.isOnline || offlineState.offlineQueue.length === 0) {
      return;
    }

    const queue = [...offlineState.offlineQueue];
    setOfflineState(prev => ({ ...prev, offlineQueue: [] }));

    for (const item of queue) {
      try {
        await item.action();
      } catch (error) {
        console.error(`Failed to process offline action: ${item.description}`, error);
        // Re-add failed items to queue
        setOfflineState(prev => ({
          ...prev,
          offlineQueue: [...prev.offlineQueue, item]
        }));
      }
    }
  };

  const clearOfflineQueue = () => {
    setOfflineState(prev => ({
      ...prev,
      offlineQueue: []
    }));
  };

  // Auto-process queue when coming back online
  useEffect(() => {
    if (offlineState.isOnline && offlineState.wasOffline) {
      processOfflineQueue();
      setOfflineState(prev => ({ ...prev, wasOffline: false }));
    }
  }, [offlineState.isOnline, offlineState.wasOffline]);

  return {
    ...offlineState,
    addToOfflineQueue,
    processOfflineQueue,
    clearOfflineQueue
  };
};