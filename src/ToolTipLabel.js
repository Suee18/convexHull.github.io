import React from 'react';
import './css/ToolTipLabel.css';

function ToolTipLabel() {
  return (
    <details className="help-menu">
      <summary aria-label="How to use the visualizer">?</summary>
      <div className="help-popover">
        <strong>How to use the lab</strong>
        <ol>
          <li>Click on the grid or enter an X/Y pair.</li>
          <li>Add at least three distinct points.</li>
          <li>Compute to reveal the outer boundary.</li>
        </ol>
        <p>Tip: use Random set for a quick demo.</p>
      </div>
    </details>
  );
}

export default ToolTipLabel;
