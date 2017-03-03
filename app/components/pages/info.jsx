import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAction } from '../../utils'
import { Link } from 'react-router'
import { INFO } from '../../constants'

import PageTitle from '../shared/page-title.jsx'
import Title from '../shared/title.jsx'

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
	return `image-info/${keyToDbMapping[subject]}/${subjectKey}`
}

const _getLinkStr = (subject, title) => {
	if (typeof title === 'object') title = title[lang]
	if (subject !== 'addon') {
		return t('list-games-from-the-x-y', { replacements: [subject, title] })
	} else {
		return t('list-games-with-supporting-x', { replacements: title })
	}
}

const _getLinkUrl = (subject, subjectKey) => {
	let tempObject = {}
	tempObject[subject + 'id'] = subjectKey
	const json = encodeURIComponent(JSON.stringify(tempObject))
	return `/advanced-search/${json}`
}

class InfoPage extends Component {

	componentWillMount() {
		this.props.requestAction(this.props.params)
	}

	render() {
		const { title, subject, subjectKey, content, imageExists} = this.props
		return <div>
			<PageTitle title={_getTitle(title) + ` (${subject && t(subject)})`} />
			<Title main={_getTitle(title)} sub={subject && t(subject)} />
			<div id="info">
				{imageExists && <figure>
					<img src={_getImageUrl(subject, subjectKey)} alt={title} />
				</figure>}
				<p>{title && _getContent(content)}</p>
				<Link to={_getLinkUrl(subject, subjectKey)} className="see-also">
					{_getLinkStr(subject, title)}
				</Link>
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
	requestAction: createAction(INFO.CONTENTREQUESTED)
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoPage)