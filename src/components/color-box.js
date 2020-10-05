import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import chroma from 'chroma-js'
import './color-box.css'
import {CopyToClipboard} from 'react-copy-to-clipboard'

const styles = {
  colorBox: {
    width: '20%',
    height: props => props.showingFullPalette ? '25%' : '50%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-4px',
    '&:hover button': {
      opacity: 1,
    }
  },
  copyText: {
    color: props => chroma(props.background).luminance() >= 0.65 ? 'black' : 'white'
  },
  colorName: {
    color: props => chroma(props.background).luminance() <= 0.08 ? 'white' : 'black'
  },
  seeMore: {
    color: props => chroma(props.background).luminance() >= 0.65 ? 'rgba(0,0,0,0.6)' : 'white',
    background:'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
    border: 'none',
    right: '0',
    bottom: '0',
    width: '60px',
    height: '30px',
    textAlign: 'center',
    lineHeight: '30px',
    textTransform: 'uppercase'
  },

  copyButton: {
    color: props => chroma(props.background).luminance() >= 0.65 ? 'rgba(0,0,0,0.6)' : 'white',
    width: '100px',
    height: '30px',
    position: 'absolute',
    display: 'inlineBlock',
    top: '50%',
    left: '50%',
    marginLeft: '-50px',
    marginTop: '-15px',
    textAlign: 'center',
    outline: 'none',
    background: 'rgba(255, 255, 255, 0.3)',
    fontSize: '1rem',
    lineHeight: '30px',
    textTransform: 'uppercase',
    border: 'none',
    cursor: 'pointer',
    opacity: 0,
  }
}


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
               className={`copy-overlay ${copied && 'show'}`} 
          />
          <div className={`copy-msg ${copied && 'show'}`}>
            <h2>Copied!</h2>
            <p className={classes.copyText}>{background}</p>
          </div>
          <div className='copy-container'>
            <div className='box-content'>
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