import Header from "../../components/Layout/Header/Header.jsx";
import HeroSection from "../../components/Route/Hero/HeroSection.jsx";
import Categories from "../../components/Route/Categories/Categories.jsx";
import BestDeals from "../../components/Route/BestDeals/BestDeals.jsx";
import FeatureProducts from "../../components/Route/FeatureProducts/FeatureProducts.jsx";
import Footer from "../../components/Layout/Footer/Footer.jsx";
import Events from "../../components/Route/Events/Events.jsx";
import Sponsored from "../../components/Route/Sponsered/Sponsered.jsx";

function HomePage() {


  return (
    <div>
      <Header activeHeading={1} />
      <HeroSection />
      <Categories />
      <BestDeals />
      <Events  />
      <FeatureProducts />
      <Sponsored />
      <div className="bg-gray-50 w-full h-[70px]"></div>
      <br />
      <Footer />
    </div>
  );
}

export default HomePage;
