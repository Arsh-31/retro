"use client";
import { useEffect, useState } from "react";

function Time() {
  const date = new Date()
    .toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
    .replace(",", " ");

  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="font-medium">
      {date} {time}
    </div>
  );
}

export default Time;
