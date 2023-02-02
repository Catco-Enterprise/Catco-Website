import React from "react";
// import { library } from '@fortawesome/react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
    return (
        <footer>
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