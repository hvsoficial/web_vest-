import Leaflet from 'leaflet';
import marcacaoImg from '../images/marcacao.png';

const mapIcon = Leaflet.icon({
    iconUrl: marcacaoImg,
  
    iconSize: [28, 38],
    iconAnchor: [14, 38],
    popupAnchor: [0, -60]
  })

  export default mapIcon;