import React from 'react';
import { Wifi, WifiOff, AlertCircle, CheckCircle } from 'lucide-react';
import { useOfflineSupport } from '../hooks/useOfflineSupport';

const NetworkStatus: React.FC = () => {
  const { isOnline, offlineQueue, processOfflineQueue, clearOfflineQueue } = useOfflineSupport();

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      {!isOnline && (
        <div className="bg-red-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg border border-red-400/50">
          <div className="flex items-center gap-2">
            <WifiOff size={16} />
            <span className="text-sm font-medium">You're offline</span>
          </div>
        </div>
      )}
      
      {isOnline && offlineQueue.length > 0 && (
        <div className="bg-yellow-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg border border-yellow-400/50">
          <div className="flex items-center gap-3">
            <AlertCircle size={16} />
            <span className="text-sm font-medium">
              {offlineQueue.length} pending action{offlineQueue.length > 1 ? 's' : ''}
            </span>
            <div className="flex gap-2">
              <button
                onClick={processOfflineQueue}
                className="text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/30 transition-colors"
              >
                Sync
              </button>
              <button
                onClick={clearOfflineQueue}
                className="text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/30 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkStatus;