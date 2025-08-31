import React from 'react';
import { WifiOff, Wifi, Clock } from 'lucide-react';
import { useOfflineSupport } from '../hooks/useOfflineSupport';

const OfflineIndicator: React.FC = () => {
  const { isOnline, offlineQueue, processOfflineQueue } = useOfflineSupport();

  if (isOnline && offlineQueue.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm">
      {!isOnline ? (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <WifiOff size={20} className="text-red-400" />
            <div>
              <h4 className="text-red-200 font-semibold text-sm">You're offline</h4>
              <p className="text-red-300 text-xs">
                Some features may not work. We'll sync your changes when you're back online.
              </p>
            </div>
          </div>
        </div>
      ) : offlineQueue.length > 0 ? (
        <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-yellow-400" />
            <div className="flex-1">
              <h4 className="text-yellow-200 font-semibold text-sm">Syncing changes</h4>
              <p className="text-yellow-300 text-xs">
                {offlineQueue.length} action{offlineQueue.length > 1 ? 's' : ''} pending
              </p>
            </div>
            <button
              onClick={processOfflineQueue}
              className="px-3 py-1 bg-yellow-600 text-white rounded text-xs font-medium hover:bg-yellow-700 transition-colors"
            >
              Sync Now
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Wifi size={20} className="text-green-400" />
            <div>
              <h4 className="text-green-200 font-semibold text-sm">Back online</h4>
              <p className="text-green-300 text-xs">All changes have been synced</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfflineIndicator;