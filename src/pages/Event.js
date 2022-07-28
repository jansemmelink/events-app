import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

const Event = (props) => {
    const [eventInfo, setEventInfo] = useState({})
    const p = useParams();
    const eventId = p.id
    console.log("Event ID: " + eventId);

    //load event details
    const loadEvent = async () => {
        const response = await fetch(
            'http://localhost:12345/event/'+eventId,
            {
                method: "get",
                headers: {
                    "Accept": "application/json",
                }
            })
        const data = await response.json();
        console.log("eventInfo: " + data);
        setEventInfo(data);
    }

    loadEvent().catch((error)=>{
        document.getElementById("info").innerHTML = "error: "+error;
    })
    useEffect(()=>{}, [eventInfo])

    return (<>
    <h1>Event</h1>
    <p id="info">{eventId}</p>
    <p>{eventInfo.name}</p>
    <p>{eventInfo.date}</p>
    </>)
    ;
};
  
export default Event;