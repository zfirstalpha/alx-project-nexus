import BestSelling from "@/components/LandingPage/BestSelling";
import FeaturedProduct from "@/components/LandingPage/FeaturedProduct";
import GallerySlider from "@/components/LandingPage/GallerySlider";
import HeroVideo from "@/components/LandingPage/HeroVideo";
import NewsletterComponent from "@/components/LandingPage/NewsletterComponent";
import WatchOfTheMonth from "@/components/LandingPage/WatchOfTheMonth";
import WatchReviewSlider from "@/components/LandingPage/WatchReviewSlider";

export default function Home() {
  return (
    <div>
      <HeroVideo />
      <BestSelling />
      <FeaturedProduct />
      <GallerySlider />
      <WatchOfTheMonth />
      <WatchReviewSlider />
      <NewsletterComponent />
    </div>
  );
}
