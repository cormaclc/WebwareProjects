import React from 'react';
import './header_styles.css';
import {Link} from "react-router-dom";

class Header extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div id='header_wrapper'>
                    <div id='site-name'>
                        <Link to='/' id='home_link'>Beat<span id='factory'>Factory</span></Link>
                    </div>
                    <div id='menu'>
                        <Link to='/cart' id='cartLink'><p >Cart</p></Link>
                    </div>
                </div>
                <div id='border'/>
            </React.Fragment>
        )
    }
}

export default Header;