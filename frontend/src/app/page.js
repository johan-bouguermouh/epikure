import NavComponent from "../components/NavComponent";
import HeroBannerComponent from "../components/HeroBannerComponent";
import FooterComponent from "../components/FooterComponent";

export default function Home() {
  // const navigateToProducts = () => {
  //   // Action to navigate to products
  // };

  // const navigateToServices = () => {
  //   // Action to navigate to services
  // };
  return (
    <>
      <NavComponent />

      <HeroBannerComponent />
      
      <FooterComponent />
    </>
  );
}
