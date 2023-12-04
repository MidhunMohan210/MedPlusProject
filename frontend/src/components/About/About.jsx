import React from "react";
import { Link } from "react-router-dom";
import aboutImg from "../../assets/medplus/about-doctor.jpg"
import aboutCardImg from "../../assets/images/about-card.png";
function About() {
  return (
    <section className="p-4 md:p-8 lg:p-12 lg:mt-12">
      <div className="container">
        <div className="flex items-center justify-between gap-[20px] lg:gap-[1px] flex-col lg:flex-row  ">
          {/* ====about img==== */}
          <div className="relative w3/4 lg:1/2 xl:w-[770px] z-10 order-2 lg:order-1 lg:left-[50px] ">
          <img src={aboutImg} alt="" className="w-full md:w-[500px] h-auto lg:w-[80%] lg:h-auto rounded-md" />
            <div className="absolute z-20 bottom-3 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%] left-[40%]  ">
              <img src={aboutCardImg} alt="" />
            </div>
          </div>
          {/* ====about content==== */}
          <div className="w-full lg:1/2 xl:w-[670px] order-1 lg:order-2 flex-col justify-center lg:text-left text-center ">
            <h2 className="heading "> Proud to Stand Among India's Finest</h2>
            <p className="text__para">
              With a proud history of three decades, we have consistently
              received recognition as one of India's premier healthcare
              providers, cementing our position as the undisputed choice in the
              nation. Our unwavering dedication to excellence is a daily pledge
              to our patients.
            </p>
            <p className="text__para">
              As we remain focused on tomorrow's potential rather than dwelling
              on past achievements, we are committed to delivering nothing but
              the best in healthcare services and outcomes.
            </p>
            <Link to="/">
              <button className="btn ">Learn More</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
