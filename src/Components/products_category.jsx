import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

function ProductsCategory() {

    const { categorycode } = useParams();

    const [products, setProducts] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      setLoading(true);
      setError(null);

      fetch(`http://localhost:8000/api/product/?category=${categorycode}`)
          .then((res) => {
            if(!res.ok)
            {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
          })
          .then((data) => {
            console.log("Fetched Product Data:", data);
            setProducts(data)
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching products for this category:', error);
            setError("Failed to load products for this category.");
            setLoading(false);
        });
    }, [categorycode]);

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
          <h1 className="text-primary text-center fw-bold m-4">{categorycode.toUpperCase()} Products</h1>
          <div className="row">

            {products.map((product, index) => (
              <div className="col-lg-4 mb-3" key={index}>
                
                <div className="row">
                  <div className="col-md6">
                    <div className="card container">
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <h6 className="text-secondary">Product ID: #{product.url?.split("/").filter(Boolean).pop()}</h6>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Price: </strong>€{product.price}</li>
                            <li className="list-group-item"><strong>Category: </strong><Link to={`/products/${product.category?.split("/").filter(Boolean).pop()}`} className="btn btn-primary">{product.category?.split("/").filter(Boolean).pop().toUpperCase()}</Link></li>
                          </ul>
                        </div>
                    </div>
                  </div>
                </div>

              </div>
            ))}

          </div>
        </div>
      );
}

export default ProductsCategory;