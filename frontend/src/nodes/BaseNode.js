import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import React from 'react';

export const BaseNode = ({
  id,
  title,
  icon,
  accentColor = '#6366F1', // default Indigo
  targetHandles = [],
  sourceHandles = [],
  children,
  style = {},
  selected = false,
}) => {
  const deleteNode = useStore((state) => state.deleteNode);

  return (
    <div
      className={`base-node ${selected ? 'selected' : ''}`}
      style={{
        borderTop: `4px solid ${accentColor}`,
        ...style,
      }}
    >
      {/* Node Header */}
      <div className="node-header">
        <div className="header-left">
          {icon && <span className="node-icon" style={{ color: accentColor }}>{icon}</span>}
          <span className="node-title">{title}</span>
        </div>
        <button
          className="node-delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            deleteNode(id);
          }}
          title="Delete Node"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="delete-icon"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Node Body */}
      <div className="node-body">
        {children}
      </div>

      {/* Target Handles (Inputs) */}
      {targetHandles.map((handle, idx) => (
        <Handle
          key={handle.id || idx}
          type="target"
          position={handle.position || Position.Left}
          id={handle.id}
          style={{
            ...handle.style,
          }}
          className="custom-handle target-handle"
        />
      ))}

      {/* Source Handles (Outputs) */}
      {sourceHandles.map((handle, idx) => (
        <Handle
          key={handle.id || idx}
          type="source"
          position={handle.position || Position.Right}
          id={handle.id}
          style={{
            ...handle.style,
          }}
          className="custom-handle source-handle"
        />
      ))}
    </div>
  );
};
