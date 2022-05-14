import React from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

//import logo from '../images/logo.svg'

import '../styles/pages/landing.css'

const Landing: React.FC = () => {
    return (
        <div id="page-landing">
            <div className="content-wrapper">
                {/*<img src={logo} alt="Logo Happy" />*/}

                <div className='fundo'>

                </div>


                <main>
                    <h1>VEST + </h1>
                    <br></br>
                    <br></br>
                    <h2>Sua plataforma de doação de vestimentas.</h2>
                    <br></br>
                    <p>"Encontre locais para arrecadação e distribuição de vestimentas."</p>
                    <br></br>
                    <br></br>
                    <p>Faz o bem para você e para outras pessoas!</p>
                </main>

                <div className="location">
                    <strong> </strong>
                    <span> </span>
                </div>

                <Link to="/app" className="enter-app"><FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" /></Link>
            </div>
        </div>
    )
}

export default Landing