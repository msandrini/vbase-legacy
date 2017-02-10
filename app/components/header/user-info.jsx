import React, { Component } from 'react';
import t from '../../i18n';

const UserInfo = ({props}) => (<div>
	<figure>
		<img src={props.user.image.url} alt={t('profile-picture')} />
		<legend>via {props.user.via}</legend>
	</figure>
	<div className="user-info">
		<div className="name">
			{t('logged-in-as')} <strong>{props.user.name[0]}</strong>
		</div>
		<a onclick={props.logout()}>{t('do-logout')}</a>
	</div>
</div>);

export default UserInfo;