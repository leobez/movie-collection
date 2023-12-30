import "./Navbar.css"
import SearchBar from '../Searchbar/SearchBar'
import { NavLink } from "react-router-dom"

const Navbar = () => {
	return (

		<nav>

			<ul>
				<li>
					<NavLink to="/random" className="link-style">
						<p className="bold">Sortear um filme</p>
					</NavLink>
				</li>
			</ul>

			<SearchBar></SearchBar>

		</nav>

	)
}

export default Navbar