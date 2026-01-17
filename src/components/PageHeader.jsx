import React from 'react';
import './PageHeader.css';

const PageHeader = ({ title, subtitle, backgroundImage }) => {
    return (
        <div
            className="page-header-premium"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="header-overlay"></div>
            <div className="container header-content">
                <h1 className="header-title">{title}</h1>
                {subtitle && <p className="header-subtitle">{subtitle}</p>}
                <div className="header-accent"></div>
            </div>
        </div>
    );
};

export default PageHeader;
