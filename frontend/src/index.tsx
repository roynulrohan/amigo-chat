import ReactDOM from 'react-dom';
import './sass/index.scss';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import root from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

// create redux store
const store = createStore(root, composeWithDevTools());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
