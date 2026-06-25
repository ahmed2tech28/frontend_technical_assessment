// mathNode.js

import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const MathNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [operator, setOperator] = useState(data?.operator || 'add');

  // Initialize store values
  useEffect(() => {
    updateNodeField(id, 'operator', operator);
  }, [id, operator, updateNodeField]);

  const handleOperatorChange = (e) => {
    const val = e.target.value;
    setOperator(val);
    updateNodeField(id, 'operator', val);
  };

  const mathIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );

  return (
    <BaseNode
      id={id}
      title="Math Operator"
      icon={mathIcon}
      accentColor="#10B981" // Emerald
      selected={selected}
      targetHandles={[
        { id: `${id}-opA`, position: Position.Left, style: { top: '33%' } },
        { id: `${id}-opB`, position: Position.Left, style: { top: '66%' } }
      ]}
      sourceHandles={[{ id: `${id}-result`, position: Position.Right }]}
    >
      <div className="node-control-group">
        <label className="node-label">
          Operation
          <select className="node-select" value={operator} onChange={handleOperatorChange}>
            <option value="add">Add (+)</option>
            <option value="subtract">Subtract (-)</option>
            <option value="multiply">Multiply (×)</option>
            <option value="divide">Divide (÷)</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
