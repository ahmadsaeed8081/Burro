import React,{useState} from 'react'
import faqicon from '../assets/home/faq-icon.svg'

const Faq = () => {
    const [faq1, setfaq1] = useState(true);
    const onClickfaq1 = () => {
        setfaq1(!faq1)
        setfaq2(false)
        setfaq3(false)
        setfaq4(false)
        setfaq5(false)
        setfaq6(false)
        setfaq7(false)
        setfaq8(false)
    
    };

    const [faq2, setfaq2] = useState('');
    const onClickfaq2 = () => {
        setfaq2(!faq2)
        setfaq1(false)
        setfaq3(false)
        setfaq4(false)
        setfaq5(false)
        setfaq6(false)
        setfaq7(false)
        setfaq8(false)
    
    };
    
    const [faq3, setfaq3] = useState('');
    const onClickfaq3 = () => {
        setfaq3(!faq3)
        setfaq1(false)
        setfaq2(false)
        setfaq4(false)
        setfaq5(false)
        setfaq6(false)
        setfaq7(false)
        setfaq8(false)
    };
    
    const [faq4, setfaq4] = useState('');
    const onClickfaq4 = () => {
        setfaq4(!faq4)
        setfaq1(false)
        setfaq2(false)
        setfaq3(false)
        setfaq5(false)
        setfaq6(false)
        setfaq7(false)
        setfaq8(false)
    };
    
    const [faq5, setfaq5] = useState('');
    const onClickfaq5 = () => {
        setfaq5(!faq5)
        setfaq1(false)
        setfaq2(false)
        setfaq3(false)
        setfaq4(false)
        setfaq6(false)
        setfaq7(false)
        setfaq8(false)
    };
    
    const [faq6, setfaq6] = useState('');
    const onClickfaq6 = () => {
        setfaq6(!faq6)
        setfaq1(false)
        setfaq2(false)
        setfaq3(false)
        setfaq4(false)
        setfaq5(false)
        setfaq7(false)
        setfaq8(false)
    };
    
    const [faq7, setfaq7] = useState('');
    const onClickfaq7 = () => {
        setfaq7(!faq7)
        setfaq1(false)
        setfaq2(false)
        setfaq3(false)
        setfaq4(false)
        setfaq5(false)
        setfaq6(false)
        setfaq8(false)
    };
    
    const [faq8, setfaq8] = useState('');
    const onClickfaq8 = () => {
        setfaq8(!faq8)
        setfaq1(false)
        setfaq2(false)
        setfaq3(false)
        setfaq4(false)
        setfaq5(false)
        setfaq6(false)
        setfaq7(false)
    };
  return (
    <>
    <div className='w-4/5 md:w-[90%] m-auto'>
          <div className='bg-custom-green rounded-lg p-2 w-20 text-center font-bold font-zendots m-auto'>FAQs</div>
        <h1 className='uppercase text-center text-2xl md:text-xl my-10 font-zendots text-[#040404] z-10'>WHAT IS BURRO</h1>
        <div className='flex md:flex-wrap m-auto'>
          <div className='w-1/2 md:w-full mr-4 md:mr-0'>
            <div className='bg-[#161616] p-4 rounded-lg text-white my-3 cursor-pointer pr-5' onClick={onClickfaq1}>
              <p className='font-zendots sm:text-sm relative'>01  What is Burro <img className="absolute right-0 top-0" src={faqicon}></img></p>
              {faq1 ? <Textfaq1 /> : null}
            </div>
            <div className='bg-[#161616] p-4 rounded-lg text-white my-3  cursor-pointer pr-5' onClick={onClickfaq2}>
              <p className='font-zendots sm:text-sm relative'>02  How do I claim my BURRO tokens?<img className="absolute right-0 top-0" src={faqicon}></img></p>
              {faq2 ? <Textfaq2 /> : null}

          </div>
          <div className='bg-[#161616] p-4 rounded-lg text-white my-3  cursor-pointer pr-5' onClick={onClickfaq3}>
              <p className='font-zendots sm:text-sm relative'>03  Do you have customer service?<img className="absolute right-0 top-0" src={faqicon}></img></p>
              {faq3 ? <Textfaq3 /> : null}

          </div><div className='bg-[#161616] p-4 rounded-lg text-white my-3  cursor-pointer pr-5' onClick={onClickfaq4}>
              <p className='font-zendots sm:text-sm relative'>04  Is there staking on BURRO?<img className="absolute right-0 top-0" src={faqicon}></img></p>
              {faq4 ? <Textfaq4 /> : null}

          </div>
          </div>
          <div className='w-1/2 ml-4 md:w-full md:ml-0'>
          <div className='bg-[#161616] p-4 rounded-lg text-white my-3  cursor-pointer pr-5' onClick={onClickfaq5}>
            <p className='font-zendots sm:text-sm relative'>05  Where can I buy BURRO?<img className="absolute right-0 top-0" src={faqicon}></img></p>
            {faq5 ? <Textfaq5 /> : null}

          </div>
          <div className='bg-[#161616] p-4 rounded-lg text-white my-3  cursor-pointer pr-5' onClick={onClickfaq6}>
            <p className='font-zendots sm:text-sm relative'>06  What is benefit of buying burro token?<img className="absolute right-0 top-0" src={faqicon}></img></p>
            {faq6 ? <Textfaq6 /> : null}

          </div>
          <div className='bg-[#161616] p-4 rounded-lg text-white my-3 cursor-pointer pr-5' onClick={onClickfaq7}>
              <p className='font-zendots sm:text-sm relative'>07  How do I speak to the marketing team?<img className="absolute right-0 top-0" src={faqicon}></img></p>
              {faq7 ? <Textfaq7 /> : null}

          </div>
          <div className='bg-[#161616] p-4 rounded-lg text-white my-3 cursor-pointer pr-5' onClick={onClickfaq8}>
              <p className='font-zendots sm:text-sm relative'>08  Is the BURRO project audited?<img className="absolute right-0 top-0" src={faqicon}></img></p>
              {faq8 ? <Textfaq8 /> : null}

          </div>
          </div>
          
        </div>
        </div>
    </>
  )
}

