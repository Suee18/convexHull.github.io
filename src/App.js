
import React, { useRef } from 'react';
import BruteForceConvexHull from './covexHull_DC.js'; 
import LandingPage from './landingPage.js';
import './App.css';

function App() {
    const bruteForceRef = useRef(null);

    const scrollToBruteForce = () => {
        if (bruteForceRef.current) {
            bruteForceRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <button className="scrollDown" onClick={scrollToBruteForce}>Visualization⬇️</button>
            </header>
            <main>
                <LandingPage /> 
                <div ref={bruteForceRef}>
                    <BruteForceConvexHull /> 
                </div>
            </main>
        </div>
    );
}

export default App;
