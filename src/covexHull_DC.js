import React, { useMemo, useRef, useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, PointElement, LineElement, LinearScale, Tooltip, Legend, Filler } from 'chart.js';
import './css/graphStyling.css';
import ToolTipLabel from './ToolTipLabel';

ChartJS.register(PointElement, LineElement, LinearScale, Tooltip, Legend, Filler);

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function bruteForceConvexHull(points) {
  const candidates = [];
  let operations = 0;

  if (points.length < 3) return { hull: [], operations };

  for (let i = 0; i < points.length; i += 1) {
    for (let j = i + 1; j < points.length; j += 1) {
      let hasPositive = false;
      let hasNegative = false;

      for (let k = 0; k < points.length; k += 1) {
        if (k === i || k === j) continue;
        const orientation = (points[j].x - points[i].x) * (points[k].y - points[i].y)
          - (points[j].y - points[i].y) * (points[k].x - points[i].x);
        operations += 1;
        if (orientation > 0) hasPositive = true;
        if (orientation < 0) hasNegative = true;
        if (hasPositive && hasNegative) break;
      }

      if (!(hasPositive && hasNegative)) {
        candidates.push(points[i], points[j]);
      }
    }
  }

  const uniqueHull = Array.from(
    new Map(candidates.map((point) => [`${point.x}:${point.y}`, point])).values()
  );
  const center = uniqueHull.reduce(
    (total, point) => ({ x: total.x + point.x / uniqueHull.length, y: total.y + point.y / uniqueHull.length }),
    { x: 0, y: 0 }
  );

  uniqueHull.sort((a, b) => Math.atan2(a.y - center.y, a.x - center.x) - Math.atan2(b.y - center.y, b.x - center.x));
  operations += uniqueHull.length;
  return { hull: uniqueHull, operations };
}

