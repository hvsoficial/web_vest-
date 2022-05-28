import axios from 'axios';

const api = axios.create({

   // O baseURL: recebe o endereço para conectar com a API do back-end

   baseURL: process.env.REACT_APP_API_URL,

   // E utilizado process.env.REACT_APP_API_URL por necessitar de uma variável para subir o código no Heroku 
   // Caso o arquivo não necessite de ser subido para o ambiente de produção como o Heroku pode ser utilizado só 
   // baseURL:http://localhost:3338, em vez de baseURL: process.env.REACT_APP_API_URL,
   // A variável process.env.REACT_APP_API_URL recebe informação da mesma que está localizado no arquivo .env 
   // O arquivo .env na variável process.env.REACT_APP_API_URL recebe http://localhost:3338 que e o endereço para 
   //conectar com a API do back-end


})

export default api;