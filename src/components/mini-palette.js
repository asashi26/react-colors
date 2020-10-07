import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/mini-palette-styles'

function MiniPalette (props) {
  const {classes, paletteName, emoji, colors} = props
  const miniPaletteBoxes = colors.map(color => (
    <div
      className={classes.miniColor}
      style={{backgroundColor: color.color}}
      key={color.name}
    />
  ))
  return (
    <div className={classes.root} onClick={props.handleClick}>
      <div className={classes.colors}>
        {miniPaletteBoxes}
      </div>
      <h5 className={classes.title}>
        {paletteName}
        <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  )
}

export default withStyles(styles)(MiniPalette)