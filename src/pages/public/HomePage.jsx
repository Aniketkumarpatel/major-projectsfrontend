import HeroSection from '@/components/home/HeroSection';
import PopularCategories from '@/components/home/PopularCategories';
import FeaturedProviders from '@/components/home/FeaturedProviders';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import StatsSection from '@/components/home/StatsSection';
import HowItWorks from '@/components/home/HowItWorks';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';
import NewsletterSection from '@/components/home/NewsletterSection';

const HomePage = () => (
  <div>
    <HeroSection />
    <StatsSection />
    <PopularCategories />
    <HowItWorks />
    <FeaturedProviders />
    <WhyChooseUs />
    <TestimonialsSection />
    <FAQSection limit={5} />
    <NewsletterSection />
  </div>
);

export default HomePage;
