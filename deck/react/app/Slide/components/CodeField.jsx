import React from 'react'

import { highlightAuto } from 'highlight.js'

import 'highlight.js/styles/github-gist.css'


const languages = ['python', 'jsx', 'bash', 'json', 'html']


export default function CodeField({ value }) {
    const html = highlightAuto(value, languages)
    return (
        <pre>
            <code dangerouslySetInnerHTML={{ __html: html.value}} />
        </pre>
    )
}
