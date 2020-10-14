import React, {Component} from 'react'
import classNames from 'classnames';
import {Link} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button } from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'

class PaletteFormNav extends Component {
  state = {
    newPaletteName: '',
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isPaletteUnique', value => 
      this.props.palettes.every(({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase())
    );
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    const {classes, open} = this.props
    const {newPaletteName} = this.state
    return(
      
      <div>
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
            <ValidatorForm onSubmit={() => this.props.handleSubmit(newPaletteName)}>
              <TextValidator
                label='Palette Name'
                name='newPaletteName'
                value={this.state.newPaletteName}
                onChange={this.handleChange}
                validators={['required', 'isPaletteUnique']}
                errorMessages={['Enter palette name', 'Palette name must be unique']}
              />
              <Button 
                variant='contained'
                color='primary'
                type='submit'
              >Save Palette</Button>
              <Link to='/'>
                <Button variant='contained' color='secondary'>Go Back</Button>
              </Link>
            </ValidatorForm> 
          </Toolbar>
        </AppBar>
        </div>
    )
  }
}

export default PaletteFormNav