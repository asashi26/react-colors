import React, {Component} from 'react'
import {Picker} from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'

class PaletteMetaForm extends Component {
	state = {
		stage: 'form',
		newPaletteName: '',
		emoji: '',
	}

	componentDidMount() {
		ValidatorForm.addValidationRule('isPaletteUnique', (value) =>
			this.props.palettes.every(
				({paletteName}) =>
					paletteName.toLowerCase() !== value.toLowerCase()
			)
		)
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value})
	}

	handleClickOpen = () => {
		this.setState({open: true})
	}

	handleClose = () => {
		this.setState({open: false})
	}

	showEmojiPicker = () => {
		this.setState({stage: 'emoji'})
	}

	savePalette = () => {
		const newPalette = {
			paletteName: this.state.newPaletteName,
			emoji: this.state.emoji,
		}
		this.props.handleSubmit(newPalette)
		this.setState({stage: ''})
	}

	saveEmoji = (emoji) => {
		this.setState({emoji: emoji.native})
	}

	render() {
		const {stage, newPaletteName} = this.state
		const {hideForm} = this.props
		return (
			<div>
				<Dialog open={stage === 'emoji'} onClose={hideForm}>
					<DialogTitle id='form-dialog-title'>
						Choose a Palette Emoji
					</DialogTitle>
					<Picker
						onSelect={this.saveEmoji}
						title='Pick a palette emoji'
					/>
					<DialogActions>
						<Button onClick={hideForm} color='primary'>
							Cancel
						</Button>
						<Button
							variant='contained'
							color='primary'
							type='submit'
							onClick={this.savePalette}
						>
							Save Palette
						</Button>
					</DialogActions>
				</Dialog>
				<Dialog
					open={stage === 'form'}
					onClose={hideForm}
					aria-labelledby='form-dialog-title'
				>
					<DialogTitle id='form-dialog-title'>
						Choose a Palette Name
					</DialogTitle>
					<ValidatorForm onSubmit={this.showEmojiPicker}>
						<DialogContent>
							<DialogContentText>
								Please enter a name for your palette. Make sure
								it is unique!
							</DialogContentText>
							<TextValidator
								fullWidth
								margin='normal'
								label='Palette Name'
								name='newPaletteName'
								value={newPaletteName}
								onChange={this.handleChange}
								validators={['required', 'isPaletteUnique']}
								errorMessages={[
									'Enter palette name',
									'Palette name must be unique',
								]}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={hideForm} color='primary'>
								Cancel
							</Button>
							<Button
								variant='contained'
								color='primary'
								type='submit'
							>
								Save Palette
							</Button>
						</DialogActions>
					</ValidatorForm>
				</Dialog>
			</div>
		)
	}
}

export default PaletteMetaForm
