import { Link } from "react-router-dom";

export default function FourOhFour() {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center text-center py-5">
      <h1 className="display-4 mb-3 text-danger">404</h1>
      <p className="lead mb-4">The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-warning">Go back to home</Link>
    </div>
  );
}
