// outputNode.js

import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const OutputNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  // Initialize values in store
  useEffect(() => {
    updateNodeField(id, 'outputName', currName);
    updateNodeField(id, 'outputType', outputType);
  }, [id, currName, outputType, updateNodeField]);

  const handleNameChange = (e) => {
    const val = e.target.value;
    setCurrName(val);
    updateNodeField(id, 'outputName', val);
  };

  const handleTypeChange = (e) => {
    const val = e.target.value;
    setOutputType(val);
    updateNodeField(id, 'outputType', val);
  };

  const outputIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <path d="M9 17l6-5-6-5" />
    </svg>
  );

  return (
    <BaseNode
      id={id}
      title="Output"
      icon={outputIcon}
      accentColor="#F59E0B" // Amber
      selected={selected}
      targetHandles={[{ id: `${id}-value`, position: Position.Left }]}
    >
      <div className="node-control-group">
        <label className="node-label">
          Name
          <input
            type="text"
            className="node-input"
            value={currName}
            onChange={handleNameChange}
          />
        </label>
      </div>
      <div className="node-control-group">
        <label className="node-label">
          Type
          <select className="node-select" value={outputType} onChange={handleTypeChange}>
            <option value="Text">Text</option>
            <option value="Image">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
