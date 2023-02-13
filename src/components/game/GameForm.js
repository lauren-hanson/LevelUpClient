import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { getGameTypes, createGame } from '../../managers/GameManager.js'
import "./Game.css"


export const GameForm = () => {
    const navigate = useNavigate()
    
    const [gameTypes, setGameTypes] = useState([])
    // const [newGameTypes, setNewGameTypes] = useState([])
    const [newGame, setNewGame] = useState({
        title: "", 
        maker: "", 
        num_of_players: 0, 
        skill_level: 0, 
        game_type: 0, 
        gamer: 0
    })

    useEffect(() => {
        getGameTypes().then(gameTypeData => 
            setGameTypes(gameTypeData))
    }, [])

    const changeGameState = (event) => {
        const copy = {...newGame}
        copy[event.target.name] = event.target.value
        setNewGame(copy)
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
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control input" 
                        value={newGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control input"
                        value={newGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numOfPlayers">Number of Players: </label>
                    <input type="text" name="numOfPlayers" required autoFocus className="form-control input"
                        value={newGame.numOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="text" name="skillLevel" required autoFocus className="form-control input"
                        value={newGame.skillLevel}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
            <label htmlFor="content" className="label">Game Types: </label>
                    {
                        gameTypes.map(gameType => {
                            return <div key={gameType.id}><br></br><input type="checkbox" name="game_type" value={gameType.id}
                            onClick={changeGameState}/>
                                <label htmlFor={gameType.label}> {gameType?.label}</label><br/></div>
                        })

                    }
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: newGame.maker,
                        title: newGame.title,
                        num_of_players: parseInt(newGame.numOfPlayers),
                        skill_level: parseInt(newGame.skillLevel),
                        game_type: parseInt(newGame.game_type)
                    }

                    // Send POST request to your API
                    createGame(game).then(() => navigate("/games"))
                }}
                className="btn gameButton">Create Game</button>
        </form>
    )
}