import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getGameTypes, updateGame, getGame } from '../../managers/GameManager.js'
import "./Game.css"


export const EditGameForm = (props) => {
    const navigate = useNavigate()
    const { gameId } = useParams()
    const [gameTypes, setGameTypes] = useState([])
    const [saveGame, gameToUpdate] = useState({
        title: "",
        maker: "",
        num_of_players: 0,
        skill_level: 0,
        gamer: 0,
        game_type: {},
        gameTypeId: 0
    })

    useEffect(() => {
        getGameTypes().then(gameTypeData => setGameTypes(gameTypeData))
        getGame(gameId).then((data) => {
            data.gameTypeId = data.game_type.id
            gameToUpdate(data)
        })
    }, [gameId])



    const changeGameState = (event) => {
        const copy = { ...saveGame }
        copy[event.target.name] = event.target.value
        gameToUpdate(copy)
    }

    // const typeArray = (gameTypeId) => { 
    //     let copy = new Set(newGameTypes)
    //     copy.has(gameTypeId)
    //          copy.delete(gameTypeId)
    //         : copy.add(gameTypeId)

    //     setNewGameTypes(copy)
    // }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Edit Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control input"
                        defaultValue={saveGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control input"
                        defaultValue={saveGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="num_of_players">Number of Players: </label>
                    <input type="text" name="num_of_players" required autoFocus className="form-control input"
                        value={saveGame.num_of_players}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill Level: </label>
                    <input type="text" name="skill_level" required autoFocus className="form-control input"
                        value={saveGame.skill_level}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="content" className="label">Game Types: </label>
                <select id="gameType" name="game_type"
                    value={saveGame.gameTypeId}
                    onChange={
                        (event) => {
                            const copy = { ...saveGame }
                            copy.gameTypeId = parseInt(event.target.value)
                            gameToUpdate(copy)
                        }}>
                    {/* <option value={saveGame.gameTypeId}></option> */}

                    {
                        gameTypes.map(
                            (gameType) => {
                                return <option
                                    key={`game_type--${saveGame.id}`}
                                    value={gameType.id} name={gameType.label}>{gameType.label}</option>
                            }
                        )
                    }
                </select>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        title: saveGame.title,
                        maker: saveGame.maker,
                        num_of_players: parseInt(saveGame.num_of_players),
                        skill_level: parseInt(saveGame.skill_level),
                        game_type: saveGame.gameTypeId
                    }

                    // Send POST request to your API
                    updateGame(gameId, game)
                        .then(() => navigate("/games"))
                }}
                className="btn gameButton">Save Changes</button>
        </form>
    )
}