import React from 'react';
import ContentLoader from 'react-content-loader';

const LoaderSingleProduct = () => {
    return (
        <ContentLoader
            speed={2}
            width="100%"
            height={603}
            viewBox="0 0 800 600"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="0" y="50" rx="14" ry="14" width="800" height="600" />
        </ContentLoader>
    );
};

export default LoaderSingleProduct;