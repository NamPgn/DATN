import { useEffect, useState } from "react";

const CountdownTimer = ({ expiredAt }: any) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now: any = new Date();
      const expiryDate: any = new Date(expiredAt);
      const difference = expiryDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiredAt]);

  return (
    <div>
      <p>
        Thời gian thanh toán còn lại:{" "}
        {timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}:
        {timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}:
        {timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}
      </p>
    </div>
  );
};

export default CountdownTimer;
