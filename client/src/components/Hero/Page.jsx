import React from 'react'
import Ttitle from './Ttitle'
import HeroImage from './HeroImage'

const Page = ({ searchKeyword, searchKeywordHandler, submitSearchKeywordHandler }) => {
    return (
        <div>
            <section className='container mx-auto flex flex-col p-5 lg:flex-row z-[49]'>
                <Ttitle searchKeyword={searchKeyword} searchKeywordHandler={searchKeywordHandler} submitSearchKeywordHandler={submitSearchKeywordHandler} />
                <HeroImage />
            </section>
        </div>
    )
}

export default Page
