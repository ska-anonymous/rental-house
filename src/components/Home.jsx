import React, { useContext, useEffect } from 'react'
import Header from './Header'
import Find from './Find'
import About from './About'
import Houses from './Houses'
import Excellence from './Excellence'
import Contact from './Contact'
import Info from './Info'
import Footer from './Footer'
import LoginModal from './LoginModal'
import SignupModal from './SignupModal'
import { AppContext } from '../App'

const Home = () => {
    const { setTheme } = useContext(AppContext)
    useEffect(() => {
        setTheme('light');
        document.body.classList.remove('dark-mode');
    }, [])
    return (
        <>
            <LoginModal />
            <SignupModal />
            <Header />
            <Find />
            <About />
            <Houses />
            <Excellence />
            <Contact />
            <Info />
            <Footer />
        </>
    )
}

export default Home
