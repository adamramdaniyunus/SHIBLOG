import React from 'react'
import { images } from '../../constants'

const HeroImage = () => {
    return (
        <div className='hidden ml-20 lg:block lg:1/2'>
            <img src={images.Heroimage} className='w-full' alt="blogs" />
        </div>
    )
}

export default HeroImage
