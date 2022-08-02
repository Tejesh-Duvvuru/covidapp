import StateDetails from './components/StateDetails' 
import Header from './components/Header'
import DistrictDetails from './components/DistrictDetails'
import { BrowserRouter, Route,  Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Switch>
        <Route exact path='/' component={StateDetails} />
        <Route exact path='/district/:statename' component={DistrictDetails} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

