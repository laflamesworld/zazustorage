import { useState } from 'react'
import './App.css'
import HeroSection from './components/HeroSection'
import PfpGenerator from './components/PfpGenerator'
import MemeGallery from './components/MemeGallery'
import FeesDistribution from './components/FeesDistribution'
import Roadmap from './components/Roadmap'

function App() {
  return (
    <div className="app-container animate-fade-in">
      <nav className="navbar" id="home">
        <div className="nav-left">
          <div className="nav-logo-glow">
            <img src="/images/logo.png" alt="Zazu Logo" />
          </div>
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#pfp-generator">PFP Generator</a>
            <a href="#meme-gallery">Meme Gallery</a>
            <a href="#fees">Fee Distribution</a>
            <a href="#roadmap">Roadmap</a>
            <a href="https://x.com" target="_blank" rel="noreferrer">X</a>
          </div>
        </div>
      </nav>

      <HeroSection />

      <main className="main-content">
        <div id="pfp-generator">
          <PfpGenerator />
        </div>
        <MemeGallery />
        <FeesDistribution />
        <Roadmap />
      </main>

      <footer className="footer">
        <p>Zazu the trench cat @ 2026</p>
      </footer>
    </div>
  )
}

export default App
