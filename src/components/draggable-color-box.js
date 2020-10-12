import React from 'react'
import {withStyles} from '@material-ui/styles'
import DeleteIcon from '@material-ui/icons/Delete';
import classes from '@material-ui/styles'
import { scale } from 'chroma-js';
import {SortableElement} from 'react-sortable-hoc'

const styles = {
  root: {
    width: '20%',
    height:  '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-4px',
    '&:hover svg': {
      color: 'white',
      transform:' scale(1.5)'
    }
  },
  boxContent: {
    position: 'absolute',
    width: '100%',
    left: '0px',
    padding: '10px',
    bottom: '0px',
    color: 'black',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  deleteIcon: {
    color: 'rgba(0,0,0,0.5)',
    transition: 'all 0.3s ease-in-out'
  }
}

 const DraggableColorBox = SortableElement((props) => {
   const {classes, handleClick, name, color} = props
  return (
    <div 
      className={
        classes.root}
      style={{backgroundColor: color}}>
        <div className={classes.boxContent}>
          <span>{name}</span>
          <DeleteIcon 
            className={classes.deleteIcon}
            onClick={handleClick}
          />
        </div>
      
    </div>
  )
})

export default withStyles(styles)(DraggableColorBox)