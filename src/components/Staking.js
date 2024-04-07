import React,{useState,useEffect} from 'react'
import Navbar from './Navbar'
import Time from '../components/Time'

import Web3 from "web3";
import {useNetwork,  useSwitchNetwork } from 'wagmi'
import { useAccount, useDisconnect } from 'wagmi'
import { staking_Address,USDT_Address,BURRO_Address,staking_abi,token_abi,presale_address,presale_abi  } from "../../src/components/config";
import { useContractReads,useContractRead ,useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'


const Staking = (props) => {

    const [stacking, setstacking] = useState(true);
    const onClickStacking = ()=>{
        setstacking(true);
        setunstacking(false);
    };
    const [unstacking, setunstacking] = useState('');
    const onClickUnstacking = ()=>{
        setunstacking(true);
        setstacking(false); 
    };

    const APRList = [
        { value: "0", lbl: "120 Days" ,APR: "0.05%"},
        { value: "1", lbl: "240 Days"  ,APR: "0.08%"},
        { value: "2", lbl: "365 Days" ,APR: "0.12%"},
    
      ];
    
    const [ selectedAPR,set_selectedAPR] = useState(APRList[0])
    const [stakeAmount, setStakedAmount] = useState(0);
  
  
    const [choosed_Unstake_inv, set_choosed_Unstake_inv] = useState();
    const [allInvestments, set_investmentList] = useState([]);
    const [selectedAmount, setSelectedAmount] = useState();
  
    const { chain } = useNetwork()
  
    const { address, isConnecting ,isDisconnected} = useAccount()
    const networkId=80001;
  let count=0;
// Timer calculation starts here

 // Set the target date for the countdown (5 days from the current date)
 const targetDate = new Date();
 targetDate.setDate(targetDate.getDate() + 5);

 // Initialize state variables for days, hours, minutes, and seconds
 const [timeRemaining, setTimeRemaining] = useState();

 // Define a function to calculate the time remaining
 function getTimeRemaining() {
   const now = new Date();
//    alert(choosed_Unstake_inv)
let timeDiff;
if(Number(choosed_Unstake_inv)==1712386310)
{
    console.log("uhu")
     timeDiff =  Number(choosed_Unstake_inv) * 1000  -  now;

}
else{
     timeDiff =  Number(choosed_Unstake_inv) * 10000  -  now;

}

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

 // Update the time remaining every second
//  useEffect(() => {
// //    const timer = setInterval(() => {
// //      setTimeRemaining(getTimeRemaining());
// //    }, 1000);

// //    return () => clearInterval(timer);
//  }, [selectedAmount]);
// Timer calculation ends here






    const { data:stakeResult, isLoading:isLoading_stake, isSuccess:stakeSuccess, write:staking } = useContractWrite({

      address: staking_Address,
    abi: staking_abi,
    functionName: 'Stake',
    args: [Convert_To_wei(stakeAmount),selectedAPR.value,address],

    onSuccess(data) {
      props.test();
      console.log('Success', data)
    },
  

  })

  const { config:appConfig } = usePrepareContractWrite({
    address: BURRO_Address,
    abi: token_abi,
      functionName: 'approve',
      args: [staking_Address,Convert_To_wei(stakeAmount)],
  })




    const { config:unstakeConfig } = usePrepareContractWrite({
      address: staking_Address,
      abi: staking_abi,
      functionName: 'unStake',
      args: [choosed_Unstake_inv],
      // gas:300000,

    })




    const {data:data_app, isLoading:isLoading_app, isSuccess:isSuccess_app,write: approval} = useContractWrite(appConfig)

  const { data:data__unstake, isLoading:isLoading_unstake, isSuccess:isSuccess_unstake, write:unstake } = useContractWrite(unstakeConfig)

  const waitForTransaction = useWaitForTransaction({
    hash: data_app?.hash,
    onSuccess(data) {
    // alert("its run")
    staking?.()
      console.log('Success',data )
    },
  })

  const waitForTransaction2 = useWaitForTransaction({
    hash: stakeResult?.hash,
    onSuccess(data) {
    props.test?.()
      console.log('Success2',data )
    },
  })

  const waitForTransaction3 = useWaitForTransaction({
    hash: data__unstake?.hash,
    onSuccess(data) {
    props.test?.()
      console.log('Success2',data )
    },
  })



useEffect(()=>{
    // alert("huuh")

  if( props.allInvestments.length>0)
  {
    // alert("huuh")
      test1()
      count++;
  }

},[address,props.allInvestments])


  const {switchNetwork:stake_switch } =
    useSwitchNetwork({
      chainId: networkId,
      // throwForSwitchChainNotSupported: true,
      onSuccess(){

        approval?.()
      }

    })
    const { switchNetwork:unstake_switch } =
    useSwitchNetwork({
      chainId: networkId,
      // throwForSwitchChainNotSupported: true,
      onSuccess(){

        unstake?.()
      }

    })



  

  // function find_date( time){
  //   const now = new Date().now;
  //   console.log("its tie time"+ time);

  //   const t=moment("20000620", "YYYYMMDD").fromNow();
  //   console.log("its tie "+t);
  // }
  function Convert_To_wei( val){
    if(val==null || val==undefined || val=="")
    return 

    const web3= new Web3(new Web3.providers.HttpProvider("https://bsc.publicnode.com	"));
    val= web3.utils.toWei(val.toString(),"ether");
    return val;
  
  }

  function Convert_To_eth( val){
    if(val==null || val==undefined || val=="")
    return 

    const web3= new Web3(new Web3.providers.HttpProvider("https://bsc.publicnode.com	"));
    val= web3.utils.fromWei(val.toString(),"ether");
    return val;
  
  }


    function test1(){


    console.log(props.allInvestments);


    set_investmentList(props.allInvestments);
    setSelectedAmount(props.allInvestments[0]);
    console.log(props.allInvestments[0])

    set_choosed_Unstake_inv(props.allInvestments[0][3])

    



  }  





  async function stake()
  {

    if(isDisconnected)
    {
      alert("kindly connect your wallet ");
      return;
    }

    if(stakeAmount==0 )
    {
      alert("kindly write amount to stake ");
      return;
    }
    if(Number(stakeAmount)<Number(props.min_stake)/10**18 )
    {
      alert("Minimum Stake amount is "+ Number(props.min_stake)/10**18);
      return;
    }


    if(Number(props.BURROBalance)/10**18 < Number(stakeAmount))
    {
      alert("You don't have sufficient balance");
      return;
    }
    if(chain.id!=networkId)
    {
      stake_switch?.();
    }else{
      approval?.()

    }

  }


  function unstaking()
  {
    if(isDisconnected)
    {
      alert("kindly connect your wallet ");
      return;
    }

    if(chain.id!=networkId)
    {
      unstake_switch?.();
    }else{
      unstake?.()

    }
    

  }



  return (
    <>
        <Navbar/>
        <section className='pb-20 pt-28'>
            <h1 className='uppercase text-center text-4xl my-5 font-zendots text-custom-green z-10'>Staking</h1>
            <div className='flex flex-col justify-center items-center h-auto pt-5 mx-auto xs:w-full md:w-[30rem] lg:w-[50rem] 2xl:w-[65rem] max-w-[65rem] overflow-hidden'>
                <div className='text-white border border-custom-green rounded-xl md:w-[90%] h-auto min-w-[10rem] max-w-[27rem]
                '>
                    <div className='flex justify-between text-center z-10'>
                        <div onClick={onClickStacking} className={stacking? 'bg-custom-green p-2 w-1/2 h-auto font-zendots text-black rounded-tl-xl cursor-pointer':'bg-white p-2 w-1/2 h-auto font-zendots text-black rounded-tl-xl cursor-pointer'}>Staking</div>
                        <div onClick={onClickUnstacking} className={unstacking? 'bg-custom-green p-2 w-1/2 h-auto font-zendots text-black rounded-tr-xl cursor-pointer':'bg-white p-2 w-1/2 h-auto font-zendots text-black rounded-tr-xl cursor-pointer'}>Unstaking</div>
                    </div>
                    <div className='pb-10'>
                        {stacking? <>
                            <div className='border-b flex justify-between font-zendots border-gray-400 pt-20'>
                            <span className='ml-10 '>Daily APR:</span>
                            <span className='mr-10 '>{selectedAPR.APR}</span>
                        </div>
                        <div className='pt-20 px-10 '>
                        <select  className='w-full bg-[#1C1C1C] rounded-md p-3 focus:outline-custom-green border border-custom-green focus:border-custom-green font-zendots text-sm '                                 
                                    onChange={(event) => {

                                        set_selectedAPR(APRList[event.target.value]);

                                }} >
                        {APRList.map((item,index)=>(
                            
                            <option value={APRList[index].value} className=" bg-black"

                              >{item.lbl}</option>

                        ))}

                        </select>
                        <input className='border border-custom-green focus:border-custom-green focus:outline-custom-green w-full bg-[#1C1C1C] rounded-md p-3 mt-10 font-zendots text-sm'
                            type="number" 
                            min={0}
                            value={stakeAmount}
                            max={props.BURROBalance>0?(Number(props.BURROBalance)/10**18):0}
                            onChange={(e)=>setStakedAmount(e.target.value)}
                        />
                        <button className='mt-10 bg-custom-green p-2 w-full rounded-md text-black font-zendots'onClick={stake}>

                        {!isLoading_stake  && !isLoading_app &&! isSuccess_app && !stakeSuccess &&<div>Approve</div>}
                        {isLoading_app && <div>Approving</div>}
                        {!stakeSuccess && !isLoading_stake && isSuccess_app && <div>Approved</div>}
                        {isLoading_stake && <div>Staking</div>}
                        {!isLoading_app && stakeSuccess && <div>Approve</div>}

                        </button>
                        </div>
                        </> : null}
                        {unstacking? <>
                        <p className='font-zendots pt-20 px-10'>Previous Investment:</p>
                        <div className='pt-5 px-10 md:px-5'>
                        <select className='w-full bg-[#1C1C1C] rounded-md p-3 focus:outline-custom-green border border-custom-green focus:border-custom-green font-zendots text-sm'
                            onChange={(event) => {

                                // alert(props.allInvestments[event.target.value][1]);
                                setSelectedAmount(props.allInvestments[event.target.value]);
                                set_choosed_Unstake_inv(Number(props.allInvestments[event.target.value][3]));

                            }} >
                                                    
                        {props.allInvestments.map((item,index)=>(
                            
                            <option value={index} className=" bg-black"

                              >{item[0]/10**18}</option>

                        ))}

                        </select>
                        <Time time={selectedAmount ? Number(selectedAmount[1]): 0} />
                        {/* <div className='flex justify-end'>
    <ul className='flex gap-2 mt-5 flex-wrap'>
    <li className='flex items-center'><div className='p-0.5 bg-custom-green font-zendots text-black mr-1 w-9 sm:w-7 sm:text-xs'>{timeRemaining.days.toString().padStart(2, '0')}</div><div className='text-xs sm:text-[10px]'>Days</div></li>
        <li className='flex items-center'><div className='p-0.5 bg-custom-green font-zendots text-black mr-1 w-9 sm:w-7 sm:text-xs'>{timeRemaining.hours.toString().padStart(2, '0')}</div><div className='text-xs sm:text-[10px]'>Hours</div></li>
        <li className='flex items-center'><div className='p-0.5 bg-custom-green font-zendots text-black mr-1 w-9 sm:w-7 sm:text-xs'>{timeRemaining.minutes.toString().padStart(2, '0')}</div><div className='text-xs sm:text-[10px]'>Minutes</div></li>
        <li className='flex items-center'><div className='p-0.5 bg-custom-green font-zendots text-black mr-1 w-9 sm:w-7 sm:text-xs'>{timeRemaining.seconds.toString().padStart(2, '0')}</div><div className='text-xs sm:text-[10px]'>seconds</div></li>
    </ul>
  </div> */}

                        <div className='mt-16 flex justify-between font-zendots'>
                            <div>Earned Rewards</div><div>{selectedAmount ? (Number(selectedAmount.reward)/10**18).toFixed(2): 0}</div>
                        </div>
                        <div className='mt-5 flex justify-between font-zendots'>
                            <div>Pending Rewards</div><div>{selectedAmount ? (Number(selectedAmount.pending_rew)/10**18).toFixed(2): 0}</div>
                        </div>  
                        <button className='mt-16 bg-custom-green p-2 w-full rounded-md text-black font-zendots' onClick={unstaking}>Unstake</button>             
                        </div>
                        </>: null}
                    </div>
                </div>
            </div>
        </section>
    </>
    )
}

export default Staking