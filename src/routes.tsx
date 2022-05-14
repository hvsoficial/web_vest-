import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/LandingLogin'
import EstabelecimentoMap from './pages/Mapas';
import Estabelecimento from './pages/Mapa';
import CreateEstabelecimento from './pages/CreateMapa';
import Recover from './conponentes/Recover'
import Star from './conponentes/Star'



function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/login" exact component={Login} />
                <Route path="/app" component={EstabelecimentoMap} />
                <Route path="/recover" component={Recover} />
                <Route path="/star" component={Star} />

                <Route path="/estabelecimentos/create" component={CreateEstabelecimento} />
                <Route path="/estabelecimentos/:id" component={Estabelecimento} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;