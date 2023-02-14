import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { getEvents, deleteEvent, leaveEvent, joinEvent } from "../../managers/EventManager.js"
// import { getGames } from "../../managers/GameManager.js"
import "./Event.css"

export const EventList = (props) => {
    const [events, setEvents] = useState([])
    // const [refresh, setRefresh] = useState(true)
    // const [ games, setGames ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    // const handleDeleteButton = (id) => {
    //     deleteEvent(id)
    //         // .then(setRefresh(!refresh))
    // }

    return (
        <>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/events/new" })
                }}
            >Schedule New Event</button>
            <article className="events">
                {
                    events.map(event => {
                        return <section key={`event--${event.id}`} className="event">
                            <div className="event__title">{event.description}</div>
                            <div className="event__players">Date: {event.date}</div>
                            <div className="event__skillLevel">Time: {event.time}</div>
                            <div className="event__gamel">Game: {event?.game?.title}</div>
                            {
                            event.joined ?
                                <button className="leaveButton" onClick={() => { 
                                    leaveEvent(event.id)
                                    .then(data => setEvents(data))
                                }}>Leave</button>
                                :
                                <button className="joinButton" onClick={() => { 
                                    joinEvent(event.id)
                                        .then(data => setEvents(data))}}>Join</button>
                            }
                            {/* <div className="buttonContainer">
                            <button className="editButton" onClick={() => {
                                navigate({ pathname: `/events/${event.id}` })
                            }}
                            >Edit</button>
                            <button className="deleteButton" onClick={() => {
                                        { handleDeleteButton(event.id) }
                                        navigate({ pathname: `/events` })
                                        
                                    }}
                                    >Delete</button>
                        </div> */}
                        </section>
                    })
                }
            </article>
        </>
    )
}