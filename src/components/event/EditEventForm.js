import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getEvent, updateEvent } from '../../managers/EventManager.js'
import { getGames } from '../../managers/GameManager.js'
import "./Event.css"

export const EditEventForm = () => {

    const navigate = useNavigate()
    const { eventId } = useParams()
    const [games, setGames] = useState([])
    // const [event, setEvent] = useState([])
    const [saveEvent, eventToUpdate] = useState({
        description: "",
        date: "",
        time: "",
        game: {},
        gameId: 0
    })

    useEffect(() => {
        getEvent(eventId).then((data) => {
            data.gameId = data.game.id
            eventToUpdate(data)
        })
    }, [eventId])

    useEffect(() => { 
        getGames().then(gameArray => 
            setGames(gameArray))
    }, [])


    const changeEventState = (event) => {
        const copy = { ...saveEvent }
        copy[event.target.name] = event.target.value
        eventToUpdate(copy)
    }


    return (<form className="eventForm">
        <h2>Edit Event</h2>

        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Description: </label>
                <input type="text" name="description" required autoFocus className="form-control input"
                    defaultValue={saveEvent.description}
                    onChange={changeEventState}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="date">Date: </label>
                <input type="date" name="date" required autoFocus className="form-control input"
                    defaultValue={saveEvent.date}
                    onChange={changeEventState}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="time">Time: </label>
                <input type="time" name="time" required autoFocus className="form-control input"
                    defaultValue={saveEvent.time}
                    onChange={changeEventState}
                />
            </div>
        </fieldset>
        <fieldset>
                <label htmlFor="game">Game:</label>
                <select id="game" name="game"
                    value={saveEvent.gameId}
                    onChange={
                        (event) => {
                            const copy = { ...saveEvent }
                            copy.gameId = parseInt(event.target.value)
                            eventToUpdate(copy)
                        }}>
                    {/* <option value={saveEvent?.game?.id}></option> */}

                    {
                        games.map(
                            (game) => {
                                return <option
                                    key={`game--${game.id}`}
                                    value={game.id}>{game.title}</option>
                            }
                        )
                    }
                </select>
        </fieldset>
        <button type="submit"
            onClick={evt => {
                // Prevent form from being submitted
                evt.preventDefault()

                const event = {
                    description: saveEvent.description,
                    date: saveEvent.date,
                    time: saveEvent.time,
                    game: saveEvent.gameId
                }

                // Send POST request to your API
                updateEvent(eventId, event)
                    .then(() => navigate("/events"))
            }}
            className="btn gameButton">Save Changes</button>
    </form>
    )
}