import React, { useState } from 'react';
import './MemeGallery.css';

// The current Zazu memes available for the gallery
const ZAZU_MEMES = [
    { id: 1, url: '/assets/meme_card.png', title: 'Card' },
    { id: 34, url: '/assets/meme_gojo.jpg', title: 'Gojo Cat' },
    { id: 2, url: '/assets/meme_mustache.png', title: 'Mustache' },
    { id: 3, url: '/assets/meme_alien.png', title: 'Alien' },
    { id: 4, url: '/assets/meme_sniper.png', title: 'Veteran Zazu' },
    { id: 29, url: '/assets/meme_un.jpg', title: 'UN Soldier' },
    { id: 5, url: '/assets/meme_face.png', title: 'Classic Zazu' },
    { id: 6, url: '/assets/meme_stop.jpg', title: 'Stop Being Poor' },
    { id: 35, url: '/assets/meme_link.jpg', title: 'Link Cat' },
    { id: 7, url: '/assets/meme_spring.png', title: 'Spring Zazu' },
    { id: 24, url: '/assets/meme_mirror.jpg', title: 'Mirror Cat' },
    { id: 17, url: '/assets/meme_trench.png', title: 'War Zazu' },
    { id: 30, url: '/assets/meme_pharaoh.jpg', title: 'Pharaoh' },
    { id: 8, url: '/assets/meme_thumbsup.png', title: 'Thumbs Up' },
    { id: 9, url: '/assets/meme_sky.png', title: 'Sunny Sky Zazu' },
    { id: 10, url: '/assets/meme_red.png', title: 'Red Zazu' },
    { id: 11, url: '/assets/meme_santa.png', title: 'Santa Zazu' },
    { id: 36, url: '/assets/meme_burger.jpg', title: 'Burger Cat' },
    { id: 25, url: '/assets/meme_robber.jpg', title: 'Robber Cat' },
    { id: 12, url: '/assets/meme_mcdonalds.png', title: 'McDonalds' },
    { id: 13, url: '/assets/meme_chef.png', title: 'Let Him Cook' },
    { id: 14, url: '/assets/meme_nerd.png', title: 'Nerd Zazu' },
    { id: 26, url: '/assets/meme_skater.jpg', title: 'Skater' },
    { id: 15, url: '/assets/meme_closeup.png', title: 'Stare Down' },
    { id: 16, url: '/assets/meme_bed.png', title: 'Big Poster' },
    { id: 31, url: '/assets/meme_president.jpg', title: 'President' },
    { id: 37, url: '/assets/meme_fortnite.jpg', title: 'Fortnite' },
    { id: 18, url: '/assets/meme_trench.png', title: 'War Zazu' },
    { id: 19, url: '/assets/meme_smug.jpg', title: 'Smug Cat' },
    { id: 20, url: '/assets/meme_hacker.jpg', title: 'Hacker' },
    { id: 32, url: '/assets/meme_chilling.jpg', title: 'Chilling' },
    { id: 21, url: '/assets/meme_explosion.jpg', title: 'Explosion' },
    { id: 27, url: '/assets/meme_wizard.jpg', title: 'Wizard' },
    { id: 22, url: '/assets/meme_warbn.jpg', title: 'War 1 Billion' },
    { id: 23, url: '/assets/meme_business.jpg', title: 'Business' },
    { id: 33, url: '/assets/meme_goku.jpg', title: 'Super Saiyan' },
    { id: 38, url: '/assets/meme_grab.jpg', title: 'Grab Cat' }
];

const MemeGallery = () => {
    // Allows toggling visual feedback on buttons
    const [copiedId, setCopiedId] = useState(null);
    const [rotation, setRotation] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.clientX || e.touches?.[0]?.clientX);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const currentX = e.clientX || e.touches?.[0]?.clientX;
        const diff = currentX - startX;
        setRotation(prev => prev - diff * 0.5); // Subtract diff to reverse direction
        setStartX(currentX);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleDownload = async (e, url, title) => {
        e.stopPropagation();
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = blobUrl;
            link.setAttribute('download', `${title.replace(/\s+/g, '_').toLowerCase()}.png`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (err) {
            console.error('Download failed', err);
        }
    };

    const handleCopy = async (e, url, id) => {
        e.stopPropagation();
        try {
            // Must fetch the image and write as blob to clipboard
            const response = await fetch(url);
            const blob = await response.blob();
            await navigator.clipboard.write([
                new ClipboardItem({ [blob.type]: blob })
            ]);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error('Copy to clipboard failed', err);
            // Fallback: Copy URL instead if image copy fails (e.g. browser restriction)
            try {
                // Prepend actual host if we are doing URL
                const fullUrl = window.location.origin + url;
                await navigator.clipboard.writeText(fullUrl);
                setCopiedId(id);
                setTimeout(() => setCopiedId(null), 2000);
            } catch (fallbackErr) {
                console.error('Fallback copy failed', fallbackErr);
            }
        }
    };

    // Radius set properly to give ~75% less spacing between 38 items!
    const radius = 1815;

    return (
        <section
            className="meme-gallery-section"
            id="meme-gallery"
        >
            <div className="section-header text-center">
                <h2 className="title-gradient">Meme Gallery</h2>
            </div>

            <div className="carousel-scene">
                <div
                    className="carousel-spinner"
                    style={{
                        transform: `translateZ(-${radius}px) rotateY(${rotation}deg)`,
                        transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                    }}
                >
                    {ZAZU_MEMES.map((meme, index) => {
                        const angle = index * (360 / ZAZU_MEMES.length);
                        return (
                            <div
                                className="carousel-item"
                                key={meme.id}
                                style={{
                                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`
                                }}
                            >
                                <img src={meme.url} alt={meme.title} />

                                <div className="carousel-overlay">
                                    <button
                                        className="overlay-btn"
                                        onClick={(e) => handleDownload(e, meme.url, meme.title)}
                                    >
                                        ⬇ Download
                                    </button>
                                    <button
                                        className="overlay-btn"
                                        style={{ background: 'var(--bg-glass)', color: 'white', border: '1px solid white' }}
                                        onClick={(e) => handleCopy(e, meme.url, meme.id)}
                                    >
                                        {copiedId === meme.id ? '✓ Copied!' : '⎘ Copy Image'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="drag-wheel-wrapper text-center">
                <div className="drag-wheel-text" style={{ marginBottom: '1rem' }}>◂ DRAG TO SPIN ▸</div>
                <div
                    className={`drag-wheel ${isDragging ? 'dragging' : ''}`}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={handleMouseDown}
                    onTouchMove={handleMouseMove}
                    onTouchEnd={handleMouseUp}
                    style={{ backgroundPositionX: `${rotation * 2}px` }}
                >
                </div>
            </div>
        </section>
    );
};

export default MemeGallery;
