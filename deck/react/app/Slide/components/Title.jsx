import React, { Component } from 'react'


export default function Title({ display_title, title }) {
    if (!display_title) {
        return null
    }

    return (
        <header>
            <h1>{title}</h1>
        </header>
    )
}
