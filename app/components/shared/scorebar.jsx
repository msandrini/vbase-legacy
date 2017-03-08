import React from 'react'
import t from '../../i18n'
import './scorebar.styl'

const elements = [
	{ score: 10, y: 6.257, x: 57.561 },
	{ score: 9.5, y: 8.795, x: 65.927 },
	{ score: 9, y: 12.916, x: 73.638 },
	{ score: 8.5, y: 18.463, x: 80.397 },
	{ score: 8, y: 25.221, x: 85.943 },
	{ score: 7.5, y: 32.932, x: 90.064 },
	{ score: 7, y: 41.299, x: 92.602 },
	{ score: 6.5, y: 50, x: 93.459 },
	{ score: 6, y: 58.701, x: 92.603 },
	{ score: 5.5, y: 67.067, x: 90.064 },
	{ score: 5, y: 74.778, x: 85.942 },
	{ score: 4.5, y: 81.537, x: 80.396 },
	{ score: 4, y: 87.083, x: 73.638 },
	{ score: 3.5, y: 91.204, x: 65.927 },
	{ score: 3, y: 93.742, x: 57.561 }
]

const _getClass = (elementScore, gameScore) => {
	const strScore = String(gameScore).replace('.', '-')
	if (gameScore === elementScore) {
		return `colour${strScore}`
	} else if (gameScore > elementScore) {
		return `colour${strScore}` /* not settled down yet? */
	} else {
		return 'out'
	}
}

const Scorebar = ({score, size}) => <div className="scorebar" title={score + ' ' + t('out-of-10')}>
	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
		width={size} height={size} viewBox="0 0 100 100">
		<g>
			{elements.map((e, i) => <circle cx={e.x} cy={e.y} r="3.052" key={i} className={_getClass(e.score, score)} />)}
		</g>
	</svg>
</div>

export default Scorebar
