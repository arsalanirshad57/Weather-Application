import "./App.css"
import axios from 'axios'
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import clear from "./images/clear.png"
import cloud from "./images/cloud.png";
import drizzle from "./images/drizzle.png";
import snow from "./images/snow.png";
import city from "./images/city.jpg";
import rain from "./images/rain.png"
import fall from "./images/snow.png"
import haze3 from "./images/haze3.png"


const DisplayData = () => {

  const [wicon, setWicon] = useState(clear);
  const [errMsg, setErrMsg] = useState(null);
  const [data,setData] = useState({})

  async function apisearch() {
    // setErrMsg(null)
    try {
      const element = document.getElementsByClassName("input")
      if (element[0].value === "") {
        setErrMsg("please enter somethings")
        return
      }

      const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=bdb1e0972aec92cea35b625a6c4304c5`)
      const Api = await data.json()
      setData(Api)


      if (Api.weather[0].icon === '01d' || Api.weather[0].icon === '01n') {
        setWicon(clear);
      }
      else if (Api.weather[0].icon === '02d' || Api.weather[0].icon === '02n') {
        setWicon(cloud);
      }
      else if (Api.weather[0].icon === '03d' || Api.weather[0].icon === '03n') {
        setWicon(cloud);
      }
      else if (Api.weather[0].icon === '04d' || Api.weather[0].icon === '04n') {
        setWicon(drizzle);
      }
      else if (Api.weather[0].icon === '09d' || Api.weather[0].icon === '09n') {
        setWicon(rain);
      }
      else if (Api.weather[0].icon === '10d' || Api.weather[0].icon === '10n') {
        setWicon(rain);
      }
      else if (Api.weather[0].icon === '13d' || Api.weather[0].icon === '13n') {
        setWicon(fall);
      }
      else if (Api.weather[0].icon === '50d' || Api.weather[0].icon === '50n') {
        setWicon(haze3);
      }



    } catch (err) {

      setErrMsg('field to fetch city info')
    }
  }
  const search = () => {
    apisearch()
  }
  return (
    <>

      <div className='container'>
        <div className='left '>
          <div className="Maintemp_div">
            <p className='Maintemp '>{`${Math.floor(data?.main?.temp || 0)}°C`}</p>
          </div>
        </div>

        <div className='rigth'>
          <div className='icon_div'>
            <img src={wicon} className='weather_icon' />
          </div>
          <div className="comp_data">
            <div className="weather_type">
              <h1 className='head main'>{ data?.weather? data?.weather[0]?.main :null 
            || "Weather"}</h1>
            </div>
            <br />
            <div className='search_box'>
              <input type="text" className='input' placeholder='Seacrh' />
              <CiSearch className='search_icon' onClick={() => { search() }} />
            </div>
          {errMsg ? <p className="error">{errMsg}</p> : null}

            <h2 className='subhead City'>{`${data?.name || ""} ${data?.sys?.country || "New York, US"} `}</h2>
            <div className="data">
              <div className="flex">
                <h3>Temperature</h3>
                <h4 className='subtemp temperature'>{` ${Math.floor(data?.main?.temp || 0)} °C `}</h4>
              </div>

              <div className="flex flex2">
                <h3 className=''>Humidity</h3>
                <h4 className='humidity'>{`${(data?.main?.humidity || 0)} °C `}</h4>
              </div>

              <div className="flex flex2">
                <h3 className=''>Visibility</h3>
                <h4 className='visibility'>{`${(data?.visibility || 0 )} mi`}</h4>
              </div>

              <div className="flex flex-end ">
                <h3 className="wind_flex">Wind Speed</h3>
                <h4 className='wind_speed'>{`${Math.floor(data?.wind?.speed || 0)}  Km/h `}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default DisplayData
