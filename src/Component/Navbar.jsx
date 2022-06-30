import React from 'react'
import { CryptoState } from './CryptoContext'

const Navbar = () => {
    const {currency,setCurrency} = CryptoState();
    console.log(currency);

    return (
      
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="col-lg-6 col-md-4 col-sm-3 col-xl-7 container-fluid">
                    <a className="navbar-brand" href="#">Crypto Tracker</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">

                        <select className="form-select bg-dark indicator-color-white color-white lgselect-menu" 
                        value={currency}
                        onChange={(e)=>setCurrency(e.target.value)} aria-label="Default select example">
                            <option defaultValue value="INR">INR</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="RUB">RUB</option>
                        </select>
                        <button className="btn btn-success" type="submit">LOGIN</button>

                    </div>
                </div>
            </nav>
  
    )
}

export default Navbar