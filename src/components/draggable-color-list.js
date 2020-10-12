import React from 'react'
import DraggableColorBox from './draggable-color-box'
import {SortableContainer} from 'react-sortable-hoc'

 const DraggableColorList = SortableContainer(({colors, removeColor}) => {
  return (
    <div style={{height: '100%'}}>
      {colors.map((color, i)=> (
        <DraggableColorBox
          key={color.name}
          color={color.color}
          name={color.name}
          handleClick={() => removeColor(color.name)}
          index={i}
        />
      ))}
    </div>
  )
})

export default DraggableColorList