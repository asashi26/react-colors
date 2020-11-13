import React, {Component} from 'react'
import classNames from 'classnames'
import {withStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import {Button} from '@material-ui/core'
import DraggableColorList from './draggable-color-list'
import {arrayMove} from 'react-sortable-hoc'
import PaletteFormNav from './palette-form-nav'
import ColorPickerForm from './color-picker-form'
import styles from '../styles/new-palette-form-styles'
import seedColors from '../seedColors'

class NewPaletteForm extends Component {
	static defaultProps = {
		maxColors: 20,
	}
	state = {
		open: true,
		colors: seedColors[0].colors,
	}

	// Class property syntax tento zápis mi umožňuje používat funkce bez bind => nemusím mít constructor
	// state můžu mít jen v objektu tak jako výše
	handleDrawerOpen = () => {
		this.setState({open: true})
	}

	handleDrawerClose = () => {
		this.setState({open: false})
	}

	addNewColor = (newColor) => {
		this.setState({colors: [...this.state.colors, newColor]})
	}

	handleSubmit = (newPalette) => {
		newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-')
		newPalette.colors = this.state.colors
		this.props.savePalette(newPalette)
		this.props.history.push('/')
	}

	removeColor = (colorName) => {
		this.setState({
			//projede každou barvu v poli a porovná jestli odpovídá podmínce
			// když ano vloží ji do nového pole, když ne vynechá ji vrátí mi pole barev které odpovídají podmínce
			colors: this.state.colors.filter(
				(color) => color.name !== colorName
			),
		})
	}
	//po pohybu box uloží novou pozici
	onSortEnd = ({oldIndex, newIndex}) => {
		this.setState(({colors}) => ({
			colors: arrayMove(colors, oldIndex, newIndex),
		}))
	}

	onClearPalette = () => {
		this.setState({
			colors: [],
		})
	}

	checkDuplicateColor = (colorName) => {
		return this.state.colors.some((color) => color.name === colorName)
	}

	addRandomColor = () => {
		// Consider: validace aby randomColor už nebyla v naší paletě
		//pick random color from existing palettes
		// .flat() když mám array of arrays tak mi je to hodí do jedné array
		const allColors = this.props.palettes.map((p) => p.colors).flat()
		let rand
		let randomColor
		let isDuplicateColor = true
		while (isDuplicateColor) {
			// vybere random číslo z délky pole s barvami
			rand = Math.floor(Math.random() * allColors.length)
			// vrátí jeden object s barvou co je na indexu náhodného čísla
			randomColor = allColors[rand]
			isDuplicateColor = this.checkDuplicateColor(randomColor.name)
		}
		this.setState({
			colors: [...this.state.colors, randomColor],
		})
	}

	render() {
		const {classes, maxColors, palettes} = this.props
		const {open, colors} = this.state
		const paletteFull = colors.length >= maxColors

		return (
			<div className={classes.root}>
				<PaletteFormNav
					open={open}
					palettes={palettes}
					handleSubmit={this.handleSubmit}
					handleDrawerOpen={this.handleDrawerOpen}
				/>
				<Drawer
					className={classes.drawer}
					variant='persistent'
					anchor='left'
					open={open}
					classes={{
						paper: classes.drawerPaper,
					}}
				>
					<div className={classes.drawerHeader}>
						<IconButton onClick={this.handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<div className={classes.container}>
						<Typography variant='h4' gutterBottom>
							Design Your Palette
						</Typography>
						<div className={classes.buttons}>
							<Button
								variant='contained'
								color='secondary'
								onClick={this.onClearPalette}
								className={classes.button}
							>
								Clear Palette
							</Button>
							<Button
								variant='contained'
								color='primary'
								onClick={this.addRandomColor}
								disabled={paletteFull}
								className={classes.button}
							>
								Random Color
							</Button>
						</div>
						<ColorPickerForm
							paletteFull={paletteFull}
							addNewColor={this.addNewColor}
							colors={colors}
						/>
					</div>
				</Drawer>
				<main
					className={classNames(classes.content, {
						[classes.contentShift]: open,
					})}
				>
					<div className={classes.drawerHeader} />
					<DraggableColorList
						colors={colors}
						removeColor={this.removeColor}
						axis='xy'
						onSortEnd={this.onSortEnd}
						distance={20}
					/>
				</main>
			</div>
		)
	}
}

export default withStyles(styles, {withTheme: true})(NewPaletteForm)
