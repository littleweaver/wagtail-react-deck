import React from 'react'


export default function ParagraphField({ value }) {
    return <div dangerouslySetInnerHTML={{ __html: value}} />
}
