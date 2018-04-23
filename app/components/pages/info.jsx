import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAction, buildQueryString } from '../../utils'
import { Link } from 'react-router'
import { INFO, IMAGEINFO_URL } from '../../constants'

import PageTitle from '../shared/page-title.jsx'
import Title from '../shared/title.jsx'
import Icon from '../shared/icon.jsx'

import t, { lang } from '../../i18n'
import './info.styl'

const keyToDbMapping = { genre: 'genres', addon: 'addons', series: 'series', company: 'companies' }

const _getTitle = title => {
	if (title) {
		return (typeof title === 'string') ? title : title[lang]
	} else {
		return t('loading')
	}
}

const _getContent = content => {
	if (typeof content === 'object' && content[lang]) {
		return content[lang]
	} else {
		return <span className="no-content">{t('no-content')}</span>
	}
}

const _getImageUrl = (subject, subjectKey) => {
	return `${IMAGEINFO_URL}${keyToDbMapping[subject]}/${subjectKey}/1.png`
}

const _getLinkStr = (subject, title) => {
	if (typeof title === 'object') title = title[lang]
	if (subject !== 'addon') {
		const designation = t(`from-${subject}-x`, { replacements: [title] }).replace(/\*/g, '')
		return `${t('list-games')} ${designation}`

	} else {
		return t('list-games-with-supporting-x', { replacements: title })
	}
}

const _getLinkUrl = (subject, subjectKey) => {
	let tempObject = {}
	tempObject[subject + 'id'] = subjectKey
	const query = buildQueryString(tempObject)
	return `/${t('url__advanced-search')}?${query}`
}

class InfoPage extends Component {
	constructor() {
		super()
		this._goBack = this._goBack.bind(this)
	}

	componentWillMount() {
		this.props.requestAction(this.props.params)
	}

	_goBack() {
		this.props.backAction()
	}

	render() {
		const { title, subject, subjectKey, content, imageExists } = this.props
		return <div>
			<PageTitle title={_getTitle(title) + ` (${subject && t(subject)})`} />
			<Title main={_getTitle(title)} sub={subject && t(subject)} />
			<div id="info">
				<div className="button-wrapper">
					<button className="ball" onClick={this._goBack} title={t('go-back')}>
						<Icon size="22" type="prev" />
					</button>
				</div>
				<figure className="ball">
					{imageExists && <div className="image-container">
						<img src={_getImageUrl(subject, subjectKey)} alt={title} />
					</div>}
				</figure>
				<p>{title && _getContent(content)}</p>
				<div className="links">
					<Link to={_getLinkUrl(subject, subjectKey)} className="see-also">
						{_getLinkStr(subject, title)}
					</Link>
				</div>
			</div>
		</div>
	}

}

const mapStateToProps = state => ({
	isLoading: state.info.isLoading,
	hasFailed: state.info.hasFailed,
	subject: state.info.subject,
	subjectKey: state.info.key,
	title: state.info.title,
	content: state.info.content,
	imageExists: state.info.imageExists
})

const mapDispatchToProps = {
	requestAction: createAction(INFO.CONTENTREQUESTED),
	backAction: createAction(INFO.BACKREQUESTED)
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoPage)
