import Quote from "../Quote";
import Footer from "../Footer";
import { Introduction } from "./component/Introduction";
import FeatureSection from "./component/FeatureSection";
import TemplateList from "../EditTemplate/TemplateList";
function Template() {
  return (
    <>
      {/* Introduction card  */}
      <Introduction />

      <Quote />
      <TemplateList/>

      {/* feature section  */}
      <FeatureSection/>

      <Footer></Footer>
    </>
  );
}

export default Template;
