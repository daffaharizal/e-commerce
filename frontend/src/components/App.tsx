import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify/dist/ReactToastify.css';

import 'assets/css/App.css';

import { ToastAlert } from 'components/shared';
import { AuthProvider } from 'context/auth';
import Router from 'components/layout/Router';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <>
          <Router />
          <ToastAlert />
        </>
      </AuthProvider>
    </div>
  );
}

export default App;
