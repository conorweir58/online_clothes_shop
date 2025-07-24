import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

function SingleCustomer() {

    const statusOptions = {
        O: "ORDERED",
        P: "PROCESSING",
        S: "SHIPPED",
        D: "DELIVERED"
      };

    const { customerid } = useParams();

    const [customer, setCustomer] = useState({});
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      setLoading(true);
      setError(null);

      fetch(`http://localhost:8000/api/customer/${customerid}`)
          .then((res) => {
            if(!res.ok)
            {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
          })
          .then((data) => {
            setCustomer(data)
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching customer:', error);
            setError("Failed to load customer.");
            setLoading(false);
        });

    fetch(`http://localhost:8000/api/order/?customer=${customerid}`)
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
          console.error('Error fetching customer orders:', error);
          setError("Failed to load orders.");
          setLoading(false);
        });
    }, [customerid]);

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
        <h1 className="text-primary text-center fw-bold mt-4">{customer.name}</h1>
        <h2 className="text-secondary text-center fw-semibold mb-4">ID: #{customerid}</h2>

          <div className="container card">
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><h4 className="card-title text-muted"><strong>Email:</strong> {customer.email}</h4></li>
                <li className="list-group-item"><h4 className="card-title text-muted"><strong>Address:</strong> {customer.address}</h4></li>
              </ul>
            </div>
          
            <div className="mt-4">
                <h4 className="card-title text-muted mb-3"><strong>Orders:</strong></h4>

                {orders.length ===0 &&
                    <h5 className="text-warning">No orders found for this customer.</h5>
                }

                {orders.length > 0 &&
                    <div className="row">
                        {orders.map((order, index) => (
                        <div className="col-lg-4 mb-3" key={index}>
                            <div className="container card">
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item"><strong>Customer ID:</strong> #{order.customer?.split("/").filter(Boolean).pop()}</li>
                                        <li className="list-group-item"><strong>Status:</strong> {statusOptions[order.status]}</li>
                                        <li className="list-group-item"><strong>Address:</strong> {order.shipping_addr}</li>
                                        <li className="list-group-item"><strong>Ordered On:</strong> {new Date(order.date_ordered).toLocaleString()}</li>
                                    </ul>
                                    <div>
                                        <Link to={`/order/${order.url?.split("/").slice(-2, -1)}`} className="btn btn-primary mr-2 w-100 mt-3">Order #{order.url?.split("/").slice(-2, -1)}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                }
            </div>

        </div>
      </div>
    );
}

export default SingleCustomer;