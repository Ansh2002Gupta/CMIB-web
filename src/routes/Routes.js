import { useRoutes } from "react-router-dom";
import getConfig from '../core/helpers/routes';
import config from './config'


function Routes() {
  const routes = useRoutes(getConfig(config))
  return routes
}

export default Routes
