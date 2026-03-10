const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.css')) results.push(file);
        }
    });
    return results;
}

const cssFiles = walk('c:/Users/mikaz/.gemini/antigravity/playground/azure-gravity/trenchcat-web/src');

cssFiles.forEach(file => {
    // skip main page files!
    if (file.includes('HeroSection.css') || file.includes('App.css') || file.includes('index.css')) {
        return;
    }

    let content = fs.readFileSync(file, 'utf8');
    const newContent = content.replace(/font-size:\s*([0-9.]+)rem/g, (match, p1) => {
        const val = parseFloat(p1) * 1.5;
        // Strip trailing zeros if it's an integer for clean markup
        const valStr = Number.isInteger(val) ? val.toString() : val.toFixed(2);
        return `font-size: ${valStr}rem`;
    });

    if (newContent !== content) {
        fs.writeFileSync(file, newContent);
        console.log(`Updated ${file}`);
    }
});
