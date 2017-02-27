import React from 'react'
import t from '../../i18n'
import './scorebar.styl'

const elements = [
	{ score: 10, color: '#F00', y: 6.257, x: 57.561 },
	{ score: 9.5, color: '#F60', y: 8.795, x: 65.927 },
	{ score: 9, color: '#F90', y: 12.916, x: 73.638 },
	{ score: 8.5, color: '#FC0', y: 18.463, x: 80.397 },
	{ score: 8, color: '#FF0', y: 25.221, x: 85.943 },
	{ score: 7.5, color: '#CF0', y: 32.932, x: 90.064 },
	{ score: 7, color: '#9F0', y: 41.299, x: 92.602 },
	{ score: 6.5, color: '#0F9', y: 50, x: 93.459 },
	{ score: 6, color: '#0FC', y: 58.701, x: 92.603 },
	{ score: 5.5, color: '#0FF', y: 67.067, x: 90.064 },
	{ score: 5, color: '#5CF', y: 74.778, x: 85.942 },
	{ score: 4.5, color: '#7AF', y: 81.537, x: 80.396 },
	{ score: 4, color: '#88F', y: 87.083, x: 73.638 },
	{ score: 3.5, color: '#97F', y: 91.204, x: 65.927 },
	{ score: 3, color: '#B7F', y: 93.742, x: 57.561 }
]

const _getFillAndClass = (color, elementScore, gameScore) => {
	if (gameScore === elementScore) {
		return [color, '']
	} else if (gameScore > elementScore) {
		return [false, 'in']
	} else {
		return [false, 'out']
	}
}

const Scorebar = ({score, leanMode}) => <div className="scorebar" title={score + ' ' + t('out-of-10')}>
	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
		width={leanMode ? 85 : 100} height={leanMode ? 85 : 100} viewBox="0 0 100 100">
		<g>
			{elements.map((e, i) => {
				const [fill, classN] = _getFillAndClass(e.color, e.score, score)
				return <circle cx={e.x} cy={e.y} r="3.052" key={i}
					fill={fill} className={classN} />
				})
			}
		</g>
	</svg>
</div>

export default Scorebar