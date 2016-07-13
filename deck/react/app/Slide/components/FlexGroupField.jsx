import React, { Component } from 'react'


export default function FlexGroupField({ value, images, getField }) {
    return (
        <div className="flex">
            {value.map((field, index) =>
                <span key={index} className="field">
                    {getField(field.type)({value: field.value, images})}
                </span>
            )}
        </div>
    )
}
