import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createEvent } from '../../managers/EventManager.js'
import { getGames } from "../../managers/GameManager.js"
import "./Event.css"


export const EventForm = () => {
    const navigate = useNavigate()
    const [event, setEvents] = useState([])
    const [games, setGames] = useState([])
    const [newEvent, setNewEvent] = useState({
        description: "", 
        date: "",
        time: "",
        game_id: 0
    })

    useEffect(() => {
        getGames().then(gameData => 
            setGames(gameData))
    }, [])

    const handleNewEventInfo = (event) => {
        const copy = {...newEvent}
        copy[event.target.name] = event.target.value
        setNewEvent(copy)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__description">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={newEvent.description}
                        onChange={handleNewEventInfo}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={newEvent.date}
                        onChange={handleNewEventInfo}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={newEvent.time}
                        onChange={handleNewEventInfo}
                    />
                </div>
            </fieldset>

            <fieldset>
                        <div className="form-group">
                            <label htmlFor="game">Choose a game:</label>
                            <select id="game"
                                onChange={
                                    (event) => {
                                        const copy = { ...newEvent }
                                        copy.game_id = parseInt(event.target.value)
                                        setNewEvent(copy)
                                    }}>
                                <option value="0">Game...</option>

                                {
                                    games.map(
                                        (game) => {
                                            return <option
                                                key={`game--${game.id}`}
                                                value={game.id} name="gameId">{game.title}</option>
                                        }
                                    )
                                }
                            </select>
                        </div>
                    </fieldset>

                <button type="publish"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        description: newEvent.description,
                        date: newEvent.date,
                        time: newEvent.time,
                        game_id: parseInt(newEvent.game_id)
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="publishButton">
                Publish
            </button>

            {/* <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        description: newEvent.description,
                        date: newEvent.date, 
                        time: newEvent.time, 
                        gameId: newEvent.gameId
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn eventButton">Create Event</button> */}
        </form>
    )
}