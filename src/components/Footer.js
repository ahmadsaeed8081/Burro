import React from 'react'

import AnimatedSection from './AnimatedSection';

import footerBanner2 from '../assets/footer/footer-banner2.png'
import buroLogo from '../assets/navbar/buro-logo.png'

const Footer = () => {
  return (
    <>
      <AnimatedSection>
<div className='relative h-auto bg-contain md:bg-cover md:bg-center' style={{ backgroundImage: `url(${footerBanner2})` }}>
    <div className='absolute inset-0 bg-black opacity-70'></div>
      <section className='relative m-auto w-1/2 md:w-[90%] py-5'>
            <img className='m-auto h-20 w-15' src={buroLogo}></img>
        <div className='text-white text-center my-5'>
            <h1 className='my-2 text-2xl font-zendots text-custom-green '>Don't miss out, Stay updated</h1>
            <p className='my-2 font-bold font-zendots text-lg'>Token Address</p>
            <a href='https://polygonscan.com/address/0x7cCf886a039454A9C6CB9B2AB56187Eb3c482b29' target={"_blank"}><p className='my-2 text-gray-300 text-sm sm:text-xs'>BURRO: 0x7cCf886a039454A9C6CB9B2AB56187Eb3c482b29</p></a>
            <div className='flex justify-center gap-4'>
            <a href="https://www.facebook.com/profile.php?id=61557834290825&mibextid=LQQJ4d" target='_blank'><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="52" height="52" viewBox="0 0 50 50">
    <path fill="#7DF9FF" d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"></path>
</svg></a>
            <a href="https://twitter.com/Burrotoken" target='_blank'><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="52" height="52" viewBox="0 0 50 50">
    <path fill="#7DF9FF" d="M25,2C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23S37.683,2,25,2z M36.237,20.524 c0.01,0.236,0.016,0.476,0.016,0.717C36.253,28.559,30.68,37,20.491,37c-3.128,0-6.041-0.917-8.491-2.489 c0.433,0.052,0.872,0.077,1.321,0.077c2.596,0,4.985-0.884,6.879-2.37c-2.424-0.044-4.468-1.649-5.175-3.847 c0.339,0.065,0.686,0.1,1.044,0.1c0.505,0,0.995-0.067,1.458-0.195c-2.532-0.511-4.441-2.747-4.441-5.432c0-0.024,0-0.047,0-0.07 c0.747,0.415,1.6,0.665,2.509,0.694c-1.488-0.995-2.464-2.689-2.464-4.611c0-1.015,0.272-1.966,0.749-2.786 c2.733,3.351,6.815,5.556,11.418,5.788c-0.095-0.406-0.145-0.828-0.145-1.262c0-3.059,2.48-5.539,5.54-5.539 c1.593,0,3.032,0.672,4.042,1.749c1.261-0.248,2.448-0.709,3.518-1.343c-0.413,1.292-1.292,2.378-2.437,3.064 c1.122-0.136,2.188-0.432,3.183-0.873C38.257,18.766,37.318,19.743,36.237,20.524z"></path>
</svg></a>
<a href="https://www.instagram.com/burrotoken" target='_blank'><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="52" height="52" viewBox="0 0 50 50">
    <path fill="#7DF9FF" d="M25,2C12.318,2,2,12.317,2,25s10.318,23,23,23s23-10.317,23-23S37.682,2,25,2z M18,35h-4V20h4V35z M16,17 c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2s2,0.895,2,2C18,16.105,17.105,17,16,17z M37,35h-4v-5v-2.5c0-1.925-1.575-3.5-3.5-3.5 S26,25.575,26,27.5V35h-4V20h4v1.816C27.168,20.694,28.752,20,30.5,20c3.59,0,6.5,2.91,6.5,6.5V35z"></path>
</svg></a>
            </div>
        </div>
      </section>
</div>
<div className='w-full bg-custom-green text-black text-center h-auto py-1 font-semibold sm:text-sm'>Copyright © 2024. All rights reserved by Your Burro Token.</div>

      </AnimatedSection>

</>
  )
}

export default Footer