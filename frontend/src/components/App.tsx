import React from 'react';
import 'assets/css/App.css';
import NavBar from 'components/layout/nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { AuthPage } from 'components/feature/auth';

function App() {
  return (
    <div className="App">
      <NavBar />
      <AuthPage />
    </div>
  );
}

export default App;
