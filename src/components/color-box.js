import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import chroma from 'chroma-js'
import './color-box.css'
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
    const {name, background, paletteId, id, showLink} = this.props
    const {copied} = this.state
    const isDarkColor = chroma(background).luminance() <= 0.08
    const isLightColor = chroma(background).luminance() >= 0.65

    return (
      <CopyToClipboard  text={background} onCopy={this.changeCopyState}>
        <div style={{background}} className='color-box'>
          <div style={{background}} 
               className={`copy-overlay ${copied && 'show'}`} 
          />
          <div className={`copy-msg ${copied && 'show'}`}>
            <h2>Copied!</h2>
            <p className={isLightColor && 'dark-text'}>{background}</p>
          </div>
          <div className='copy-container'>
            <div className='box-content'>
              <span className={isDarkColor && 'light-text'}>{name}</span>
            </div>
            <button className={`copy-button ${isLightColor && 'dark-text'}`}>Copy</button>
          </div>
          {/* stop propagation zajišťuje aby se nespustila jiná akce 
          než ten link, aby to i nezkopírovalo barvu jako zbytek color boxu */}
          {/* check relative routes in react router - přístup k informaci kde zrovna jsme / current url */}
          {showLink && (
            <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation}>
              <span className={`see-more ${isLightColor && 'dark-text'}`}>More</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    )
  }
}

export default ColorBox