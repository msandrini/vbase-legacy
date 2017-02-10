import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAction } from '../../utils'
import { RESULTS, ITEMS_PER_PAGE } from '../../constants'

import Title from '../shared/title.jsx'
import Spinner from '../shared/spinner.jsx'
import FailureMessage from '../shared/failure-message.jsx'
import Pagination from '../shared/pagination.jsx'
import GameLink from './game-link.jsx'

import '../../styles/results.styl'
import t from '../../i18n';

const _getTitle = (params) => {
	if (params.query) {
		return <Title main={t('showing-results')} sub={t('from-advanced-search')} />
	} else if (params.names) {
		return <Title main={t('showing-results')} sub={t('searching-for-x', [params.names])} />
	} else {
		return <Title main={t('showing-all-games')} sub="" />
	}
}

class Results extends Component {
	constructor(props) {
		super(props)
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

	render() {
		const { params, games, total, isLoading, hasFailed } = this.props;
		const page = (parseInt(params.page, 10) - 1) || 0;
		const currentFirstItem = ITEMS_PER_PAGE * page;
		const lastItemFromPage = (currentFirstItem + ITEMS_PER_PAGE > total)? total : currentFirstItem + ITEMS_PER_PAGE
		return <div className="results">
			{_getTitle(params)}
			{isLoading? <Spinner /> :
				( hasFailed? <FailureMessage /> :
					(!games.length? <div className="no-results">{t('no-results-found')}</div> :
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
	requestPageAction: createAction(RESULTS.PAGEREQUESTED)
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
