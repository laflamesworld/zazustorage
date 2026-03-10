import React, { useState } from 'react';
import './MemeGallery.css';

// The current Zazu memes available for the gallery
const ZAZU_MEMES = [
    { id: 1, url: '/images/memes/meme_card.png', title: 'Pokemon Card' },
    { id: 2, url: '/images/memes/meme_gojo.jpg', title: 'Gojo Cat' },
    { id: 3, url: '/images/memes/meme_alien.png', title: 'Alien Zazu' },
    { id: 4, url: '/images/memes/meme_face.png', title: 'Classic Zazu' },
    { id: 5, url: '/images/memes/meme_burger.jpg', title: 'Burger Cat' },
    { id: 6, url: '/images/memes/meme_bed.png', title: 'Big Poster' },
    { id: 7, url: '/images/memes/meme_business.jpg', title: 'Hacker Kiosk' },
    { id: 8, url: '/images/memes/meme_hacker.jpg', title: 'News Anchor' },
    { id: 9, url: '/images/memes/meme_british.jpg', title: 'British Cat' },
    { id: 10, url: '/images/memes/meme_fortnite.jpg', title: 'Fortnite' },
    { id: 11, url: '/images/memes/meme_chef.png', title: 'Let Him Cook' },
    { id: 12, url: '/images/memes/meme_closeup.png', title: 'Stare Down' },
    { id: 13, url: '/images/memes/meme_chilling.jpg', title: 'Chilling' },
    { id: 14, url: '/images/memes/meme_grab.jpg', title: 'Gojo Grab' },
    { id: 15, url: '/images/memes/meme_goku.jpg', title: 'Super Saiyan' },
    { id: 16, url: '/images/memes/meme_explosion.jpg', title: 'Explosion' },
    { id: 17, url: '/images/memes/meme_pharaoh.jpg', title: 'Pharaoh' },
    { id: 18, url: '/images/memes/meme_link.jpg', title: 'Victory Royale' },
    { id: 19, url: '/images/memes/meme_mirror.jpg', title: 'Mirror Man' },
    { id: 20, url: '/images/memes/meme_smug.jpg', title: 'Thuggin' },
    { id: 21, url: '/images/memes/meme_sniper.png', title: 'War Veteran' },
    { id: 22, url: '/images/memes/meme_sky.png', title: 'Sunny Sky' },
    { id: 23, url: '/images/memes/meme_stop.jpg', title: 'Stop Being Poor' },
    { id: 24, url: '/images/memes/meme_mustache.png', title: 'Mustache' },
    { id: 25, url: '/images/memes/meme_red.png', title: 'Demon Zazu' },
    { id: 26, url: '/images/memes/meme_mcdonalds.png', title: 'McDonalds' },
    { id: 27, url: '/images/memes/meme_robber.jpg', title: 'Outlaw' },
    { id: 28, url: '/images/memes/meme_santa.png', title: 'Santa Zazu' },
    { id: 29, url: '/images/memes/meme_president.jpg', title: 'President' },
    { id: 30, url: '/images/memes/meme_nerd.png', title: 'Nerd' },
    { id: 31, url: '/images/memes/meme_skater.jpg', title: 'Skater' },
    { id: 32, url: '/images/memes/meme_spring.png', title: 'Spring Cat' },
    { id: 33, url: '/images/memes/meme_wizard.jpg', title: 'Wizard' },
    { id: 34, url: '/images/memes/meme_trench.png', title: 'Trench Warfare' },
    { id: 35, url: '/images/memes/meme_un.jpg', title: 'UN Peacekeeper' },
    { id: 36, url: '/images/memes/meme_warbn.jpg', title: 'Cool Cats Dont Look' },
    { id: 37, url: '/images/memes/meme_thumbsup.png', title: 'Thumbs Up' },
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
