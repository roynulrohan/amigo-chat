import ReactDOM from 'react-dom';
import './sass/index.scss';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import root from './reducers';

// create redux store
const store = createStore(root);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
