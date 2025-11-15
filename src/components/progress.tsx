import { useEffect, useState } from "react";
import { Progress } from "./ui/progress";

const AnimatedProgress: React.FC<{ duration: number}> = ({ duration }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(0);
    const intervalMs = 20; // update every 20ms
    const increment = 100 / (duration / intervalMs);

    const timer = setInterval(() => {
      setValue((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [duration]);

  return <Progress value={value} className="w-64"/>;
};

export default AnimatedProgress;
