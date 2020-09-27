import React from 'react';
import Pallete from './components/Pallete'
import seedColors from './seedColors'
import {generatePalette} from './colorHelpers'

function App() {
  console.log(generatePalette(seedColors[4]))
  return (
    <div>
     <Pallete palette={generatePalette(seedColors[4])}/>
    </div>
  );
}

export default App;
