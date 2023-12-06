import React from 'react'
import Page from '../../../components/CTA/Page'

const CTA = () => {
    return (
        <>
            <svg className='w-full h-auto max-h-40 translate-y-[1px] mt-4'
                preserveAspectRatio='none' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#363636" fillOpacity="1" d="M0,0L80,32C160,64,320,128,480,181.3C640,235,800,277,960,277.3C1120,277,1280,235,1360,213.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </svg>
            <Page />
        </>
    )
}

export default CTA
