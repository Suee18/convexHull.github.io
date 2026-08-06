import React from 'react';
import './css/landingPage.css';

const GeometryScene = () => (
  <div className="geometry-scene" aria-label="Animated convex hull diagram">
    <div className="scene-label scene-label--top">HULL VERTEX</div>
    <div className="scene-label scene-label--bottom">INPUT POINT</div>
    <svg viewBox="0 0 620 520" role="img" aria-labelledby="geometry-title geometry-desc">
      <title id="geometry-title">A set of points wrapped by a convex polygon</title>
      <desc id="geometry-desc">An abstract coordinate grid showing points, their enclosing hull, and guide lines.</desc>
      <defs>
        <linearGradient id="hullFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff6b4a" stopOpacity=".28" />
          <stop offset="100%" stopColor="#ffb24a" stopOpacity=".03" />
        </linearGradient>
        <filter id="pointGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <g className="scene-grid">
        {[80, 160, 240, 320, 400, 480, 560].map((x) => <line key={`x-${x}`} x1={x} y1="35" x2={x} y2="485" />)}
        {[65, 135, 205, 275, 345, 415, 485].map((y) => <line key={`y-${y}`} x1="35" y1={y} x2="585" y2={y} />)}
      </g>

      <g className="axis-lines">
        <line x1="35" y1="275" x2="585" y2="275" />
        <line x1="320" y1="35" x2="320" y2="485" />
      </g>

      <path className="hull-fill" d="M104 334 158 142 335 72 522 164 548 354 404 451 183 427Z" />
      <path className="hull-line" d="M104 334 158 142 335 72 522 164 548 354 404 451 183 427 104 334" />
      <path className="measure-line" d="M158 142 404 451" />

      <g className="inner-points">
        {[[224, 225], [294, 351], [356, 187], [424, 292], [237, 383], [471, 216]].map(([cx, cy], index) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={index === 3 ? 7 : 5} />
        ))}
      </g>

      <g className="hull-points" filter="url(#pointGlow)">
        {[[104, 334], [158, 142], [335, 72], [522, 164], [548, 354], [404, 451], [183, 427]].map(([cx, cy], index) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={index === 2 ? 9 : 7} />
        ))}
      </g>

      <g className="scene-annotation">
        <line x1="342" y1="64" x2="407" y2="32" />
        <text x="414" y="35">p₇</text>
      </g>
    </svg>
    <div className="scene-chip"><span /> smallest enclosing polygon</div>
  </div>
);

const FeatureIcon = ({ type }) => {
  const paths = {
    pairs: <><circle cx="7" cy="12" r="3" /><circle cx="17" cy="7" r="3" /><circle cx="18" cy="18" r="3" /><path d="m9.5 10.5 5-2M9.5 13.5l5.5 3" /></>,
    split: <><path d="M12 3v18M12 7 5 11v7M12 7l7 4v7" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" /></>,
    learn: <><path d="M4 5.5h11a3 3 0 0 1 3 3V20H7a3 3 0 0 1-3-3Z" /><path d="M18 9h2v8a3 3 0 0 1-3 3M8 10h6M8 14h5" /></>
  };
  return <svg className="feature-icon" viewBox="0 0 24 24" aria-hidden="true">{paths[type]}</svg>;
};

