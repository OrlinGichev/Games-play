import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/authContext";

export default function Header() {

    const {
        isAthenticated,
        username,
    } = useContext(AuthContext)

    return (
        <header>
        {/* <!-- Navigation --> */}
        <h1><Link className="home" to="/">GamesPlay</Link></h1>
        <nav>
            <Link to="/games">All games</Link>
            {/* <!-- Logged-in users --> */}
            {isAthenticated && (
                <div id="user">
                    <Link to="/game-create">Create Game</Link>
                    <Link to="/loguot">Logout</Link>
                    <span>| {username}</span>
                </div>
            )}
            {/* <!-- Guest users --> */}
            {!isAthenticated && (
                <div id="guest">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            )}
        </nav>
    </header>
    );
}