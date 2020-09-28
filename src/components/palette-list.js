import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import MiniPalette from './mini-palette'
import { withStyles } from '@material-ui/core/styles';
import { getThemeProps } from '@material-ui/styles';

const styles = {
  root: {
    backgroundColor: 'blue',
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    color: 'white',
  },
  container: {
    width: '50%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  nav: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between'
  },
  palettes: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 30%)',
    gridGap: '5%',
    '& a': {
      textDecoration: 'none',
    }
  }
}

class PaletteList extends Component {
  render() {
    const {palettes, classes} = this.props
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Colors</h1>
          </nav>
          <div className={classes.palettes}>
            {palettes.map(palette => (
              <Link to={`/palette/${palette.id}`}>
                <MiniPalette {...palette} />
              </Link>
          ))}
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(PaletteList)