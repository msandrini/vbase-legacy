import React from 'react'
import DocumentTitle from 'react-document-title'
import { DOCUMENT_TITLE, DOCUMENT_TITLE_SEPARATOR } from '../../constants'

const _getTitle = dynamicPart => {
	const title = dynamicPart.substr(0, 1).toUpperCase() + dynamicPart.substr(1)
	return `${title} ${DOCUMENT_TITLE_SEPARATOR} ${DOCUMENT_TITLE}`
}

const PageTitle = ({title}) => <DocumentTitle title={_getTitle(title)} />

export default PageTitle
