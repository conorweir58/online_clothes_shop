import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AllCustomers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        
        fetch(`http://localhost:8000/api/customer/`)
            .then((res) => {
                if(!res.ok)
                {
                  throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setCustomers(data)
                setLoading(false);
            })
            .catch((error) => {
              console.error('Error fetching customers:', error);
              setError("Failed to load customers.");
              setLoading(false);
              setCustomers([]);
            });
    }, []);

    if (loading)
    {
        return (
            <div className="mt-3">
                <h1 className="text-secondary fw-semibold">Please Wait</h1>
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
        )
    }

    if (error) return <h2 className="text-danger text-center mt-5">{error}</h2>;

    return (
        <div className="container">
          <h1 className="text-primary text-center fw-bold m-4">All Customers</h1>
          <div className="row">

            {customers.map((customer, index) => (
              <div className="col-lg-4 mb-3" key={index}>
                
                <div className="container card">
                  
                  <div className="card-body">
                    <h4 className="card-title"><strong>Name:</strong> {customer.name}</h4>
                    <h5 className="card-title text-secondary">(<strong>Email: </strong> {customer.email})</h5>
                    
                    <div className="">
                      <Link to={`/customers/${customer.url?.split("/").filter(Boolean).pop()}`} className="btn btn-primary mr-2 w-100 mt-3">View Customer Details</Link>
                    </div>
                  
                  </div>
                
                </div>

              </div>
            ))}

          </div>
        </div>
      );
}

export default AllCustomers;