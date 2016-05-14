import axios from 'axios'
import React, { Component, cloneElement } from 'react'
import { Link, browserHistory } from 'react-router'

import Loader from './Loader'

const pageFields = [
    'title',
    'speaker_notes',
    'contents',
    'display_weaver',
    'display_title',
    'centered_slide',
    'ordering',
]

const sortPages = (a, b) => a.ordering - b.ordering

const leftKeyCode = 37
const rightKeyCode = 39
const oKeyCode = 79

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: 0,
            pages: [],
            images: [],
        }
    }

    componentDidMount() {
        axios.get('/api/v1/pages/', {
                params: {
                    type: 'slides.Slide',
                    fields: pageFields.join(','),
                    order: 'ordering',
                }
            })
            .then(this.handlePagesIndex.bind(this))

        document.addEventListener('keydown', this.handleKeydown.bind(this))
        window.addEventListener('message', this.handleMessage.bind(this))
    }

    handleMessage(event) {
        if (event.data.nextSlide) {
            browserHistory.push(`/slide/${event.data.nextSlide}/`)
        }
    }

    handleKeydown(event) {
        if (event.keyCode === rightKeyCode) {
            this.changeSlide(1)
        } else if (event.keyCode === leftKeyCode) {
            this.changeSlide(-1)
        } else if (event.keyCode === oKeyCode) {
            this.openSpeakerNotes()
        }
    }

    openSpeakerNotes() {
        this.speakerWindow = window.open(window.location.href)
    }

    changeSlide(offset) {
        const currentSlide = parseInt(this.props.params.ordering)
        const orderings = this.state.pages.map(page => page.ordering)
        const maxOrdering = Math.max.apply(null, orderings)
        const minOrdering = Math.min.apply(null, orderings)

        const nextSlide = Math.max(Math.min(currentSlide + offset, maxOrdering), minOrdering)
        browserHistory.push(`/slide/${nextSlide}/`)

        const target = window.opener || this.speakerWindow
        if (target) {
            target.postMessage({ nextSlide, }, '*')
        }
    }

    handlePagesIndex(response) {
        const fetchedPages = response.data.pages
        const existingPages = this.state.pages
        const pages = fetchedPages.filter(fetchedPage => {
            return !existingPages.some(page => page.id === fetchedPage.id)
        })

        const imageFields = pages.reduce((acc, page) => {
            return acc.concat(page.contents.filter(field => field.type === 'image'))
        }, [])

        this.fireImageRequests(imageFields)

        this.setState({
            loading: this.state.loading - 1,
            pages: this.state.pages.concat(pages).sort(sortPages),
        })
    }

    handlePagesDetail(response) {
        const fetchedPage = response.data
        if (this.state.pages.find(page => page.id === fetchedPage.id)) {
            return
        }

        const imageFields = fetchedPage.contents.filter(field => field.type === 'image')

        this.fireImageRequests(imageFields)

        this.setState({
            loading: this.state.loading - 1,
            pages: this.state.pages.concat(fetchedPage).sort(sortPages),
        })
    }

    handleImagesIndex(response) {
        this.setState({
            loading: this.state.loading - 1,
            images: this.state.images.concat(response.data.images),
        })
    }

    handleImagesDetail(response) {
        this.setState({
            loading: this.state.loading - 1,
            images: this.state.images.concat(response.data),
        })
    }

    fireImageRequests(imageFields) {
        const images = this.state.images
        const unfetchedImages = imageFields.filter(field => !images.some(image => image.id === field.value))

        if (unfetchedImages.length === 0) {
            return
        }

        this.incrementLoading(unfetchedImages.length)
        for (const field of unfetchedImages) {
            axios.get(`/api/v1/images/${field.value}/`)
                .then(this.handleImagesDetail.bind(this))
        }
    }

    incrementLoading(count = 1) {
        this.setState({
            loading: this.state.loading + count,
        })
    }

    render() {
        const { children } = this.props
        const childProps = {
            loading: this.state.loading,
            handlePagesIndex: this.handlePagesIndex.bind(this),
            handlePagesDetail: this.handlePagesDetail.bind(this),
            handleImagesIndex: this.handleImagesIndex.bind(this),
            handleImagesDetail: this.handleImagesDetail.bind(this),
            incrementLoading: this.incrementLoading.bind(this),
            pages: this.state.pages,
            images: this.state.images,
        }

        return (
            <div>
                {React.Children.map(children, child => cloneElement(child, childProps))}
            </div>
        )
    }
}

export default App
