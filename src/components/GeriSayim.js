import React, {useState,useEffect,useRef} from 'react'
import moment from 'moment'
import { makeStyles, StylesProvider } from '@mui/styles';

const useStyles=makeStyles((theme)=>({
    counter:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        color: "#fff",
        fontSize:"22px",
        border:"1px solid #fff",
        borderRadius:"5px",
        background:"rgba(0,0,0,0.5)"

    }
}))

const GeriSayim=()=>{
    const classes=useStyles();
    const [date,setDate]=useState(()=>{
        const localDate=localStorage.getItem("date")
        return localDate
        ? moment(JSON.parse(localDate))
        : moment().add(10, "hours");
    })

    const [hours,setHours]=useState("00")
    const [minutes,setMinutes]=useState("00")
    const [seconds,setSeconds]=useState("00")

    let interval=useRef();

    useEffect(()=>{
        gerisayimiBaslat();

        return clearInterval(interval.current)
    },[date])

    const gerisayimiBaslat=()=>{
        interval=setInterval(()=>{
            localStorage.setItem("date",JSON.stringify(date))

            const now=moment();
            const distance=date-now;

            const hours=moment.duration(distance).hours();
            const minutes=moment.duration(distance).minutes();
            const seconds=moment.duration(distance).seconds();

            if(distance < 0){
                clearInterval(interval)
            }else{
                setHours(hours);
                setMinutes(minutes);
                setSeconds(seconds);
            }
        },1000)
    }

    return ( 
        <div className={classes.counter}>
            <div>
                <p>{hours}</p>
                <p><small>Saat</small></p>
            </div>
            <div>
                <p>{minutes}</p>
                <p><small>Dakika</small></p>
            </div>
            <div>
                <p>{seconds}</p>
                <p><small>Saniye</small></p>
            </div>
        </div>
    );
}
export default GeriSayim;