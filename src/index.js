import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import storeConfig from './redux/storeConfig';
import App from './components/App';
import { addComment } from './redux/actions';

const store = storeConfig();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);

store.dispatch(
    addComment({
        text: 'Sample comment text'
    })
);