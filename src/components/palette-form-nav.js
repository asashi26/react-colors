import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import {Link} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button } from '@material-ui/core';
import PaletteMetaForm from './palette-meta-form'
import styles from '../styles/palette-form-nav-styles'

class PaletteFormNav extends Component {
 state = {
  formShowing: false,
 }

 showForm = () => {
   this.setState({
     formShowing: true,
   })
 }

 hideForm = () => {
  this.setState({
    formShowing: false,
  })
 }

  render() {
    console.log(this.state)
    const {classes, open, palettes, handleSubmit} = this.props
    return(
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color='default'
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
        <Toolbar disableGutters={!open}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={this.props.handleDrawerOpen}
            className={classNames(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            Create New Palette
          </Typography>
        </Toolbar>
        <div className={classes.navBtns}>
            <Button
              className={classes.button} 
              variant="contained" 
              color="primary" 
              onClick={this.showForm}
            >
              Save
            </Button>
            <Link to='/'>
              <Button 
                className={classes.button}
                variant='contained' 
                color='secondary'>
                  Go Back
              </Button>
            </Link>
          </div>
      </AppBar>
      {this.state.formShowing && (
        <PaletteMetaForm palettes={palettes} handleSubmit={handleSubmit} hideForm={this.hideForm} />
      )}
    </div>
    )
  }
}

export default withStyles(styles, {withTheme: true})(PaletteFormNav)