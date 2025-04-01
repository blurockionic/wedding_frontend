import Quote from "../Quote";
import Footer from "../Footer";
import { Introduction } from "./component/Introduction";
import FeatureSection from "./component/FeatureSection";
function Template() {
  return (
    <>
      {/* Introduction card  */}
      <Introduction />

      <Quote />
      

      {/* feature section  */}
      <FeatureSection/>

      <Footer></Footer>
    </>
  );
}

export default Template;
