import React from "react";
import {  useInView } from "react-intersection-observer";

function LazySection({ id, Component }) {
  const { ref, inView } = useInView({
    threshold: 0.1, 
    triggerOnce: true, 
  });
  return (
    <section className=" "  id={id} ref={ref}>
      {inView && <Component  /> }
    </section>
  );
}

export default LazySection;
