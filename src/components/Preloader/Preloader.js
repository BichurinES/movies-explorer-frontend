import React from 'react'
import './Preloader.css'

const Preloader = (props) => {
    const { isPreloaderVisible } = props;

    return (
        <div className={ `preloader ${ isPreloaderVisible ? 'preloader_visible' : '' }` }>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader
