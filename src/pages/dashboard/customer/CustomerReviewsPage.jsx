import { motion } from 'framer-motion';
import { HiStar, HiUser, HiCalendar, HiChatAlt } from 'react-icons/hi';

const reviews = [
  { id: 1, provider: 'Priya Sharma', service: 'Deep Home Cleaning', rating: 5, comment: 'Absolutely amazing service! Priya was thorough, professional, and arrived right on time. My home has never been cleaner. Will definitely book again!', date: '2026-07-15', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya' },
  { id: 2, provider: 'Rahul Verma', service: 'Pipe Repair & Leakage Fix', rating: 4, comment: 'Quick and efficient fix. Rahul diagnosed the problem immediately and had it resolved within an hour. Fair pricing too.', date: '2026-07-10', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul' },
  { id: 3, provider: 'Ananya Singh', service: 'Maths & Science Tutoring', rating: 5, comment: 'Ananya is a fantastic tutor. Patient, clear, and knows her subject extremely well. My daughter improved her grades significantly.', date: '2026-06-28', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya' },
];

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <HiStar
        key={star}
        className={`w-4 h-4 ${star <= rating ? 'text-amber-400' : 'text-slate-200'}`}
      />
    ))}
  </div>
);

const CustomerReviewsPage = () => {
  const avg = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display font-bold text-2xl text-slate-900">My Reviews</h1>
        <p className="text-slate-500 text-sm mt-0.5">Reviews you've written for service providers</p>
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 flex items-center gap-6"
      >
        <div className="text-center">
          <p className="font-display font-bold text-5xl text-amber-600">{avg}</p>
          <StarRating rating={Math.round(avg)} />
          <p className="text-xs text-amber-700 mt-1 font-medium">{reviews.length} reviews given</p>
        </div>
        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter((r) => r.rating === star).length;
            const pct = Math.round((count / reviews.length) * 100);
            return (
              <div key={star} className="flex items-center gap-2">
                <span className="text-xs text-amber-700 w-4">{star}</span>
                <HiStar className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <div className="flex-1 h-1.5 bg-amber-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs text-amber-600 w-6 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Review Cards */}
      <div className="space-y-4">
        {reviews.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-card p-6"
          >
            <div className="flex items-start gap-4">
              <img
                src={review.avatar}
                alt={review.provider}
                className="w-12 h-12 rounded-xl border border-slate-100 bg-slate-50 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-slate-900">{review.provider}</h3>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-xs text-primary-600 font-medium mb-2">{review.service}</p>
                <div className="flex items-start gap-2">
                  <HiChatAlt className="w-4 h-4 text-slate-300 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-600 leading-relaxed">{review.comment}</p>
                </div>
                <div className="flex items-center gap-1 mt-3 text-xs text-slate-400">
                  <HiCalendar className="w-3.5 h-3.5" />
                  {review.date}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Write Review Prompt */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center hover:border-primary-300 transition-colors cursor-pointer group"
      >
        <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-amber-200 transition-colors">
          <HiStar className="w-6 h-6 text-amber-500" />
        </div>
        <h3 className="font-semibold text-slate-900 mb-1">Write a Review</h3>
        <p className="text-sm text-slate-400">Rate your completed services to help others decide</p>
      </motion.div>
    </div>
  );
};

export default CustomerReviewsPage;
