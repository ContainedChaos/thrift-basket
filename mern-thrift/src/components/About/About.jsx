import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about-section">
      <div className="about-content">
        <h2>About Us</h2>
        <p>
          Welcome to our thrifting website! We are passionate about offering unique 
          and affordable fashion to our customers. Our mission is to promote sustainable 
          shopping by giving pre-loved items a new life. At our thrift store, you'll find 
          a wide range of clothing and accessories that are carefully
           curated for quality and style.
        </p>
        <p>
          We believe that thrifting is not only a budget-friendly option but also an 
          eco-friendly choice. By choosing second-hand items, you contribute to reducing 
          waste and minimizing the environmental impact of fast fashion. We take pride in 
          offering a diverse selection of items that cater to different tastes and 
          preferences. Whether you're looking for vintage pieces, trendy styles, or 
          unique treasures, we've got you covered!
        </p>
        <p>
          Our team is dedicated to providing a seamless thrifting experience. We strive
           to ensure that every customer finds something special and enjoys the thrill of 
           discovering hidden gems. With our easy-to-use website and convenient shipping
            options, you can explore our collection from the comfort of your home.
        </p>
        <p>
          Thank you for supporting our thrifting community. Join us in embracing 
          sustainable fashion and let's make a positive impact together!
        </p>
      </div>
      <div className="about-image">
        <img src="./images/sell/about.jpg" alt="About Image" />
      </div>
    </section>
  );
};

export default About;
