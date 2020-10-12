import React, {Component} from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {ChromePicker} from 'react-color'
import { Button } from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import DraggableColorBox from './draggable-color-box';


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
  state = {
    open: true,
    currentColor: 'teal',
    colors: [{color: 'blue', name: 'blue'}],
    newColorName: '',
    newPaletteName: ''
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


  handleSubmit = () => {
    let newName = this.state.newPaletteName
    const newPalette = {
      paletteName: newName,
      colors: this.state.colors,
      id: newName.toLowerCase().replace(/ /g, '-'),
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

  render () {
    console.log(this.state.currentColor)
    const { classes } = this.props;
    const { open } = this.state;
    
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color='default'
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Create New Palette
            </Typography>
            <ValidatorForm onSubmit={this.handleSubmit}>
              <TextValidator
                label='Palette Name'
                name='newPaletteName'
                value={this.state.newPaletteName}
                onChange={this.handleChange}
                validators={['required', 'isPaletteUnique']}
                errorMessages={['Enter palette name', 'Palette name must be unique']}
              />
              <Button 
                variant='contained'
                color='primary'
                type='submit'
              >Save Palette</Button>
            </ValidatorForm> 
          </Toolbar>
        </AppBar>
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
            <Button variant='contained' color='secondary'>Clear Palette</Button>
            <Button variant='contained' color='primary'>Random Color</Button>
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
            style={{backgroundColor: this.state.currentColor}}
            type='submit'
            >Add Color</Button>
          </ValidatorForm>
          
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
         
           {this.state.colors.map(color=> (
             <DraggableColorBox
                key={color.name}
                color={color.color}
                name={color.name}
                handleClick={() => this.removeColor(color.name)}
              />
           ))}
          
        </main>
      </div>
    )
  }
}

export default withStyles(styles, {withTheme: true})(NewPaletteForm)