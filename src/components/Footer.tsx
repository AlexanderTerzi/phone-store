import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className='footer'>
            All rights reserved &copy;. Odessa {(new Date()).getFullYear()}
        </footer>
    );
};

export default Footer;