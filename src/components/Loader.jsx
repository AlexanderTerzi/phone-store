import React from 'react';
import ContentLoader from 'react-content-loader';

const Loader = () => {
    return (
        <ContentLoader
            className="phone-block"
            speed={2}
            width={270}
            height={603}
            viewBox="0 0 270 603"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="58" y="3" rx="14" ry="14" width="140" height="260" />
            <rect x="27" y="284" rx="5" ry="5" width="213" height="27" />
            <rect x="9" y="336" rx="8" ry="8" width="248" height="144" />
            <rect x="11" y="514" rx="3" ry="3" width="60" height="30" />
            <rect x="140" y="512" rx="3" ry="3" width="112" height="30" />
            <rect x="9" y="561" rx="7" ry="7" width="248" height="42" />
        </ContentLoader>
    );
};

export default Loader;