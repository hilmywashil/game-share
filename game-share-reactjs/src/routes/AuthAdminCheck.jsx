import { Navigate } from "react-router-dom";

const AuthAdminCheck = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || user.role !== "admin") {
        return <Navigate to="/unauthorized" />;
    }

    else if(!token) {
        return <Navigate to="/login" />;
      }
    

    return children;
};

export default AuthAdminCheck;
