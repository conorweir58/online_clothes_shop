import { Outlet } from "react-router-dom";
import Header from "./helpers/header";
import Footer from "./helpers/footer";

function Layout() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <Header />
      <div className="flex-grow-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;