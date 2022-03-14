import React, { Component } from 'react';
import CategoryCards from './CategoryCards/CategoryCards';
import './Dashboard.css'
import Navbar from './Navbar/Navbar';
export default class Dashboard extends Component {
    render() {
        return <div>
            <Navbar></Navbar>
            <CategoryCards></CategoryCards>
        </div>
    }
}