const LandingPage = ({ onLaunch }) => (
  <>
    <section className="hero-section">
      <div className="hero-glow hero-glow--one" />
      <div className="hero-glow hero-glow--two" />
      <div className="hero-copy">
        <div className="eyebrow"><span /> Interactive computational geometry</div>
        <h1>Find the shape<br />hidden in the <em>points.</em></h1>
        <p className="hero-intro">
          Explore how convex hull algorithms wrap scattered data in the smallest possible convex polygon—then build one point by point.
        </p>
        <div className="hero-actions">
          <button className="primary-cta" onClick={onLaunch}>
            Launch visualizer <span aria-hidden="true">→</span>
          </button>
          <a className="text-link" href="#algorithms">Explore the algorithms <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-stats" aria-label="Project highlights">
          <div><strong>2</strong><span>algorithms<br />explored</span></div>
          <div><strong>O(n log n)</strong><span>best featured<br />complexity</span></div>
          <div><strong>∞</strong><span>point sets<br />to discover</span></div>
        </div>
      </div>
      <GeometryScene />
    </section>

    <section className="concept-strip" aria-label="Convex hull in one sentence">
      <span className="concept-number">01</span>
      <p>Imagine stretching a rubber band around a set of pins. When released, the band forms the <strong>convex hull.</strong></p>
      <span className="concept-mark" aria-hidden="true">⌁</span>
    </section>

    <section className="algorithms-section" id="algorithms">
      <div className="section-heading">
        <div>
          <span className="section-kicker">Two ways around the edge</span>
          <h2>Same destination.<br /><em>Different journey.</em></h2>
        </div>
        <p>Both approaches identify the outermost points, but the way they search—and the work they perform—could not be more different.</p>
      </div>

      <div className="algorithm-grid">
        <article className="algorithm-card algorithm-card--brute">
          <div className="card-topline"><span>01 / EXHAUSTIVE</span><span className="status-dot">Baseline</span></div>
          <div className="algorithm-icon"><FeatureIcon type="pairs" /></div>
          <h3>Brute Force</h3>
          <p>Test every pair of points as a possible hull edge. If all remaining points lie on the same side, that edge belongs to the boundary.</p>
          <div className="complexity-row">
            <span>Time complexity</span>
            <strong>O(n³)</strong>
          </div>
          <ul>
            <li><span>+</span> Direct and easy to reason about</li>
            <li><span>−</span> Expensive as the point set grows</li>
          </ul>
        </article>

        <article className="algorithm-card algorithm-card--divide">
          <div className="card-topline"><span>02 / RECURSIVE</span><span className="status-dot status-dot--fast">Efficient</span></div>
          <div className="algorithm-icon"><FeatureIcon type="split" /></div>
          <h3>Divide &amp; Conquer</h3>
          <p>Split the points into smaller groups, solve each hull recursively, then merge the partial boundaries using shared tangents.</p>
          <div className="complexity-row">
            <span>Time complexity</span>
            <strong>O(n log n)</strong>
          </div>
          <ul>
            <li><span>+</span> Scales gracefully to larger inputs</li>
            <li><span>−</span> More complex merge logic</li>
          </ul>
        </article>

        <article className="algorithm-card algorithm-card--learn">
          <div className="card-topline"><span>03 / VISUAL</span><span className="status-dot status-dot--live">Interactive</span></div>
          <div className="algorithm-icon"><FeatureIcon type="learn" /></div>
          <h3>Learn by doing</h3>
          <p>Place coordinates manually or click directly on the graph. Compute the hull and watch the boundary emerge from your data.</p>
          <button className="card-action" onClick={onLaunch}>Try the playground <span aria-hidden="true">↘</span></button>
        </article>
      </div>
    </section>

    <section className="comparison-section" id="comparison">
      <div className="comparison-title">
        <span>At a glance</span>
        <h2>Choose your approach</h2>
      </div>
      <div className="comparison-table" role="table" aria-label="Algorithm comparison">
        <div className="comparison-row comparison-row--header" role="row">
          <span role="columnheader">Method</span><span role="columnheader">Strategy</span><span role="columnheader">Complexity</span><span role="columnheader">Best for</span>
        </div>
        <div className="comparison-row" role="row">
          <strong role="cell"><i className="method-dot method-dot--coral" />Brute force</strong><span role="cell">Test every candidate edge</span><code role="cell">O(n³)</code><span role="cell">Learning &amp; small sets</span>
        </div>
        <div className="comparison-row" role="row">
          <strong role="cell"><i className="method-dot method-dot--cyan" />Divide &amp; conquer</strong><span role="cell">Split, solve, and merge</span><code role="cell">O(n log n)</code><span role="cell">Scale &amp; performance</span>
        </div>
      </div>
    </section>
  </>
);

export default LandingPage;
