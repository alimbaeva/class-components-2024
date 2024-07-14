import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../app/styles/style.css';
import Page404 from './page/Page404';
import Main from './page/Main';

const App: React.FC = () => {
  return (
    <Router>
      <main data-testid="app-content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
