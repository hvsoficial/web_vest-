import React, { useEffect, useState } from 'react'
import { FiActivity, FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import api from '../services/api'
import mapIcon from '../utils/mapicon'
import Logo from '../images/Icon_Logo.png'

import '../styles/pages/estabelecimentos-map.css'

interface Estabelecimento {
    id: number,
    name: string,
    latitude: number,
    longitude: number,
}

const EstabelecimentoMap: React.FC = () => {


    const [estabelecimentos, setEstabelecimento] = useState<Estabelecimento[]>([] as Estabelecimento[])

    useEffect(() => {
        api.get('estabelecimentos').then(Response => {
            setEstabelecimento(Response.data);
        });
    }, []);

    // useEffect(() => {
    //     api.get('/estabelecimentos')
    //        .then(({ data }) => setEstabelecimento(data))
    //        .catch(({ response }) => {
    //           const { message, errors } = response.data
    //
    //            if (!message) {
    //               console.log(response)
    //                return alert('Falha ao listar os estabelecimentos!')
    //           }
    //
    //           console.error(errors)
    //         alert(message)
    //       })
    //  }, [])


    return (
        <div id="page-map" style={{ flexDirection: 'column' }} >
            <main className="top">

                <div className="logo">

                    <img src={Logo} alt="Logo Vest +" />

                    <div>
                        <label>Vest +</label>
                    </div>


                </div>
                <div className="busca">
                    <input id="name_busca" type="text" placeholder="Search for a location" />
                </div>

                <div className="user">
                    <Link to="/loginIn" >
                        <button className="lodin">
                            <label htmlFor="name" >Longin-In</label>
                        </button>
                    </Link>
                    <label style={{ color: 'black' }}> / </label>
                    <Link to="/loginUp" >
                        <button className="lodin">
                            <label htmlFor="name" >Longin-Up</label>
                        </button>
                    </Link>
                </div>

            </main>
            {/*<aside>
                <header>
                    {/*<img src={mapMarker} alt="Logo Happy" />

                    <h2>Escolha um estabelecimento no mapa</h2>
                    <p>Ajude o meio ambiente</p>
                </header>

                <footer>
                    <strong> </strong>
                    <span>  </span>
                </footer>
            </aside>*/}


            <Map center={[-16.3325529, -48.9549526]} zoom={14} style={{ height: '100%', width: '100%' }}>
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
                {estabelecimentos.map(estabelecimento => (
                    <Marker key={estabelecimento.id} position={[estabelecimento.latitude, estabelecimento.longitude]} icon={mapIcon} >
                        <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                            {estabelecimento.name}
                            <Link to={`/estabelecimentos/${estabelecimento.id}`}>
                                <FiActivity size={20} color="#fff" />
                            </Link>
                        </Popup>
                    </Marker>
                ))}
            </Map>



            <Link to="/estabelecimentosadm/create" className="create-estabelecimento">
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    )
}

export default EstabelecimentoMap