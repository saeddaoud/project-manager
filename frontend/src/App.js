import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import EmployeeProfileScreen from './screens/EmployeeProfileScreen';
import EmployeesScreen from './screens/EmployeesScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProjectScreen from './screens/ProjectScreen';
import ProjectsScreen from './screens/ProjectsScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import TasksScreen from './screens/TasksScreen';

function App() {
  return (
    <Router>
      <Header />
      <div className='page'>
      <Switch>
        <Route exact path='/' component={HomeScreen} />
        <Route exact path='/login' component={LoginScreen} />
        <Route exact path='/signup' component={RegistrationScreen} />
        <Route exact path='/profile/me' component={ProfileScreen} />
        <Route exact path='/projects' component={ProjectsScreen} />
        <Route exact path='/tasks' component={TasksScreen} />
        <Route exact path='/employees/projects' component={ProjectsScreen} />
        <Route exact path='/employees' component={EmployeesScreen} />
        <Route exact path='/profile/:id' component={EmployeeProfileScreen} />
        <Route exact path='/project/:id' component={ProjectScreen} />
      </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
