import { Route, browserHistory, Router } from 'react-router';

import Root from './Root';

const routes = (
  <Route path='/' component={Root} />
);

export default () => (
  <Router history={browserHistory} routes={routes} />
);
