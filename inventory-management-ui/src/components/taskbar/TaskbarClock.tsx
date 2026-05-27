import { useState, useEffect } from "react";

export const TaskbarClock = () => {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="border-3d-inset bg-win98-bg px-2 py-0.5 uppercase text-win98-text">
      {time}
    </div>
  );
};
