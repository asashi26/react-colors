import sizes from './media-queries'
import bg from '../bg.svg'
export default {
  root: {
    '@global': {
      //-exit -exit-active mi přidává package react-transition-group
      '.fade-exit': {
        opacity: '1',
      },
      '.fade-exit-active': {
        opacity: '0',
        transition: 'opacity 500ms ease-out'
      }
    },
    /* background by SVGBackgrounds.com */
    backgroundColor: '#2D3B88',
    backgroundImage: `URL(${bg})`,
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    color: 'white',
    overflow: 'scroll',
  },
  heading: {
    fontSize: '2rem',
  },
  container: {
    width: '50%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',
    [sizes.down("xl")]: {
      width: "80%"
    },
    [sizes.down("xs")]: {
      width: "75%"
    }
  },
  nav: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    '& a': {
      color: 'white'
    }
  },
  palettes: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 30%)',
    gridGap: '5%',
    [sizes.down("md")]: {
      gridTemplateColumns: "repeat(2, 50%)"
    },
    [sizes.down("xs")]: {
      gridTemplateColumns: "repeat(1, 100%)",
      gridGap: "1.4rem"
    },
    '& a': {
      textDecoration: 'none',
    }
  }
}