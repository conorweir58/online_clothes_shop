import { Link } from "react-router-dom"

function Home() {
    return (
      <div className="container p-4 card">
        <h1>Welcome to the Solitude Clothing Store System!</h1>
  
          <div className="row mt-3 container card-body">
              <h2 className="mb-4">Browse the System</h2>
              <div className="col-md-6 mb-3">
                  <Link to="/categories" className="btn btn-primary btn-lg w-100">View Categories and Products</Link>
              </div>
              <div className="col-md-6">
                  <Link to="/orders-status" className="btn btn-primary btn-lg w-100">View Orders by Status</Link>
              </div>
              <div className="col-md-6">
                  <Link to="/customers" className="btn btn-primary btn-lg w-100">View Customers</Link>
              </div>
              <div className="col-md-6">
                  <Link to="/orders" className="btn btn-primary btn-lg w-100">View All Orders</Link>
              </div>
          </div>
      </div>
    );
  }
  
  export default Home;