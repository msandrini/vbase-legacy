import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAction } from '../../utils'
import { LOGIN, LOGOUT } from '../../constants'

import './user-box.styl'
import t from '../../i18n'
import UserBoxPopup from './user-box-popup.jsx'
import Icon from '../shared/icon.jsx'

class LoginBox extends Component {

	constructor() {
		super()
		this._login = this._login.bind(this)
		this._logout = this._logout.bind(this)
		this.apiLoaded = false
	}

	componentWillMount() {
		window.googleApiLoaded = () => {
			this.apiLoaded = true
		}
		if (!this.props.checkDone) {
			this.props.checkAction()
		}
	}

	_login() {
		if (this.apiLoaded) {
			const storeLogin = this._storeLogin
			const loginAction = this.props.loginAction
			window.gapi.load('auth2', () => {
				const ga = window.gapi.auth2.init({
					client_id: '688480051156-7hupvud4vjfinkpaj70ddl6g3tvdfuj5.apps.googleusercontent.com',
					scope: 'profile'
				})
				const isSignedIn = ga.isSignedIn.get()
				if (isSignedIn === true) {
					storeLogin(ga, loginAction)
				} else {
					ga.signIn().then(function() {
						storeLogin(ga, loginAction)
					})
				}
			})
		}
	}

	_storeLogin(ga, loginAction) {
		const profile = ga.currentUser.get().getBasicProfile()
		const userInfo = {
			id: profile.getId(),
			name: [profile.getGivenName(), profile.getFamilyName()],
			image: { url: profile.getImageUrl() },
			via: 'Google'
		}
		loginAction({ userInfo })
	}

	_logout() {
		this.props.logoutAction()
	}

	render() {
		const { userInfo, isLoggedIn, verify } = this.props
		return <aside className="user-box">
			{isLoggedIn ?
				<UserBoxPopup user={userInfo} logout={this._logout} /> :
				<a onClick={() => this._login()} className={verify ? 'login-link' : 'login ball btn'} title={t('login-with-Google')}>
					{verify ?
						(<span>{t('login-with-Google')} <small>({t('required')})</small></span>) :
						<Icon type="person" size="24" />}
				</a>}
		</aside>
	}
}

const mapStateToProps = state => ({
	userInfo: state.login.userInfo,
	isLoggedIn: state.login.loggedIn,
	checkDone: state.login.checkDone
})

const mapDispatchToProps = {
	checkAction: createAction(LOGIN.CHECKREQUESTED),
	loginAction: createAction(LOGIN.REQUESTED),
	logoutAction: createAction(LOGOUT.REQUESTED)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginBox)
