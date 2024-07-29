import { useContext, useEffect, useMemo, useReducer, useState } from "react";
import { Link, useParams } from "react-router-dom"

import * as gameService from "../../services/gameServices"
import * as commentService from "../../services/commentService"
import AuthContext from "../../contexts/authContext";

import reducer from "./commentReducer";
import { pathToUrl } from "../../utils/pathUtils";
import Path from "../../paths";
import useForm from "../../hooks/useForm";


export default function GamesDetails () {

    const {email, userId} = useContext(AuthContext);

    const [game, setGame] = useState({});

    const [ comments, dispatch] = useReducer(reducer, []);
    const { gameId } =useParams();

    useEffect(() => {
        gameService.getOne(gameId)
            .then(setGame);

        commentService.getAll(gameId)
            .then(( result ) => {
                dispatch({
                    type: 'GET_ALL_GAMES',
                    payload: result,
                })
            });
    },[gameId])

    const addCommentHandler = async (e) => {

        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const newComment = await commentService.create(
            gameId,
            formData.get('comment'),
          );

          newComment.owner = { email };


        dispatch({
            type: 'ADD_COMMENT',
            payload: newComment,
        })
     
    }


    // Temp solution //
    const initialValues = useMemo(() => ({
        coment: ''
    }),[]);

    const { values, onChange, onSubmit } = useForm(addCommentHandler, initialValues);

    
    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">

                <div className="game-header">
                    <img className="game-img" src={game.imageUrl}  alt={game.title}/>
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>

                <p className="text">
                   {game.summary}
                </p>

                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>                       
                        {comments.map(({_id, text, owner}) => (
                            <li key={_id} className="comment">
                                <p>{owner?.email}: {text}</p>
                            </li>
                        ))}
                       
                    </ul>
                    { comments.length === 0 && (<p className="no-comment">No comments.</p> )}
                    
                </div>

                {/* <!-- Edit/Delete buttons ( Only htmlFor creator of this game )  --> */}
                { userId === game._ownerId &&                     
                    <div className="buttons">
                        <Link to={pathToUrl(Path.GameEdit, { gameId })} className="button">Edit</Link>
                        <Link to={pathToUrl(Path.GameDelete, { gameId })} className="button">Delete</Link>
                    </div> 
                }
                    
                    
            </div>

            {/* <!-- Bonus --> */}
            {/* <!-- Add Comment ( Only htmlFor logged-in users, which is not creators of the current game ) --> */}
             <article className="create-comment">
                 <label>Add new comment:</label>
                 <form className="form" onSubmit={addCommentHandler}>
                     <textarea name="comment" placeholder="Comment......"></textarea>
                     <input className="btn submit" type="submit" value="Add Comment" />
                 </form>
             </article>

        </section>
    )
}