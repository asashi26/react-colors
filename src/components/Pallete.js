import React, {Component} from 'react';
import ColorBox from './color-box'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import './palette.css'

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
        <div className='slider'>
          <Slider 
            defaultValue={this.state.level} 
            min={100}
            max={900}
            step={100}
            onAfterChange={this.changeLevel}
          />
        </div>
        <div className='palette-colors'>
          {colorBoxes}
        </div>
      </div>
    )
  }
}