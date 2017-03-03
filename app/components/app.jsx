import React, { Component } from 'react'
import Header from './header/_main.jsx'
import Footer from './footer/_main.jsx'

import './app-generic.styl'

const AppWrapper = props => <div className="app-wrapper">
	<Header />
	<div className="pages">
		{props.children}
	</div>
	<Footer />
</div>

export default AppWrapper
