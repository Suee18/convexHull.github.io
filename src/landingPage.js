
import React from 'react';
import './css/landingPage.css';
import divideImg from './media/divide.jpg';
import bruteImg from './media/bruteImg.jpg';
import rotato from './media/download1.png';

const LandingPage = () => {
  return (
    <div>
      {/* Rotating Plates */}
      <div className="rotate-container1">
        <img id="rotatingImg1" src={rotato} alt="Rotating" />
      </div>
      <div className="page1BG">
        <h1>Convex Hull Algorithm Computations</h1>

        <p className="intro">
          The convex hull is a fundamental problem in computational geometry with various applications in diverse fields such as
          computer vision, robotics, and geographic information systems. It is a geometric concept that represents the smallest
          convex polygon enclosing a given set of points in a plane.<br />
          The importance of the convex hull arises from its ability to
          simplify complex point sets into a concise representation, enabling efficient analysis and decision-making. We compare the performance of the divide and conquer
          and brute force algorithms for computing the convex hull by conducting experiments on different point sets and analyzing the results.
        </p>
      </div>
      <div className="container">
        <section className="brute">
          <h2>Brute Force Approach</h2>
          <ul>
            <li>The brute force approach to computing the convex hull is characterized by its exhaustive search through all possible combinations.
              This method involves a comprehensive evaluation of each possible pair of points to determine whether they form an edge of the convex hull.</li>
            <br />
            <li>Exhaustively checks all possible combinations of points to determine the convex hull. It involves checking
              every possible line segment formed by pairs of points and determining whether each segment is an edge of the convex hull.</li>
            <br />
            <li>
              Time complexity of the brute force approach is O(n^3),
              where n is the number of points. So, this approach is inefficient for the large datasets due to its cubic time complexity.
            </li>
            <br /><br />
            <li className="bImg"><img className="bruteImg" src={bruteImg} alt="Brute Force Approach" /></li>
          </ul>
        </section>

        <section className="divide">
          <h2>Divide and Conquer Approach</h2>
          <ul>
            <li>The divide and conquer approach, known for its recursive nature,
              breaks down the problem into smaller subproblems, computes the convex hull of each subset, and merges the results.</li>
            <br />
            <li>Involves breaking down a complex problem into smaller, identical or similar sub-problems. These sub-problems
              are further divided into even smaller sub-problems until a simple and direct solution can be found for each sub-problem.</li>
            <br />
            <li>
              Time complexity of the divide and conquer approach is O(n logn),
              This approach is suitable and more efficient for large datasets.
            </li>
            <br /><br />
            <li className="dImg"><img className="divideImg" src={divideImg} alt="Divide and Conquer Approach" /></li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
