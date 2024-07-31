import React, { useState, useRef } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, PointElement, LineElement, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import './graphStyling.css';
import ToolTipLabel from './ToolTipLabel';

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
    const [points, setPoints] = useState([]);
    const [hull, setHull] = useState([]);
    const [x, setX] = useState('');
    const [y, setY] = useState('');
    const chartRef = useRef(null);

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

    const handleChartClick = (event) => {
        const chart = chartRef.current;
        if (!chart) return;

        const { offsetX, offsetY } = event.native;
        console.log('Chart scales:', chart.scales);
        const xScale = chart.scales['x'];
        const yScale = chart.scales['y'];

        if (xScale && yScale) {
            const xValue = xScale.getValueForPixel(offsetX);
            const yValue = yScale.getValueForPixel(offsetY);
            console.log('xValue:', xValue, 'yValue:', yValue);

            const newPoint = new Point(xValue, yValue);
            setPoints([...points, newPoint]);
        } else {
            console.error('Scales not found');
        }
    };

    const data = {
        datasets: [
            {
                label: 'Points',
                data: points.map(p => ({ x: p.x, y: p.y })),
                backgroundColor: 'rgba(0,0,0,1)',
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

    const options = {
        responsive: true,
        onClick: handleChartClick,
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
            },
            y: {
                type: 'linear',
                position: 'left',
            }
        }
    };

    return (
        <div className='bigbig'>
            <div className='titleContainer'>
                <h2 className='title'>Convex Hull Visualization</h2>
                <div className='questionmarkContainer'>
                    <ToolTipLabel />
                </div>
            </div>

            <div className='computeDisplayContainer'>
                <div className="chart-container">
                    <Scatter ref={chartRef} data={data} options={options} />
                </div>
                {/**********user input  BANNER*************/}
                <div className='userInputFields'>
                    <div className='inputFields'>
                        {/* <input
                            className='inputPoint'
                            type="number"
                            placeholder="X"
                            value={x}
                            onChange={(e) => setX(e.target.value)}
                        />
                        <input
                            className='inputPoint'
                            type="number"
                            placeholder="Y"
                            value={y}
                            onChange={(e) => setY(e.target.value)}
                        /> */}
                        <div className='XYcontainer'>
                            <label className="inp">
                                <input
                                    className="inputPoint"
                                    type="number"
                                    placeholder="&nbsp;"
                                    value={x}
                                    onChange={(e) => setX(e.target.value)}
                                />
                                <span className="label">X</span>
                                <span className="focus-bg"></span>
                            </label>
                            <label className="inp">
                                <input
                                    className="inputPoint"
                                    type="number"
                                    placeholder="&nbsp;"
                                    value={y}
                                    onChange={(e) => setY(e.target.value)}
                                />
                                <span className="label">Y</span>
                                <span className="focus-bg"></span>
                            </label>
                        </div>
                        <button className='btnAddPoint' onClick={handleAddPoint}>+</button>
                    </div>
                    <button className='btnCompute' onClick={handleComputeHull}>
                        <p>compute convex hull</p>
                    </button>
                    {/* no js yet ⬇️*/}
                    <button className='btnclearChart'>
                        <p>Clear chart </p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BruteForceConvexHull;
