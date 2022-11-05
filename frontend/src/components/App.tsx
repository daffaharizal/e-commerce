import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import Router from 'components/layouts/Router';

import ContextProvider from 'context/providers';

import 'assets/css/App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ContextProvider>
          <Router />
        </ContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
