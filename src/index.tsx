import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import App from './app';
import store from './store';
import { loadPricesApi } from './store/price';

/**
 * The load price api call is made before the App component initialization in order to win time.
 */
store.dispatch(loadPricesApi());

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();
