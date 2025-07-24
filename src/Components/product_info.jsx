import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function ProductInfo( { product }) {
  const [productinfo, setProductInfo] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000//api/product/${product}/`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
      .then((data) => setProductInfo(data))
      .catch((error) => {
        console.error("Error fetching product:", error);
        setProductInfo([])
      });
  }, [product]);

  const displayProduct = () => {
    return (
      <div className="">
        <h4 className="text-info">Product Information</h4>
        <div className="row">
          <div className="col-md6">
            <div className="card container">
              <div className="card-body">
                <h5 className="card-title">{productinfo.name}</h5>
                <h6 className="text-secondary">Product ID: #{productinfo.url?.split("/").filter(Boolean).pop()}</h6>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>Price: </strong>€{productinfo.price}</li>
                    <li className="list-group-item"><strong>Category: </strong><Link to={`/products/${productinfo.category?.split("/").filter(Boolean).pop()}`} className="btn btn-primary">{productinfo.category?.split("/").filter(Boolean).pop().toUpperCase()}</Link></li>
                  </ul>
                </div>
            </div>
          </div>
        </div>
      </div>
    )};

  return displayProduct();
}

export default ProductInfo;