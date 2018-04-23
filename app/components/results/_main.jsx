import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAction, joinText } from '../../utils'
import { RESULTS, ITEMS_PER_PAGE } from '../../constants'

import PageTitle from '../shared/page-title.jsx'
import Title from '../shared/title.jsx'
import Spinner from '../shared/spinner.jsx'
import Icon from '../shared/icon.jsx'
import FailureMessage from '../shared/failure-message.jsx'
import Pagination from '../shared/pagination.jsx'
import GameLink from './game-link.jsx'

import './_main.styl'
import t from '../../i18n'

const _getComposedSearchDetails = query => {
	let searchDetails = []
	for (const obj of ['scores', 'sizes', 'years']) {
		if (!query[obj]) {
			query[obj] = {}
		}
	}
	if (query.company) {
		searchDetails.push(t('from-x', { replacements: query.company }))
	}
	if (query.review) {
		searchDetails.push(t('having-x-on-review', { replacements: query.review }))
	}
	if (query.genre) {
		searchDetails.push(t('from-genre-x', { replacements: query.genre }))
	}
	if (query.names) {
		searchDetails.push(t('named-x', { replacements: query.names }))
	}
	if (query.series) {
		searchDetails.push(t('from-series-x', { replacements: query.series }))
	}
	if (query['scores-from'] && query['scores-to']) {
		searchDetails.push(t('scored-between-x-and-y', { replacements: [query['scores-from'], query['scores-to']] }))
	} else if (query['scores-from']) {
		searchDetails.push(t('scored-x-at-least', { replacements: query['scores-from'] }))
	} else if (query['scores-to']) {
		searchDetails.push(t('scored-up-to-x', { replacements: query['scores-to'] }))
	}
	if (query['sizes-from'] && query['sizes-to']) {
		searchDetails.push(t('with-cart-size-between-x-and-y', { replacements: [query['sizes-from'], query['sizes-to']] }))
	} else if (query['sizes-from']) {
		searchDetails.push(t('min-cart-size-x', { replacements: query['sizes-from'] }))
	} else if (query['sizes-to']) {
		searchDetails.push(t('max-cart-size-x', { replacements: query['sizes-to'] }))
	}
	if (query['years-from'] && query['years-to']) {
		searchDetails.push(t('released-from-x-to-y', { replacements: [query['years-from'], query['years-to']] }))
	} else if (query['years-from']) {
		searchDetails.push(t('released-from-x', { replacements: query['years-from'] }))
	} else if (query['years-to']) {
		searchDetails.push(t('released-until-x', { replacements: query['years-to'] }))
	}

	if (searchDetails.length) {
		return t('searching-for-games') + ' ' + (searchDetails.length > 1 ? joinText(searchDetails, ',', t('and')) : searchDetails[0])
	} else {
		return t('advanced-search')
	}
}

const _getTitle = (params, location) => {
	if (location.query && Object.keys(location.query).length) {
		const composedSearchDetails = _getComposedSearchDetails(location.query)
		return [<Title key="title" main={t('showing-results')} details={[composedSearchDetails]} />,
			<PageTitle key="pagetitle" title={t('advanced-search')} />]
	} else if (params.names) {
		return [<Title key="title" main={t('showing-results')} sub={t('searching-for-x', { replacements: params.names })} />,
			<PageTitle key="pagetitle" title={t('basic-search')} />]
	} else {
		return [<Title key="title" main={t('showing-all-games')} sub="" />,
			<PageTitle key="pagetitle" title={t('all-games')} />]
	}
}

class Results extends Component {
	constructor(props) {
		super(props)
		this._goBack = this._goBack.bind(this)
	}

	componentWillMount() {
		this._getResults(this.props)
	}

	componentWillUpdate(nextProps) {
		const differentNames = nextProps.params.names !== this.props.params.names
		const differentQueries = nextProps.location.search !== this.props.location.search
		const differentPages = nextProps.params.page !== this.props.params.page
		if (differentNames || differentQueries || differentPages) {
			this._getResults(nextProps)
		}
	}

	_getResults(props) {
		this.props.requestAction({ params: props.params, query: props.location.query })
	}

	_changePage(page) {
		const params = this.props.params
		const query = this.props.location.query
		this.props.requestPageAction({ page, params, query })
	}

	_goBack() {
		this.props.requestBackAction()
	}

	render() {
		const { params, location, games, total, isLoading, hasFailed } = this.props
		const page = parseInt(params.page, 10) || parseInt(location.query.page, 10) || 1
		const currentFirstItem = ITEMS_PER_PAGE * page
		const lastItemFromPage = (currentFirstItem + ITEMS_PER_PAGE > total) ? total : currentFirstItem + ITEMS_PER_PAGE
		return <div className="results">
			{_getTitle(params, location)}
			{isLoading ? <Spinner /> :
				(hasFailed ? <FailureMessage /> :
					(!games.length ? <div className="no-results">
						<p>{t('no-results-found')}</p>
						<div className="button-wrapper">
							<button className="btn ball" title={t('go-back')} onClick={this._goBack}>
								<Icon type="prev" size="28" />
							</button>
						</div>
					</div> :
						<div>
							<Pagination currentPage={page} results={total} linkFunction={v => this._changePage(v)} />
							<aside className="summary">
								{t('showing-x-to-y-from', { replacements: [currentFirstItem, lastItemFromPage] })}
								<strong> {total} </strong>
								{t('result', { plural: total })}
							</aside>
							<section>
								{games.map(game => <GameLink key={game._id} game={game} />)}
							</section>
							<Pagination currentPage={page} results={total} linkFunction={v => this._changePage(v)} />
						</div>
					)
				)
			}
		</div>
	}
}

const mapStateToProps = state => ({
	games: state.results.games,
	total: state.results.total,
	isLoading: state.results.isLoading,
	hasFailed: state.results.hasFailed
})

const mapDispatchToProps = {
	requestAction: createAction(RESULTS.REQUESTED),
	requestPageAction: createAction(RESULTS.PAGEREQUESTED),
	requestBackAction: createAction(RESULTS.BACKREQUESTED)
}

export default connect(mapStateToProps, mapDispatchToProps)(Results)
