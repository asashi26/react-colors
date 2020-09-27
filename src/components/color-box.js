import React, {Component} from 'react';
import './color-box.css'

class ColorBox extends Component {
  render() {
    return (
      <div style={{background: this.props.background}} className='color-box'>
        <span>{this.props.name}</span>
        <span>MORE</span>
      </div>
    )
  }
}

export default ColorBox