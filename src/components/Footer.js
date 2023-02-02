import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import '../style/Footer.css'


const Footer = () => {
    return (
        <footer className="footer-container">

            <a href="https://youtu.be/BBJa32lCaaY"> click here for coupons!!!!</a>
            <a href='http://facebook.com'>
                <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href='http://twitter.com'>
                <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href='http://instagram.com'>
                <FontAwesomeIcon icon={faInstagram} />
            </a>
        </footer >
    )
}

export default Footer;