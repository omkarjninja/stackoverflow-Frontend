import { useState, useEffect } from "react";
import "./weather.css";
function Weather(props) {
 
  const body = document.body; // Get the body element
  const date = new Date();
  const hour = date.getHours();
  const lati = props.latitude;
  const longi = props.longitude;
  const API_KEY = "f94e29a28c6701444dd46bf288788198"; // Replace with your actual API key
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [boxclass, setBoxclass] = useState("hidden");
  const [btnclass, setbtnclass] = useState("");
  const [usedate, setDate] = useState(new Date());
  const [climate, setClimate] = useState("yo");
  var time = new Date();
  var timeonly =
    time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
  //   console.log(timeonly);
  //   let date = usedate.toLocaleDateString("default", { weekday: "long" });
  //   let day = usedate.toLocaleDateString("default", { day: "numeric" });
  //   let Month = usedate.toLocaleDateString("default", { month: "long" });
  //   let year = usedate.toLocaleDateString("defauly", { year: "2-digit" });
  // if (hour < 6) {
  //   body.style.backgroundColor = "black";
  // } else if (hour < 12) {
  //   body.style.backgroundColor = "yellow";
  // } else {
  //   body.style.backgroundColor = "orange";
  // }
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 6) {
      body.style.backgroundColor = "#F0E3FF";
    } else if (hour < 12) {
      body.style.backgroundColor = "#E6FFFD";
    } else {
      body.style.backgroundColor = "#F8EDE3";
    }
  }, []);
  
  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    }
  };
  //   const check = () => {
  //     if (time.getHours() < 6) {
  //       setClimate("sunny_bg");
  //     } else {
  //       setClimate("night_bg");
  //     }
  //   };
  const weathershow = (e) => {
    e.preventDefault();
    fetchWeatherData();
    if (time.getHours() < 6) {
      // alert("hello");
      setClimate("yos");
    } else if (hour < 12) {
      setClimate("hey");
    } else {
      setClimate("yo");
    }
    // setBoxclass("");
    // setbtnclass("hidden");
    // setName(weatherData.name)
    // setTemp(weatherData.main.temp);
    // if (time.getHours() < 6) {
    //   setClimate("sunny_bg");
    // }
  };

  return (
    <>
      <h1 style={{ fontSize: "4rem" }}>{props.lat}</h1>
      <h1 style={{ fontSize: "4rem" }}>{props.log}</h1>
      <>
        <div className="xyz">
          <center>
            <button className="btn-weather" onClick={weathershow}>
              Click here to Get Weather
            </button>
          </center>

          {/* background-image: url('https://images.unsplash.com/photo-1559963110-71b394e7494d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80') */}
          {weatherData && (
            <div className={`container ${climate}`}>
              <div className={``}>
                <div
                  className="w-full lg:w-1/2 flex rounded-lg bg-auto"
                  // style={{
                  //   backgroundImage:
                  //     "url('https://images.unsplash.com/photo-1559963110-71b394e7494d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80')",
                  // }}
                >
                  <div className="rounded-lg py-6 pl-8 pr-32 w-full bg-blue-400 opacity-90 text-white">
                    <div className="text_container">
                      <p className="place">
                        {weatherData.name}, {weatherData.sys.country}
                      </p>
                    </div>
                    <div>
                      <strong className="degrees">
                        {weatherData.main.temp}°C
                      </strong>
                      <br></br>
                      <b className="weather">
                        {weatherData.weather[0].description}
                      </b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    </>
  );
}
export default Weather;
