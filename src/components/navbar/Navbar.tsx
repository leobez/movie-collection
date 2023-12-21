import "./Navbar.css"
import SearchBar from '../Searchbar/SearchBar'

type Props = {}

const Navbar = (props: Props) => {
	return (
		<nav>
			{/* <ul>
			</ul> */}
			<SearchBar></SearchBar>
		</nav>
	)
}

export default Navbar