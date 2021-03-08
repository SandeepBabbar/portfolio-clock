import axios from 'axios'

export const getQuote= async ()=>{
    try{
        let response = await axios.get("http://api.quotable.io/random")
        return response.data
    }
    catch(error){
        throw error
    }
}
export const getTime= async ()=>{
    try{
        let response = await axios.get("http://worldtimeapi.org/api/ip")
        return response.data
    }
    catch(error){
        throw error
    }
}
export const getLocation = async ()=>{
    try{
        let response = await axios.get("https://freegeoip.app/json/")
        return response.data
    }
    catch(error){
        throw error
    }
}