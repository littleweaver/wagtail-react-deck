import React from 'react'

import './loaders.css'

export default function Loader({ loading }) {
    const className = loading ? "loader" : "loader fade-out"

    return (
        <div className={className}>
            <div className="loader-inner ball-pulse" role="presentation">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}
