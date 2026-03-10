import React, { useState } from 'react';
import './PfpGenerator.css';

// Mock asset data structure
const CATEGORIES = ['Background', 'Headwear', 'Glasses', 'Clothing', 'Accessories'];

const ASSETS = {
    Background: [
        { id: 'bg_none', name: 'None', url: '/images/backgrounds/bg_none_color.png' },
        { id: 'bg_battlefield', name: 'Battlefield', url: '/images/backgrounds/bg_battlefield.png' },
        { id: 'bg_iverson', name: 'Step Over', url: '/images/backgrounds/bg_iverson.png' },
        { id: 'bg_basketball', name: 'The Dunk', url: '/images/backgrounds/bg_basketball.png' },
        { id: 'bg_favela', name: 'Favela', url: '/images/backgrounds/bg_favela.png' },
        { id: 'bg_cat_mafia', name: 'Cat Mafia', url: '/images/backgrounds/bg_cat_mafia.png' },
        { id: 'bg_desert', name: 'Desert Tactics', url: '/images/backgrounds/bg_desert.png' },
        { id: 'bg_creation', name: 'Creation of Adam', url: '/images/backgrounds/bg_creation.png' },
        { id: 'bg_kobe', name: 'Trophies', url: '/images/backgrounds/bg_kobe.png' },
        { id: 'bg_cafe', name: 'Cafe Terrace', url: '/images/backgrounds/bg_cafe.png' },
        { id: 'bg_legends', name: 'Legends', url: '/images/backgrounds/bg_legends.png' },
        { id: 'bg_trenches', name: 'The Trenches', url: '/images/backgrounds/bg_trenches.png' },
        { id: 'bg_nighthawks', name: 'Nighthawks', url: '/images/backgrounds/bg_nighthawks.png' },
        { id: 'bg_wtc', name: 'WTC', url: '/images/backgrounds/bg_wtc.png' },
        { id: 'bg_oblock', name: 'O Block', url: '/images/backgrounds/bg_oblock.png' },
        { id: 'bg_rage_quit', name: 'Crash Out', url: '/images/backgrounds/bg_rage_quit.png' },
        { id: 'bg_nuke', name: 'Nuke', url: '/images/backgrounds/bg_nuke.png' },
        { id: 'bg_scream', name: 'The Scream', url: '/images/backgrounds/bg_scream.png' },
        { id: 'bg_street', name: 'The Hood', url: '/images/backgrounds/bg_street.png' },
        { id: 'bg_nyse', name: 'NYSE', url: '/images/backgrounds/bg_nyse.png' },
        { id: 'bg_wolf', name: 'Wolf of Wall St', url: '/images/backgrounds/bg_wolf.png' },
        { id: 'bg_stealth', name: 'Stealth Bombers', url: '/images/backgrounds/bg_stealth.png' },
        { id: 'bg_trading_floor', name: 'Trading Floor', url: '/images/backgrounds/bg_trading_floor.png' },
    ],
Headwear: [
        { id: 'h_none', name: 'None', url: '' },
        { id: 'h_helmet', name: 'Army Helmet', url: '/images/headwear/h_helmet.png' },
        { id: 'h_beret', name: 'Beret', url: '/images/headwear/h_beret.png' },
        { id: 'h_ny', name: 'NY Hat', url: '/images/headwear/h_ny.png' },
        { id: 'h_la', name: 'LA Hat', url: '/images/headwear/h_la.png' },
        { id: 'h_bulls', name: 'Bulls Hat', url: '/images/headwear/h_bulls.png' },
        { id: 'h_heat', name: 'Heat Hat', url: '/images/headwear/h_heat.png' },
        { id: 'h_crown', name: 'Crown', url: '/images/headwear/h_crown.png' },
        { id: 'h_knight', name: 'Knight Helmet', url: '/images/headwear/h_knight.png' },
        { id: 'h_ushanka', name: 'Ushanka', url: '/images/headwear/h_ushanka.png' },
        { id: 'h_bandana', name: 'Red Bandana', url: '/images/headwear/h_bandana.png' },
        { id: 'h_viking', name: 'Viking Helmet', url: '/images/headwear/h_viking.png' },
        { id: 'h_cowboy', name: 'Cowboy Hat', url: '/images/headwear/h_cowboy.png' },
        { id: 'h_pharaoh', name: 'Pharaoh', url: '/images/headwear/h_pharaoh.png' },
        { id: 'h_donttread', name: 'Don\'t Tread', url: '/images/headwear/h_donttread.png' },
        { id: 'h_blackhelm', name: 'Black Helm', url: '/images/headwear/h_blackhelm.png' },
        { id: 'h_camo', name: 'Camo Hat', url: '/images/headwear/h_camo.png' },
        { id: 'h_bluecap', name: 'Blue Cap', url: '/images/headwear/h_bluecap.png' },
        { id: 'h_snapback', name: 'Snapback', url: '/images/headwear/h_snapback.png' },
        { id: 'h_propeller', name: 'Propeller Hat', url: '/images/headwear/h_propeller.png' },
        { id: 'h_keffiyeh', name: 'Keffiyeh', url: '/images/headwear/h_keffiyeh.png' },
        { id: 'h_tophat', name: 'Top Hat', url: '/images/headwear/h_tophat.png' },
        { id: 'h_fedora', name: 'Fedora', url: '/images/headwear/h_fedora.png' },
    ],
Glasses: [
        { id: 'g_none', name: 'None', url: '' },
        { id: 'g_circular', name: 'Circular', url: '/images/glasses/g_circular.png' },
        { id: 'g_steampunk', name: 'Tiger Goggles', url: '/images/glasses/g_steampunk.png' },
        { id: 'g_aviators', name: 'Aviators', url: '/images/glasses/g_aviators.png' },
        { id: 'g_laser', name: 'Laser Eyes', url: '/images/glasses/g_laser.png' },
        { id: 'g_whiteoval', name: 'White Oval', url: '/images/glasses/g_whiteoval.png' },
        { id: 'g_visor', name: 'Cyber Visor', url: '/images/glasses/g_visor.png' },
        { id: 'g_wayfarers', name: 'Wayfarers', url: '/images/glasses/g_wayfarers.png' },
        { id: 'g_wire', name: 'Wire Frames', url: '/images/glasses/g_wire.png' },
        { id: 'g_maybach', name: 'Maybach', url: '/images/glasses/g_maybach.png' },
        { id: 'g_lv', name: 'LV Shades', url: '/images/glasses/g_lv.png' },
        { id: 'g_cyberpunk', name: 'Cyberpunk', url: '/images/glasses/g_cyberpunk.png' },
        { id: 'g_goggles', name: 'Tactical Goggles', url: '/images/glasses/g_goggles.png' },
        { id: 'g_moggles', name: 'Pit Vipers Orange', url: '/images/glasses/g_moggles.png' },
        { id: 'g_speed', name: 'Speed Shades', url: '/images/glasses/g_speed.png' },
        { id: 'g_pitvipers', name: 'Pit Vipers Blue', url: '/images/glasses/g_pitvipers.png' },
    ],
Clothing: [
        { id: 'c_none', name: 'None', url: '' },
        { id: 'c_jersey_heat', name: 'Heat Jersey', url: '/images/clothing/c_jersey_heat.png' },
        { id: 'c_jersey_lakers', name: 'Lakers Jersey', url: '/images/clothing/c_jersey_lakers.png' },
        { id: 'c_jersey_bulls', name: 'Bulls Jersey', url: '/images/clothing/c_jersey_bulls.png' },
        { id: 'c_polo_gucci', name: 'Gucci Polo', url: '/images/clothing/c_polo_gucci.png' },
        { id: 'c_parka', name: 'Soviet Parka', url: '/images/clothing/c_parka.png' },
        { id: 'c_camo', name: 'Camo Uniform', url: '/images/clothing/c_camo.png' },
        { id: 'c_nike', name: 'Nike Pullover', url: '/images/clothing/c_nike.png' },
        { id: 'c_camo_vest', name: 'Tactical Vest', url: '/images/clothing/c_camo_vest.png' },
        { id: 'c_polo_black', name: 'Black Polo', url: '/images/clothing/c_polo_black.png' },
        { id: 'c_robe', name: 'Royal Robe', url: '/images/clothing/c_robe.png' },
        { id: 'c_polo', name: 'Moncler Polo', url: '/images/clothing/c_polo.png' },
        { id: 'c_bandolier', name: 'Bandolier', url: '/images/clothing/c_bandolier.png' },
        { id: 'c_armor', name: 'Knight Armor', url: '/images/clothing/c_armor.png' },
        { id: 'c_psg', name: 'PSG Jersey', url: '/images/clothing/c_psg.png' },
        { id: 'c_hoodie', name: 'Black Hoodie', url: '/images/clothing/c_hoodie.png' },
        { id: 'c_camo_hoodie', name: 'Camo Hoodie', url: '/images/clothing/c_camo_hoodie.png' },
        { id: 'c_puffer', name: 'Puffer Vest', url: '/images/clothing/c_puffer.png' },
    ],
    Accessories: [
        { id: 'a_none', name: 'None', url: '' },
        { id: 'a_ak47', name: 'Assault Rifle', url: '/assets/a_ak47.png' },
        { id: 'a_dual_pistols', name: 'Dual Pistols', url: '/assets/a_dual_pistols.png' },
        { id: 'a_watch_gold', name: 'Jacob & Co Tourbillon', url: '/assets/a_watch_gold.png' },
        { id: 'a_watch_silver', name: 'Iced Out Patek', url: '/assets/a_watch_silver.png' },
        { id: 'a_watch_rainbow', name: 'Colored Diamond Patek', url: '/assets/a_watch_rainbow.png' },
        { id: 'a_watch_digital', name: 'Diamond G Shock', url: '/assets/a_watch_digital.png' },
        { id: 'a_watch_emerald', name: 'Rainbow Rolex', url: '/assets/a_watch_emerald.png' },
        { id: 'a_katana', name: 'Katana', url: '/assets/a_katana.png' },
        { id: 'a_mustache', name: 'Mustache', url: '/assets/a_mustache.png' },
        { id: 'a_mace', name: 'Mace', url: '/assets/a_mace.png' },
        { id: 'a_flail', name: 'Flail', url: '/assets/a_flail.png' },
        { id: 'a_nunchucks', name: 'Nunchucks', url: '/assets/a_nunchucks.png' },
        { id: 'a_shuriken', name: 'Shuriken', url: '/assets/a_shuriken.png' },
        { id: 'a_chopsticks', name: 'Chopsticks', url: '/assets/a_chopsticks.png' },
        { id: 'a_cigar', name: 'Cuban Cigar', url: '/assets/a_cigar.png' },
        { id: 'a_cigarette', name: 'Cigarette', url: '/assets/a_cigarette.png' },
        { id: 'a_sniper', name: 'Desert Sniper', url: '/assets/a_sniper.png' },
        { id: 'a_diamondsmg', name: 'Diamond SMG', url: '/assets/a_diamondsmg.png' },
        { id: 'a_goldsmg', name: 'Gold SMG', url: '/assets/a_goldsmg.png' },
        { id: 'a_middlefinger', name: 'Middle Finger', url: '/assets/a_middlefinger.png' },
    ]
};

