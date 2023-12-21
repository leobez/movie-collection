import './App.css'

// Components
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'

// Pages
import Home from './pages/home/Home'
import Movie from "./pages/movie/Movie"
import Search from "./pages/search/Search"

function App() {
	return (
		<div className='App'>

			<BrowserRouter>

				<Header>
					<Navbar></Navbar>
				</Header>

				<main>
					<Routes>
						<Route path='/' element={<Home/>}/>
						<Route path='/movie/:id' element={<Movie/>}/>
						<Route path='/search' element={<Search/>}/>
					</Routes>
				</main>

			</BrowserRouter>

			<Footer></Footer>
			
		</div>
	)
}

export default App
