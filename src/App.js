import './App.css';
import Header from './components/ui/Header';
import AllCities from './components/pages/all/AllCities'
import ShortListedCities from './components/pages/all/ShortListedCities'
import {Switch, Route, Redirect} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route path="/all" component= {AllCities}/>
        <Route path="/shortlisted" component= {ShortListedCities}/>
        <Route path="/" exact render = {()=> <Redirect to="/all" />} />
      </Switch>

    </div>
  );
}

export default App;
