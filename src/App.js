import React from 'react'
import './App.css';
import Daytime from './assets/desktop/bg-image-daytime.jpg'
import DaytimeTablet from './assets/tablet/bg-image-daytime.jpg'
import DaytimePhone from './assets/mobile/bg-image-daytime.jpg'
import Night from './assets/desktop/bg-image-nighttime.jpg'
import NightTablet from './assets/tablet/bg-image-nighttime.jpg'
import NightPhone from './assets/mobile/bg-image-nighttime.jpg'
import {getQuote, getTime, getLocation} from './requests'
import moment from 'moment'
import Sun from './assets/desktop/icon-sun.svg'
import Moon from './assets/desktop/icon-moon.svg'
import Arrow from './assets/desktop/icon-arrow-up.svg'

class App extends React.Component{
  state={
    quote:"",
    author:"",
    morning:"",
    date:"",
    timezone:"",
    city:"",
    country:"",
    more: false,
    time:""

  }
  handleToggle=()=>{
    this.setState({
      more: !this.state.more
    })
  }
  async componentDidMount(){
    try{
      let quote = await getQuote()
      let time = await getTime()
      let location = await getLocation()
      let date= moment(time.datetime)
      this.setState({
        quote:quote.content,
        author: quote.author,
        morning: date.hour() < 16? true: false ,
        date: date,
        timezone: time.abbreviation,
        city: location.city,
        country: location.country_name,
        time: time
      })
    }
    catch(error){
      console.log(error)
    }
  }
  render(){
    console.log(this.state.time)
    return(
      <div className="app daytime" 
        style={{
          height: this.state.more?"auto":"100vh"}}>
        <div className="background">
          {this.state.morning?
            <picture>
              <source media="(max-width: 970px)" srcset={DaytimePhone}/>
              <source media="(max-width: 1200px)" srcset={DaytimeTablet}/>
              <img src={Daytime}/>
          </picture>
          :
          <picture>
              <source media="(max-width: 970px)" srcset={NightPhone}/>
              <source media="(max-width: 1200px)" srcset={NightTablet}/>              
              <img src={Night}/>
          </picture>
          }
        </div>
        {this.state.date && 
          <div className="content">
            {!this.state.more &&
              <div className="header">
                <p className="quote">{`"${this.state.quote}"`}</p>
                <p className="author">{this.state.author}</p>
              </div>
            }
            <div className="bottom"
              style={{
                marginBottom: this.state.more?"0px":"98px"
              }}
            >
              <div className="time">
                <div>
                  {this.state.morning
                    ?
                      <div className="greeting">
                        <img src={Sun}/> 
                        <p>GOOD MORNING, IT'S CURRENTLY</p>
                      </div>
                    :
                      <div className="greeting">
                        <img src={Moon}/>
                        <p> GOOD EVENING, IT'S CURRENTLY</p>
                      </div>
                  }
                  
                </div>
                <div className="time-wrapper">
                  <h1>{this.state.date.format("hh:mm")}</h1>
                  <div className="timezone">{this.state.timezone}</div>
                </div>
                <p className="location">
                    {`In ${this.state.city}, ${this.state.country}`}
                </p>
              </div>
              <div className="toggle"
                onClick={this.handleToggle}
              >
                <p>{this.state.more?"LESS":"MORE"}</p>
                <img src={Arrow} style={{transform: this.state.more?"rotate(0deg)":"rotate(180deg)"}}/>
              </div>
            </div>
            {this.state.more && 
              <div className={["details", this.state.morning?"day":"night"].join(" ")}>
                <div className="segment">
                  <div className="box">
                      <p className="label">CURRENT TIMEZONE</p>
                      <p className="value">{this.state.time.timezone}</p>
                  </div>
                  <div className="box">
                      <p className="label">DAY OF THE YEAR</p>
                      <p className="value">{this.state.time.day_of_year}</p>
                  </div>
                </div>
                <div className="segment2">
                  <div className="box">
                      <p className="label">DAY OF THE WEEK</p>
                      <p className="value">{this.state.time.day_of_week}</p>
                  </div>
                  <div className="box">
                      <p className="label">WEEK NUMBER</p>
                      <p className="value">{this.state.time.week_number}</p>
                  </div>
                </div>
              </div>    
            }
          </div>
        }
      </div>
    )
  }
}

export default App;
