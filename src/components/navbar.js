import React, {Component} from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import './navbar.css'

class Navbar extends Component {
  render() {
    const {level, changeLevel} = this.props

    return (
      <nav className='navbar'>
        <div className='logo'>
          <a href='#'>ReactColors</a>
        </div>
        <div>
          <span>Level: {level}</span>
        <div className='slider'>
          <Slider 
            defaultValue={level} 
            min={100}
            max={900}
            step={100}
            onAfterChange={changeLevel}
          />
        </div>
        </div>
       
      </nav>
    )
  }
}

export default Navbar