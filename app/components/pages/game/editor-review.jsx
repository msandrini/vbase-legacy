import React from 'react'

import t, { lang } from '../../../i18n'
import './editor-review.styl'

const GameEditorReview = ({editorReview}) => <article className="editor-review">
	<h5>{t('editor-review')}</h5>
	<p>{editorReview[lang]}</p>
</article>

export default GameEditorReview
