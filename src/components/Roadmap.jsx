import React from 'react';
import './Roadmap.css';

const Roadmap = () => {
    return (
        <section className="roadmap-section text-center" id="roadmap">
            <div className="section-header">
                <h2 className="title-gradient">Roadmap</h2>
            </div>

            <div className="roadmap-horizontal-container">
                {/* SVG Curve Background */}
                <div className="svg-curve-container">
                    <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="dashed-curve">
                        <path
                            d="M 50,100 C 250,-50 450,250 650,100 S 850,-20 950,100"
                            fill="transparent"
                            stroke="rgba(255, 255, 255, 0.4)"
                            strokeWidth="4"
                            strokeDasharray="12, 12"
                        />
                    </svg>
                </div>

                <div className="roadmap-steps-wrapper">
                    <div className="roadmap-step step-1">
                        <div className="step-marker"></div>
                        <div className="step-content">
                            <h3>Launch</h3>
                            <p>Deploy Zazu into the trenches. Make memes, raid, get $Zazu everywhere.</p>
                        </div>
                    </div>

                    <div className="roadmap-step step-2">
                        <div className="step-marker"></div>
                        <div className="step-content text-top">
                            <h3>Recognition</h3>
                            <p>Zazu enters the public eye. Retail realizes this cat is the most viral memed cat in the trenches. Volume spikes. Marketing campaign pushes harder</p>
                        </div>
                    </div>

                    <div className="roadmap-step step-3">
                        <div className="step-marker">
                            <span className="final-x">X</span>
                        </div>
                        <div className="step-content">
                            <h3>Mascot Status</h3>
                            <p>The cult around Zazu made him the mascot cat of the trenches. Zazu's banner hangs in the halls with the great animal memes.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Roadmap;
