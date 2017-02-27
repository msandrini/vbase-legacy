import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAction } from '../../utils'
import { LOGIN } from '../../constants'

import './login-box.styl'
import t from '../../i18n'
import UserInfo from './user-info.jsx'
import Icon from '../shared/icon.jsx'

class LoginBox extends Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		/* REACTIVATE WHEN UP TO TEST */
		/*window.googleApiLoaded = () => {
			gapi.load('auth2', () => {
				const ga = window.gapi.auth2.init({
		            client_id: '688480051156-7hupvud4vjfinkpaj70ddl6g3tvdfuj5.apps.googleusercontent.com',
		            scope: 'profile'
		        })
		        ga.isSignedIn.listen(() => {
		        	this.checkLogin(ga)
		        })
		        this.checkLogin(ga)

		        ga.attachClickHandler('btn-google')
			})
		}*/
	}

	checkLogin(ga) {
		const isSignedIn = ga.isSignedIn.get()
		if (isSignedIn == true) {
			const profile = ga.currentUser.get().getBasicProfile()
			const userInfo = {
				name: [ profile.getGivenName(), profile.getFamilyName() ],
				image: { url: profile.getImageUrl() }, 
				via: 'Google'
			}
			this.props.loginDoneAction({ userInfo })
		}
	}

	loginButtonStyle() {
		return {
			display: (this.props.isLoggedIn? 'none' : 'block')
		}
	}

	logout() {

	}

	render() {
		const { user, isLoggedIn } = this.props
		return <aside className="user-box">
			{ isLoggedIn && <UserInfo user={user} logout={() => this.logout()} />}
			<a id="btn-google" className="ball btn" href="#" style={this.loginButtonStyle()} title={t('login-with-Google')}>
				<Icon type="person" size="24" />
			</a>
		</aside>
	}
}

const mapStateToProps = state => ({
    userInfo: state.login.userInfo,
    isLoggedIn: state.login.loggedIn
})

const mapDispatchToProps = {
    loginDoneAction: createAction(LOGIN.CHECKED)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginBox)