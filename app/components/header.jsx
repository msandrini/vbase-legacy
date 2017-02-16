import React from 'react'
import LoginBox from './header/login-box.jsx'
import TopLinks from './header/top-links.jsx'
import SearchFields from './search/fields.jsx'

import '../styles/header.styl'

const Header = () => (
    <header>
    	<h1 id="logo"><span>VBase</span></h1>
    	<LoginBox />
    	<TopLinks />
        <SearchFields />
    </header>
)

export default Header