const PfpGenerator = () => {
    const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
    const [isDownloading, setIsDownloading] = useState(false);
    const [selections, setSelections] = useState({
        Background: ASSETS.Background[0],
        Headwear: ASSETS.Headwear[0],
        Glasses: ASSETS.Glasses[0],
        Clothing: ASSETS.Clothing[0],
        Accessories: ASSETS.Accessories[0]
    });

    const handleSelect = (category, item) => {
        setSelections(prev => ({
            ...prev,
            [category]: item
        }));
    };

    const handleDownload = async () => {
        setIsDownloading(true);
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');

        // Order matters! Background -> Base Cat -> Clothing -> Headwear -> Glasses -> Accessories (Always Front)
        const layersToDraw = [
            selections.Background?.url,
            '/images/base-cat.png',
            selections.Clothing?.url,
            selections.Headwear?.url,
            selections.Glasses?.url,
            selections.Accessories?.url
        ].filter(Boolean); // This removes any empty string URLs ("None" selections)

        const loadImage = (src) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = 'anonymous'; // Avoid CORS issues
                img.onload = () => resolve(img);
                img.onerror = () => reject(new Error(`Failed to load background image`));
                img.src = src;
            });
        };

        try {
            // Fill with dark background first to avoid white edges on any images
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            for (const url of layersToDraw) {
                const img = await loadImage(url);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            }

            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'trenchcat-pfp.png';
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error generating image:', error);
            alert('Failed to generate image. Please try again.');
        } finally {
            setIsDownloading(false);
        }
    };

    const randomOutfit = () => {
        const randomSelections = {};
        CATEGORIES.forEach(cat => {
            const items = ASSETS[cat];
            // For Background, skip index 0 ("None") so there is always a background
            const minIdx = cat === 'Background' ? 1 : 0;
            const randIdx = Math.floor(Math.random() * (items.length - minIdx)) + minIdx;
            randomSelections[cat] = items[randIdx];
        });
        setSelections(randomSelections);
    };

    return (
        <section className="generator-section align-center">
            <div className="section-header text-center">
                <h2 className="title-gradient">PFP Generator</h2>
            </div>

            <div className="generator-container glass-panel">

                {/* Left Side: Preview Canvas */}
                <div className="preview-container dark-card">
                    <div className="canvas-wrapper">
                        {/* Base Layer */}
                        <img src="/images/base-cat.png" alt="Base Cat" className="layer-img base-layer" />

                        {/* Accessory Layers */}
                        {/* Ensure Accessories are drawn last so they appear on very top */}
                        {['Background', 'Clothing', 'Headwear', 'Glasses', 'Accessories'].map(cat => {
                            const item = selections[cat];
                            if (!item || !item.url) return null;

                            return (
                                <img
                                    key={cat}
                                    src={item.url}
                                    alt={item.name}
                                    className={`layer-img layer-${cat.toLowerCase()} animate-fade-in`}
                                />
                            );
                        })}
                    </div>

                    <div className="preview-actions">
                        <button className="btn-secondary" onClick={randomOutfit}>
                            <span>🎲</span> Randomize
                        </button>
                        <button className="btn-primary" onClick={handleDownload} disabled={isDownloading}>
                            {isDownloading ? 'Downloading...' : 'Download PFP'}
                        </button>
                    </div>
                </div>

                {/* Right Side: Configuration */}
                <div className="config-container">
                    <div className="category-tabs">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="items-grid custom-scrollbar">
                        {ASSETS[activeCategory].map(item => (
                            <button
                                key={item.id}
                                className={`item-card ${selections[activeCategory].id === item.id ? 'selected' : ''}`}
                                onClick={() => handleSelect(activeCategory, item)}
                            >
                                <div className={`item-thumbnail ${activeCategory === 'Background' ? 'bg-thumbnail' : ''}`}>
                                    {item.url ? (
                                        <img src={item.url} alt={item.name} />
                                    ) : (
                                        <div className="none-placeholder">X</div>
                                    )}
                                </div>
                                {item.name !== 'None' && (
                                    <span className={`item-name ${activeCategory === 'Background' ? 'bg-name' : ''}`}>{item.name}</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PfpGenerator;
