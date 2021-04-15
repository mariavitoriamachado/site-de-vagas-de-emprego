import React from 'react';

import {  BrowserRouter, Switch, Route} from 'react-router-dom';

//Import Admin
import Dashboard from './pages/admin/dashboard';

import Vagas from './pages/admin/vagas';
import VagasEditar from './pages/admin/vagas/vagasEditar';
import VagasCadastrar from './pages/admin/vagas/vagasCadastrar';

import Usuarios from './pages/admin/usuarios';
import UsuariosEditar from './pages/admin/usuarios/usuariosEditar';
import UsuariosCadastrar from './pages/admin/usuarios/usuariosCadastrar';

//Import Client
import Home from './pages/client/header';
import VagasDetails from './pages/client/vagas/vagasDetails';
import Login from './pages/admin/login';
//import Loginuser from './pages/admin/login';
import Candidato from './pages/client/pages/cadastro'
import LoginCandidato from './pages/client/login/'

import PrivateRoute from './services/wAuth';

export default function Routes() {
  return (
<BrowserRouter>
<Switch>
  {/* Rotas Client */}
  <Route path="/home" exact component={Home} />
  <Route path="/vagas/:idVaga" exact component={VagasDetails} />
  <Route path='/cadastrocandidato' component={Candidato} />
  <Route path='/logincandidato' component={LoginCandidato} />
{/* Rotas Admin */}
<Route path="/admin/login" exact component={Login} />
<Route path="/admin" exact component={Dashboard} />


<PrivateRoute  path="/admin/vagas" exact component={Vagas}/>
<PrivateRoute  path="/admin/vagas/cadastrar" exact component={VagasCadastrar}/>
<PrivateRoute  path="/admin/vagas/editar/:idVaga" exact component={VagasEditar}/>

<PrivateRoute path="/admin/usuarios" exact component={Usuarios}/>
<PrivateRoute path="/admin/usuarios/cadastrar" exact component={UsuariosCadastrar}/>
<PrivateRoute path="/admin/usuarios/editar/:idUsuario" exact component={UsuariosEditar}/>

  </Switch>
</BrowserRouter>

  )
}