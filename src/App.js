import React from 'react';
import Pallete from './components/Pallete'
import seedColors from './seedColors'

function App() {
  return (
    <div>
     <Pallete {...seedColors[1]}/>
    </div>
  );
}

export default App;
