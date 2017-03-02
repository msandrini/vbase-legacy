import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAction } from '../../utils'
import { INFO } from '../../constants'

import Title from '../shared/title.jsx'

import t, { lang } from '../../i18n'
import './info.styl'

const _getTitle = title => {
	if (title) {
		return (typeof title === 'string')? title : title[lang]
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

class InfoPage extends Component {

	componentWillMount() {
		this.props.requestAction(this.props.params)
	}

	render() {
		return <div>
			<Title main={_getTitle(this.props.title)} sub={this.props.subject && t(this.props.subject)} />
			<div id="info">
				{this.props.image && <figure>
					<img src={this.props.image} alt={this.props.title} />
				</figure>}
				{this.props.title && _getContent(this.props.content)}
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
	image: state.info.image
})

const mapDispatchToProps = {
	requestAction: createAction(INFO.CONTENTREQUESTED)
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoPage)