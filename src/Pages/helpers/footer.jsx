function Footer() {
    const curr_year = new Date().getFullYear();
    
    return (

        <footer className="bg-dark text-white text-center py-3 mt-5 position-relative bottom-0 w-100 d-flex flex-column">
            <p className="mb-0 "><small>Conor Weir (ID: 23418374) | Solitude Clothing © 2025 - {curr_year} | CSC1040</small></p>
        </footer>
    )
}

export default Footer;