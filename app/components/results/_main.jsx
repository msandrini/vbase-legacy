import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAction, joinText } from '../../utils'
import { RESULTS, ITEMS_PER_PAGE } from '../../constants'

import Title from '../shared/title.jsx'
import Spinner from '../shared/spinner.jsx'
import FailureMessage from '../shared/failure-message.jsx'
import Pagination from '../shared/pagination.jsx'
import GameLink from './game-link.jsx'

import './_main.styl'
import t from '../../i18n';

const _getComposedSearchDetails = query => {
	let searchDetails = []
	if (query.company) {
		searchDetails.push(t('from-x', [query.company]))
	}
	if (query.description) {
		searchDetails.push(t('having-x-on-description', [query.description]))
	}
	if (query.genre) {
		searchDetails.push(t('on-genre-x', [query.genre]))
	}
	if (query.names) {
		searchDetails.push(t('named-x', [query.names]))
	}
	if (query.series) {
		searchDetails.push(t('from-series-x', [query.series]))
	}
	if (query.scores.from && query.scores.to) {
		searchDetails.push(t('scored-between-x-and-y', [query.scores.from, query.scores.to]))
	} else if (query.scores.from) {
		searchDetails.push(t('scored-x-at-least', [query.scores.from]))
	} else if (query.scores.to) {
		searchDetails.push(t('scored-up-to-x', [query.scores.to]))
	}
	if (query.sizes.from && query.sizes.to) {
		searchDetails.push(t('with-cart-size-between-x-and-y', [query.sizes.from, query.sizes.to]))
	} else if (query.sizes.from) {
		searchDetails.push(t('min-cart-size-x', [query.sizes.from]))
	} else if (query.sizes.to) {
		searchDetails.push(t('max-cart-size-x', [query.sizes.to]))
	}
	if (query.years.from && query.years.to) {
		searchDetails.push(t('released-from-x-to-y', [query.years.from, query.years.to]))
	} else if (query.years.from) {
		searchDetails.push(t('released-from-x', [query.years.from]))
	} else if (query.years.to) {
		searchDetails.push(t('released-until-x', [query.years.to]))
	}

	return searchDetails.length > 1 ? joinText(searchDetails, ',', t('and')) : searchDetails[0]
}

const _getTitle = params => {
	if (params.query) {
		const composedSearchDetails = _getComposedSearchDetails(JSON.parse(params.query))
		return <Title main={t('showing-results')} details={[t('searching-for-games') + ' ' + composedSearchDetails]} />
	} else if (params.names) {
		return <Title main={t('showing-results')} sub={t('searching-for-x', [params.names])} />
	} else {
		return <Title main={t('showing-all-games')} sub="" />
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
		const differentQueries = nextProps.params.query && (nextProps.params.query !== this.props.params.query)
		const differentPages = this.props.params.page !== nextProps.params.page
		if (differentNames || differentQueries || differentPages) {
			this._getResults(nextProps)
		}
	}

	_getResults(props) {
		this.props.requestAction(props.params)
	}

	_changePage(page) {
		const params = this.props.params
		this.props.requestPageAction({page, params})
	}

	_goBack() {
		this.props.requestBackAction()
	}

	render() {
		const { params, games, total, isLoading, hasFailed } = this.props;
		const page = (parseInt(params.page, 10) - 1) || 0;
		const currentFirstItem = ITEMS_PER_PAGE * page;
		const lastItemFromPage = (currentFirstItem + ITEMS_PER_PAGE > total)? total : currentFirstItem + ITEMS_PER_PAGE
		return <div className="results">
			{_getTitle(params)}
			{isLoading? <Spinner /> :
				( hasFailed? <FailureMessage /> :
					(!games.length? <div className="no-results">
							{t('no-results-found')}<br />
							<button className="standard" onClick={this._goBack}>{t('go-back')}</button>
						</div> :
						<div>
							<Pagination currentPage={page} results={total} linkFunction={v => this._changePage(v)} />
							<aside className="summary">
								{t('showing-x-to-y-from', [currentFirstItem, lastItemFromPage])}
								<strong> {total} </strong> 
								{total < 2 ? t('result') : t('results')}
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
});

const mapDispatchToProps = {
	requestAction: createAction(RESULTS.REQUESTED),
	requestPageAction: createAction(RESULTS.PAGEREQUESTED),
	requestBackAction: createAction(RESULTS.BACKREQUESTED)
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
