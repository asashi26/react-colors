import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Pallete from './components/Pallete'
import SingleColorPalette from './components/single-color-palette'
import seedColors from './seedColors'
import {generatePalette} from './colorHelpers'
import PaletteList from './components/palette-list'
import NewPaletteForm from './components/new-palette-form'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import Page from './components/page'

class App extends Component {
	constructor(props) {
		super(props)
		const savedPalettes = JSON.parse(
			window.localStorage.getItem('palettes')
		)
		this.state = {
			palettes: savedPalettes || seedColors,
		}
	}

	findPalette = (id) => {
		return this.state.palettes.find((palette) => palette.id === id)
	}

	savePalette = (newPalette) => {
		this.setState(
			{palettes: [...this.state.palettes, newPalette]},
			this.syncLocalStorage
		)
	}

	removePalette = (id) => {
		this.setState(
			(state) => ({
				palettes: state.palettes.filter((palette) => palette.id !== id),
			}),
			this.syncLocalStorage
		)
	}

	syncLocalStorage() {
		// save palettes to local storage
		window.localStorage.setItem(
			'palettes',
			JSON.stringify(this.state.palettes)
		)
	}

	render() {
		console.log(this.state)
		return (
			<Route
				render={({location}) => (
					<TransitionGroup>
						<CSSTransition
							key={location.key}
							classNames='page'
							timeout={500}
						>
							<Switch location={location}>
								<Route
									exact
									path='/palette/new'
									render={(routeProps) => (
										<Page>
											<NewPaletteForm
												savePalette={this.savePalette}
												{...routeProps}
												palettes={this.state.palettes}
											/>
										</Page>
									)}
								/>
								<Route
									exact
									path='/palette/:paletteId/:colorId'
									render={(routeProps) => (
										<Page>
											<SingleColorPalette
												colorId={
													routeProps.match.params
														.colorId
												}
												palette={generatePalette(
													this.findPalette(
														routeProps.match.params
															.paletteId
													)
												)}
											/>
										</Page>
									)}
								/>
								<Route
									exact
									path='/'
									render={(routeProps) => (
										<Page>
											<PaletteList
												palettes={this.state.palettes}
												removePalette={
													this.removePalette
												}
												{...routeProps}
											/>
										</Page>
									)}
								/>
								<Route
									exact
									path='/palette/:id'
									render={(routeProps) => (
										<Page>
											<Pallete
												palette={generatePalette(
													this.findPalette(
														routeProps.match.params
															.id
													)
												)}
											/>
										</Page>
									)}
								/>
							</Switch>
						</CSSTransition>
					</TransitionGroup>
				)}
			/>

			// <div>
			//  <Pallete palette={generatePalette(seedColors[4])}/>
			// </div>
		)
	}
}

export default App
