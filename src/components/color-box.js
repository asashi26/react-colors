import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/color-box-styles'
import {CopyToClipboard} from 'react-copy-to-clipboard'

class ColorBox extends Component {
  constructor(props) {
    super(props)
    this.state = { copied: false }
    this.changeCopyState = this.changeCopyState.bind(this)
  }

  changeCopyState() {
    this.setState({copied: true}, () => {
      setTimeout(() => this.setState({copied: false}), 1500)
    })
  }

  render() {
    const {name, background, paletteId, id, showingFullPalette, classes} = this.props
    const {copied} = this.state


    return (
      <CopyToClipboard  text={background} onCopy={this.changeCopyState}>
        <div style={{background}} className={classes.colorBox}>
          <div style={{background}} 
               className={`${classes.copyOverlay} ${copied && classes.showOverlay}`} 
          />
          <div className={`${classes.copyMsg} ${copied && classes.showCopyMsg}`}>
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
            <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation}>
              <span className={classes.seeMore}>More</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    )
  }
}

export default withStyles(styles)(ColorBox)