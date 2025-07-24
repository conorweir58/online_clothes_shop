import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AllStatus() {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [orders, setOrders] = useState([]);

  const [error, setError] = useState(null);

  const statusOptions = {
    O: "ORDERED",
    P: "PROCESSING",
    S: "SHIPPED",
    D: "DELIVERED"
  };

  useEffect(() => {
    if (!selectedStatus) return;

    setError(null);

    fetch(`http://127.0.0.1:8000/api/order/?status=${selectedStatus}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setOrders(data);
      }) 
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setError("Failed to load orders");
        setOrders([]);
      });
  }, [selectedStatus]);

  if (error) return <h2 className="text-danger text-center mt-5">{error}</h2>;

  return (
    <div className="container card">
      <h1 className="text-primary text-center fw-bold m-4">View Orders by Status</h1>

      {/* Dropdown */}
      <div className="mb-4 mt-4 d-flex justify-content-center">
        <select
          className="form-select w-50"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">Select an order status</option>
          {Object.entries(statusOptions).map(([code, label]) => (
            <option key={code} value={code}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Order Cards */}
      {selectedStatus && (
        <div className="container mt-4 card">
          <h3 className="text-center mb-4 mt-4">
            Showing: {statusOptions[selectedStatus]} Orders
          </h3>

          {orders.length === 0 ? (
            <h4 className="text-center text-warning">No orders found.</h4>
          ) : (
            <div className="row">
              {orders.map((order, index) => (
                <div className="col-md-6 col-lg-4 mb-4" key={index}>
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title text-primary"><strong>Order:</strong> #{order.url.split("/").slice(-2, -1)}</h5>
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
          )}
        </div>
      )}
    </div>
  );
}

export default AllStatus;
