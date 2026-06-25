// submit.js

import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });
      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }
      const result = await response.json();
      setData(result);
      setIsOpen(true);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Could not connect to the backend server.');
      setIsOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="submit-panel">
        <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <>
              <svg className="animate-spin" style={{ width: 16, height: 16, marginRight: 8, stroke: 'currentColor' }} viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" style={{ opacity: 0.25 }} />
                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Parsing...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Submit Pipeline
            </>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {error ? (
              <>
                <div className="modal-header">
                  <div className="modal-status-icon status-warning">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </div>
                  <h3 className="modal-title">Connection Error</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '13px', lineHeight: 1.5 }}>
                  {error}. Make sure the FastAPI backend is running on port 8000.
                </p>
                <div className="modal-footer">
                  <button className="modal-close-btn" onClick={() => setIsOpen(false)}>
                    Dismiss
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="modal-header">
                  <div className={`modal-status-icon ${data?.is_dag ? 'status-success' : 'status-warning'}`}>
                    {data?.is_dag ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    )}
                  </div>
                  <h3 className="modal-title">
                    {data?.is_dag ? 'Pipeline Valid' : 'Invalid Pipeline'}
                  </h3>
                </div>
                
                <div className="modal-grid">
                  <div className="modal-stat-box">
                    <span className="stat-value">{data?.num_nodes}</span>
                    <span className="stat-label">Nodes</span>
                  </div>
                  <div className="modal-stat-box">
                    <span className="stat-value">{data?.num_edges}</span>
                    <span className="stat-label">Edges</span>
                  </div>
                </div>

                <div style={{ marginBottom: '28px' }}>
                  {data?.is_dag ? (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '9999px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#10B981', fontSize: '13px', fontWeight: '500' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }}></span>
                      Valid DAG (No Cycles)
                    </div>
                  ) : (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '9999px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#EF4444', fontSize: '13px', fontWeight: '500' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#EF4444' }}></span>
                      Contains Cycles
                    </div>
                  )}
                </div>

                <div className="modal-footer">
                  <button className="modal-close-btn" onClick={() => setIsOpen(false)}>
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
