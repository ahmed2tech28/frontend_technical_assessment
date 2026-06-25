// mergeNode.js

import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const MergeNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [strategy, setStrategy] = useState(data?.strategy || 'concat');

  // Initialize store values
  useEffect(() => {
    updateNodeField(id, 'strategy', strategy);
  }, [id, strategy, updateNodeField]);

  const handleStrategyChange = (e) => {
    const val = e.target.value;
    setStrategy(val);
    updateNodeField(id, 'strategy', val);
  };

  const mergeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
      <path d="M12 22V12M12 12L4 4M12 12l8-8" />
    </svg>
  );

  return (
    <BaseNode
      id={id}
      title="Merge"
      icon={mergeIcon}
      accentColor="#8B5CF6" // Purple
      selected={selected}
      targetHandles={[
        { id: `${id}-inputA`, position: Position.Left, style: { top: '33%' } },
        { id: `${id}-inputB`, position: Position.Left, style: { top: '66%' } }
      ]}
      sourceHandles={[{ id: `${id}-output`, position: Position.Right }]}
    >
      <div className="node-control-group">
        <label className="node-label">
          Merge Strategy
          <select className="node-select" value={strategy} onChange={handleStrategyChange}>
            <option value="concat">Concatenate Text</option>
            <option value="json">JSON Merge</option>
            <option value="zip">Zip List</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
