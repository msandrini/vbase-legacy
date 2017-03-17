import React from 'react'
import Logo from './logo.jsx'
import UserBox from '../shared/user-box.jsx'
import TopLinks from './top-links.jsx'
import SearchFields from '../search/_main.jsx'

import './_main.styl'

const Header = () => (
	<header>
		<Logo />
		<UserBox />
		<TopLinks />
		<SearchFields />
	</header>
)

export default Header
