import React from 'react'
import Page from '../../../components/Hero/Page'

const Hero = ({ searchKeyword, searchKeywordHandler, submitSearchKeywordHandler }) => {
    return (
        <Page searchKeyword={searchKeyword} searchKeywordHandler={searchKeywordHandler} submitSearchKeywordHandler={submitSearchKeywordHandler} />
    )
}

export default Hero
