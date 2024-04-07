import React,{useState, useEffect1} from 'react'

import buroLogo from '../assets/navbar/buro-logo.png'
import { Link } from 'react-router-dom'


import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useContractReads, useContractWrite } from "wagmi";

const Navbar = () => {

  const { open, close } = useWeb3Modal();
  const { address, isConnected } = useAccount();



  const [showText, setShowText] = useState('');
  const onClick = () => setShowText(!showText);

   const [isOpen, setIsOpen] = useState(false);

  const [colorChange, setColorchange] = useState(false);
  const changeNavbarColor = () =>{
      if(window.scrollY >= 50){
          setColorchange(true);
      }
      else{
          setColorchange(false);
      }
  };
  window.addEventListener('scroll', changeNavbarColor);

  return (
    <>
    <nav className={ colorChange ? 'left-0 top-0 bg-black text-white px-20 lg:px-5 py-1 flex justify-between items-center fixed w-full z-99' : 'text-white px-20 lg:px-5 py-3 flex justify-between items-center fixed w-full left-0 right-0 z-99999'}>
    <Link to="/"><div><img className='w-15 h-20' src={buroLogo}></img></div></Link>
    <button className='hidden lg:block' onClick={onClick}>
    {showText?  
    
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 ">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 ">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
      }
   

    </button>
  <div className='2xl:block lg:hidden'>
          <div>
            <ul className='flex gap-7 md:gap-3 items-center'>
                <Link to="/"><a href="#home"><li>Home</li></a></Link>
                <a href="#aboutUs"><li>About us</li></a>
                <a href="#howToBuy"><li>How to buy</li></a>
                <Link to="/staking"><li>Staking</li></Link>
                <li>Airdrop (Coming Soon)</li>
                <a href="#team"><li>Team</li></a>
                <li><button className=' bg-custom-green text-black p-2 px-5 rounded-lg font-medium' onClick={() => open()}>{isConnected
            ? address.slice(0, 5) + "..." + address.slice(38, 42)
            : "Connect Wallet"}</button></li>
            </ul>
        </div>
        </div>
        
        </nav>
        {showText ? <Text /> : null}
    </>
  )
}

function Text(){

  const { open, close } = useWeb3Modal();
  const { address, isConnected } = useAccount();


  return(
      <>
        <div className='2xl:hidden lg:block bg-black text-white top-20 right-0 p-5 h-auto w-1/3 md:w-1/2 sm:w-[80%] z-50 rounded-lg fixed'>
        <div>
            <ul className='text-center'>
                <Link to="/"><a href="#home"><li className='my-2'>Home</li></a></Link>
                <a href="#aboutUs"><li className='my-2'>About us</li></a>
                <a href="#howToBuy"><li className='my-2'>How to buy</li></a>
                <Link to="/staking"><li className='my-2'>Staking</li></Link>
                <li className='my-2'>Airdrop (Coming Soon)</li>
                <a href="#team"><li className='my-2'>Team</li></a>
                <li className='my-2'><button className=' bg-custom-green text-black p-2 w-full rounded-lg font-medium' onClick={() => open()} >{isConnected
            ? address.slice(0, 5) + "..." + address.slice(38, 42)
            : "Connect Wallet"}</button></li>
            </ul>
        </div>
        </div>
      </>
  )
};

export default Navbar
