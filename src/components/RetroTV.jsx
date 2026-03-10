import React from 'react';
import './RetroTV.css';

const RetroTV = ({ videoSrc }) => {
    return (
        <div className="retro-tv-real-wrapper animate-fade-in">
            {/* The actual photorealistic TV image */}
            <img src="/assets/retro_tv_real.png" alt="Retro TV" className="retro-tv-image" />

            {/* The screen layer placed carefully matching the geometry of the TV */}
            <div className="retro-tv-real-screen">
                <div className="retro-tv-glare"></div>
                <div className="retro-tv-scanlines"></div>
                <div className="retro-tv-noise"></div>

                {videoSrc ? (
                    <video
                        className="retro-tv-video"
                        src={videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                ) : (
                    <div className="retro-tv-no-signal">
                        [ NO SIGNAL ]<br />Awaiting Video File...
                    </div>
                )}
            </div>
        </div>
    );
};

export default RetroTV;
