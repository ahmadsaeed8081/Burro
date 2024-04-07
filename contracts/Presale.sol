//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface TOKEN{
    function transfer(address to, uint tokens) external returns (bool success);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool) ;
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    }
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract Burro_Presale
    {


        struct Presale_stages{

            uint price;
            uint endTime;
            uint supply;
            uint min_purchase;
            uint total_sold;

        }

        mapping(uint=>Presale_stages) public presale;

        address payable public owner;
        uint public total_soldSupply;
        uint public total_stages=10;
        uint public BurroInDollar= 0.0001 ether;




        uint public min_amount=1;

        address public USDT_token=0x1092fd852C82983F54Fb56aa71ADd5BCaAB6Ff4a;
        address public BURRO_token=0x1092fd852C82983F54Fb56aa71ADd5BCaAB6Ff4a;
        uint[10] price_arr=[0.00025 ether, 0.000560 ether, 0.000900 ether, 0.001248 ether, 0.001584 ether, 0.00192 ether, 0.002256 ether, 0.002592 ether, 0.002800 ether, 0.003200 ether];
        uint[10] supply_arr=[1600000000 ether, 857142857 ether, 577777777 ether, 448717948 ether, 391414141 ether, 354366667 ether, 354609929 ether, 385802469 ether, 428571428 ether, 437500000 ether];
        uint[10] minPurchase_arr=[100 ether, 100 ether, 100 ether, 100 ether, 100 ether, 100 ether, 100 ether, 100 ether, 100 ether, 100 ether];

        AggregatorV3Interface internal priceFeed;

        constructor()
        {
            owner=payable(msg.sender);
            priceFeed = AggregatorV3Interface(0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada); //Mainnet
            
            for(uint i=0;i<10;i++)
            {
                presale[i].price = price_arr[i];
                presale[i].supply = supply_arr[i];
                presale[i].min_purchase = minPurchase_arr[i];
                presale[i].endTime = block.timestamp + ( 7 days * (i+1));

            }
            
        }
        


        function getLatestPrice() public view returns (int) {
            // prettier-ignore
            (
                /* uint80 roundID */,
                int price,
                /*uint startedAt*/,
                /*uint timeStamp*/,
                /*uint80 answeredInRound*/
            ) = priceFeed.latestRoundData();
            return price*10**10;
            }






        function getConversionRate(int dollar_amount) public view returns (int) {

            int MaticPrice = getLatestPrice();
            int UsdToMatic = (( dollar_amount *10**18 ) / (MaticPrice));

            return UsdToMatic;

        }


        function get_curr_Stage()  public view returns(uint ){
            uint curr_stage=9;

            for(uint i=0;i<total_stages;i++)
            {
               if( block.timestamp <= presale[i].endTime )
               {
                    curr_stage=i;
                    i=total_stages;
               }
            }
        }


        function get_curr_StageTime()  public view returns(uint ){
            uint curr_stageTime=9;

            for(uint i=0;i<total_stages;i++)
            {
               if( block.timestamp <= presale[i].endTime )
               {
                    curr_stageTime = presale[i].endTime;
                    i=total_stages;
               }
            }
        }


        function get_MaticPrice()  public view returns(uint ){
            uint price;
            uint curr_stage=get_curr_Stage();
            price = uint256(getConversionRate( int256(presale[curr_stage].price)));

            return price;


        }



        function buy_token(uint amount , uint choosed_token )  public payable returns(bool){
            
            require(choosed_token >=0 && choosed_token <2);
            uint curr_stage=get_curr_Stage();
            require(amount >= presale[curr_stage].min_purchase);


            if(choosed_token==0)             // MATIC
            {
                require(msg.value >= (get_MaticPrice() * amount)/10**18,"not enough MATIC");
                require(TOKEN(BURRO_token).balanceOf(address(this)) > amount);
                
                presale[curr_stage].total_sold+=amount;
                total_soldSupply+=amount;
                TOKEN(BURRO_token).transfer(msg.sender,amount);
                owner.transfer(msg.value);     



            }
            else if(choosed_token==1)        // USDT
            {

                require(TOKEN(USDT_token).balanceOf(msg.sender) >= (((presale[curr_stage].price * amount)/10**18)/10**12),"not enough usdt");
                require(TOKEN(USDT_token).allowance(msg.sender,address(this))>=(((presale[curr_stage].price * amount)/10**18)/10**12),"less allowance");    //uncomment

                require(TOKEN(BURRO_token).balanceOf(address(this))>amount,"contract have less tokens");
                
                presale[curr_stage].total_sold+=amount;
                total_soldSupply+=amount;


                TOKEN(USDT_token).transferFrom(msg.sender,owner,(((presale[curr_stage].price * amount)/10**18)/10**12));
                TOKEN(BURRO_token).transfer(msg.sender,amount);

            }



            return true;
        }

        function transferOwnership(address _owner)  public
        {
            require(msg.sender==owner);
            owner = payable(_owner);
        }


        function update_currPhase_price(uint _price)  public
        {
            require(msg.sender==owner);
            uint curr_stage=get_curr_Stage();
            presale[curr_stage].price=_price;
        }

        function increase_currPhase_time(uint _days)  public
        {
            require(msg.sender==owner);
            uint curr_stage=get_curr_Stage();
            for(uint i=curr_stage;i<total_stages;i++)
            {
                presale[i].endTime += ( _days * 1 days);
            }
        }

        function curr_time() public view returns(uint){

            return block.timestamp;

        }
        function calc() public pure returns(uint){

            return  (0.1 ether * 10000000000000000000000 /10**18)/10**12;

        }

       function withdraw_Burro(uint _amount)  public
        {
            require(msg.sender==owner);
            uint bal = TOKEN(BURRO_token).balanceOf(address(this));
            require(bal>=_amount);
            TOKEN(BURRO_token).transfer(owner,_amount); 
        }












    }