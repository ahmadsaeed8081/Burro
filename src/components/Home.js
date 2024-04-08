import React,{useState,useEffect} from 'react'
import Navbar from './Navbar'
import Faq from './Faq.js'
import AnimatedSection from './AnimatedSection';

import homeBanner from '../assets/home/home-banner.png'
import VideoPlayer from './VideoPlayer.js'
import solidProof from '../assets/home/solidProof.svg'
import uniswaphero from '../assets/home/uniswaphero.svg'
import awshero from '../assets/home/awshero.svg'
import metamaskhero from '../assets/home/metamaskhero.svg'
import openAi from '../assets/home/openAi.svg'
import trustwallethero from '../assets/home/trustwallethero.svg'

import ambcrypto from '../assets/home/about-ambcrypto.svg'
import coingape from '../assets/home/about-coingape.svg'
import cointelegraph from '../assets/home/about-cointelegraph.svg'
import yahoo from '../assets/home/about-yahoo.svg'

import aboutUsImg from '../assets/home/abou-us.png' 
import chart from '../assets/home/chart.svg'
import howtobuy from '../assets/home/howtobuy.png'
import createnft1 from '../assets/home/createnft-1.png'
import createnft2 from '../assets/home/createnft-2.png'
import createnft3 from '../assets/home/createnft-3.png'
import team1 from '../assets/home/team-1.png'
import team2 from '../assets/home/team-2.png'
import team3 from '../assets/home/team-3.png'
import blur from '../assets/home/blur.png'
import roadmap from '../assets/home/roadmap.svg'
import playicon from '../assets/home/play-icon.svg'
import coinMatik from '../assets/home/coin-matik.svg'
import coinUsdt from '../assets/home/coin-usdt.svg'
import whitepaperPdf from '../assets/home/whitepaper.pdf'
import Decimal from 'decimal.js';
import Loader from "../components/Loader";
import { Link } from 'react-router-dom'

import Web3 from 'web3';
import { staking_Address,USDT_Address,BURRO_Address,staking_abi,token_abi,presale_address,presale_abi  } from "../components/config";
import {useNetwork,  useSwitchNetwork } from 'wagmi'

