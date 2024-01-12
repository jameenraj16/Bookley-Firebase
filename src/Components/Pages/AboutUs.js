// About.jsx

import React from "react";
import aboutImg from "./img/about.jpg";
import "./Styles.css"; // Import the CSS file here

const AboutUs = () => {
  return (
    <section className="section" id="about">
      <div className="section-center about-center">
        <article className="about-info">
          <h2>About Us</h2>
          <h3>Explore The Difference</h3>
          <p>
            Welcome to Our Bookstore, where passion for reading meets a curated
            collection of exceptional books. Our journey began with a simple
            idea: to provide a place where book lovers can discover and indulge
            in their literary interests.
          </p>
          <p>
            Founded in 2015, Our Bookstore has grown to become a hub for readers
            of all tastes. Our carefully curated selection spans various genres,
            ensuring there's something for every reader, whether you're a
            seasoned bookworm or just starting your reading journey.
          </p>
          <p>
            At Our Bookstore, we believe in the transformative power of
            literature. Our dedicated team is passionate about connecting
            readers with high-quality books that inspire, entertain, and broaden
            perspectives. Thank you for being a part of our literary community.
          </p>
          <p style={{textAlign:"center"}} >Happy Reading !</p>
          <a href="/" className="readMoreBtn">
            Go to Home
          </a>
        </article>
      </div>
    </section>
  );
};

export default AboutUs;
