import React, {Component} from 'react';
import ColorBox from './color-box'
import Navbar from './navbar';
import PaletteFooter from './palette-footer';

class SingleColorPalette extends Component {
  constructor(props) {
    super(props)
    this.state = {format: 'hex'}
    this._shades = this.gatherShades(this.props.palette, this.props.colorId)
    this.changeFormat = this.changeFormat.bind(this)
  }

  gatherShades(palette, colorToFilterBy) {
     // return all shades of given color from palette
    let shades = []
    let allColors = palette.colors
    for(let key in allColors) {
      shades = shades.concat(
        allColors[key].filter(color => color.id === colorToFilterBy)
      )
    }
    // slice(1) odstraní první položku z pole - vrací nové pole
    return shades.slice(1)
  }

  changeFormat(value) {
    this.setState({format: value})
  }

  render() {
    const {format} = this.state
    const colorBox = this._shades.map(color => (
      <ColorBox 
        key={color.id} 
        name={color.name} 
        background={color[format]} 
        showLink={false} />
    ))
    const {paletteName, emoji} = this.props.palette
    return (
      <div className='palette'>
        <Navbar 
          handleChange={this.changeFormat}
          showingAllColors={false}
        />
        <div className='palette-colors'>{colorBox}</div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    )
  }
}

export default SingleColorPalette