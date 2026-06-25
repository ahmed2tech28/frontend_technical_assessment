// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, selected }) => {
  const llmIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );

  return (
    <BaseNode
      id={id}
      title="LLM"
      icon={llmIcon}
      accentColor="#6366F1" // Indigo
      selected={selected}
      targetHandles={[
        { id: `${id}-system`, position: Position.Left, style: { top: '33%' } },
        { id: `${id}-prompt`, position: Position.Left, style: { top: '66%' } }
      ]}
      sourceHandles={[{ id: `${id}-response`, position: Position.Right }]}
    >
      <div className="node-static-text">
        <span>This is a Large Language Model node. Set inputs for System prompt and User prompt.</span>
      </div>
    </BaseNode>
  );
};
