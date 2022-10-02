import React from 'react';

const Footer = () => {
    return (
        <footer className='footer'>
            All rights reserved &copy;. Odessa {(new Date()).getFullYear()}
        </footer>
    );
};

export default Footer;