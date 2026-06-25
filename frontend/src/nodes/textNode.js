// textNode.js

import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const TextNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Helper to extract unique valid JS variable names from text
  const getVariables = (text) => {
    const matches = [];
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push(match[1]);
    }
    return [...new Set(matches)];
  };

  // Adjust textarea width & height based on text content
  const adjustSize = () => {
    if (textareaRef.current) {
      // Height adjustment
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(40, textareaRef.current.scrollHeight)}px`;

      // Width adjustment based on line length
      const lines = currText.split('\n');
      const maxLen = Math.max(...lines.map((line) => line.length));
      const calculatedWidth = Math.min(450, Math.max(200, maxLen * 8.5 + 30));
      textareaRef.current.style.width = `${calculatedWidth}px`;
    }
  };

  // Update variables and adjust size when text changes
  useEffect(() => {
    const vars = getVariables(currText);
    setVariables(vars);
    updateNodeField(id, 'text', currText);
    adjustSize();
  }, [id, currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const textIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="12" y1="4" x2="12" y2="20" />
    </svg>
  );

  // Generate target handles on the left for each variable found
  const targetHandles = variables.map((variable, idx) => ({
    id: `${id}-${variable}`,
    position: Position.Left,
    style: {
      top: `${((idx + 1) * 100) / (variables.length + 1)}%`,
    },
  }));

  return (
    <BaseNode
      id={id}
      title="Text"
      icon={textIcon}
      accentColor="#3B82F6" // Blue
      selected={selected}
      style={{ width: 'auto', minWidth: '240px' }}
      targetHandles={targetHandles}
      sourceHandles={[{ id: `${id}-output`, position: Position.Right }]}
    >
      <div className="node-control-group">
        <label className="node-label">
          Text
          <textarea
            ref={textareaRef}
            className="node-textarea"
            value={currText}
            onChange={handleTextChange}
            rows={1}
            style={{ resize: 'none', overflowY: 'hidden' }}
          />
        </label>
      </div>
    </BaseNode>
  );
};
