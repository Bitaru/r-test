import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Router from './pages';


const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Router />
    </AppContainer>,
    document.getElementById('root')
  );
};

render();

if (module.hot) {
  module.hot.accept('./pages', render);
}
