import React, {useState} from 'react';

// Connect common file with styles to all components and common file with media styles
import './App.css';
import './media.css';

import Nav from './components/Nav.js';
import Main from './components/Main.js';

// Create context file for users data and loader
import Context from './context';

function App() {

  const [userData, setUserData] = useState(null);
  const [ifLoad, setIfLoad] = useState(false);

  return (
    <Context.Provider value={{userData, setUserData, ifLoad, setIfLoad}}>
      <div className="app">
          <Nav />
          <Main />
      </div>
    </Context.Provider>
  );
}

export default App;
