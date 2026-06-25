from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# Enable CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    nodes = pipeline.nodes
    edges = pipeline.edges
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    # DFS-based cycle detection algorithm to check if graph is a DAG
    # 1. Collect all unique node IDs
    node_ids = set()
    for n in nodes:
        if 'id' in n:
            node_ids.add(n['id'])
    for e in edges:
        if 'source' in e:
            node_ids.add(e['source'])
        if 'target' in e:
            node_ids.add(e['target'])
            
    # 2. Build adjacency list
    adj = {nid: [] for nid in node_ids}
    for e in edges:
        source = e.get('source')
        target = e.get('target')
        if source in adj and target in adj:
            adj[source].append(target)
            
    # 3. Track visited states: 0 = unvisited, 1 = visiting, 2 = visited
    visited = {nid: 0 for nid in node_ids}
    
    def dfs(u):
        visited[u] = 1  # visiting
        for v in adj.get(u, []):
            if visited.get(v, 0) == 1:
                return True  # Cycle detected
            if visited.get(v, 0) == 0:
                if dfs(v):
                    return True
        visited[u] = 2  # visited
        return False

    is_dag = True
    for nid in node_ids:
        if visited[nid] == 0:
            if dfs(nid):
                is_dag = False
                break
                
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }

