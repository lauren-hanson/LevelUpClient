import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getGames } from "../../managers/GameManager.js"
import "./Game.css"

export const GameList = (props) => {
    let {gameId } = useParams()
    const [games, setGames] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <>
        <button className="btn btn-2 btn-sep icon-create" id="newGameButton"
            onClick={() => {
                navigate({ pathname: "/games/new" })
                }}
            >Register New Game</button>
        <article className="games">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.num_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <button onClick={() => {
                            navigate({ pathname: `/games/edit/${gameId}` })
                            }}>Edit</button>
                    </section>
                })
            }
        </article>
        </>
    )
}