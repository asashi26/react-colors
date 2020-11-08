import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import styles from '../styles/mini-palette-styles'
import DeleteIcon from '@material-ui/icons/Delete'

function MiniPalette(props) {
	const {
		classes,
		paletteName,
		emoji,
		colors,
		openDialog,
		id,
		goToPalette,
	} = props
	const miniPaletteBoxes = colors.map((color) => (
		<div
			className={classes.miniColor}
			style={{backgroundColor: color.color}}
			key={color.name}
		/>
	))

	const handleClick = () => {
		goToPalette(props.id)
	}

	const deletePalette = (e) => {
		e.stopPropagation()
		openDialog(id)
	}

	return (
		<div className={classes.root} onClick={handleClick}>
			<DeleteIcon
				className={classes.deleteIcon}
				onClick={deletePalette}
			/>
			<div className={classes.colors}>{miniPaletteBoxes}</div>
			<h5 className={classes.title}>
				{paletteName}
				<span className={classes.emoji}>{emoji}</span>
			</h5>
		</div>
	)
}

export default withStyles(styles)(MiniPalette)
