/** import bootstrap */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

/** import children */
import Header from "./Header/Header"
import Page from "./Page/Page"
import Footer from "./Footer/Footer"

/** bs */
import 'bootstrap/dist/css/bootstrap.min.css'
import './../../Assets/Iq.scss'

class AppComponent extends Component {

    /** render view */
    render = () => {
        return (
            <BrowserRouter>
                <Header/>
                <Page />
                <Footer />
            </BrowserRouter>
        )
    }
}

/** map states to prop */
const mapStateToProps = (state) => {
    return state
}

/** dispatch props */
const mapDispatchToProps = {
}

/** export application container */
export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent)
