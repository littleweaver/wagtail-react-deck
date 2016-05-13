import axios from 'axios'
import React, { Component, cloneElement } from 'react'
import { Link, browserHistory } from 'react-router'

import Loader from './Loader'

const pageFields = [
    'speaker_notes',
    'contents',
    'display_weaver',
    'display_title',
    'centered_slide',
    'ordering',
]

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
            pages: this.state.pages.concat(pages),
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
            pages: this.state.pages.concat(fetchedPage),
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
