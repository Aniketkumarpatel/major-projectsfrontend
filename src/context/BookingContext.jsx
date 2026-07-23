import { createContext, useContext, useState, useCallback } from 'react';

/**
 * BookingContext – holds booking form state across multi-step booking flow.
 */
const BookingContext = createContext(null);

const initialBookingState = {
  service: null,
  date: null,
  time: null,
  address: null,
  notes: '',
  totalAmount: 0,
  step: 1, // 1: service, 2: schedule, 3: address, 4: review
};

export const BookingProvider = ({ children }) => {
  const [booking, setBooking] = useState(initialBookingState);

  const updateBooking = useCallback((updates) => {
    setBooking((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetBooking = useCallback(() => {
    setBooking(initialBookingState);
  }, []);

  const nextStep = useCallback(() => {
    setBooking((prev) => ({ ...prev, step: Math.min(prev.step + 1, 4) }));
  }, []);

  const prevStep = useCallback(() => {
    setBooking((prev) => ({ ...prev, step: Math.max(prev.step - 1, 1) }));
  }, []);

  return (
    <BookingContext.Provider value={{ booking, updateBooking, resetBooking, nextStep, prevStep }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>');
  return ctx;
};

export default BookingContext;
