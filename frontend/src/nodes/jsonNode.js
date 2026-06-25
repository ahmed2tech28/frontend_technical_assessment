// jsonNode.js

import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const JSONNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [prettyPrint, setPrettyPrint] = useState(data?.prettyPrint || false);
  const [strict, setStrict] = useState(data?.strict || false);

  // Initialize store values
  useEffect(() => {
    updateNodeField(id, 'prettyPrint', prettyPrint);
    updateNodeField(id, 'strict', strict);
  }, [id, prettyPrint, strict, updateNodeField]);

  const handlePrettyPrintChange = (e) => {
    const val = e.target.checked;
    setPrettyPrint(val);
    updateNodeField(id, 'prettyPrint', val);
  };

  const handleStrictChange = (e) => {
    const val = e.target.checked;
    setStrict(val);
    updateNodeField(id, 'strict', val);
  };

  const jsonIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );

  return (
    <BaseNode
      id={id}
      title="JSON Parser"
      icon={jsonIcon}
      accentColor="#F59E0B" // Amber
      selected={selected}
      targetHandles={[{ id: `${id}-input`, position: Position.Left }]}
      sourceHandles={[{ id: `${id}-output`, position: Position.Right }]}
    >
      <div className="node-control-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
        <input
          type="checkbox"
          id={`${id}-pretty`}
          checked={prettyPrint}
          onChange={handlePrettyPrintChange}
          style={{ width: 'auto', cursor: 'pointer' }}
        />
        <label htmlFor={`${id}-pretty`} style={{ color: 'var(--text-secondary)', fontSize: '11px', cursor: 'pointer', userSelect: 'none' }}>
          Pretty Print Output
        </label>
      </div>
      <div className="node-control-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
        <input
          type="checkbox"
          id={`${id}-strict`}
          checked={strict}
          onChange={handleStrictChange}
          style={{ width: 'auto', cursor: 'pointer' }}
        />
        <label htmlFor={`${id}-strict`} style={{ color: 'var(--text-secondary)', fontSize: '11px', cursor: 'pointer', userSelect: 'none' }}>
          Strict Validation
        </label>
      </div>
    </BaseNode>
  );
};