function Textfaq1(){
    return(
        <>
<p className=' text-xs sm:text-[10px] pt-2'>
The BURRO is a new crypto project that leverages AI technology, powerful viral marketing AND GREAT ROI UTILITY token. BURRO doesn’t mess around and has a mission to hit a $1B market cap, launching new products like the BURRO NFT WORLD, BURRO MERCHANDISE STORE AND BURRO TOKEN SWAP ON OUR PLATFORM.
</p>
        </>
    )
 };
 function Textfaq2(){
    return(
        <>
<p className=' text-xs sm:text-[10px] pt-2'>
Anyone who purchased BURRO tokens on the official site can claim their tokens at the end of the presale using the same wallet that was used to purchase. Details will be announced on official channels nearing the end of the presale in Q3 2024.
</p>
        </>
    )
 };
 function Textfaq3(){
    return(
        <>
<p className=' text-xs sm:text-[10px] pt-2'>
YES, WE ARE AVAILIBLE ON TELEGRAM, TWITTER, DISCORD AND VIA EMAIL AS WELL. 24 HOURS SUPPORT WILL BE PROVIDED.
</p>
        </>
    )
 };
 function Textfaq4(){
    return(
        <>
<p className=' text-xs sm:text-[10px] pt-2'>
Yes there will be! We will announce the full details of the staking pool and rewards at the end of the presale.
</p>
        </>
    )
 };
 function Textfaq5(){
    return(
        <>
<p className=' text-xs sm:text-[10px] pt-2'>
For the time being, BURRO is only available to buy on the WWW. BURRO.LIVE website, we will be on multiple CEX and DEX upon release.
</p>
        </>
    )
 };
 function Textfaq6(){
    return(
        <>
<p className=' text-xs sm:text-[10px] pt-2'>
You get profit sharing revenue of NFT world, Merchandise store, Burro offers buyback and token burn as well.
</p>
        </>
    )
 };
 function Textfaq7(){
    return(
        <>
<p className=' text-xs sm:text-[10px] pt-2'>
For marketing enquiries, please email ADMIN@BURRO.LIVE
</p>
        </>
    )
 };
 function Textfaq8(){
    return(
        <>
<p className=' text-xs sm:text-[10px] pt-2'>
Yes! Our project and team have been audited by COINSULT and you can read the result on the Solid Proof website here.
</p>
        </>
    )
 };


export default Faq