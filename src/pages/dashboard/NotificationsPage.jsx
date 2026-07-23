import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiBell, HiCalendar, HiTrash } from 'react-icons/hi';
import { notificationApi } from '@/services/api.service';
import { toast } from 'react-hot-toast';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await notificationApi.getAll();
      if (res.data?.success) {
        setNotifications(res.data.data.notifications || []);
        setUnreadCount(res.data.data.unreadCount || 0);
      }
    } catch {
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAllRead = async () => {
    try {
      await notificationApi.markAllAsRead();
      toast.success('All notifications marked as read');
      fetchNotifications();
    } catch {
      toast.error('Failed to mark all as read');
    }
  };

  const markRead = async (id, isRead) => {
    if (isRead) return;
    try {
      await notificationApi.markAsRead(id);
      fetchNotifications();
    } catch {
      // Ignore error
    }
  };

  const deleteNotif = async (id) => {
    try {
      await notificationApi.delete(id);
      toast.success('Notification deleted');
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch {
      toast.error('Failed to delete notification');
    }
  };

  const filtered = notifications.filter((n) => {
    if (filter === 'Unread') return !n.isRead;
    if (filter === 'Read') return n.isRead;
    return true;
  });

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900 flex items-center gap-2">
            Notifications
            {unreadCount > 0 && (
              <span className="text-xs font-bold px-2 py-0.5 bg-primary-600 text-white rounded-full">{unreadCount}</span>
            )}
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">Stay updated on your bookings and activity</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-sm font-semibold text-primary-600 hover:text-primary-700 hover:underline transition-colors">
            Mark all as read
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {['All', 'Unread', 'Read'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filter === f ? 'bg-primary-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:border-primary-300 hover:text-primary-600'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Notification List */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
          <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <HiBell className="w-7 h-7 text-slate-300" />
          </div>
          <h3 className="font-semibold text-slate-900 mb-1">No notifications</h3>
          <p className="text-slate-400 text-sm">You're all caught up!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((notif, i) => (
            <motion.div
              key={notif._id || notif.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => markRead(notif._id, notif.isRead)}
              className={`group bg-white rounded-2xl border shadow-sm p-5 cursor-pointer transition-all hover:shadow-card ${notif.isRead ? 'border-slate-100' : 'border-primary-200 bg-primary-50/30'}`}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <HiCalendar className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900 text-sm">{notif.title}</h3>
                      {!notif.isRead && <span className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />}
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteNotif(notif._id); }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <HiTrash className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{notif.message}</p>
                  <p className="text-xs text-slate-400 mt-2">{new Date(notif.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
