import React, { ChangeEvent, FormEvent, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { Map, Marker, TileLayer } from 'react-leaflet'
import { LeafletMouseEvent } from "leaflet"
import { FiPlus } from "react-icons/fi"

import api from "../services/api"
import mapIcon from "../utils/mapicon"
import Sidebar from "../conponentes/Sidebar"

import '../styles/pages/edit-mapa.css'
//import "../styles/pages/create-mapa.css"

interface Estabelecimento {
  id: number,
  name: string,
  telefone: string,
  latitude: number,
  longitude: number,
  address: string,
  complement: string,
  number: string,
  cep: string,
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

const EditMapa: React.FC = () => {

  const [estabelecimento, setEstabelecimento] = useState<Estabelecimento>()
  const [indexImageActive, setIndexImageActive] = useState(0)
  const params = useParams<RouteParams>()

  const separatorAddress = "*,*"
  const separatorLink = "@"

  const concate = ""

  const [address1, setAddress1] = useState('')
  const [complement, setComplement] = useState('')
  const [number, setNumber] = useState('')
  const [cep, setCep] = useState('')
  const [link, setLink] = useState('')
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  const [name, setName] = useState('')
  const [telefone, setFone] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(true)
  const [zap, setZap] = useState(true)
  const [images, setImages] = useState<File[]>([])
  const [selectedImagesPreview, setSelectedImagesPreview] = useState<string[]>([])

  const { push } = useHistory()

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

  function handleLink() {

    if (!link.length) {
      setLatitude(0)
      setLongitude(0)
      setLink("")

    }
    const abstraction = link.split(separatorLink)
    const link_abstraction = abstraction[1].split(",")

    const auxlat = link_abstraction[0]
    const auxlng = link_abstraction[1]

    const lat = parseFloat(auxlat)
    const lng = parseFloat(auxlng)

    setLatitude(lat)
    setLongitude(lng)
    setLink("")
  }

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng
    setLatitude(lat)
    setLongitude(lng)
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) { return }

    const files = Array.from(event.target.files)

    setImages(files)

    const imagesPreview = files.map(file => {
      return URL.createObjectURL(file)
    })

    setSelectedImagesPreview(imagesPreview)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const address = concate.concat(address1, separatorAddress, complement, separatorAddress, number, separatorAddress, cep)

    const data = new FormData()

    data.append('name', name)
    data.append('about', about)
    data.append('address', address)
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('telefone', telefone)
    data.append('open_on_weekends', String(open_on_weekends))
    data.append('zap', String(zap))
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    images.forEach(image => data.append('images', image))

    api.post('estabelecimentos', data)
      .then(() => {
        alert('Cadastro realizado com Sucesso!')

        push('/app')
      })
      .catch(({ response }) => {
        const { message, errors } = response.data

        if (!message) {
          console.log(response)
          return alert('Falha ao listar dados do estabelecimento!')
        }

        console.error(errors)
        alert(message)
      })

  }

  return (
    <div id="page-create-estabelecimento">
      <Sidebar />

      <main>
        <div className="create-estabelecimento-form">
          <fieldset>
            <legend>Dados</legend>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={estabelecimento.name} onChange={event => setName(event.target.value)} />
            </div>

            <div className="input-block" style={{ marginBottom: '50px' }}>
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} value={about} onChange={event => setAbout(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images" style={{ marginBottom: '24px' }}>Fotos</label>

              <img src={estabelecimento.images[indexImageActive].url} alt={estabelecimento.name} style={{ marginBottom: '24px' }} />

              <div className="images">
                {estabelecimento.images.map((image, index) => (
                  <button type="button" key={image.id} className={indexImageActive === index ? 'active' : ''}
                    onClick={() => setIndexImageActive(index)}>

                    <img src={image.url} alt={estabelecimento.name} />
                  </button>
                ))}
              </div>
              <label htmlFor="images" style={{ marginTop: '24px' }}><span>Para a adição de mais de uma imagem deve selecionar todas antes de clicar em abrir </span></label>
              <div className="images-container">
                {selectedImagesPreview.map(image => (
                  <img key={image} src={image} alt="Local do Estabelecimento" />
                ))}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input type="file" id="image[]" multiple onChange={handleSelectImages} />
            </div>

          </fieldset>
          <fieldset>
            <legend>Dados da localização</legend>

            <div className="input-block" style={{ marginBottom: '24px' }}>
              <label htmlFor="link">Link <span>Insira o link da localização do local, caso necessite</span></label>
              <input id="link" value={link} onChange={event => setLink(event.target.value)} />
              <button className="confirm-button" type="submit" style={{ marginTop: '24px' }} onClick={handleLink}> Confirmar </button>
            </div>

            <Map center={[estabelecimento.latitude, estabelecimento.longitude]} style={{ width: '100%', height: 280 }} zoom={14}
              onclick={handleMapClick}>{ }
              <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {latitude !== 0 && (
                <Marker interactive={false} icon={mapIcon} position={[latitude, longitude]} />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="address1">Endereco</label>
              <input id="address1" value={address1} onChange={event => setAddress1(event.target.value)} />
            </div>
            <div className="address-block" >
              <div className="complement-block">
                <label htmlFor="complement">Complemento</label>
                <input id="complement" value={complement} onChange={event => setComplement(event.target.value)} />
              </div>
              <div className="nuber-block">
                <label htmlFor="number">Numero</label>
                <input id="number" value={number} onChange={event => setNumber(event.target.value)} />
              </div>

            </div >
            <div className="input-block">
              <label htmlFor="cep">CEP</label>
              <input id="cep" value={cep} onChange={event => setCep(event.target.value)} />
            </div>
          </fieldset>

          <fieldset>
            <legend>Dados para o Atendimento </legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={event => setInstructions(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de atendimento<span>Ex.: Das 8:00h as 16:00h</span></label>
              <input id="opening_hours" value={opening_hours} onChange={event => setOpeningHours(event.target.value)} />
            </div>
            <div className="input-block">
              <label htmlFor="telefone">Telefone<span>O numero tem que ser composto pelo DDI + DDD + numero de telefone Ex.: +55 62 99999 9999</span></label>
              <input id="telefone" value={telefone} onChange={event => setFone(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atendimento aos fim de semana</label>

              <div className="button-select">
                <button type="button" className={open_on_weekends ? 'active' : ''} onClick={() => setOpenOnWeekends(true)}>
                  Sim
                </button>

                <button type="button" className={!open_on_weekends ? 'active' : ''} onClick={() => setOpenOnWeekends(false)}>
                  Não
                </button>
              </div>
            </div>

            <div className="input-block">
              <label htmlFor="zap">O número de telefone contém Whatzapp</label>

              <div className="button-select">
                <button type="button" className={zap ? 'active' : ''} onClick={() => setZap(true)}>
                  Sim
                </button>

                <button type="button" className={!zap ? 'active' : ''} onClick={() => setZap(false)}>
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit" onClick={handleSubmit}  > Salvar </button>
        </div>
      </main>
    </div>
  )
}

export default EditMapa