/* exported React */
import React, { Component } from 'react'
import t from '../../i18n'
import SelectBox from '../shared/select-box.jsx'
import Icon from '../shared/icon.jsx'

import './advanced-fields.styl'

class AdvancedFields extends Component {
	constructor(props) {
		super(props)
		this.years = []
		for (let y = 1989; y < 2001; y++) {
			this.years.push(y)
		}
		this.scores = []
		for (let s = 3.0; s <= 10.0; s = s + 0.5) {
			this.scores.push(s)
		}
		this.sizes = [1, 2, 3, 4, 6, 8, 8.5, 10, 12, 16, 20, 24, 32, 40, 48, 64, 72]

		this._triggerSubmit = this._triggerSubmit.bind(this)
	}
	_triggerSubmit(ev) {
		ev.preventDefault()
		const el = ev.target.elements
		const data = {
			company: el.company.value,
			review: el.review.value,
			// genre: el.genre.value,
			names: el.names.value,
			// series: el.series.value,
			scores: {
				from: el.scores1.value,
				to: el.scores2.value
			},
			sizes: {
				from: el.sizes1.value,
				to: el.sizes2.value
			},
			years: {
				from: el.years1.value,
				to: el.years2.value
			}
		}
		this.props.submit(data)
	}
	render() {
		return <div className="wrap-advanced">
			{this.props.visible &&
				<a onClick={() => this.props.hide()} className="hide-advanced ball btn" alt={t('back-to-simple-search')} title={t('back-to-simple-search')}>
					<Icon type="x" size="24" />
				</a>}
			<form className={this.props.visible ? '' : ' hidden'} onSubmit={this._triggerSubmit}>
				<div className="advanced-search">
					<div className="group">
						<label htmlFor="names">{t('names')}</label>
						<input type="search" autoComplete="off" name="names" />
					</div>
					<div className="group select-group">
						<label htmlFor="years1">{t('years')}</label>
						<SelectBox name="years1" subLabel={t('from')}>
							<option value=''>{t('any')}</option>
							{this.years.map(y => <option value={y} key={y}>{y}</option>)}
						</SelectBox>
						<SelectBox name="years2" subLabel={t('to')}>
							<option value=''>{t('any')}</option>
							{this.years.map(y => <option value={y} key={y}>{y}</option>)}
						</SelectBox>
					</div>
					<div className="group select-group">
						<label htmlFor="scores1">{t('editor-score')}</label>
						<SelectBox name="scores1" subLabel={t('from')}>
							<option value=''>{t('any')}</option>
							{this.scores.map(s => <option value={s} key={s}>{s}</option>)}
						</SelectBox>
						<SelectBox name="scores2" subLabel={t('to')}>
							<option value=''>{t('any')}</option>
							{this.scores.map(s => <option value={s} key={s}>{s}</option>)}
						</SelectBox>
					</div>
					<div className="group">
						<label htmlFor="company">{t('company')}</label>
						<input type="search" autoComplete="off" name="company" />
					</div>
					{/* <div className="group">
						<label htmlFor="genre">{t('genres')}</label>
						<input type="search" autoComplete="off" name="genre" />
					</div>
					<div className="group">
						<label htmlFor="series">{t('series')}</label>
						<input type="search" autoComplete="off" name="series" />
					</div> */}
					<div className="group">
						<label htmlFor="review">{t('on-review')}</label>
						<input type="search" autoComplete="off" name="review" />
					</div>
					<div className="group select-group">
						<label htmlFor="sizes1">{t('sizes')}</label>
						<SelectBox name="sizes1" subLabel={t('from')}>
							<option value=''>{t('any')}</option>
							{this.sizes.map(s => <option value={s} key={s}>{s}</option>)}
						</SelectBox>
						<SelectBox name="sizes2" subLabel={t('to')}>
							<option value=''>{t('any')}</option>
							{this.sizes.map(s => <option value={s} key={s}>{s}</option>)}
						</SelectBox>
					</div>
					{/* <div className="group">
						<label>&nbsp;</label>
						<button className="secondary reset" type="reset">{t('reset')}</button>
					</div> */}
				</div>
				<button className="btn ball submit-advanced" type="submit">
					<Icon size="22" type="search" />
				</button>
			</form>
		</div>
	}
}

export default AdvancedFields
