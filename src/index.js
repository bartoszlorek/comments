import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import storeConfig from './redux/storeConfig';
import App from './components/App';

const store = storeConfig();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);