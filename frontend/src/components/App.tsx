import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'assets/css/App.css';

import { AuthProvider } from 'context/auth';
import Router from 'components/layout/router';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router />
      </AuthProvider>
    </div>
  );
}

export default App;
