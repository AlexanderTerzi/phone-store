import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import { routes } from './routes';
import './scss/app.scss';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          {
            routes.map((item) => (
              <Route
                exact
                key={item.path}
                path={item.path}
                element={item.element} />
            ))
          }
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
