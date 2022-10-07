import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify/dist/ReactToastify.css';

import 'assets/css/App.css';

import Router from 'components/layout/Router';

import { AuthProvider, QueryProvider } from 'context';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <QueryProvider>
          <Router />
        </QueryProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
