import React from 'react';
import './css/ToolTipLabel.css'; // Make sure to create this CSS file

function ToolTipLabel() {
  return (
    <div className="tooltip-container">
      <label className="labelExplanation">?</label>
      <span className="tooltip-text"> Usage:
        <br />
        1) Enter points in form of (x,y) and press + to view them on coordinates. To update the hull, click on compute convex hull button.
        <br />
        2) Click on the chart coordinates to add points then click on compute convex hull button.</span>
    </div>
  );
}

export default ToolTipLabel;
