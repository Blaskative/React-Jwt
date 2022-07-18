import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const PrivateRoute = ({ allowedRoles }) => {
    let {user,roles} = useContext(AuthContext);
    const location = useLocation();
    return (
        roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}


export default PrivateRoute;