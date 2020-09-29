import React, {Component} from 'react';
import ColorBox from './color-box'

class SingleColorPalette extends Component {
  constructor(props) {
    super(props)
    this._shades = this.gatherShades(this.props.palette, this.props.colorId)
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

  render() {
    const colorBox = this._shades.map(color => (
      <ColorBox key={color.id} name={color.name} background={color.hex} showLink={false} />
    ))
    return (
      <div className='palette'>
        <h1>single</h1>
        <div className='palette-colors'>{colorBox}</div>
      </div>
    )
  }
}

export default SingleColorPalette