import { useAccount, useDisconnect } from 'wagmi'
import { useContractReads,useContractRead ,useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'

const Home = (props) => {
  const [payAmount, set_payAmount] = useState(0);
  const [receiveAmount, set_receiveAmount] = useState(0);

  const [matik, setmatik] = useState('');
  const onClickMatik = ()=>{
      setmatik(true);
      setusdt(false);
      onPay(0); 
  };
  const [usdt, setusdt] = useState('');
  const onClickUsdt = ()=>{
      setusdt(true);
      setmatik(false); 
      onPay(0); 

  };
  const openPDF = () => {
    window.open(whitepaperPdf, '_blank');
  };

// Timer calculations start here
const CHAIN_ID = "80001";
const { chain } = useNetwork()
const { address, isConnecting ,isConnected,isDisconnected} = useAccount()

 const targetDate = new Date();
 targetDate.setDate(targetDate.getDate() + 5); //5 days set

 const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());
 const [prog_percentage, set_prog_percentage] = useState(0);

 function getTimeRemaining() {
   const now = new Date();
   const timeDiff = (Number(props.curr_presale.endTime)*1000) - now;

   const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
   const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
   const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
   const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

   return {
     days: days < 0 ? 0 : days,
     hours: hours < 0 ? 0 : hours,
     minutes: minutes < 0 ? 0 : minutes,
     seconds: seconds < 0 ? 0 : seconds
   };
 }
 useEffect(() => {
   const timer = setInterval(() => {
     setTimeRemaining(getTimeRemaining());
   }, 1000);

   return () => clearInterval(timer);
   
 }, [props.curr_presale.endTime]);

// Timer calculations end here
 useEffect(()=>{
  setpercantage();

 },[props.curr_presale.endTime])

function setpercantage()
{
  // set_prog_percentage((Number(100000000)) / (Number(props.curr_presale.supply)/10**18) * 100) ;
  set_prog_percentage((Number(props.curr_presale.total_sold)/10**18) / (Number(props.curr_presale.supply)/10**18) * 100);

}





const {
  data: buy_Result,
  isLoading: isLoading_buy,
  isSuccess: buy_Success,
  write: buy_token1,
} = useContractWrite({
  address: presale_address,
  abi: presale_abi,
  functionName: 'buy_token',
  args: [receiveAmount?Convert_To_Wei(receiveAmount):0,matik?("0"):("1")],
  value:matik?Convert_To_Wei(payAmount?(Number(payAmount)):("0")):0,
  onSuccess(data) {
    props.test();
    console.log('Success', data)
  },
});


const { config: usdtConfig } = usePrepareContractWrite({
  address: USDT_Address,
  abi: token_abi,
  functionName: "approve",
  args: [presale_address,((payAmount?(Number(payAmount)*10**6):("0")))],
});







  const {
    data: data_usdt,
    isLoading: isLoading_usdt,
    isSuccess: isSuccess_usdt,
    write: usdt_approval,
  } = useContractWrite(usdtConfig);







  const {switchNetwork:swap_switch_usdt } =
useSwitchNetwork({
chainId: CHAIN_ID,
// throwForSwitchChainNotSupported: true,
onSuccess(){

  usdt_approval?.();
}
})
const {switchNetwork:swap_switch_matic } =
useSwitchNetwork({
chainId: CHAIN_ID,
// throwForSwitchChainNotSupported: true,
onSuccess(){

  buy_token1?.();
}
})






const waitForTransaction_buy = useWaitForTransaction({
hash: data_usdt?.hash,
onSuccess(data) {
  buy_token1?.();
  console.log("Success", data);
},
});













function Convert_To_eth(val) {
  const web3= new Web3(new Web3.providers.HttpProvider("https://polygon.meowrpc.com"));

  val = web3.utils.fromWei(val.toString(), "ether");
  return val;
}

function Convert_To_Wei(val) {
  const web3= new Web3(new Web3.providers.HttpProvider("https://polygon.meowrpc.com"));

  val = web3.utils.toWei(val.toString(), "ether");
  return val;
}

function onPay(value) 
{
  if(value=='' || value==0)
  {

    set_receiveAmount(0);
    // set_payAmount(0)

    return
  }

  let price;
  if(!matik)
  {
    price = Number(props.curr_presale.price)/10**18;
  }
  else
  {
    price = Number(props.perTokenIn_Matic)/10**18
  }

  let dec_price= new Decimal(price);
  value=new Decimal(value)
  let temp=value.div(dec_price);

  set_receiveAmount(Number(temp).toFixed(2))
}


function onRecieve(value) 
{
  if(value=='' || value==0)
  {
    set_payAmount(0)

    return;
  }
  let price;
  if(!matik)
  {
    price = Number(props.curr_presale.price)/10**18;
  }
  else
  {
    price = Number(props.perTokenIn_Matic)/10**18
  }

  let dec_price= new Decimal(price);
  value=new Decimal(value)
  let temp=dec_price.times(value);

  set_payAmount(Number(temp).toFixed(2))
}

function buy_token()
  {
    if(isDisconnected)
    {
      alert("Kindly connect your wallet");
      return;
    }
    if(payAmount=="" || payAmount=="0")
    {
      alert("Kidly write the amount");
      return;
    }
  

      if(matik)
      {
        if(Number(props.MATICBalance)< Number(Convert_To_Wei(payAmount)))
        {
          alert("You don't have enough Matic");
          return;
        }
  
        if(CHAIN_ID!=chain.id)
        {
          swap_switch_matic?.();
        }
        else{
          buy_token1?.();
        }
  
      }
      else
      {
        console.log("object usdt");
        if(Number(props.USDTBalance)< (Number(payAmount)*10**6))
        {
          alert("You don't have enough USDT");
          return;
        }
  
        if(CHAIN_ID!=chain.id)
        {  
          swap_switch_usdt?.();
        }
        else{
          usdt_approval?.();
        }
      } 
  
  
      // token to token
    
  
  }
  return (
    <>
    <AnimatedSection>
    <div className='relative h-auto pb-10 bg-cover' style={{ backgroundImage: `url(${homeBanner})` }}>
      <div className='absolute inset-0 bg-black opacity-70'></div>
      {/* <div className='relative z-50'><Navbar/></div> */}

      {/* hero section starts here */}
      <section className='m-auto pt-28' id="home">
      <div className='flex flex-col justify-center items-center h-auto relative pt-5 mx-auto xs:w-full md:w-[30rem] lg:w-[50rem] 2xl:w-[65rem] max-w-[65rem] overflow-hidden' >
        
        <h1 className='uppercase text-center text-4xl md:text-2xl my-5 font-zendots text-custom-green z-10'>Burro Token</h1>
          <div className='text-white backdrop-filter backdrop-blur-md bg-white bg-opacity-[13%] border border-gray-400 rounded-xl p-8 z-10 min-w-[10rem] max-w-[27rem] md:w-[90%] h-auto'>
            <div className='bg-custom-green rounded-lg text-black p-2'>
            <ul className='flex justify-between text-center'>
    <li>
        <span className='block font-semibold'>Days</span>
        <span className=' font-zendots sm:text-sm'>{timeRemaining.days?timeRemaining.days.toString().padStart(2, '0'):0}</span>
      </li>
    <li>
      <span className='block font-semibold'>Hours</span>
      <span className=' font-zendots sm:text-sm'>{timeRemaining.hours?timeRemaining.hours.toString().padStart(2, '0'):0}</span></li>
    <li>
      <span className='block font-semibold'>Minutes</span>
      <span className=' font-zendots sm:text-sm'>{timeRemaining.minutes? timeRemaining.minutes.toString().padStart(2, '0'):0}</span>
    </li>
    <li><span className='block font-semibold'>Seconds</span>
    <span className=' font-zendots sm:text-sm'>{timeRemaining.seconds? timeRemaining.seconds.toString().padStart(2, '0'):0}</span></li>
  </ul>
            </div>

            {/* <div className="text-center my-4 text-[14px]"> */}
              {/* <p>Stage {props.curr_stage?(Number(props.curr_stage)):""}</p> */}
              {/* <p>Your Stakeable $GBTC = 0</p> */}
            {/* </div> */}

            <p className='mt-5 mb-2 text-[16px]' style={{ color:"#7DF9FF" }}>Stage # {Number(props.curr_stage)+1}</p>

            <p className='text-center mt-5 mb-2 text-[16px]'>{props.curr_presale.total_sold ? Number(props.curr_presale.total_sold)/10**18:0} / {props.curr_presale.supply?Number(props.curr_presale.supply)/10**18:0}</p>
            <div class="w-full backdrop-filter backdrop-blur-md bg-opacity-[13%] bg-white rounded-md h-4">
              
              <div class="bg-custom-green h-4 rounded-md" style={{width: `${Number(prog_percentage)}%` }}></div>
            </div>

            
            <div className='relative z-10 flex gap-40 mb-2'>

            <div className="text-center my-4 text-[14px]">
              <p>1 BURRO = {props.curr_presale.price?(Number(props.curr_presale.price)/10**18):""}</p>
              {/* <p>Your Stakeable $GBTC = 0</p> */}
            </div>
            {Number(props.curr_stage)  < 9? (

            <div className="text-right my-4 text-[14px]" >
            <p >Next = {props.NextStagePrice?(Number(props.NextStagePrice)/10**18):""}</p>
          </div>

            ):
            
            (null) }

            </div>


            {/* <div className="text-center my-4 text-[16px]">
              <p>Your Purchased BURRO = {props.BURROBalance?(Number(props.BURROBalance)/10**18).toFixed(2):""}</p>
            </div> */}
            <div className='relative z-10 flex gap-4 mb-2'>
              <div onClick={onClickMatik} className={matik? 'border-2 border-custom-green w-1/2 backdrop-filter backdrop-blur-md bg-opacity-[13%] bg-black rounded-md cursor-pointer':' border-none w-1/2 backdrop-filter backdrop-blur-md bg-opacity-[13%] bg-black rounded-md cursor-pointer'}>
                <img className='h-10 w-10 mr-2 inline-block' src={coinMatik}></img>
                <span className='absolute right-5 top-2'>Matic</span>
              </div>
              <div onClick={onClickUsdt} className={usdt? 'border-2 border-custom-green w-1/2 backdrop-filter backdrop-blur-md bg-opacity-[13%] bg-black rounded-md cursor-pointer':'border-none  w-1/2 backdrop-filter backdrop-blur-md bg-opacity-[13%] bg-black rounded-md cursor-pointer'}>
              <img className='h-10 w-10 mr-2 inline-block' src={coinUsdt}></img>
                <span className='absolute right-5 top-2'>USDT</span>
              </div>
            </div>
            <div className='flex justify-between items-center my-4'>
              <div className=' border-gray-400 h-1 w-1/10 mt-2'></div><span className='sm:text-[13px]'>{matik?("MATIC Balance = " + (props.MATICBalance?Number(props.MATICBalance)/10**18:0).toFixed(2) ):("USDT Balance = "+ Number(props.USDTBalance?props.USDTBalance/10**6:0).toFixed(2))}</span><div className='border-t border-gray-400 h-1 w-1/10 mt-2'></div>
            </div>
            <div className='flex gap-4'>
              <div className='w-full'>
                <label className='block mb-2 sm:text-[14px]'>{matik?("MATIC You Pay"):("USDT You Pay")}</label>
                <input className='w-full backdrop-filter backdrop-blur-md bg-opacity-[13%] bg-black rounded-md p-2'
                  type="Number" 
                  disabled={props.perTokenIn_Matic>0?false:true}
                  min={0}
                  value={payAmount}
                  onChange={(e)=>{set_payAmount(e.target.value);onPay(e.target.value) }}
                />
              </div>
              <div className='w-full'>
                <label className='block mb-2 sm:text-[14px]'>BURRO you recieve</label>
                <input className='w-full backdrop-filter backdrop-blur-md bg-opacity-[13%] bg-black rounded-md p-2'
                  type="number" 
                  disabled={props.perTokenIn_Matic>0?false:true}
                  value={receiveAmount} 
                  min={0}
                  onChange={(e)=>{set_receiveAmount(e.target.value);onRecieve(e.target.value)}}
                  />
              </div>
            </div>
            <p className='text-center my-4 sm:text-[14px]'></p>
            <button className='bg-custom-green p-2 w-full rounded-sm text-black font-bold' onClick={buy_token}>Buy Now</button>
            <p className='text-center mt-4 sm:text-[14px]'>Listing On <a href="#" style={{ color:"#7DF9FF"}} >P2B Exchange</a>, <a href="#" style={{ color:"#7DF9FF"}} >Uniswap</a>, <a href="#" style={{ color:"#7DF9FF"}} >Pancakeswap</a>,<a style={{ color:"#7DF9FF"}}href="#"> Orca</a>, <a href="#" style={{ color:"#7DF9FF"}} >Raydium</a> and <a style={{ color:"#7DF9FF"}}href="#">Jupiter</a>.</p>

          </div>

          <p className='flex gap-2 mt-5 text-white font-semibold'>Audit By <img className="" src={solidProof}></img></p>
          
      </div>
      </section>
      {/* hero section ends here */}
      {/* {props.loader && <Loader />} */}

    </div>
    </AnimatedSection>

      {/* Powered by starts here */}
      <section className='bg-custom-black text-white p-10 md:px-2'>
        <div className='w-4/5 md:w-[90%] m-auto'>
          <div className='flex gap-2 text-nowrap font-zendots'>
            Powered By<div className='border-t border-white h-1 w-full mt-3'></div>
          </div>
          
          <div className='flex justify-between lg:overflow-x-scroll gap-10 my-5 mt-10'>
            <div className='flex-shrink-0'><img className="h-8 w-25" src={openAi} /></div>
            <div className='flex-shrink-0'><img className="h-8 w-25" src={awshero}></img></div>
            <div className='flex-shrink-0'><img className="h-8 w-25" src={metamaskhero}></img></div>
            <div className='flex-shrink-0'><img className="h-8 w-25" src={uniswaphero}></img></div>
            <div className='flex-shrink-0'><img className="h-8 w-25" src={trustwallethero}></img></div>
          </div>
          <div className='mx-10 md:mx-0 mt-16 md:overflow-x-scroll max-w-full'>
            <ul className='text-custom-green text-center md:text-left flex justify-between md:gap-3'>
              <li className='flex-shrink-0 text-center'><span className='block font-zendots text-2xl'>10M+</span><span className='text-sm'>People Reached</span></li>
              <li className='flex-shrink-0 text-center'><span className='block font-zendots text-2xl'>12M+</span><span className='text-sm'>Social Media Engaement</span></li>
              <li className='flex-shrink-0 text-center'><span className='block font-zendots text-2xl'>8K+</span><span className='text-sm'>Number of Media Mention</span></li>
              <li className='flex-shrink-0 text-center'><span className='block font-zendots text-2xl'>100K+</span><span className='text-sm'>People Visit A Website</span></li>
            </ul>
          </div>
          
        </div>
      </section>
      {/* powered by end here */}

      {/* about us startes here */}
      <section  className='bg-white p-10 md:p-2'>
        <div className='w-4/5 md:w-[90%] m-auto'>
        <div id="aboutUs" className='flex justify-between gap-10 my-5 mt-10 lg:overflow-x-scroll'>
            <div className='flex-shrink-0'><img className="h-8 w-25" src={coingape} /></div>
            <div className='flex-shrink-0'><img className="h-8 w-25"src={ambcrypto}></img></div>
            <div className='flex-shrink-0'><img className="h-8 w-25"src={cointelegraph}></img></div>
            <div className='flex-shrink-0'><img className="h-8 w-25"src={coingape}></img></div>
            <div className='flex-shrink-0'><img className="h-8 w-25"src={yahoo}></img></div>
        </div>

    <AnimatedSection>
        <div className='grid grid-cols-2 md:grid-cols-1 my-16 items-center'>
          <img className="md:order-2 md:mt-4" src={aboutUsImg}></img>
          <div className='p-10 md:p-4 md:order-1'>
            <div className='flex gap-2 font-zendots md:justify-center'><div className='md:hidden border-t-2 border-custom-black h-1 w-16 mt-3'></div>About Us</div>
            <p className='text-2xl font-zendots my-3'>WELCOME TO THE WORLD OF BURRO</p>
          <p className=' text-sm'>We are an ultimate NFT token. Burro Token dominates all the others as it has much more to offer than your regular utility token as we will share 80% profit of revenue generated from NFT sales and merchandise. We offer Buyback and Burn program as well.</p>
          <p className='font-semibold text-sm my-3'>Let's join us for this fun Wildride of this Burro adventure and enjoy this beautiful journey along with us.</p>
          <div className='flex gap-2 mt-7'>
            {/* <button className='bg-custom-black rounded px-7 p-2 text-white text-nowrap sm:px-5'>Get Started</button> */}
            <button className='border bg-custom-black rounded px-10 p-2 text-white font-semibold text-nowrap sm:px-5' onClick={openPDF}>Whitepaper</button>
          </div>
          </div>          
        </div>
    </AnimatedSection>

        </div>
      </section>
      {/* about us ends here */}
      
      {/* BurroTekken Chart and Roadmap sections */}

      <section className='bg-custom-black text-white p-16 md:p-6'>
        <div className='w-4/5 m-auto md:w-[90%]'>

      {/* BurroTekken Chart section strats */}
    <AnimatedSection>
        <h1 className='uppercase text-center text-2xl md:text-xl mt-10 font-zendots text-custom-green z-10'>Burro Token</h1>
        <div className=' w-full m-auto flex justify-center'>
          {/* <div className='border-2 border-custom-green rounded-full p-2 '>
          <Chart />
          </div> */}
          <img src={chart}></img>
        </div>
        </AnimatedSection>

      {/* BurroTekken Chart section ends */}

      {/* Roadmap starts here */}
    <AnimatedSection>
      
          <div className='pt-2'>
            <img src={roadmap}></img>
          </div>
    </AnimatedSection>

      {/* Roadmap ends here */}
      </div>
      </section>
      {/* BurroTekken and Roadmap sections end here */}

      {/* how to buy section starts */}
    <AnimatedSection>

      <section id="howToBuy" className='bg-white p-14 md:p-4 border-2 border-red-700'>
        <div className='w-4/5 md:w-[90%] m-auto mt-20'>
        <h1 className='uppercase text-center text-2xl font-zendots text-[#040404] z-10'>How To Buy</h1>
      <div className='grid grid-cols-2 md:grid-cols-1 items-center'>
          <div className='p-10 md:p-4'>
            <div className='relative'>
            <div class="border-2 absolute border-custom-green border-dashed h-full left-5"></div>

            <div class="z-20 flex items-center order-1 bg-black shadow-xl w-10 h-10 rounded-full my-auto absolute left-0">
                <h1 class="mx-auto font-semibold font-zendots text-lg text-custom-green">01</h1>
            </div>
            <div className='pl-10'><p className='font-zendots mt-2 ml-2'>Connect Wallet</p>
            <p className='text-sm text-[#222222] p-2'>To purchase Burro Token you need to connect your wallet, which involves approving the contract on your wallet</p>
            </div>
            
            <div className="pt-5">
            <div class="z-20 flex items-center order-1 bg-black shadow-xl w-10 h-10 rounded-full my-auto absolute left-0">
                <h1 class="mx-auto font-semibold font-zendots text-lg text-custom-green">02</h1>
            </div>
            <div className='pl-10'><p className='font-zendots mt-2 ml-2'>SELECT PAYMENT TYPE</p>
            <p className='text-sm text-[#222222] p-2'>Select from our available ETH, BSC networks, or use card for payment</p>
            </div>
            </div>

            <div className="pt-5">
            <div class="z-20 flex items-center order-1 bg-black shadow-xl w-10 h-10 rounded-full my-auto absolute left-0">
                <h1 class="mx-auto font-semibold font-zendots text-lg text-custom-green">03</h1>
            </div>
            <div className='pl-10'><p className='font-zendots mt-2 ml-2'>Buy Burro Token</p>
            <p className='text-sm text-[#222222] p-2'>Simply input your amount, select buy and approve the payment on your wallet</p>
            </div>
            </div>

            <div className="pt-5">
            <div class="z-20 flex items-center order-1 bg-black shadow-xl w-10 h-10 rounded-full my-auto absolute bottom-0 left-0">
                <h1 class="mx-auto font-semibold font-zendots text-lg text-custom-green">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
</svg></h1>
            </div>
            <div className='pl-10'>
             <a href="#home"><button className='bg-black text-custom-green mt-1 ml-2 px-10 p-2 rounded' >Buy Now</button></a>
            </div>
            </div>
</div>
          </div>   
          <div className='relative'>
            {/* <img className="md:mt-5" src={howtobuy}></img> */}

            <VideoPlayer
        videoUrl="./video.mp4"
      />
      
            {/* <img src={playicon} className='object-cover w-12 h-12 absolute left-0 right-0 m-auto top-0 bottom-0'></img> */}
            <p className='font-zendots underline my-2 text-center'>View Step by Step</p>
          </div>
        </div>
        </div>
      </section>
    </AnimatedSection>

      {/* how to buy section ends */}

      {/* create nft starts */}
      <section className='bg-custom-black text-white py-16'>
        <div className='w-4/5 m-auto lg:w-[90%]'>
    <AnimatedSection>

          <h1 className='uppercase text-center text-2xl my-10 font-zendots text-white z-10'>Create NFT</h1>
          <div className='flex md:flex-wrap md:gap-10 gap-5 justify-center'>
          <div className='flex justify-end relative'>
            <div className='green-gradient h-1/2 w-full rounded-3xl z-10 absolute bottom-0'></div>
            <img className='self-end object-contain z-20' src={createnft1}></img>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.5" stroke="currentColor" class="w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 z-20 backdrop-filter backdrop-blur-md bg-opacity-[13%] bg-gray-400 rounded-full">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
          </div>
          
          <div className='flex justify-end relative'>
            <div className='green-gradient h-1/2 w-full rounded-3xl z-10 absolute bottom-0'></div>
            <img className='absolute' src={blur}></img>
            <img className='self-end object-contain z-20' src={createnft2}></img>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.5" stroke="currentColor" class="w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 z-20 backdrop-filter backdrop-blur-md bg-opacity-[13%] bg-gray-400 rounded-full">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
          </div>

          <div className='flex justify-end relative'>
            <div className='green-gradient h-1/2 w-full rounded-3xl z-10 absolute bottom-0'></div>
            <img className='self-end object-contain z-20' src={createnft3}></img>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.5" stroke="currentColor" class="w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 z-20 backdrop-filter backdrop-blur-md bg-opacity-[13%] bg-gray-400 rounded-full">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
          </div>

          </div>
          </AnimatedSection>

          <AnimatedSection>
          <div id="team" className=' mt-20 border-2 border-transparent'>
            <h1  className='uppercase text-center text-2xl my-10 font-zendots text-white z-10 pt-16'>Meet our team</h1>
          <div className='flex md:flex-wrap gap-5 justify-center relative'>
            <div className='p-2 rounded-2xl px-2 border-2 polygon border-gray-600'>
              <div className='relative'><img src={team1}></img>
              <div className='h-1/4 w-full bg-[#7DF9FF] z-10 absolute bottom-0'>
                <ul className='text-center text-black'><li className='text-xl font-semibold mt-2'>Andy</li><li className='font-zendots'>CEO</li></ul>
              </div>
              </div>
            </div>
            <div className='p-2 rounded-2xl px-2 border-2 polygon border-gray-600'>
              <div className='relative'><img src={team2}></img>
              <div className=' h-1/4 w-full bg-[#7DF9FF] z-10 absolute bottom-0'>
                <ul className='text-center text-black'><li className='text-xl font-semibold mt-2'>Ahmad</li><li className='font-zendots'>Developer</li></ul>
              </div>
              </div>
            </div>
            <div className='p-2 rounded-2xl px-2 border-2 polygon border-gray-600'>
              <div className='relative'><img src={team3}></img>
              <div className='h-1/4 w-full bg-[#7DF9FF] z-10 absolute bottom-0'>
                <ul className='text-center text-black'><li className='text-xl font-semibold mt-2'>Deborah B</li><li className='font-zendots'>Marketing Head</li></ul>
              </div>
              </div>
            </div>
          </div>

        </div>
    </AnimatedSection>

        </div>
      </section>
      {/* create nft ends  */}

      {/* faq starts */}
    <AnimatedSection>
      <section className='bg-white p-10'> 
        <Faq/>
        </section>
    </AnimatedSection>

      {/* faq ends here */}
    </>
  )
}

export default Home