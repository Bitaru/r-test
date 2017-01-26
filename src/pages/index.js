import { Route, browserHistory, Router } from 'react-router';

const route = promise =>
  (_, cb) =>
    promise.then(module => cb(null, module.default)).catch(e => cb(e, null));

const routes = (
  <Route path='/' getComponent={route(import('./Root'))} />
);

export default () => (
  <Router history={browserHistory} routes={routes} />
);
