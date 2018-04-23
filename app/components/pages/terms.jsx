import React from 'react'
import PageTitle from '../shared/page-title.jsx'
import Title from '../shared/title.jsx'

import t from '../../i18n'

const address = document.location.origin

const TermsPage = () => (
	<div>
		<PageTitle title={t('terms-of-service')} />
		<Title main={t('terms-of-service')} sub={t('and-privacy-policy')} />

		<div className="text-content">
			<h3>1. {t('trm-1')}</h3>
			<p>{t('trm-1-p', {replacements: [address]})}</p>

			<h3>2. {t('trm-2')}</h3>
			<ol type="a">
				<li>
					{t('trm-2-p1')}
					<ol type="i">
						{ t('trm-2-li').split(']]]').map((li, x) => <li key={x}>{li}</li>) }
					</ol>
				</li>
				<li>{t('trm-2-p2')}</li>
			</ol>

			<h3>3. {t('trm-3')}</h3>
			<ol type="a">
				<li>{t('trm-3-p1')}</li>
				<li>{t('trm-3-p2')}</li>
			</ol>

			<h3>4. {t('trm-4')}</h3>
			<p>{t('trm-4-p')}</p>

			<h3>5. {t('trm-5')}</h3>
				<p>{t('trm-5-p')}</p>

			<h3>6. {t('trm-6')}</h3>
			<p>{t('trm-6-p')}</p>

			<h3>7. {t('trm-7')}</h3>
			<p>{t('trm-7-p')}</p>

			<h3>8. {t('trm-8')}</h3>
			<p>{t('trm-8-p')}</p>

			<h2>{t('trm-pp')}</h2>
			<p>{t('trm-pp-p1')}</p>
			<p>{t('trm-pp-p2')}</p>
			<ul>
				{ t('trm-pp-li').split(']]]').map((li, x) => <li key={x}>{li}</li>) }
			</ul>
			<p>{t('trm-pp-p3')}</p>

		</div>

	</div>
)

export default TermsPage
