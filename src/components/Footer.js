import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer>
            <ul>
                <li>
                    <a href="https://youtu.be/BBJa32lCaaY">Coupons!</a></li>
                <li>
                    <a href='http://facebook.com'>
                        <FontAwesomeIcon className="social" icon={faFacebook} />
                    </a>
                </li>
                <li>
                    <a href='http://twitter.com'>
                        <FontAwesomeIcon className="social" icon={faTwitter} />
                    </a>
                </li>
                <li>
                    <a href='http://instagram.com'>
                        <FontAwesomeIcon className="social" icon={faInstagram} />
                    </a>
                </li>
            </ul>
        </footer>
    )
}

export default Footer;