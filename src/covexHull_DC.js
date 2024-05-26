import React, { useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, PointElement, LineElement, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import './graphStyling.css';

ChartJS.register(PointElement, LineElement, LinearScale, Title, Tooltip, Legend);

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let bruteForceOperationCount = 0;

function bruteForceConvexHull(points) {
    const hull = [];
    const n = points.length;

    if (n < 3) return hull;

    for (let i = 0; i < n; ++i) {
        for (let j = i + 1; j < n; ++j) {
            let isHullEdge = true;
            let hasPos = false, hasNeg = false;

            for (let k = 0; k < n; ++k) {
                if (k === i || k === j) continue;

                const orientation = (points[j].x - points[i].x) * (points[k].y - points[i].y) -
                    (points[j].y - points[i].y) * (points[k].x - points[i].x);
                bruteForceOperationCount++;
                if (orientation > 0) hasPos = true;
                else if (orientation < 0) hasNeg = true;

                if (hasPos && hasNeg) {
                    isHullEdge = false;
                    break;
                }
            }

            if (isHullEdge) {
                hull.push(points[i]);
                hull.push(points[j]);
                bruteForceOperationCount += 2;
            }
        }

        hull.sort((a, b) => a.x - b.x || a.y - b.y);
        hull.filter((point, index, self) =>
            index === self.findIndex((p) => p.x === point.x && p.y === point.y)
        );
        bruteForceOperationCount += hull.length;
    }

    const lowest = points.reduce((acc, point) => point.y < acc.y || (point.y === acc.y && point.x < acc.x) ? point : acc, points[0]);
    hull.sort((a, b) => {
        const angleA = Math.atan2(a.y - lowest.y, a.x - lowest.x);
        const angleB = Math.atan2(b.y - lowest.y, b.x - lowest.x);
        return angleA - angleB;
    });
    bruteForceOperationCount += hull.length;

    return hull;
}

const BruteForceConvexHull = () => {
    const [points, setPoints] = useState([]); // Initialize with an empty array
    const [hull, setHull] = useState([]);
    const [x, setX] = useState('');
    const [y, setY] = useState('');

    const handleComputeHull = () => {
        setHull(bruteForceConvexHull(points));
    };

    const handleAddPoint = () => {
        if (x !== '' && y !== '') {
            const newPoint = new Point(parseFloat(x), parseFloat(y));
            setPoints([...points, newPoint]);
            setX('');
            setY('');
        }
    };

    const data = {
        datasets: [
            {
                label: 'Points',
                data: points.map(p => ({ x: p.x, y: p.y })),
                backgroundColor: 'rgba(75, 192, 192, 1)',
            },
            {
                label: 'Convex Hull',
                data: hull.concat(hull[0] ? [hull[0]] : []).map(p => ({ x: p.x, y: p.y })),
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                showLine: true,
                fill: false,
            }
        ]
    };

    return (
        <div>
            <h2 className='title'>Convex Hull Visualization </h2>
            <div className="chart-container">
                <Scatter data={data} options={{ responsive: true }} />
            </div>
            <label className='labelExplanation'>Enter the point (x,y) in the fields below then click + to view it on the chart</label>

            <div className='inputFields'>
                <input className='inputPoint'
                    type="number"
                    placeholder="X"
                    value={x}
                    onChange={(e) => setX(e.target.value)}
                />
                <input className='inputPoint'
                    type="number"
                    placeholder="Y"
                    value={y}
                    onChange={(e) => setY(e.target.value)}
                />
                <button className='btnAddPoint' onClick={handleAddPoint}>+</button>
            </div>
            <button className='btnCompute' onClick={handleComputeHull}>Compute Convex Hull</button>
        </div>
    );
};

export default BruteForceConvexHull;
