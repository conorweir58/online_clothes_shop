import { useRef } from "react";
import { Link } from "react-router-dom";

function Nav() {
    const ulRef = useRef(null);
    console.log("Nav rendered");

    const toggleNav = () => {
        ulRef.current.classList.toggle("d-none");
    }

    return (
        <nav className="card p-4 navbar d-md-block mt-4">
            <div className="container-fluid">
                <button className="btn btn-primary btn-lg w-100" onClick={toggleNav}>Menu</button>
                <div className="w-100">
                    <ul ref={ulRef} className="d-none navbar-nav mt-2 w-100 flex-column">
                        <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                        <li className="nav-item"><Link to="/categories" className="nav-link">Categories</Link></li>
                        <li className="nav-item"><Link to="/orders-status" className="nav-link">Orders by Status</Link></li>
                        <li className="nav-item"><Link to="/customers" className="nav-link">Customers</Link></li>
                        <li className="nav-item"><Link to="/orders" className="nav-link">All Orders</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
