import React, { useRef } from 'react';
import BruteForceConvexHull from './covexHull_DC.js';
import LandingPage from './landingPage.js';
import './css/App.css';

function App() {
  const visualizerRef = useRef(null);

  const scrollToVisualizer = () => {
    visualizerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="App">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Hull Lab home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 36 36" role="img">
              <path d="M8 25 13 9l14 4 2 14-14 3Z" />
              <circle cx="8" cy="25" r="2.5" />
              <circle cx="13" cy="9" r="2.5" />
              <circle cx="27" cy="13" r="2.5" />
              <circle cx="29" cy="27" r="2.5" />
            </svg>
          </span>
          <span>HULL<span className="brand-accent">LAB</span></span>
        </a>

        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#algorithms">Algorithms</a>
          <a href="#comparison">Comparison</a>
          <button className="nav-cta" onClick={scrollToVisualizer}>
            Open visualizer
            <span aria-hidden="true">↘</span>
          </button>
        </nav>
      </header>

      <main id="top">
        <LandingPage onLaunch={scrollToVisualizer} />
        <section ref={visualizerRef} id="visualizer" className="visualizer-anchor">
          <BruteForceConvexHull />
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <span className="brand-mark brand-mark--small" aria-hidden="true">
            <svg viewBox="0 0 36 36">
              <path d="M8 25 13 9l14 4 2 14-14 3Z" />
              <circle cx="8" cy="25" r="2.5" />
              <circle cx="13" cy="9" r="2.5" />
              <circle cx="27" cy="13" r="2.5" />
              <circle cx="29" cy="27" r="2.5" />
            </svg>
          </span>
          <div>
            <strong>Hull Lab</strong>
            <p>Computational geometry, made visible.</p>
          </div>
        </div>
        <p className="footer-meta">Built with React · Chart.js · C++</p>
        <a
          className="footer-link"
          href="https://github.com/Suee18/convexHull.github.io"
          target="_blank"
          rel="noreferrer"
        >
          View source <span aria-hidden="true">↗</span>
        </a>
      </footer>
    </div>
  );
}

export default App;