const Icon = ({ name }) => {
  const icons = {
    plus: <path d="M12 5v14M5 12h14" />,
    spark: <><path d="m12 3 1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4Z" /><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7Z" /></>,
    undo: <><path d="m9 8-4 4 4 4" /><path d="M5 12h8a6 6 0 0 1 6 6" /></>,
    trash: <><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5" /></>,
    grid: <><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" /></>
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{icons[name]}</svg>;
};

const BruteForceConvexHull = () => {
  const [points, setPoints] = useState([]);
  const [hull, setHull] = useState([]);
  const [operations, setOperations] = useState(0);
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const chartRef = useRef(null);

  const addPoint = (point) => {
    setPoints((current) => [...current, point]);
    setHull([]);
    setOperations(0);
  };

  const handleAddPoint = (event) => {
    event?.preventDefault();
    if (x === '' || y === '') return;
    addPoint(new Point(Number(x), Number(y)));
    setX('');
    setY('');
  };

  const handleComputeHull = () => {
    const result = bruteForceConvexHull(points);
    setHull(result.hull);
    setOperations(result.operations);
  };

  const handleChartClick = (event) => {
    const chart = chartRef.current;
    if (!chart) return;
    const xValue = chart.scales.x.getValueForPixel(event.native.offsetX);
    const yValue = chart.scales.y.getValueForPixel(event.native.offsetY);
    if (Number.isFinite(xValue) && Number.isFinite(yValue)) {
      addPoint(new Point(Number(xValue.toFixed(2)), Number(yValue.toFixed(2))));
    }
  };

  const handleRandomize = () => {
    const generated = Array.from({ length: 9 }, () => new Point(
      Number((Math.random() * 16 - 8).toFixed(1)),
      Number((Math.random() * 16 - 8).toFixed(1))
    ));
    setPoints(generated);
    setHull([]);
    setOperations(0);
  };

  const handleUndo = () => {
    setPoints((current) => current.slice(0, -1));
    setHull([]);
    setOperations(0);
  };

  const handleClear = () => {
    setPoints([]);
    setHull([]);
    setOperations(0);
    setX('');
    setY('');
  };

  const data = useMemo(() => ({
    datasets: [
      {
        label: 'Input points',
        data: points,
        backgroundColor: '#ecf8ff',
        borderColor: '#081421',
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
        order: 1
      },
      {
        label: 'Convex hull',
        data: hull.length ? [...hull, hull[0]] : [],
        borderColor: '#ff6b4a',
        backgroundColor: 'rgba(255, 107, 74, 0.14)',
        pointBackgroundColor: '#ff8a66',
        pointBorderColor: '#fff1eb',
        pointBorderWidth: 2,
        pointRadius: 6,
        borderWidth: 3,
        showLine: true,
        fill: true,
        tension: 0,
        order: 0
      }
    ]
  }), [points, hull]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    onClick: handleChartClick,
    interaction: { mode: 'nearest', intersect: false },
    animation: { duration: 700, easing: 'easeOutQuart' },
    plugins: {
      legend: {
        position: 'bottom',
        align: 'start',
        labels: { color: '#91a3b5', usePointStyle: true, pointStyle: 'circle', padding: 24, boxWidth: 7, font: { family: 'Inter, sans-serif', size: 12 } }
      },
      tooltip: {
        backgroundColor: '#132536',
        titleColor: '#f6fbff',
        bodyColor: '#a9bac9',
        borderColor: 'rgba(255,255,255,.12)',
        borderWidth: 1,
        displayColors: false,
        padding: 12,
        callbacks: { label: (context) => `x ${context.parsed.x.toFixed(2)}  ·  y ${context.parsed.y.toFixed(2)}` }
      }
    },
    scales: {
      x: {
        type: 'linear', min: -10, max: 10,
        border: { color: 'rgba(143, 164, 181, .35)' },
        grid: { color: 'rgba(143, 164, 181, .10)' },
        ticks: { color: '#708598', stepSize: 2, font: { family: 'JetBrains Mono, monospace', size: 10 } },
        title: { display: true, text: 'X AXIS', color: '#536a7c', font: { family: 'JetBrains Mono, monospace', size: 10, weight: '600' } }
      },
      y: {
        type: 'linear', min: -10, max: 10,
        border: { color: 'rgba(143, 164, 181, .35)' },
        grid: { color: 'rgba(143, 164, 181, .10)' },
        ticks: { color: '#708598', stepSize: 2, font: { family: 'JetBrains Mono, monospace', size: 10 } },
        title: { display: true, text: 'Y AXIS', color: '#536a7c', font: { family: 'JetBrains Mono, monospace', size: 10, weight: '600' } }
      }
    }
  };

  const instruction = points.length < 3
    ? `${3 - points.length} more point${3 - points.length === 1 ? '' : 's'} needed to compute a hull`
    : hull.length ? `Hull computed with ${hull.length} boundary vertices` : 'Ready to compute the convex hull';

  return (
    <div className="lab-section">
      <div className="lab-heading">
        <div>
          <span className="section-kicker">Interactive playground</span>
          <h2>Build your own <em>convex hull.</em></h2>
        </div>
        <p>Click anywhere on the grid or enter exact coordinates. Add at least three points, then let the brute-force algorithm reveal the boundary.</p>
      </div>

      <div className="lab-shell">
        <div className="lab-toolbar">
          <div className="lab-window-title"><span className="live-indicator" /> HULL VISUALIZER <small>/ BRUTE FORCE</small></div>
          <div className="toolbar-actions">
            <button onClick={handleRandomize}><Icon name="spark" /> Random set</button>
            <button onClick={handleUndo} disabled={!points.length}><Icon name="undo" /> Undo</button>
            <ToolTipLabel />
          </div>
        </div>

        <div className="lab-content">
          <div className="chart-panel">
            <div className="chart-meta">
              <span><Icon name="grid" /> CARTESIAN PLANE</span>
              <span>RANGE −10 / +10</span>
            </div>
            <div className="chart-canvas">
              <Scatter ref={chartRef} data={data} options={options} />
              {!points.length && (
                <div className="empty-state" aria-hidden="true">
                  <span className="empty-cross">+</span>
                  <strong>Place your first point</strong>
                  <small>Click anywhere on the grid</small>
                </div>
              )}
            </div>
          </div>

          <aside className="control-panel">
            <div className="control-heading">
              <span>Point input</span>
              <small>MANUAL</small>
            </div>
            <form className="coordinate-form" onSubmit={handleAddPoint}>
              <label>
                <span>X coordinate</span>
                <input type="number" step="any" min="-10" max="10" placeholder="0.00" value={x} onChange={(event) => setX(event.target.value)} />
              </label>
              <label>
                <span>Y coordinate</span>
                <input type="number" step="any" min="-10" max="10" placeholder="0.00" value={y} onChange={(event) => setY(event.target.value)} />
              </label>
              <button className="add-point-button" type="submit" disabled={x === '' || y === ''}>
                <Icon name="plus" /> Add point
              </button>
            </form>

            <div className="metrics-grid">
              <div><span>Points</span><strong>{String(points.length).padStart(2, '0')}</strong></div>
              <div><span>Hull vertices</span><strong>{String(hull.length).padStart(2, '0')}</strong></div>
              <div className="metric-wide"><span>Orientation checks</span><strong>{operations.toLocaleString()}</strong></div>
            </div>

            <div className={`lab-status ${hull.length ? 'lab-status--complete' : ''}`}>
              <span>{hull.length ? '✓' : 'i'}</span>
              <p>{instruction}</p>
            </div>

            <button className="compute-button" onClick={handleComputeHull} disabled={points.length < 3}>
              Compute convex hull <span aria-hidden="true">→</span>
            </button>
            <button className="clear-button" onClick={handleClear} disabled={!points.length}>
              <Icon name="trash" /> Clear canvas
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BruteForceConvexHull;
