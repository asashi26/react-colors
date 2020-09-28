import React, {Component} from 'react';
import ColorBox from './color-box'
import './palette.css'
import Navbar from './navbar'

export default class Pallete extends Component {
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
    const {colors} = this.props.palette
    const {level, format} = this.state
    const colorBoxes = colors[level].map(color => (
      <ColorBox background={color[format]} name={color.name} />
    ))

    return (
      <div className='palette'>
        <Navbar 
          level={level} 
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
          />
        <div className='palette-colors'>
          {colorBoxes}
        </div>
      </div>
    )
  }
}