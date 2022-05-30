import React, { useEffect, useState } from 'react'
import { FiActivity, FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import api from '../services/api'
import mapIcon from '../utils/mapicon'
//import mapMarker from '../images/map-marker.svg'

import '../styles/pages/estabelecimentos-map.css'

interface Estabelecimento {
    id: number,
    name: string,
    latitude: number,
    longitude: number,
    // about: string,
    // instructions: string,
    // opening_hours: string,
    // open_on_weekends: boolean,
    // images: { id: number, url: string }[]
}

const EstabelecimentoMapUser: React.FC = () => {


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
        <div id="page-map">
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
        </div>
    )
}

export default EstabelecimentoMapUser