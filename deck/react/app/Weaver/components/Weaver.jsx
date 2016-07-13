import React from 'react'

export default function Weaver({ display_weaver }) {
    if (!display_weaver) {
        return null
    }

    return (
        <img
            src="/static/img/logo.svg"
            className="weaver"
        />
    )
}
