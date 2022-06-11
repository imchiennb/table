import { useState, useEffect } from "react";

export const useTable = ({ now }: { now: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((value) => value + 1);
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return {
    count,
    now,
  };
};
