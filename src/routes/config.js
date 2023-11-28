import DashboardView from '../views/Dashboard';
import LoginForm from '../views/LoginForm';
import Home from '../pages/Home';
import Auth from '../pages/Auth'
import withPrivateAccess from '../hocs/withPrivateAccess';
import withPublicAccess from '../hocs/withPublicAccess';

const HomeWithPrivateAccess = withPrivateAccess(Home)
const AuthWithPublicAccess = withPublicAccess(Auth)

const config = [
  {
    pagePath: '/example/:id',
    element: <HomeWithPrivateAccess />, // Page
    views: [ // array of views under Page route
      {
        viewPath: 'route',
        element: <div>Example Route</div>
      },
      {
        viewPath: 'route1',
        element: <div>Example Route1</div>
      },
    ] 
  },
  {
    pagePath: '/login',
    element: <AuthWithPublicAccess />, // Page
    views: [ // array of views under Page route
      {
        viewPath: '',
        element: <LoginForm /> // view
      },
    ] 
  },
  {
    pagePath: '/',
    element: <HomeWithPrivateAccess />, // Page
    views: [ // array of views under Page route
      {
        viewPath: '',
        element: <DashboardView /> // view
      },
    ] 
  }
]

export default config;
