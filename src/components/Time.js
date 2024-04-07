import React, { useState, useEffect } from "react";

const Timer = ({time}) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const dateInHuman = new Date("2023-07-26"); 
      const formattedDate = dateInHuman.toISOString();
    //   const targetDate = new Date(formattedDate);

      const now = new Date().getTime();
      const distance = (time*1000) - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown({
          days,
          hours,
          minutes,
          seconds,
        });
      } else {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    };

    const timer = setInterval(calculateCountdown, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [time]);

  return (
 <div className='flex justify-end'>
    <ul className='flex gap-2 mt-5 flex-wrap'>
    <li className='flex items-center'><div className='p-0.5 bg-custom-green font-zendots text-black mr-1 w-9 sm:w-7 sm:text-xs'>{countdown.days}</div><div className='text-xs sm:text-[10px]'>Days</div></li>
        <li className='flex items-center'><div className='p-0.5 bg-custom-green font-zendots text-black mr-1 w-9 sm:w-7 sm:text-xs'>{countdown.hours}</div><div className='text-xs sm:text-[10px]'>Hours</div></li>
        <li className='flex items-center'><div className='p-0.5 bg-custom-green font-zendots text-black mr-1 w-9 sm:w-7 sm:text-xs'>{countdown.minutes}</div><div className='text-xs sm:text-[10px]'>Minutes</div></li>
        <li className='flex items-center'><div className='p-0.5 bg-custom-green font-zendots text-black mr-1 w-9 sm:w-7 sm:text-xs'>{countdown.seconds}</div><div className='text-xs sm:text-[10px]'>seconds</div></li>
    </ul>
  </div> 
  );
};

export default Timer;
