import React,{useState,useEffect} from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home'
import Staking from './components/Staking'
import Footer from './components/Footer';
import Navbar from './components/Navbar';


import Web3 from "web3";

import {useNetwork,  useSwitchNetwork } from 'wagmi'
import { useAccount, useDisconnect } from 'wagmi'
import { staking_Address,USDT_Address,BURRO_Address,staking_abi,token_abi,presale_address,presale_abi  } from "../src/components/config";
import { useContractReads,useContractRead ,useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'


function RouteConfig() {





  const [loader, setLoader] = useState(false);


  // totalReward=totalReward Total_withdraw=Total_withdraw

  const [totalReward, set_totalReward] = useState(0);
  const [totalusers, set_totalusers] = useState(0);
  const [totalbusiness, set_totalbusiness] = useState(0);
  const [totalInvestment, set_totalInvestment] = useState(0);
  const [totalEarning, set_totalEarning] = useState(0);
  const [USDTBalance, set_TokenBalance] = useState(0);
  const [BURROBalance, set_BURROBalance] = useState(0);
  const [MATICBalance, set_MATICBalance] = useState(0);


  const [choosed_Unstake_inv, set_choosed_Unstake_inv] = useState();
  const [allInvestments, set_investmentList] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [user, set_user] = useState([]);
  const [curr_time, set_curr_time] = useState();
  const [min_stake, set_min_stake] = useState(0);

  const [curr_stage, set_curr_stage] = useState();
  const [curr_StageTime, set_curr_StageTime] = useState(0);
  const [curr_presale, set_curr_presale] = useState(0);
  const [perTokenIn_Matic, set_perTokenIn_Matic] = useState(0);
  const [NextStagePrice, set_NextStagePrice] = useState(0);

  const { chain } = useNetwork()
  // const location = useLocation();
  // const params = new URLSearchParams(location.search);
  // const regAddres = params.get("address");

  const { address, isConnecting ,isDisconnected,isConnected} = useAccount()
  let count=0


 
useEffect(()=>{
  if((count==0))
  {
    count++;

      test();
  }

},[address])





  async function test(){
    setLoader(true)
    const web3= new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/Xr86iyHzmF6-yzBAqV5rd_PW7ds7QKlh"));
  
              
    const staking_contract=new web3.eth.Contract(staking_abi,staking_Address);
    const presale_contract=new web3.eth.Contract(presale_abi,presale_address);
    const USDT_contract=new web3.eth.Contract(token_abi,USDT_Address);
    const BURRO_contract=new web3.eth.Contract(token_abi,BURRO_Address);
    let USDTBalance;
    let BURROBalance;
    let totalReward;
    let totalEarning;
    let user;
    let allInvestments;
    let balance;
    
    if(isConnected)
    {
       balance  =await  web3.eth.getBalance(address)

       USDTBalance = await USDT_contract.methods.balanceOf(address).call();    
       BURROBalance = await BURRO_contract.methods.balanceOf(address).call();    
  
       totalReward = await staking_contract.methods.get_TotalReward().call({ from: address });   
       totalEarning = await staking_contract.methods.get_totalEarning().call(); 
       user = await staking_contract.methods.user(address).call();      
       allInvestments = await staking_contract.methods.getAll_investments().call({from: address});

    }

    //presale

    let curr_stage = await presale_contract.methods.get_curr_Stage().call();    
    let curr_StageTime = await presale_contract.methods.get_curr_StageTime().call();    
    let perTokenIn_Matic = await presale_contract.methods.get_MaticPrice().call();    
    // let curr_timePresale = await presale_contract.methods.curr_time().call();    
    let curr_presale = await presale_contract.methods.presale(curr_stage).call(); 
    let NextStage;
    if(curr_stage<9)
    {
       NextStage = await presale_contract.methods.presale(curr_stage).call();    

    }   


    //staking 

    let min_stakeAmount = await staking_contract.methods.minimum_investment().call();    
    let currTime = await staking_contract.methods.get_currTime().call();    
    let totalusers = await staking_contract.methods.totalusers().call();    
    let totalbusiness = await staking_contract.methods.getTotalInvestment().call();
    
    

    set_NextStagePrice(NextStage)
    set_MATICBalance(balance)
    set_curr_stage(curr_stage)
    set_curr_StageTime(curr_StageTime)
    set_curr_presale(curr_presale)
    set_perTokenIn_Matic(perTokenIn_Matic)


    set_totalEarning(totalEarning);
    set_curr_time(currTime)
    set_TokenBalance(USDTBalance);
    set_BURROBalance(BURROBalance);

    set_totalInvestment(user[1])
    set_totalbusiness(totalbusiness)
    set_min_stake(min_stakeAmount)
    set_totalusers(totalusers)
    set_investmentList(allInvestments);
    setSelectedAmount(allInvestments[0]);
    if(allInvestments[0])
    {
      set_choosed_Unstake_inv(allInvestments[0][3])

    }    
    set_totalReward(totalReward);

    setLoader(false)


  console.log("object done");
  }  








  return <>
    <BrowserRouter>
    <div>
    <div className='relative z-50'><Navbar/></div>
      
        <Routes>
            <Route path="/" loader={loader} NextStagePrice={NextStagePrice} test={test} element={<Home MATICBalance={MATICBalance} BURROBalance={BURROBalance} USDTBalance={USDTBalance} curr_time={curr_time} curr_stage={curr_stage} curr_StageTime={curr_StageTime}  curr_presale={curr_presale} perTokenIn_Matic={perTokenIn_Matic}  />} />
            <Route path="/staking" element={<Staking BURROBalance={BURROBalance} curr_time={curr_time} min_stake={min_stake}  allInvestments={allInvestments}  test={test} />} />
        </Routes>   
      <Footer/>
    </div> 
    </BrowserRouter>
  </>
}
  
  export default RouteConfig;
