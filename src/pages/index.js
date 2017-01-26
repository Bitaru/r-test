import { Route, browserHistory, Router } from 'react-router';

const route = promise =>
  (_, cb) =>
    promise.then(module => cb(null, module.default)).catch(e => cb(e, null));

const routes = (
  <Route>
    <Route path='/' getComponent={route(import('./Root'))} />
    <Route path='/2' getComponent={route(import('./Root2'))} />
  </Route>
);

export default () => (
  <Router history={browserHistory} routes={routes} />
);
