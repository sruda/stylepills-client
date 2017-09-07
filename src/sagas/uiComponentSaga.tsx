import { put, call } from 'redux-saga/effects';
import getUiComponents from '../api/api';
import * as types from '../constants/actionTypes';

// Responsible for get UI components from server, making calls to the API
// and instructing the redux-saga middleware on the next line of action, 
// for success or failure operation.

export default function* getUiComponentsSaga () {
    try {
        console.log('(1.8) Enter to getUiComponentsSaga on sagas/uiComponentSaga.tsx');    
        console.log('(1.9) Launch yield: call - getUiComponents API on sagas/uiComponentSaga.tsx');
        const uiComponents = yield call(getUiComponents);
        console.log('(1.11) After yield call getUIComponents API on sagas/uiComponentSaga.tsx', uiComponents);

        /*yield[
            put({ type: types.GET_UICOMPONENT_SUCCESS, uiComponents }),
            put({ type: types.SELECT_UICOMPONENT, uiComponent: uiComponents[0] })
        ];*/

        console.log('(1.12) Launch yield: put - GET_UICOMPONENT_FULFILLED on sagas/uiComponentSaga.tsx');
        yield[
            put({ type: types.GET_UICOMPONENT_FULFILLED, payload: uiComponents })
        ];

    } catch (error) {
        yield put({ type: types.GET_UICOMPONENT_ERROR, error });
    }
}


/*
Teoria:

- call: Es un 'effect' de redux-saga que le dice al middleware que ejecute una funcion que 
es pasada como primer parametro, y que esa funcion lleve como parametro el 'payload' (el cual
es opcional).

Flujo:

1. getUiComponentsSaga es llamado por el saga watcher (watchGetUiComponent definido en ./sagas/watcher.tsx),
cada vez que la action 'GET_UICOMPONENT' es despachado hacia el Store.

2. Esta Saga, sirve como intermediario entre la API y los reducers.

3. Por lo tanto, cuando se llama a la saga (getUiComponentsSaga), esta realiza la llamada
'call' a la API (getUiComponents) con el 'payload'. Entonces el resultado de la promesa
(resuelto o rechazado) y un action object son lanzados (yield) al reducer usando el effect creator: 'put'.

4. 'put' le dice al middleware que action despachar.

5. Note, que estamos 'yieldeando' un array de effects. Esto es por que queremos que se ejecuten
simultaneamente. El comportamiento por defecto seria pausar después de cada declaración 'yield'
el cual no es el comportamiento que queremos.

6. Finalmente, si alguna de las operaciones falla, le decimos al middleware 'put' que despache una
action de Falla (GET_UICOMPONENT_ERROR).




*/