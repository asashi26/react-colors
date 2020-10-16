import React, {Component} from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'


class PaletteMetaForm extends Component {
  state = {
    open: false,
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

  handleClickOpen = () => {
    this.setState({
      open: true,
    })
  }

  handleClose = () => {
    this.setState({
      open: false,
    })
  }
  render() {
    const {newPaletteName} = this.state
    return (
        
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
          <ValidatorForm onSubmit={() => this.props.handleSubmit(newPaletteName)}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your palette. Make sure it is unique!
            </DialogContentText>
              <TextValidator
                fullWidth
                margin='normal'
                label='Palette Name'
                name='newPaletteName'
                value={this.state.newPaletteName}
                onChange={this.handleChange}
                validators={['required', 'isPaletteUnique']}
                errorMessages={['Enter palette name', 'Palette name must be unique']}
              />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button 
              onClick={this.handleClose} 
              variant='contained'
              color='primary' 
              type='submit'
            >
                Save Palette
            </Button>
          </DialogActions>
          </ValidatorForm> 
        </Dialog>
    );
  }
}

export default PaletteMetaForm