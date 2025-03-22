import Quote from "../Quote";
import Footer from "../Footer";
import { Introduction } from "./component/Introduction";
function Template() {
  return (
    <>
      {/* Introduction card  */}
      <Introduction />

      <Quote />

      <Footer></Footer>
    </>
  );
}

export default Template;
