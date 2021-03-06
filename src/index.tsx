/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { render } from 'react-dom';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import { ConnectedRouter } from 'react-router-redux';

import { createBrowserHistory as createHistory } from 'history';
import * as queryString from 'query-string';
import * as jwtDecode from 'jwt-decode';

import * as appConfig from './core/constants/app.constants';
import { config } from './config/config';
import configureStore from './store/store.config';

import { IJwtDecoded } from './core/auth/auth';
import { setTokenAndIdAction, receiveLoginAction } from './actions/auth.action';

import App from './components/pages/App/App';

// -----------------------------------

// If come from another domain, redirect to base domain
if (!location.href.includes('https://stylepill.netlify.app/') && !appConfig.DEBUG) {
    location.replace('https://stylepill.netlify.app/');
}

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Get server config object
let serverConfig = config.getServerConfig();


// Initialize apollo client
// TODO: Hacer más disciente que estoy exportando el 'client'
export const client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: serverConfig.dataBaseUrl
    }),
});


// Initialize store
const store = configureStore();

let token = localStorage.token;
let user = localStorage.user ? JSON.parse(localStorage.user) : undefined;

// Get Token and User User from LocalStorage
/* TODO: Estoy tomando lo que haya en la url y asumiendo que es un Token valido, 
si no valido que es un Token valido, el usuario va a creer que esta logueado, y yo
voy a creer que el usuario esta logueado, y cuando quiera hacer una peticion va a decir
como si no estuviera logueado.*/
if (!token || !user) {

    // If there is a query string
    if (location.search) {
        const parsed = queryString.parse(location.search);

        // If query string is 'token'
        if (parsed.token) {
            const decoded: IJwtDecoded = jwtDecode(parsed.token);
            token = decoded.token;
            user = decoded.user;
            // Set Token an User on Store and Local Storage
            store.dispatch(setTokenAndIdAction(token, user));
        }

    } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
} else  {
    // Set Token an User on Store
    store.dispatch(receiveLoginAction(user));
}



/*         RENDER         */
/**************************/
render((
    <ApolloProvider store={store} client={client}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </ApolloProvider>
), document.getElementById('root'));