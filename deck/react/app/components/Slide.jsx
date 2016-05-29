import React, { Component } from 'react'
import { highlightAuto } from 'highlight.js'

import Loader from './Loader'
import Weaver from './Weaver'

import 'highlight.js/styles/github-gist.css'
const languages = ['python', 'jsx', 'bash', 'json', 'html']

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

const Field = {}
Field.paragraph = Field.embed = function(value) {
    return <div dangerouslySetInnerHTML={{ __html: value}} />
}

Field.flex_group = function(value, images) {
    return (
        <div className="flex">
            {value.map((field, index) =>
                    <span key={index} className="field">
                        {Field[field.type](field.value, images)}
                    </span>
            )}
        </div>
    )
}

Field.heading = function(value) {
    return <h1>{value}</h1>
}

Field.code = function(value) {
    const html = highlightAuto(value, languages)
    return (
        <pre>
            <code dangerouslySetInnerHTML={{ __html: html.value}} />
        </pre>
    )
}

Field.image = function(value, images) {
    const image = images.find(image => image.id === value)
    if (!image) {
        return <Loader />
    }

    return (
        <img
            src={image.original_url}
        />
    )
}

function getSlideClassName(base, slide) {
    const classNames = [base]
    if (slide.centered_slide) {
        classNames.push(`${base}--centered`)
    }

    if (slide.display_weaver) {
        classNames.push(`${base}--has-weaver`)
    }

    return classNames.join(' ')
}

class Slide extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentWillReceiveProps(nextProps) {
        const slide = nextProps.pages.find(page => page.ordering >= parseInt(nextProps.params.ordering))
        if (!slide) {
            return
        }

        this.setState({
            slide,
        })

        document.title = `${slide.ordering} | ${slide.title}`
    }

    render() {
        const slide = this.state.slide
        if (!slide) {
            return <Loader />
        }

        const speakerNotes = window.opener &&
            <div
                className="speaker-notes"
                dangerouslySetInnerHTML={{ __html: slide.speaker_notes }}
            />

        return (
            <div className={getSlideClassName('slide', slide)}>
                {speakerNotes}
                <Weaver {...slide} />
                <Header {...slide} />

                <div className={getSlideClassName('slide-contents', slide)}>
                    {slide.contents.map((field, index) =>
                        <span key={index} className="field">
                            {Field[field.type](field.value, this.props.images)}
                        </span>
                    )}
                </div>

                <div className="counter">
                    {this.props.params.ordering} of {this.props.pages.length}
                </div>
            </div>
        )
    }
}

export default Slide
