import React from 'react'

import { BASE_URL } from '../../../constants'
import Icon from '../../shared/icon.jsx'
import t from '../../../i18n'
import './picture.styl'

const morePictures = false /* for now */

const GamePicture = props => <figure>
    <span className="overlay" />
    <img src={`${BASE_URL}image-gameplay/${props.gameId}.1`} alt={t('image-of-the-gameplay')} />
    {morePictures && <div className="controls">
        <a className="ball btn prev" title={t('previous')}>
            <Icon size="14" type="prev" />
        </a>
        <a className="ball btn next" title={t('next')}>
            <Icon size="20" type="next" />
        </a>
    </div>}
</figure>

export default GamePicture
