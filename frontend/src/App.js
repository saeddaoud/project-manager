import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import EmployeeProfileScreen from './screens/EmployeeProfileScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegistrationScreen from './screens/RegistrationScreen';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={HomeScreen} />
        <Route exact path='/login' component={LoginScreen} />
        <Route exact path='/signup' component={RegistrationScreen} />
        <Route exact path='/profile/me' component={ProfileScreen} />
        <Route exact path='/profile/:id' component={EmployeeProfileScreen} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
