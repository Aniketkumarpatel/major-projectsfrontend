import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';
import { toast } from 'react-hot-toast';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [socket, setSocket] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
    const newSocket = io(socketUrl, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
    });

    newSocket.on('connect', () => {
      console.log('⚡ Socket connected to server:', newSocket.id);
      newSocket.emit('join', { userId: user._id || user.id, role: user.role });
    });

    // Real-time Event Listeners
    newSocket.on('notification', (notif) => {
      toast(notif.title || 'New Notification', {
        icon: '🔔',
        duration: 5000,
      });
      setUnreadCount((prev) => prev + 1);
    });

    newSocket.on('booking_created', (data) => {
      toast.success(`📅 Booking Alert: ${data.title || 'New booking created!'}`, { duration: 6000 });
    });

    newSocket.on('booking_accepted', (data) => {
      toast.success(`✅ Booking Accepted: ${data.message || 'Provider accepted your booking!'}`, { duration: 6000 });
    });

    newSocket.on('booking_cancelled', (data) => {
      toast.error(`❌ Booking Cancelled: ${data.message || 'A booking was cancelled.'}`, { duration: 6000 });
    });

    newSocket.on('booking_completed', (data) => {
      toast.success(`🎉 Service Completed: ${data.message || 'Your booking has been marked complete!'}`, { duration: 6000 });
    });

    newSocket.on('new_review', (data) => {
      toast(`⭐ Review Alert: ${data.message || 'New customer review received!'}`, { icon: '⭐', duration: 6000 });
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [isAuthenticated, user]);

  return (
    <SocketContext.Provider value={{ socket, unreadCount, setUnreadCount }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
