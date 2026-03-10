import React, { useState } from 'react';
import './HeroSection.css';

const HeroSection = () => {
    const [btnText, setBtnText] = useState('Buy Now');

    const handleBuyClick = () => {
        if (btnText === 'Buy Now') {
            setBtnText('Patience');
            setTimeout(() => {
                setBtnText('Buy Now');
            }, 10000); // Revert after 10 seconds
        }
    };

    return (
        <section className="hero-section">
            <div className="hero-content">
                <div className="hero-title-wrapper">
                    <h1 className="hero-title">Zazu</h1>
                </div>
                <p className="hero-description">
                    $zazu the cat in the trenches.
                </p>
                <div className="hero-actions">
                    <button className="btn-primary buy-btn" onClick={handleBuyClick}>
                        {btnText}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
