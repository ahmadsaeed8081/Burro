//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface Token {
    function transfer(address to, uint tokens) external returns (bool success);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool) ;
      function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    }

contract BurroStaking
    {
       
        address  public owner;

        address Staking_token = 0xd562bEA1e3ca6236e3c2626b5E1499f44E9002b7; 

        uint public totalusers;
        mapping(address=>uint) public trasactionCount;

        // uint public per_day_divider= 1 days;
        uint public per_day_divider= 1 minutes;
        uint public minimum_investment=10*10**18;

        mapping(address=>bool) public isUser;

        uint public totalbusiness; 
        mapping(uint=>address) public All_investors;

        struct allInvestments{

            uint investedAmount;
            uint withdrawnTime;
            uint DepositTime;
            uint investmentNum;
            uint unstakeTime;
            bool unstake;
            uint reward;
            uint pending_rew;
            uint apr;
            uint timeframe;


        }



        struct Data{

            mapping(uint=>allInvestments) investment;
            uint noOfInvestment;
            uint totalInvestment;
            uint totalWithdraw_reward;
            bool investBefore;
        }


        struct time_Apy
        {
            uint timeframe;
            uint APR;
        }


        mapping(address=>Data) public user;
        mapping(uint=>time_Apy) public details;

        mapping(address=>mapping(uint=>allInvestments)) public user_investments;

        constructor(){
            
            owner=msg.sender;              

            // details[0].timeframe=1*30 days;
            // details[1].timeframe=2*60 days;
            // details[2].timeframe=3*90 days;

            details[0].timeframe=1*30 minutes;
            details[1].timeframe=2*60 minutes;
            details[2].timeframe=3*90 minutes;


            details[0].APR=100;
            details[1].APR=250;
            details[2].APR=425;




        }

        function Stake(uint _investedamount,uint choose_val,address _ref) external returns(bool success)
        {
            require(details[choose_val].APR > 0," apr iss");
            require(_investedamount > 0,"value is not greater than 0");     

            require(Token(Staking_token).allowance(msg.sender,address(this))>=_investedamount,"allowance");
            

            if(user[msg.sender].investBefore == false)
            { 
                All_investors[totalusers]=msg.sender;
                isUser[msg.sender]=true;

                totalusers++;                                     
            }


            uint num = user[msg.sender].noOfInvestment;
            user[msg.sender].investment[num].investedAmount =_investedamount;
            user[msg.sender].investment[num].DepositTime=block.timestamp;
            user[msg.sender].investment[num].withdrawnTime=block.timestamp + details[choose_val].timeframe ;  
            
            user[msg.sender].investment[num].investmentNum=num;
            user[msg.sender].investment[num].apr=details[choose_val].APR;
             user[msg.sender].investment[num].timeframe=(details[choose_val].timeframe/per_day_divider) ;  


            user[msg.sender].totalInvestment+=_investedamount;
            user[msg.sender].noOfInvestment++;
            totalbusiness+=_investedamount;



            Token(Staking_token).transferFrom(msg.sender,address(this),_investedamount);
            user_investments[msg.sender][num] = user[msg.sender].investment[num];



            return true;
            
        }

       function get_TotalReward() view public returns(uint){ 
            uint totalReward;
            uint depTime;
            uint rew;
            uint temp = user[msg.sender].noOfInvestment;
            for( uint i = 0;i < temp;i++)
            {   
                if(!user[msg.sender].investment[i].unstake)
                {
                    if(block.timestamp < user[msg.sender].investment[i].withdrawnTime)
                    {
                        depTime =block.timestamp - user[msg.sender].investment[i].DepositTime;
                    }
                    else
                    {    
                        depTime =user[msg.sender].investment[i].withdrawnTime - user[msg.sender].investment[i].DepositTime;
                    }                
                }
                else{
                    depTime =user[msg.sender].investment[i].unstakeTime - user[msg.sender].investment[i].DepositTime;
                }
                depTime=depTime/per_day_divider; //1 day
                if(depTime>0)
                {
                     rew  =  (((user[msg.sender].investment[i].investedAmount * ((user[msg.sender].investment[i].apr) *10**18) )/ (100*10**18) )/(user[msg.sender].investment[i].timeframe));


                    totalReward += depTime * rew;
                }
            }
            totalReward -= user[msg.sender].totalWithdraw_reward;

            return totalReward;
        }

        function getReward_perInv(uint i, address userAddress) view public returns(uint){ 
            uint totalReward;
            uint depTime;
            uint rew;

                if(!user[userAddress].investment[i].unstake)
                {
                    if(block.timestamp < user[userAddress].investment[i].withdrawnTime)
                    {
                        if(block.timestamp < user[userAddress].investment[i].withdrawnTime)
                        {
                            depTime =block.timestamp - user[userAddress].investment[i].DepositTime;
                        }
                        else
                        {    
                            depTime =user[userAddress].investment[i].withdrawnTime - user[userAddress].investment[i].DepositTime;
                        }                        
                    }
                    else
                    {    
                        depTime =user[userAddress].investment[i].withdrawnTime - user[userAddress].investment[i].DepositTime;
                    }     
                }
                else
                {
                    depTime =user[userAddress].investment[i].unstakeTime - user[userAddress].investment[i].DepositTime;
                }
                depTime=depTime/per_day_divider; //1 day
                if(depTime>0)
                {
                     rew  =  (((user[userAddress].investment[i].investedAmount * ((user[userAddress].investment[i].apr) *10**18) )/ (100*10**18) )/(user[userAddress].investment[i].timeframe));


                    totalReward += depTime * rew;
                }
            

            return totalReward;
        }

        function get_totalEarning(address add) public view returns(uint) {   

            return ( get_TotalReward());

        }


        function withdrawReward(uint num,address userAddress) internal returns (bool success)
        {
            uint Total_reward = getReward_perInv(num, userAddress);
            require(Total_reward>0,"you dont have rewards to withdrawn");         
            
            Token(Staking_token).transfer(userAddress,Total_reward); 

                         
            user[userAddress].totalWithdraw_reward+=Total_reward;

            return true;

        }


        function unStake(uint num) external  returns (bool success)
        {

            require(user[msg.sender].investment[num].investedAmount>0,"you dont have investment to withdrawn");            
            require(!user[msg.sender].investment[num].unstake ,"you have withdrawn");
            uint amount=user[msg.sender].investment[num].investedAmount;


            if(user[msg.sender].investment[num].withdrawnTime > block.timestamp)
            {
                uint penalty_fee=(amount*(10*10**18))/(100*10**18);
                Token(Staking_token).transfer(owner,penalty_fee);            
                amount=amount-penalty_fee;
            }
            Token(Staking_token).transfer(msg.sender,amount);             
            withdrawReward(num, msg.sender);
            user[msg.sender].investment[num].unstake =true;    
            user[msg.sender].investment[num].unstakeTime =block.timestamp;    

            user[msg.sender].totalInvestment-=user[msg.sender].investment[num].investedAmount;
            user_investments[msg.sender][num] = user[msg.sender].investment[num];

            return true;

        }

        function getTotalInvestment() public view returns(uint) {   
            
            return user[msg.sender].totalInvestment;

        }

        function getAll_investments() public view returns (allInvestments[] memory Invested)
        { 
            uint num = user[msg.sender].noOfInvestment;
            uint temp;
            uint currentIndex;
            
            for(uint i=0;i<num;i++)
            {
               if(!user[msg.sender].investment[i].unstake )
               {
                   temp++;
               }

            }
         
           allInvestments[] memory temp_arr =  new allInvestments[](temp) ;
            Invested =  new allInvestments[](temp) ;

            for(uint i=0;i<num;i++)
            {
               if( !user[msg.sender].investment[i].unstake ){

                   temp_arr[currentIndex]=user[msg.sender].investment[i];
                    temp_arr[currentIndex].reward=getReward_perInv(i,msg.sender);
                    temp_arr[currentIndex].pending_rew=get_pending_Rew(msg.sender,i);

                   currentIndex++;
               }

            }

            uint count=temp;
            for(uint i=0;i<temp;i++)
            {
                count--;
                Invested[i]=temp_arr[count];

            }

            return Invested;

        }


 
        function get_pending_Rew(address add, uint num) public view returns(uint)
        {  
            return (user[add].investment[num].investedAmount * (user[add].investment[num].apr * 1 ether)/ 100 ether) - (getReward_perInv(num,add));
        }

        
  
        function transferOwnership(address _owner)  public
        {
            require(msg.sender==owner,"only Owner can call this function");
            owner = _owner;
        }


        function get_currTime() public view returns(uint)
        {
            return block.timestamp;
        }
        
        function get_withdrawnTime(uint num) public view returns(uint)
        {
            return user[msg.sender].investment[num].withdrawnTime;
        }

    } 