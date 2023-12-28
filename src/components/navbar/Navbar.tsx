import "./Navbar.css"
import SearchBar from '../Searchbar/SearchBar'
import { NavLink } from "react-router-dom"

const Navbar = () => {
	return (
		<nav>
			<ul>
				<li>
					<NavLink to="/random">
						Sortear um filme
					</NavLink>
				</li>
			</ul>
			<SearchBar></SearchBar>
		</nav>
	)
}

export default Navbar