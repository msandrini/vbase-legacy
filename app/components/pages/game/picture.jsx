import React from 'react'

import t from '../../../i18n'

const GamePicture = props => <figure>
    <img src={`image-gameplay/${props.gameId}.1`} alt={t('image-of-the-gameplay')} />
</figure>

export default GamePicture