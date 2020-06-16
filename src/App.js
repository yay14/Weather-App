import React from 'react';
import Axios from 'axios';
import './App.css';
import WeatherApp from './components/WeatherApp.js'
import Navbar from './components/Navbar.js'
//b5bc82bd4f141b558a8868cb0d7f900e
class App extends React.Component{
  state = {
    coords: {
      latitude: 45,
      longitude: 45
    },
    data: {

    },
    inputData:{

    }

  }
  componentDidMount(){
    //getting device location
    if(navigator.geolocation){
      console.log("supported");
      navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
      })
      navigator.geolocation.getCurrentPosition((position) => {
        let newCoords = {
          latitude: position.coords.latitude,
          longitude:position.coords.longitude
        }
        this.setState({coords:newCoords});
        Axios.get(`http://api.weatherstack.com/current?access_key=52d4a3bdc3c72350c94576eaaba11d7d&query=${this.state.coords.latitude},${this.state.coords.longitude}`).then(res=>{
          console.log(res);
          let WeatherData = {
            temperature:res.data.current.temperature,
            location:res.data.location.name,
            country:res.data.location.country,
            region:res.data.location.region,
            //time:res.data.location.localtime,
            wind_speed: res.data.current.wind_speed,
            //wind_dir:res.data.current.wind_dir,
            pressure:res.data.current.pressure,
            precip:res.data.current.precip,
            humidity:res.data.current.humidity,
            //feelslike:res.data.current.feelslike,
            //cloudcover:res.data.current.cloudcover,
            //visibility:res.data.current.visibility,
            description:res.data.current.weather_descriptions[0],
            img:res.data.current.weather_icons              
          }
          this.setState({data: WeatherData});
        })
      });
    }
    else{
      console.log("not supported")
    }
  }
  change=(value)=>{
    this.setState({inputData:value});
  }
  changeWeather=(event)=>{
    event.preventDefault();
    Axios.get(`http://api.weatherstack.com/current?access_key=52d4a3bdc3c72350c94576eaaba11d7d&query=${this.state.inputData}`).then(res=>{
      console.log(this.state.inputData);  
      let WeatherData = {
          temperature:res.data.current.temperature,
          location:res.data.location.name,
          country:res.data.location.country,
          region:res.data.location.region,
          //time:res.data.location.localtime,
          wind_speed: res.data.current.wind_speed,
          //wind_dir:res.data.current.wind_dir,
          pressure:res.data.current.pressure,
          precip:res.data.current.precip,
          humidity:res.data.current.humidity,
          //feelslike:res.data.current.feelslike,
          //cloudcover:res.data.current.cloudcover,
          ///visibility:res.data.current.visibility,
          description:res.data.current.weather_descriptions[0],
          img:res.data.current.weather_icons              
        }
        this.setState({data: WeatherData});
    })
  }
  render(){
    return (
      <div className="App">
        <div className="container">
          <Navbar changeWeather={this.changeWeather} changeRegion={this.change}/>
          <WeatherApp weatherdata={this.state.data}/>
        </div>
      </div>
    );
  }
}

export default App;
/*
weather_descriptions: ["Partly cloudy"]
wind_speed: 14
wind_degree: 330
wind_dir: "NNW"
pressure: 1004
precip: 0
humidity: 19
cloudcover: 14
feelslike: 37
uv_index: 1
visibility: 10
*/