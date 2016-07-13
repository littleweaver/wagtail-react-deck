import React from 'react'

import Loader from '~/Loader/components/Loader'


export default function ImageField({ value, images }) {
    const image = images.find(image => image.id === value)
    if (!image) {
        return <Loader />
    }

    return (
        <img
            src={image.file}
        />
    )
}
