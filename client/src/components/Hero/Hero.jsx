import React from 'react'
import './Hero.css'
import SearchBar from '../SearchBar/SearchBar';

const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container ">
        {/* Left section */}
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <h1>
              Discover <br />
              Most Suitable
              <br /> Property
            </h1>
          </div>

          <div className="flexColStart secondaryText flexhero-des">
            <span>Find a variety of properties that suit you very easilty</span>
            <span>Forget all difficulties in finding a residence for you</span>
          </div>

          <SearchBar/>
                
                </div>

        {/*right side*/}
        <div className="flexCenter hero-right">
          <div className="image-container">
            <img src="./hero-image.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero