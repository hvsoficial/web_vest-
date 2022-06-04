import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from './pages/Landing';
//import Login from './pages/LandingLogin'
import LoginIn from './pages_user/LandingLoginIn'
import LoginUp from './pages_user/LandingLoginUp'
import EstabelecimentoMap from './pages/Mapas';
import EstabelecimentoMapUser from './pages_user/MapasUser';
import Estabelecimento from './pages/Mapa';
import EstabelecimentoUser from './pages_user/MapaUser';
import CreateEstabelecimento from './pages/CreateMapa';
import Recover from './conponentes/Recover'
import Star from './conponentes/Star'
import Teste from './pages/teste'
import LinkMap from './conponentes/Link'
import EditMapa from './pages/EditMapa';



function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                {/* <Route path="/login" exact component={Login} /> */}
                <Route path="/app" component={EstabelecimentoMapUser} />
                <Route path="/estabelecimentos/:id" component={EstabelecimentoUser} />


                <Route path="/appadm" component={EstabelecimentoMap} />
                <Route path="/estabelecimentosadm/create" component={CreateEstabelecimento} />
                <Route path="/estabelecimentosadm/:id" component={Estabelecimento} />
                <Route path="/estabelecimentosedit/:id" component={EditMapa} />
                <Route path="/recover" component={Recover} />
                <Route path="/star" component={Star} />
                <Route path="/teste" component={Teste} />
                <Route path="/link" component={LinkMap} />
                <Route path="/loginIn" exact component={LoginIn} />
                <Route path="/loginUp" exact component={LoginUp} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;