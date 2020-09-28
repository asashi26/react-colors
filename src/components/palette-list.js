import React from 'react'
import {Link} from 'react-router-dom'
import MiniPalette from './mini-palette'

const PaletteList = ({palettes}) => {
  return (
    <div>
      {palettes.map(palette => (
        <Link to={`/palette/${palette.id}`}>
          <MiniPalette {...palette} />
        </Link>
      ))}
    </div>
  )
}

export default PaletteList