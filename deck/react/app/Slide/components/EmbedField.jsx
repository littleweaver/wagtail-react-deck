import React from 'react'


export default function EmbedField({ value }) {
    return <div dangerouslySetInnerHTML={{ __html: value}} />
}
