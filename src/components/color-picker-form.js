import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles'
import {ChromePicker} from 'react-color'
import {Button} from '@material-ui/core'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import styles from '../styles/color-picker-form-styles'

class ColorPickerForm extends Component {
	state = {
		currentColor: 'teal',
		newColorName: '',
	}

	componentDidMount() {
		// custom rule will have name 'isPasswordMatch'
		// The every() method tests whether all elements in the array pass the test
		// implemented by the provided function. It returns a Boolean value.
		ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
			this.props.colors.every(
				({name}) => name.toLowerCase() !== value.toLowerCase()
			)
		)
		ValidatorForm.addValidationRule('isColorUnique', (value) =>
			this.props.colors.every(
				({color}) => color !== this.state.currentColor
			)
		)
	}

	updateCurrentColor = (newColor) => {
		this.setState({currentColor: newColor.hex})
	}

	// jednou nastavuje paletteName a jednou colorName, podle toho co za name mu přijde - přesunuto do separátních files
	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value})
	}

	handleSubmit = () => {
		const newColor = {
			color: this.state.currentColor,
			name: this.state.newColorName,
		}
		this.props.addNewColor(newColor)
		this.setState({
			newColorName: '',
		})
	}

	render() {
		const {paletteFull, classes} = this.props
		const {currentColor, newColorName} = this.state
		return (
			<div className={classes.root}>
				<ChromePicker
					color={currentColor}
					onChangeComplete={(newColor) =>
						this.updateCurrentColor(newColor)
					}
					className={classes.picker}
				/>
				<ValidatorForm
					onSubmit={this.handleSubmit}
					instantValidate={false}
				>
					<TextValidator
						value={newColorName}
						name='newColorName'
						placeholder='Color Name'
						onChange={this.handleChange}
						className={classes.colorNameInput}
						margin='normal'
						variant='filled'
						validators={[
							'required',
							'isColorNameUnique',
							'isColorUnique',
						]}
						errorMessages={[
							'Enter a color name',
							'Color name must be unique',
							'Color already used',
						]}
					/>
					<Button
						variant='contained'
						color='primary'
						style={{
							backgroundColor: paletteFull
								? 'grey'
								: currentColor,
						}}
						type='submit'
						disabled={paletteFull}
						className={classes.addColor}
					>
						{paletteFull ? 'Palette Full' : 'Add Color'}
					</Button>
				</ValidatorForm>
			</div>
		)
	}
}

export default withStyles(styles)(ColorPickerForm)
