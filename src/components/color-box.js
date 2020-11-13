import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import classNames from 'classnames'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import styles from '../styles/color-box-styles'

class ColorBox extends Component {
	constructor(props) {
		super(props)
		this.state = {copied: false}
		this.changeCopyState = this.changeCopyState.bind(this)
	}

	changeCopyState() {
		this.setState({copied: true}, () => {
			setTimeout(() => this.setState({copied: false}), 1500)
		})
	}

	render() {
		const {
			name,
			background,
			paletteId,
			id,
			showingFullPalette,
			classes,
		} = this.props
		const {copied} = this.state

		return (
			<CopyToClipboard text={background} onCopy={this.changeCopyState}>
				<div style={{background}} className={classes.colorBox}>
					<div
						style={{background}}
						className={classNames(classes.copyOverlay, {
							[classes.showOverlay]: copied,
						})}
					/>
					<div
						className={classNames(classes.copyMsg, {
							[classes.showCopyMsg]: copied,
						})}
					>
						<h2>Copied!</h2>
						<p className={classes.copyText}>{background}</p>
					</div>
					<div>
						<div className={classes.boxContent}>
							<span className={classes.colorName}>{name}</span>
						</div>
						<button className={classes.copyButton}>Copy</button>
					</div>
					{/* stop propagation zajišťuje aby se nespustila jiná akce
          než ten link, aby to i nezkopírovalo barvu jako zbytek color boxu */}
					{/* check relative routes in react router - přístup k informaci kde zrovna jsme / current url */}
					{showingFullPalette && (
						<Link
							to={`/palette/${paletteId}/${id}`}
							onClick={(e) => e.stopPropagation}
						>
							<span className={classes.seeMore}>More</span>
						</Link>
					)}
				</div>
			</CopyToClipboard>
		)
	}
}

export default withStyles(styles)(ColorBox)
