import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Pallete from './components/Pallete'
import seedColors from './seedColors'
import {generatePalette} from './colorHelpers'
import { Palette } from '@material-ui/icons';

function App() {
  console.log(generatePalette(seedColors[4]))

  const findPalette = (id) => {
     return seedColors.find(palette => palette.id === id )
  }
  return (
    <Switch>
      <Route exact path='/' render={() => <h1>Ahoj</h1>} />
      <Route exact path='/palette/:id' render={(routeProps) => <Pallete 
      palette={
        generatePalette(findPalette(routeProps.match.params.id))
      } 
      />} />
    </Switch>
    // <div>
    //  <Pallete palette={generatePalette(seedColors[4])}/>
    // </div>
  );
}

export default App;
