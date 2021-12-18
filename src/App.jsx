import React, { useState, useEffect } from 'react';
import PrivateLayout from 'layouts/PrivateLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from 'context/userContext';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import 'styles/globals.css';
import 'styles/tabla.css';
import Register from 'pages/auth/register';
import Login from 'pages/auth/login';
import Index from 'pages/Index';
import IndexUsuarios from 'pages/usuarios';
import EditarUsuario from 'pages/usuarios/editar';
import IndexPerfil from 'pages/Perfil';
import EditarInscripciones from 'pages/inscripciones/editar';
import IndexInscripciones from 'pages/inscripciones';
import IndexProyectos from 'pages/proyectos';
import EditarProyecto from 'pages/proyectos/editar';
import VerProyecto from 'pages/proyectos/ver';
import CrearProyecto from 'pages/proyectos/crear';
import IndexAvances from 'pages/avances';
import CrearAvance from 'pages/avances/crear';
import EditarAvance from 'pages/avances/editar';
import VerAvance from 'pages/avances/ver';
import AuthLayout from 'layouts/AuthLayout';
import { AuthContext } from 'context/authContext';
import jwt_decode from 'jwt-decode';

// import PrivateRoute from 'components/PrivateRoute';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = JSON.parse(localStorage.getItem('token'));
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

function App() {
  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState('');

  const setToken = (token) => {
    console.log('set token', token);
    setAuthToken(token);
    if (token) {
      localStorage.setItem('token', JSON.stringify(token));
    } else {
      localStorage.removeItem('token');
    }
  };

  useEffect(() => {
    if (authToken) {
      const decoded = jwt_decode(authToken);
      setUserData({
        _id: decoded._id,
        nombre: decoded.nombre,
        apellido: decoded.apellido,
        identificacion: decoded.identificacion,
        correo: decoded.correo,
        rol: decoded.rol,
        estado:decoded.estado
      });
    }
  }, [authToken]);
  
  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ authToken, setAuthToken, setToken }}>
      <UserContext.Provider value={{ userData, setUserData }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<PrivateLayout />}>
              <Route path='' element={<Index />} />
              <Route path='/inscripciones' element={<IndexInscripciones />} />
              <Route path='/inscripciones/editar/:_id' element={<EditarInscripciones />} /> 
              <Route path='/proyectos' element={<IndexProyectos />} />
              <Route path='/proyectos/editar/:_id' element={<EditarProyecto />} />
              <Route path='/proyectos/ver/:_id' element={<VerProyecto />} />
              <Route path='/proyectos/crear' element={<CrearProyecto />} />
              <Route path='/avances' element={<IndexAvances />} />
              <Route path='/avances/crear' element={<CrearAvance />} />
              <Route path='/avances/editar/:_id' element={<EditarAvance />} />
              <Route path='/avances/ver/:_id' element={<VerAvance />} />
              <Route path='/usuarios' element={<IndexUsuarios />} />
              <Route path='/usuarios/editar/:_id' element={<EditarUsuario />} />              
              <Route path='/perfil' element={<IndexPerfil />} />              
            </Route>
            <Route path="/auth" element={<AuthLayout/>}>
              <Route path='register' element={<Register/>}/>
              <Route path='login' element={<Login/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
