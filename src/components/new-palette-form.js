import React, {Component} from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {ChromePicker} from 'react-color'
import { Button } from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import DraggableColorList from './draggable-color-list';
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from './palette-form-nav'

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
})

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  }
  state = {
    open: true,
    currentColor: 'teal',
    colors: this.props.palettes[0].colors,
    newColorName: '',
    
  };

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    // The every() method tests whether all elements in the array pass the test
    // implemented by the provided function. It returns a Boolean value.
    ValidatorForm.addValidationRule('isColorNameUnique', value => 
        this.state.colors.every(
          ({name}) => name.toLowerCase() !== value.toLowerCase()
        )
    );
    ValidatorForm.addValidationRule('isColorUnique', value => 
        this.state.colors.every(({color}) => color !== this.state.currentColor)
    );
    ValidatorForm.addValidationRule('isPaletteUnique', value => 
        this.props.palettes.every(({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase())
    );
}

// Class property syntax tento zápis mi umožňuje používat funkce bez bind => nemusím mít constructor
// state můžu mít jen v objektu tak jako výše
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  updateCurrentColor = (newColor) => {
    this.setState({currentColor: newColor.hex})
  }

  addNewColor = () => {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    }
    this.setState({colors: [...this.state.colors, newColor], newColorName: ''})
  }

  // jednou nastavuje paletteName a jednou colorName, podle toho co za name mu přijde
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }


  handleSubmit = (newPaletteName) => {
    const newPalette = {
      paletteName: newPaletteName,
      colors: this.state.colors,
      id: newPaletteName.toLowerCase().replace(/ /g, '-'),
    }
    this.props.savePalette(newPalette)
    this.props.history.push('/')
    console.log(newPalette)
  }

  removeColor = (colorName) => {
    this.setState({
      //projede každou barvu v poli a porovná jestli odpovídá podmínce 
      // když ano vloží ji do nového pole, když ne vynechá ji vrátí mi pole barev které odpovídají podmínce
      colors: this.state.colors.filter(color => color.name !== colorName)
    })
  }
  //po pohybu box uloží novou pozici
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({colors}) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }))
  }

  onClearPalette = () => {
    this.setState({
      colors: [],
    })
  }

  addRandomColor = () => {
    // Consider: validace aby randomColor už nebyla v naší paletě

    //pick random color from existing palettes
    // .flat() když mám array of arrays tak mi je to hodí do jedné array
    const allColors = this.props.palettes.map(p => p.colors).flat()
    // vybere random číslo z délky pole s barvami
    let rand = Math.floor(Math.random() * allColors.length)
    // vrátí jeden object s barvou co je na indexu náhodného čísla
    const randomColor = allColors[rand]
     this.setState({
       colors: [...this.state.colors, randomColor]
     })
    console.log(randomColor)
  }

  render () {
    console.log(this.state.currentColor)
    const { classes, maxColors, palettes } = this.props;
    const { open, colors } = this.state;
    const paletteFull = colors.length >= maxColors
    
    return (
      <div className={classes.root}>
        
        <PaletteFormNav 
          open={open} 
          classes={classes}
          palettes={palettes}
          handleSubmit={this.handleSubmit}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
               <ChevronLeftIcon /> 
            </IconButton>
          </div>
          <Divider />
          <Typography variant='h4'>Design Your Palette</Typography>
          <div>
            <Button variant='contained' color='secondary' onClick={this.onClearPalette}>Clear Palette</Button>
            <Button variant='contained' color='primary' onClick={this.addRandomColor} disabled={paletteFull}>Random Color</Button>
          </div>
          <ChromePicker 
            color={this.state.currentColor} 
            onChangeComplete={(newColor)=> this.updateCurrentColor(newColor)} 
          />
          <ValidatorForm onSubmit={this.addNewColor}>
            <TextValidator
              value={this.state.newColorName}
              name='newColorName'
              onChange={this.handleChange}
              validators={['required', 'isColorNameUnique', 'isColorUnique']}
              errorMessages={['Enter a color name', 'Color name must be unique', 'Color already used']}
            />
            <Button 
            variant='contained' 
            color='primary'
            style={{backgroundColor: paletteFull ? 'grey' : this.state.currentColor}}
            type='submit'
            disabled={paletteFull}
            >{paletteFull ? 'Palette Full' : 'Add Color'}</Button>
          </ValidatorForm>
          
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList 
            colors={colors} 
            removeColor={this.removeColor}
            axis='xy'
            onSortEnd={this.onSortEnd}
          />
        </main>
      </div>
    )
  }
}

export default withStyles(styles, {withTheme: true})(NewPaletteForm)