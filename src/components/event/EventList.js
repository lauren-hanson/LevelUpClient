import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { getEvents } from "../../managers/EventManager.js"
// import { getGames } from "../../managers/GameManager.js"
import "./Event.css"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    // const [ games, setGames ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
        // getGames().then(data => setGames(data))
    }, [])

    return (
        <>
        <button className="btn btn-2 btn-sep icon-create"
        onClick={() => {
            navigate({ pathname: "/events/new" })
            }}
        >Register New Event</button>
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__title">{event.description}</div>
                        <div className="event__players">Date: {event.date}</div>
                        <div className="event__skillLevel">Time: {event.time}</div>
                        <div className="event__gamel">Game: {event?.game?.title}</div>
                        
                        <button onClick={() => {
                            navigate({ pathname: `/events/${event.id}` })
                        }}
                        >Edit</button>
                    </section>
                    
                })
            }
        </article>
        </>
    )
}