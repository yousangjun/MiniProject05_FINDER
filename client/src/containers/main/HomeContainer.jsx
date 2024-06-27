import React from 'react'
import HomeHeader from '../../components/main/HomeHeader'
import CardList from '../../components/main/CardList'

const HomeContainer = () => {
    return (
        <div class="container main-content">
            <HomeHeader/>
            <CardList/>
        </div>
    )
}

export default HomeContainer