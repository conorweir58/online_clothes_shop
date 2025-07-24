import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AddProduct() {
    const { orderid } = useParams();

    // products for drop down select
    const [products, setProducts] = useState([]);
    
    // order product for creating new order item with this product
    const [orderproduct, setOrderProduct] = useState({});
    const [quantity, setQuantity] = useState(0);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(`http://localhost:8000/api/product/`)
            .then((res) => {
                if(!res.ok)
                {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching Products:", error);
                setError(error);
                setProducts([]);
                setLoading(false);
            });
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();

        const new_product = {
            quantity: parseInt(quantity),
            product: `http://127.0.0.1:8000/api/product/${orderproduct}/`,
            order: `http://127.0.0.1:8000/api/order/${orderid}/`
        };

        console.log(new_product);

        try {
            const response = await fetch(`http://localhost:8000/api/orderitem/?order=${orderid}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(new_product),
            });

            if (response.ok) {
                console.log("Order updated successfully");
                navigate(`/order/${orderid}`);
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (error) {
            console.error("Error updating order:", error);
            setError("An error occurred while updating the order.");
        }
    }

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
        <div className="container p-4 card d-flex justify-content-center align-items-center">
            <h2 className="text-primary text-center fw-bold mt-4">Add Product to Order</h2>

            <div className="col-md-6 mb-3">
                <form onSubmit={handleSubmit}>
                    <div className="form-group mt-3">
                        <h4 className="text-secondary text-center mb-2"><strong>Order:</strong> #{orderid}</h4>
                    </div>

                    {/* Degree Selection drop down */}
                    <div className="form-group mt-3"> 
                        <label htmlFor="orderproduct" className="text-secondary text-center fw-semibold mb-2">New Product</label>
                        <select
                            className="form-control"
                            id="orderproduct"
                            value={orderproduct}
                            onChange={(e) => setOrderProduct(e.target.value)}
                            required
                        >
                            <option value="">Select Product</option>
                            {products.map((product, index) => (
                                <option key={index} value={product.url?.split("/").filter(Boolean).pop()}>{product.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Quantity Input */}
                    <div className="form-group mt-3 mb-3">
                        <label htmlFor="quantity" className="text-secondary text-center fw-semibold mb-2">
                            Quantity
                        </label>
                        <input
                            type="number"
                            min={1}
                            className="form-control"
                            id="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-75 mt-4">
                        Add Product to Order
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;