import React from 'react'
import Hero from '../componets/Hero/Hero';
import Residencies from '../componets/Residencies/Residencies';
import Contact from '../componets/Contact/Contact';
import GetStarted from '../componets/GetStarted/GetStarted';
import Header  from '../componets/Header/Header';
import Footer from '../componets/Footer/Footer';

const Website = () => {
  return (
    <div className="App">
    <div>
      <div className="white-gradient" />
      <Hero />
    </div>
    <Residencies/>
    <Contact/>
    <GetStarted/>
  </div>
  )
}

export default Website