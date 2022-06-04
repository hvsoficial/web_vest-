import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import Logo from '../images/Icon_Logo.png'
import '../styles/conponents/sidebar.css'


export default function Sidebar() {
    const { goBack } = useHistory();
    return (
        <aside className="app-sidebar">
            <img src={Logo} alt="Logo" />

            <footer>
                <button type="button" onClick={goBack}>
                    <FiArrowLeft size={24} color="#FFF" />
                </button>
            </footer>
        </aside>
    );

}