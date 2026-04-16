import { useEffect, useState } from 'react';
import { FaCloudSun } from 'react-icons/fa';

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=36.31&lon=74.64&units=metric&appid=bd5e378503939ddaee76f12ad7a97608`
        );
        
        if (response.ok) {
          const data = await response.json();
          // Check karein ke data mein 'main' property maujood hai
          if (data && data.main) {
            setWeather(data);
          }
        } else {
          console.error("Weather API Error Status:", response.status);
        }
      } catch (err) {
        console.error("Weather Network Error:", err);
      }
    };

    fetchWeather();
  }, []);

  // AGAR DATA NAHI HAI TO KUCH BHI SHOW NA KARO (Is se crash nahi hoga)
  if (!weather || !weather.main) {
    return null; 
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1 border-l border-gold/20 ml-4 hidden lg:flex">
      <FaCloudSun className="text-gold opacity-80" size={14} />
      <span className="font-jost text-[0.6rem] tracking-[0.1em] uppercase text-gold-light">
        {/* Optional chaining (?.) use ki hai mazeed safety ke liye */}
        Hunza {Math.round(weather?.main?.temp)}°C
      </span>
    </div>
  );
}