import "./time.css";
import { useEffect, useState } from "react";

export default function Time() {
  const [currentDayName, setCurrentDayName] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();

      // Get the day name (e.g., "Monday")
      const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
      setCurrentDayName(dayName);

      // Get the date in the format "day number - month - year" (e.g., "14 - October - 2024")
      const options = { day: "numeric", month: "long", year: "numeric" };
      const formattedDate = now
        .toLocaleDateString("en-US", options)
        .replace(/, /g, " - ");
      setCurrentDate(formattedDate);

      // Get the time with AM/PM
      const optionsTime = {
        hour: "numeric",
        minute: "numeric",
        // second: "numeric",
        hour12: true,
      };
      const formattedTime = now.toLocaleTimeString("en-US", optionsTime);
      setCurrentTime(formattedTime);
    }, 1000); // Update every second

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="time" data-aos="fade-right">
      <div className="day-name">
        <h2 className="current-day">
          {currentDayName} <br /> {currentDate}
        </h2>
      </div>
      <h2 className="hour">{currentTime}</h2>
    </section>
  );
}
