import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import EmployeeDetailsScreen from './screens/EmployeeDetailsScreen';
import EmployeeProfileScreen from './screens/EmployeeProfileScreen';
import EmployeesProjectsScreen from './screens/EmployeesProjectsScreen';
import EmployeesScreen from './screens/EmployeesScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProjectScreen from './screens/ProjectScreen';
import ProjectsScreen from './screens/ProjectsScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import TaskScreen from './screens/TaskScreen';
import TasksScreen from './screens/TasksScreen';
import EmployeeTaskScreen from './screens/EmployeeTaskScreen';
import EmployeeTasksScreen from './screens/EmployeeTasksScreen';

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
          <Route exact path='/employee/tasks' component={EmployeeTasksScreen} />
          <Route
            exact
            path='/employees/projects'
            component={EmployeesProjectsScreen}
          />
          <Route exact path='/employees' component={EmployeesScreen} />
          <Route
            exact
            path='/admin/employee-details/:id'
            component={EmployeeDetailsScreen}
          />
          <Route exact path='/profile/:id' component={EmployeeProfileScreen} />
          <Route exact path='/project/:id' component={ProjectScreen} />
          <Route exact path='/task/:id' component={TaskScreen} />
          <Route
            exact
            path='/employee/task/:id'
            component={EmployeeTaskScreen}
          />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
