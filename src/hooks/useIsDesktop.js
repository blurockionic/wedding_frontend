import { useEffect, useState } from "react";

const useIsDesktop = () => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
    useEffect(() => {
      const handleResize = () => setIsDesktop(window.innerWidth > 768);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return isDesktop;
  };

  export default useIsDesktop;