import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AllCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(`http://localhost:8000/api/category/`)
            .then((res) => {
                if(!res.ok)
                {
                  throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setCategories(data)
                setLoading(false);
            })
            .catch((error) => {
              console.error('Error fetching categories:', error);
              setError("Failed to load categories.");
              setLoading(false);
              setCategories([]);
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
          <h1 className="text-primary text-center fw-bold m-4">All Product Categories</h1>
          <div className="row">

            {categories.map((category, index) => (
              <div className="col-lg-4 mb-3" key={index}>
                
                <div className="container card">
                  
                  <div className="card-body">
                    <h4 className="card-title">Product Category: {category.display_name}</h4>
                    <h5 className="card-title text-secondary">(Category Code: {category.shortcode})</h5>
                    
                    <div className="">
                      <Link to={`/products/${category.shortcode}`} className="btn btn-primary mr-2 w-100 mt-3">View Products</Link>
                    </div>
                  
                  </div>
                
                </div>

              </div>
            ))}

          </div>
        </div>
      );
}

export default AllCategories;