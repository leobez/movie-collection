import { ReactNode } from 'react'
import "./Header.css"
import { NavLink } from 'react-router-dom'

// Components
import {BiCameraMovie} from "react-icons/bi"


type Props = {
	children: ReactNode
}

const Header = ({children}: Props) => {
	return (
		<div className='Header'>
			
			<h1>
				<NavLink to="/"> <BiCameraMovie/>Biblioteca de filmes</NavLink>
			</h1>

			<h1 className='small-header-menu'>
				<NavLink to="/"><BiCameraMovie/></NavLink>
			</h1>

			{children}
		</div>
	)
}

export default Header