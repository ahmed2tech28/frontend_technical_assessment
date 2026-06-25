// filterNode.js

import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const FilterNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [condition, setCondition] = useState(data?.condition || '');
  const [operator, setOperator] = useState(data?.operator || 'equals');

  // Initialize store values
  useEffect(() => {
    updateNodeField(id, 'condition', condition);
    updateNodeField(id, 'operator', operator);
  }, [id, condition, operator, updateNodeField]);

  const handleConditionChange = (e) => {
    const val = e.target.value;
    setCondition(val);
    updateNodeField(id, 'condition', val);
  };

  const handleOperatorChange = (e) => {
    const val = e.target.value;
    setOperator(val);
    updateNodeField(id, 'operator', val);
  };

  const filterIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );

  return (
    <BaseNode
      id={id}
      title="Filter"
      icon={filterIcon}
      accentColor="#EC4899" // Pink
      selected={selected}
      targetHandles={[{ id: `${id}-input`, position: Position.Left }]}
      sourceHandles={[
        { id: `${id}-true`, position: Position.Right, style: { top: '33%' } },
        { id: `${id}-false`, position: Position.Right, style: { top: '66%' } }
      ]}
    >
      <div className="node-control-group">
        <label className="node-label">
          Operator
          <select className="node-select" value={operator} onChange={handleOperatorChange}>
            <option value="equals">Equals</option>
            <option value="contains">Contains</option>
            <option value="gt">Greater Than</option>
            <option value="lt">Less Than</option>
          </select>
        </label>
      </div>
      <div className="node-control-group">
        <label className="node-label">
          Value
          <input
            type="text"
            className="node-input"
            value={condition}
            onChange={handleConditionChange}
            placeholder="Condition target"
          />
        </label>
      </div>
    </BaseNode>
  );
};
