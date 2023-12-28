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

			<div className='header-menu '>
				<NavLink to="/"><BiCameraMovie/></NavLink>
			</div>

			{children}

		</div>
	)
}

export default Header