import React, { Component } from 'react'
import { connect } from 'react-redux'

import PageTitle from '../shared/page-title.jsx'
import Title from '../shared/title.jsx'
import Icon from '../shared/icon.jsx'
import Spinner from '../shared/spinner.jsx'
import { CONTACT } from '../../constants'
import { createAction } from '../../utils'

import t from '../../i18n'
import './contact.styl'

class ContactPage extends Component {

	constructor(props) {
		super(props)
		this._submitForm = this._submitForm.bind(this)
		this._changeValue = this._changeValue.bind(this)
	}

	_submitForm(ev) {
		ev.preventDefault()
		const el = ev.target.elements
		const fields = {
			name: el.name.value,
			email: el.email.value,
			message: el.message.value
		}
		if (fields.name && fields.email && fields.message) {
			this.props.submitAction({ fields })
		} else {
			let failMessage
			if (!fields.name) {
				failMessage = t('filling-name-required')
			} else if (!fields.email) {
				failMessage = t('filling-email-required')
			} else if (!fields.message) {
				failMessage = t('filling-message-required')
			}
			this.props.failAction({ message: failMessage })
		}
		document.getElementById('contact-form').reset()
	}
	_changeValue() {
		this.props.changedValueAction()
	}

	render() {
		return <div>
			<PageTitle title={t('contact-us')} />
			<Title main={t('contact-us')} />
			<form id="contact-form" onSubmit={this._submitForm}>
				<input type="email" autoComplete="off" name="email" required placeholder={t('e-mail')} onChange={this._changeValue} />
				<input type="text" autoComplete="off" name="name" required placeholder={t('name')} onChange={this._changeValue} />
				<textarea autoComplete="off" name="message" required placeholder={t('message')} onChange={this._changeValue} />
				<div className="button-wrapper">
					{this.props.failed && <div className="failure-message">{this.props.failed}</div>}
					{this.props.isLoading ? <Spinner /> :
						<button className="btn ball" title={t('send')}><Icon type="check" size="28" /></button>}
				</div>
			</form>
		</div>
	}

}

const mapStateToProps = state => ({
	isLoading: state.contact.isLoading,
	failed: state.contact.failed
})

const mapDispatchToProps = {
	submitAction: createAction(CONTACT.SUBMITTED),
	failAction: createAction(CONTACT.FAILED),
	changedValueAction: createAction(CONTACT.VALUECHANGED)
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage)
