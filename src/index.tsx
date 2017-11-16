/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';

import createHistory from 'history/createBrowserHistory';
import * as queryString from 'query-string';
import * as jwtDecode from 'jwt-decode';

import { config } from './config/config';
import configureStore from './store/store.config';

import { IJwtDecoded } from './auth/auth';
import { setTokenAndIdAction } from './actions/auth.action';

import App from './components/pages/App/App';

// -----------------------------------

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Get server config object
let serverConfig = config.getServerConfig();


// Initialize apollo client
const client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: serverConfig.dataBaseUrl
    }),
});


// Initialize store
const store = configureStore();

// Current user id
// let currentUserId = null;


let token = localStorage.token;
let id = localStorage.userId;

// Get Token and User Id from LocalStorage
/* TODO: Estoy tomando lo que haya en la url y asumiendo que es un Token valido, 
si no valido que es un Token valido, el usuario va a creer que esta logueado, y yo
voy a creer que el usuario esta logueado, y cuando quiera hacer una peticion va a decir
como si no estuviera logueado.*/
if (!token || !id) {
    if (location.search) {
        const parsed = queryString.parse(location.search);
        const decoded: IJwtDecoded = jwtDecode(parsed.token);
        token = decoded.token;
        id = decoded.id;
    } else {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
    }
}

if (token && id) {
    // Set Token an Id on Store and Local Storage
    store.dispatch(setTokenAndIdAction(token, id));
}



/*         RENDER         */
/**************************/
render((
    <ApolloProvider store={store} client={client}>
        <Router history={history}>
            <App />
        </Router>
    </ApolloProvider>
), document.getElementById('root'));