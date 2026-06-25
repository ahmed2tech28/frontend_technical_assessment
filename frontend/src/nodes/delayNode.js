// delayNode.js

import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const DelayNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [duration, setDuration] = useState(data?.duration || 1000);
  const [unit, setUnit] = useState(data?.unit || 'ms');

  // Initialize store values
  useEffect(() => {
    updateNodeField(id, 'duration', duration);
    updateNodeField(id, 'unit', unit);
  }, [id, duration, unit, updateNodeField]);

  const handleDurationChange = (e) => {
    const val = parseInt(e.target.value, 10) || 0;
    setDuration(val);
    updateNodeField(id, 'duration', val);
  };

  const handleUnitChange = (e) => {
    const val = e.target.value;
    setUnit(val);
    updateNodeField(id, 'unit', val);
  };

  const clockIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );

  return (
    <BaseNode
      id={id}
      title="Delay"
      icon={clockIcon}
      accentColor="#06B6D4" // Cyan
      selected={selected}
      targetHandles={[{ id: `${id}-input`, position: Position.Left }]}
      sourceHandles={[{ id: `${id}-output`, position: Position.Right }]}
    >
      <div className="node-control-group">
        <label className="node-label">
          Duration
          <input
            type="number"
            className="node-input"
            value={duration}
            onChange={handleDurationChange}
            min={0}
          />
        </label>
      </div>
      <div className="node-control-group">
        <label className="node-label">
          Unit
          <select className="node-select" value={unit} onChange={handleUnitChange}>
            <option value="ms">Milliseconds (ms)</option>
            <option value="s">Seconds (s)</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
