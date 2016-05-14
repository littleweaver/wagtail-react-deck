import React, { Component } from 'react'

import Loader from './Loader'
import Weaver from './Weaver'

function Header({ display_title, title }) {
    if (!display_title) {
        return null
    }

    return (
        <header>
            <h1>{title}</h1>
        </header>
    )
}

let Field = {}
Field.paragraph = Field.embed = function(value) {
    return <div dangerouslySetInnerHTML={{ __html: value}} />
}

Field.heading = function(value) {
    return <h1>{value}</h1>
}

class Slide extends Component {
    render() {
        const slide = this.props.pages.find(page => page.ordering >= parseInt(this.props.params.ordering))
        if (!slide) {
            return <Loader />
        }

        let className="slide-contents"
        if (slide.centered_slide) {
            className += " slide-contents--centered"
        }

        return (
            <div>
                <Weaver {...slide} />
                <Header {...slide} />

                <div className={className}>
                    {slide.contents.map((field, index) =>
                        <span key={index} className="field">
                            {Field[field.type](field.value)}
                        </span>
                    )}
                </div>
            </div>
        )
    }
}

export default Slide
