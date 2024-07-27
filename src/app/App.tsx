import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../app/styles/style.css';
import Page404 from './page/Page404';
import Main from './page/Main';
import { useTheme } from './components/ThemeProvider';

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Router>
      <main
        data-testid="app-content"
        style={{
          background: theme === 'light' ? '#fff' : '#333',
          color: theme === 'light' ? '#000' : '#fff',
        }}
      >
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
