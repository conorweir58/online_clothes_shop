import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AllOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const statusOptions = {
        O: "ORDERED",
        P: "PROCESSING",
        S: "SHIPPED",
        D: "DELIVERED"
      };

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(`http://localhost:8000/api/order/`)
            .then((res) => {
                if(!res.ok)
                {
                  throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setOrders(data)
                setLoading(false);
            })
            .catch((error) => {
              console.error('Error fetching orders:', error);
              setError("Failed to load orders.");
              setLoading(false);
              setOrders([]);
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
          <h1 className="text-primary text-center fw-bold m-4">All Orders</h1>
          <div className="row">

            {orders.map((order, index) => (
              <div className="col-lg-4 mb-3" key={index}>
                
                <div className="container card">
                  
                  <div className="card-body">
                    <h4 className="card-title"><strong>Order ID:</strong> #{order.url?.split("/").filter(Boolean).pop()}</h4>
                    <h5 className="card-title text-secondary">(<strong>Status </strong> {statusOptions[order.status]})</h5>

                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><strong>Customer ID:</strong> #{order.customer?.split("/").filter(Boolean).pop()}</li>
                        <li className="list-group-item"><strong>Address:</strong> {order.shipping_addr}</li>
                        <li className="list-group-item"><strong>Ordered On:</strong> {new Date(order.date_ordered).toLocaleString()}</li>
                    </ul>
                    
                    <div className="">
                      <Link to={`/order/${order.url?.split("/").filter(Boolean).pop()}`} className="btn btn-primary mr-2 w-100 mt-3">View Order</Link>
                    </div>
                  
                  </div>
                
                </div>

              </div>
            ))}

          </div>
        </div>
      );
}

export default AllOrders;