<div align="center">

# HULL<span style="color:#ff6b4a">LAB</span>

### Computational geometry, made visible.

An interactive React experience for learning how convex hull algorithms find the smallest convex polygon around a set of points.

[**Launch the visualizer**](https://suee18.github.io/convexHull.github.io/) · [Explore the algorithms](#the-algorithms) · [Run locally](#run-it-locally)

![React](https://img.shields.io/badge/React-18.3-55d6d1?style=flat-square&logo=react&logoColor=07121d)
![Chart.js](https://img.shields.io/badge/Chart.js-4.4-ff6b4a?style=flat-square&logo=chartdotjs&logoColor=white)
![C++](https://img.shields.io/badge/C++-Algorithms-c7ed82?style=flat-square&logo=cplusplus&logoColor=07121d)
![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub_Pages-f4f8fb?style=flat-square&logo=github&logoColor=07121d)

</div>

---

## What is Hull Lab?

Imagine hammering pins into a board and stretching a rubber band around them. When the band is released, it wraps the outermost pins. That boundary is the **convex hull**.

Hull Lab turns that idea into an interactive computational-geometry playground. Place points on a Cartesian plane, compute their hull, and see which vertices form the enclosing polygon.

### Highlights

- **Interactive coordinate plane** — click directly on the grid or enter exact X/Y values.
- **Live hull rendering** — see the boundary animate around the outermost points.
- **Helpful metrics** — track point count, hull vertices, and orientation checks.
- **Fast demo data** — create a random point set in one click.
- **Practical controls** — undo the latest point, clear the canvas, or use keyboard entry.
- **Responsive experience** — designed for desktop, tablet, and mobile screens.
- **Accessible interaction** — semantic controls, keyboard focus states, reduced-motion support, and readable contrast.

## The algorithms

The project explores two classic ways to solve the same geometric problem.

| Algorithm | Core strategy | Time complexity | Best suited for |
|---|---|---:|---|
| **Brute force** | Test every point pair as a possible hull edge | `O(n³)` | Learning, verification, and small inputs |
| **Divide & conquer** | Split the set, solve each half, then merge the hulls | `O(n log n)` | Larger inputs and performance-focused implementations |

> [!IMPORTANT]
> The browser visualizer currently runs the **brute-force JavaScript implementation**. Standalone C++ implementations for both approaches live in [`Algorithms_C++`](./Algorithms_C++). The C++ code is not a web backend and is not called by the React interface.

## How the visualizer works

1. Add at least three points by clicking the graph or entering coordinates.
2. Press **Compute convex hull**.
3. Every candidate edge is tested using point orientation.
4. If all other points lie on one side of an edge, its endpoints are boundary candidates.
5. Unique boundary points are sorted around their center and connected into the final polygon.

The orientation test uses the signed cross product:

```text
(Bx − Ax)(Py − Ay) − (By − Ay)(Px − Ax)
```

- A positive result places `P` on one side of directed edge `AB`.
- A negative result places it on the opposite side.
- A zero result means the three points are collinear.

## Run it locally

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- npm (included with Node.js)

### Setup

```bash
git clone https://github.com/Suee18/convexHull.github.io.git
cd convexHull.github.io
npm install
npm start
```

The development server opens at `http://localhost:3000`.

### Available commands

| Command | Purpose |
|---|---|
| `npm start` | Start the local development server |
| `npm test` | Run the React test suite |
| `npm run build` | Create an optimized production build |
| `npm run deploy` | Build and publish the site to GitHub Pages |

## Project structure

```text
convexHull.github.io/
├── Algorithms_C++/          # Standalone C++ implementations
├── public/                  # Static browser assets and metadata
├── src/
│   ├── css/                 # Visual system and responsive styles
│   ├── fonts/               # Local font files retained by the project
│   ├── media/               # Original image assets
│   ├── App.js               # Page shell, navigation, and footer
│   ├── landingPage.js       # Hero, algorithm cards, and comparison
│   ├── covexHull_DC.js      # Interactive canvas and brute-force logic
│   └── ToolTipLabel.js      # Visualizer usage guide
├── package.json
└── README.md
```

## Visual language

Hull Lab uses a purpose-built dark interface inspired by graph paper and technical drafting:

- **Coral** identifies hull boundaries and primary actions.
- **Cyan** represents the divide-and-conquer path.
- **Lime** communicates active and successful states.
- **Monospace labels** distinguish coordinates, complexity, and live metrics.
- **Subtle grid systems** connect the educational content to the Cartesian workspace.

The animated hero diagram is rendered as inline SVG—no remote illustration dependency is required.

## Deploying to GitHub Pages

The `homepage` field in `package.json` points to the live project URL. To publish a production build:

```bash
npm run deploy
```

This runs the production build and publishes the generated `build` directory through `gh-pages`.

## Contributors

- [Salma Sherif (@Suee18)](https://github.com/Suee18)
- [Alaa Waleed](https://github.com/AlaaWaleedd)
- [Omar (@ou4y)](https://github.com/Ou4y)
- [Mohamed El Srougy](https://github.com/mohamedelsrougy)
- [Mariam](https://github.com/Mariammh2003)

## Feedback

Found a bug or have an idea for the visualizer? [Open an issue](https://github.com/Suee18/convexHull.github.io/issues) or email [salmaaaSherif22@gmail.com](mailto:salmaaaSherif22@gmail.com).

---

<div align="center">
  <sub>Built to make the boundary between mathematics and interaction a little easier to see.</sub>
</div>
