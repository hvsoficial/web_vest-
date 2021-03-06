import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Map, Marker, TileLayer } from "react-leaflet";
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";

import api from "../services/api";
import mapIcon from "../utils/mapicon";
import Sidebar from "../conponentes/Sidebar";

import '../styles/pages/estabelecimento.css';

interface Estabelecimento {
  id: number,
  name: string,
  cnpj: string,
  telephone: string,
  latitude: number,
  longitude: number,
  road: number,
  complement: number,
  number: number,
  cep: number,
  about: string,
  instructions: string,
  opening_hours: string,
  open_on_weekends: boolean,
  zap: boolean,
  images: {
    id: number,
    url: string
  }[]
}

interface RouteParams {
  id: string
}

const Estabelecimento: React.FC = () => {
  const [estabelecimento, setEstabelecimento] = useState<Estabelecimento>()
  const [indexImageActive, setIndexImageActive] = useState(0)
  const params = useParams<RouteParams>()

  useEffect(() => {
    api.get(`/estabelecimentos/${params.id}`)
      .then(({ data }) => setEstabelecimento(data))
      .catch(({ response }) => {
        const { message, errors } = response.data

        if (!message) {
          console.log(response)
          return alert('Falha ao listar dados do estabelecimento!')
        }

        console.error(errors)
        alert(message)
      })
  }, [params.id])

  if (!estabelecimento) { return <p>Carregando...</p> }

  return (
    <div id="page-estabelecimento">
      <Sidebar />

      <main>
        <div className="estabelecimento-details">
          <img src={estabelecimento.images[indexImageActive].url} alt={estabelecimento.name} />

          <div className="images">
            {estabelecimento.images.map((image, index) => (
              <button type="button" key={image.id} className={indexImageActive === index ? 'active' : ''}
                onClick={() => setIndexImageActive(index)}>

                <img src={image.url} alt={estabelecimento.name} />
              </button>
            ))}
          </div>

          <div className="estabelecimento-details-content">
            <h1>{estabelecimento.name}</h1>
            <p>{estabelecimento.about}</p>

            <hr />

            <h2>Endere??o </h2>



            <div className="map-container">
              <Map center={[estabelecimento.latitude, estabelecimento.longitude]} zoom={16} style={{ width: '100%', height: 280 }}
                dragging={false} touchZoom={false} zoomControl={false} scrollWheelZoom={false} doubleClickZoom={false}>
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
                <Marker interactive={false} icon={mapIcon} position={[estabelecimento.latitude, estabelecimento.longitude]} />
              </Map>

              <footer>
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${estabelecimento.latitude},${estabelecimento.longitude}`}
                  target="_blank" rel="noopener noreferrer">Ver rotas no Google Maps</a>
              </footer>
            </div>

            <div className="input-block">
              <label htmlFor="address1">Rua</label>
              <input id="address1" value={estabelecimento.road} disabled />
            </div>
            <div className="address-block" >
              <div className="complement-block">
                <label htmlFor="complement">Complemento</label>
                <input id="complement" value={estabelecimento.complement} disabled />
              </div>
              <div className="nuber-block">
                <label htmlFor="number">Numero</label>
                <input id="number" value={estabelecimento.number} disabled />
              </div>
            </div >
            <div className="input-block">
              <label htmlFor="cep">CEP</label>
              <input id="cep" value={estabelecimento.cep} disabled />
            </div>

            <hr />

            <h2>Instru????es </h2>
            <p>{estabelecimento.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15b6d6" />
                Segunda ?? Sexta <br /> {estabelecimento.opening_hours}
              </div>

              {estabelecimento.open_on_weekends
                ? (
                  <div className="open-on-weekends">
                    <FiInfo size={32} color="#39cc83" />
                    Atendemos <br /> fim de semana
                  </div>
                ) : (
                  <div className="open-on-weekends dont-open">
                    <FiInfo size={32} color="#ff669d" />
                    N??o atendemos <br /> fim de semana
                  </div>
                )}
            </div>

            {estabelecimento.zap
              ? (
                <a href={`https://api.whatsapp.com/send?phone=${estabelecimento.telephone}`} className="contact-button">
                  <FaPhone size={20} color="#fff" />
                  <FaWhatsapp size={20} color="#fff" />
                  Entrar em contato : {estabelecimento.telephone}
                </a>
              ) : (
                <div className="contact-button-phone">
                  <FaPhone size={20} color="#fff" />
                  Entrar em contato : {estabelecimento.telephone}
                </div>
              )}

          </div>
        </div>
      </main>
    </div>
  )
}

export default Estabelecimento