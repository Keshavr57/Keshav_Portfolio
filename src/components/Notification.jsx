import { useState, useEffect } from 'react';

export default function Notification({ message, type = 'info', duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500/90 border-green-400 text-white';
      case 'error':
        return 'bg-red-500/90 border-red-400 text-white';
      case 'warning':
        return 'bg-yellow-500/90 border-yellow-400 text-black';
      default:
        return 'bg-blue-500/90 border-blue-400 text-white';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className={`
        px-6 py-4 rounded-lg border backdrop-blur-sm shadow-lg max-w-sm
        ${getTypeStyles()}
      `}>
        <div className="flex items-center space-x-3">
          <span className="text-xl">{getIcon()}</span>
          <p className="text-sm font-medium">{message}</p>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="ml-2 text-lg hover:opacity-70 transition-opacity"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}