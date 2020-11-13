import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles'
import ColorBox from './color-box'
import Navbar from './navbar'
import PaletteFooter from './palette-footer'
import styles from '../styles/palette-styles'

class Pallete extends Component {
	constructor(props) {
		super(props)
		this.state = {level: 500, format: 'hex'}
		this.changeLevel = this.changeLevel.bind(this)
		this.changeFormat = this.changeFormat.bind(this)
	}

	changeLevel(level) {
		this.setState({level})
	}

	changeFormat(value) {
		this.setState({format: value})
	}

	render() {
		const {classes} = this.props
		const {colors, paletteName, emoji, id} = this.props.palette
		const {level, format} = this.state
		const colorBoxes = colors[level].map((color) => (
			<ColorBox
				background={color[format]}
				name={color.name}
				key={color.id}
				// id a paletteId potřebujeme poslat do colorboxu proto abychom mohli
				// specifikovat routu pro fukcionalitu tlačítka More
				id={color.id}
				paletteId={id}
				// nebo můžeme zkonstruovat url už tady a poslat hotovou url
				// moreUrl={{`/palette/${id}/${color.id}`}}
				showingFullPalette
			/>
		))

		return (
			<div className={classes.palette}>
				<Navbar
					level={level}
					changeLevel={this.changeLevel}
					handleChange={this.changeFormat}
					showingAllColors
				/>
				<div className={classes.colors}>{colorBoxes}</div>
				<PaletteFooter paletteName={paletteName} emoji={emoji} />
			</div>
		)
	}
}

export default withStyles(styles)(Pallete)
