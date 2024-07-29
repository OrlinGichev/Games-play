import { useContext } from "react"
import AuthContext from "../../contexts/authContext"
import { Navigate, Outlet } from "react-router-dom";


// eslint-disable-next-line no-unused-vars
export default function AuthGuard(props) {

    const isAuthenticated = useContext(AuthContext);

    if(!isAuthenticated) {
        return <Navigate to="/login"/>;
    }

    return <Outlet /> ;
}