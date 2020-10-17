import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'
import Pallete from './components/Pallete'
import SingleColorPalette from './components/single-color-palette'
import seedColors from './seedColors'
import {generatePalette} from './colorHelpers'
import PaletteList from './components/palette-list'
import NewPaletteForm from './components/new-palette-form'

class App extends Component {
  constructor(props) {
    super(props)
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'))
    this.state = {
      palettes: savedPalettes || seedColors,
    }
  }
  
   findPalette = (id) => {
     return this.state.palettes.find(palette => palette.id === id )
  }

   savePalette = (newPalette) => {
    this.setState({palettes: [...this.state.palettes, newPalette]}, this.syncLocalStorage)
  }

  syncLocalStorage() {
    // save palettes to local storage
    window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes))
  }

  render() {
    console.log(this.state)
  return (
    <Switch>
      <Route 
        exact 
        path='/palette/new' 
        render={(routeProps) => <NewPaletteForm 
          savePalette={this.savePalette} 
          {...routeProps} 
          palettes={this.state.palettes}
          />}
      />
       <Route 
        exact
        path='/palette/:paletteId/:colorId'
        render={(routeProps) => (
          <SingleColorPalette 
            colorId={routeProps.match.params.colorId}
            palette={
              generatePalette(this.findPalette(routeProps.match.params.paletteId))
            } 
          />
        )} 
      />
      <Route 
        exact 
        path='/' render={(routeProps) => (
          <PaletteList palettes={this.state.palettes} {...routeProps} />
        )} 
      />
      <Route 
        exact 
        path='/palette/:id' 
        render={(routeProps) => (
          <Pallete 
            palette={
              generatePalette(this.findPalette(routeProps.match.params.id))
            } 
          />
        )} 
      />
    </Switch>
    // <div>
    //  <Pallete palette={generatePalette(seedColors[4])}/>
    // </div>
  );
}
}

export default App;
