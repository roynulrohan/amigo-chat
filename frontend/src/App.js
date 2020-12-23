import { BrowserRouter as Router, Route } from 'react-router-dom';
import './sass/App.scss';
import Chat from './components/chat';
import SideBar from './components/sidebar';
import Login from './components/login';

function App() {
    return (
        <div>
            <Router>
                <Route path='/' exact>
                    <SideBar />
                    <Chat />
                </Route>
                <Route path='/login' component={Login} />
            </Router>
        </div>
    );
}

export default App;
