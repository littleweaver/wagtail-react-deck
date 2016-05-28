import React, { Component } from 'react'
import { highlightAuto } from 'highlight.js'

import Loader from './Loader'
import Weaver from './Weaver'

import 'highlight.js/styles/github-gist.css'

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
Field.flex_paragraph = Field.paragraph = Field.embed = function(value) {
    return <div dangerouslySetInnerHTML={{ __html: value}} />
}

Field.flex_paragraph_group = function(value) {
    return (
        <div className="flex">
            {value.map((field, index) =>
                    <span key={index} className="field">
                        {Field.flex_paragraph(field.value)}
                    </span>
            )}
        </div>
    )
}


Field.heading = function(value) {
    return <h1>{value}</h1>
}

Field.code = function(value) {
    const html = highlightAuto(value)
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

        let className="slide-contents"
        if (slide.centered_slide) {
            className += " slide-contents--centered"
        }

        const speakerNotes = window.opener &&
            <div
                className="speaker-notes"
                dangerouslySetInnerHTML={{ __html: slide.speaker_notes }}
            />


        const contents = slide.contents.reduce((acc, field) => {
            if (field.type !== 'flex_paragraph') {
                return acc.concat(field)
            }

            if (acc.length === 0 || acc[acc.length - 1].type !== 'flex_paragraph_group') {
                return acc.concat({
                    type: 'flex_paragraph_group',
                    value: [field],
                })
            }

            const copy = acc.slice(0)
            const tail = copy.pop()
            tail.value = tail.value.concat(field)
            return copy.concat(tail)
        }, [])
        console.log(contents)

        return (
            <div>
                {speakerNotes}
                <Weaver {...slide} />
                <Header {...slide} />

                <div className={className}>
                    {contents.map((field, index) =>
                        <span key={index} className="field">
                            {Field[field.type](field.value, this.props.images)}
                        </span>
                    )}
                </div>
            </div>
        )
    }
}

export default Slide
