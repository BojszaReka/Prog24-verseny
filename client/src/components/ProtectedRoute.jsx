import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import { Role } from '../misc/Role.enum'

const ProtectedRoute = ({ children, accessBy, roles = [] }) => {
    const { user } = useContext(AuthContext);
    if (accessBy === "non-authenticated") {
        if (!user) {
            return children;
        }
    } else if (accessBy === "authenticated") {
        if (user) {
            if (roles.length > 0 && !roles.includes(user.roleId)) {
                return <Navigate to="/"></Navigate>;
            }
            return children;
        }
    }
    return <Navigate to="/"></Navigate>;
};
export default ProtectedRoute;