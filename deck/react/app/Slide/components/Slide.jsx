import React, { Component } from 'react'

import Loader from '~/Loader/components/Loader'
import CodeField from '~/Slide/components/CodeField'
import EmbedField from '~/Slide/components/EmbedField'
import FlexGroupField from '~/Slide/components/FlexGroupField'
import HeadingField from '~/Slide/components/HeadingField'
import ImageField from '~/Slide/components/ImageField'
import ParagraphField from '~/Slide/components/ParagraphField'
import Title from '~/Slide/components/Title'
import Weaver from '~/Weaver/components/Weaver'


const FIELDS = {
    code: CodeField,
    embed: EmbedField,
    flex_group: FlexGroupField,
    heading: HeadingField,
    image: ImageField,
    paragraph: ParagraphField,
}


function getField(fieldType) {
    if (!FIELDS.hasOwnProperty(fieldType))
        throw 'Unknown fieldType: ' + fieldType
    return FIELDS[fieldType]
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
                <Title {...slide} />

                <div className={getSlideClassName('slide-contents', slide)}>
                    {slide.contents.map((field, index) =>
                        <span key={index} className="field">
                            {getField(field.type)({
                                value: field.value,
                                images: this.props.images,
                                getField,
                            })}
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
