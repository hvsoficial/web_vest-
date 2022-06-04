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

    {/* */ }
    return (
        <div id="page-map">
            <Map center={[-16.3325529, -48.9549526]} zoom={14} style={{ height: '100%', width: '100%' }}>
                {/* A classe Map necessita da propriedade center que receber como parâmetro dois números representados por x e y 
            o x recebe a latitude e o y a longitude que são utilizados para definir o centro do mapa ao qual será renderizado 
            a zoom define o foco e style recebe a estilo que o mapa aparece */}
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
                {/* O TileLayer recebe a propriedade url que cotem a url da api que fornece o mapa 
                nesta url e contido o access_token que e o validador de permissão de acesso, para poder utilizar os dados do mapa,
                sem um access_token valido não e possível renderizar o mapa */}
                {estabelecimentos.map(estabelecimento => (
                    <Marker key={estabelecimento.id} position={[estabelecimento.latitude, estabelecimento.longitude]} icon={mapIcon} >
                        {/* O Marker tem a função de marcar postos no mapa necessitando da Key que é o identificador do ponto, 
                        o position que recebe a posição do ponto a ser marcado necessitando dos mesmos parâmetro que o certer do Map
                        e o icon que recebe as informações do ícone que o ponto recebera */}
                        <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                            {/* O Popup gera um popup após ser clicado em um Marker */}
                            {estabelecimento.name}
                            <Link to={`/estabelecimentosadm/${estabelecimento.id}`}>
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