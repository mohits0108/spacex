import { Link,useLocation } from "react-router-dom";
import useToken from "../hooks/useToken";

const Navbar = () => {
const token=useToken();

  const location = useLocation();
let userRole = null;

if (token) {
  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    userRole = decodedToken.role;
  } catch (error) {
    console.error("Invalid token format", error);
  }
}
  // Conditionally render the navbar based on the route
  if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/') {
    return null; // Don't show navbar on login or register pages
  }
  const logout =()=>
  {
    localStorage.removeItem("token"); // On logout, remove token
    window.location.href='/login'
  }
  
  return (
  
  <nav>
    <div>

    <div className="d-flex gap-5 p-3 mt-0 navbar-light bg-light  justify-content-start align-items-center w-100">
      <a className="navbar-brand fs-3" href="/home">
        IpInfo
      </a>
      <div className="d-flex gap-4">
      {userRole !== "operator" && (
        <Link to="/home" className="text-decoration-none nav-link">
          Home
        </Link>
      )}

        <Link to="/favourites" className="text-decoration-none nav-link">
          Favourites
        </Link>
      
        
      </div>
        <button className="d-flex justify-content-end btn btn-primary" onClick={logout}>Logout</button>
    </div>
    </div>
  </nav>
);
};

export default Navbar;
