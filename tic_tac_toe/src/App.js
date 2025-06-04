import React from 'react';
import './App.css';
import TicTacToeMainContainer from './TicTacToeMainContainer';

function App() {
  // Replace the default template hero with our main TicTacToe game
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <button className="btn" tabIndex={-1} disabled>Template Button</button>
          </div>
        </div>
      </nav>

      <main>
        {/* Render the centered TicTacToe main container */}
        <TicTacToeMainContainer />
      </main>
    </div>
  );
}

export default App;