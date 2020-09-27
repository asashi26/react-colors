import React, {Component} from 'react';
import ColorBox from './color-box'
import './palette.css'
import Navbar from './navbar'

export default class Pallete extends Component {
  constructor(props) {
    super(props)
    this.state = {level: 500}
    this.changeLevel = this.changeLevel.bind(this)
  }

  changeLevel(level) {
    this.setState({level})
  }

  render() {
    const {colors} = this.props.palette
    const {level} = this.state
    const colorBoxes = colors[level].map(color => (
      <ColorBox background={color.hex} name={color.name} />
    ))

    return (
      <div className='palette'>
        <Navbar level={level} changeLevel={this.changeLevel} />
        <div className='palette-colors'>
          {colorBoxes}
        </div>
      </div>
    )
  }
}