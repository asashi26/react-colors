import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Pallete from './components/Pallete'
import SingleColorPalette from './components/single-color-palette'
import seedColors from './seedColors'
import {generatePalette} from './colorHelpers'
import { Palette } from '@material-ui/icons';
import PaletteList from './components/palette-list'

function App() {
  console.log(generatePalette(seedColors[4]))

  const findPalette = (id) => {
     return seedColors.find(palette => palette.id === id )
  }
  return (
    <Switch>
      <Route 
        exact 
        path='/' render={(routeProps) => (
          <PaletteList palettes={seedColors} {...routeProps} />
        )} 
      />
      <Route 
        exact 
        path='/palette/:id' render={(routeProps) => (
          <Pallete 
            palette={
              generatePalette(findPalette(routeProps.match.params.id))
            } 
      />)} 
      />
      <Route 
        exact
        path='/palette/:paletteId/:colorId'
        render={() => <SingleColorPalette />} 
      />
    </Switch>
    // <div>
    //  <Pallete palette={generatePalette(seedColors[4])}/>
    // </div>
  );
}

export default App;
