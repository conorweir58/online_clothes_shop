import Nav from "./nav";

function Header() {
    return (
        <header className="p-4 mb-5 shadow-sm bg-light">
            <h1 className="card-title">Solitude Clothing</h1>
            <Nav />
        </header>
    );
}

export default Header;