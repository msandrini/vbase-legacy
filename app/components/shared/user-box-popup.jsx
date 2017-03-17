import React from 'react'
import t from '../../i18n'
import Icon from '../shared/icon.jsx'

import './user-box-popup.styl'

const _onImgError = e => {
	e.target.style.display = 'none'
}

const UserBoxPopup = props => <div>
	<div className="ball avatar">
		<img src={props.user.image.url} alt={t('profile-picture')} onError={_onImgError} />
	</div>
	<div className="popup">
		<div className="ball name">
			{t('logged-in-as') + ' '}
			<strong>{props.user.name[0]}</strong>
		</div>
		<span />
		<a className="btn ball logout" onClick={props.logout} title={t('do-logout')}>
			<Icon type="x" size="16" />
		</a>
	</div>
</div>

export default UserBoxPopup
