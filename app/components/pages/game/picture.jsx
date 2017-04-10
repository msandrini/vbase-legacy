import React from 'react'

import { getFilledArray } from '../../../utils'
import { IMAGEGAME_URL } from '../../../constants'
import Icon from '../../shared/icon.jsx'
import t from '../../../i18n'
import './picture.styl'

const GamePicture = props => <figure>
	<span className="overlay" />
	{getFilledArray(props.total).map((v, i) => <img key={i} src={`${IMAGEGAME_URL}${props.gameId}/${i + 1}.png`}
		alt={t('image-of-the-gameplay') + ` #${i}`} className={props.current === (i + 1) ? 'chosen' : ''} />)}
	{(props.total > 1) && <div className="controls">
		<a className="ball btn prev" title={t('previous')} onClick={() => { props.changeImage(-1) }}>
			<Icon size="14" type="prev" />
		</a>
		<a className="ball btn next" title={t('next')} onClick={() => { props.changeImage(1) }}>
			<Icon size="20" type="next" />
		</a>
	</div>}
</figure>

export default GamePicture
