---
title: Visualize the Record Link Network as a Graph Diagram
excerpt: Use the Fulcrum Python SDK with networkx and matplotlib to generate a directed graph diagram showing how apps are connected by Record Link fields — especially useful when an organization has dozens of linked apps and the relationships are difficult to reason about in a list.
---

When an organization has many apps connected by Record Link fields, a visual network diagram makes the dependency structure immediately obvious. This script uses the Fulcrum Python SDK to fetch all form schemas, builds a directed graph with [NetworkX](https://networkx.org/), and renders it using [matplotlib](https://matplotlib.org/) with three layout options.

## Prerequisites

```bash
pip install fulcrum networkx matplotlib numpy
```

## Script

```python
import json
from fulcrum import Fulcrum
import networkx as nx
import matplotlib.pyplot as plt
import numpy as np

# ── Configuration ─────────────────────────────────────────────────────────────
API_TOKEN = 'YOUR-API-TOKEN'
BASE_URL  = 'https://api.fulcrumapp.com'

fulcrum = Fulcrum(key=API_TOKEN, uri=BASE_URL)


def extract_record_link_targets(elements):
    """Recursively find all form_ids referenced by RecordLinkFields."""
    targets = []
    for element in elements:
        if element.get('type') == 'RecordLinkField':
            target_id = element.get('form_id')
            if target_id:
                targets.append(target_id)
        if 'elements' in element:
            targets.extend(extract_record_link_targets(element['elements']))
    return targets


def build_relationships():
    """Return a dict mapping app name → [linked app names]."""
    forms       = fulcrum.forms.search()['forms']
    form_lookup = {f['id']: f['name'] for f in forms}

    relationships = {}
    for form in forms:
        linked_ids   = extract_record_link_targets(form['elements'])
        linked_names = [form_lookup.get(fid, f"[Unknown: {fid}]") for fid in set(linked_ids)]
        relationships[form['name']] = linked_names

    return relationships


def visualize(relationships, layout='circular'):
    """
    Draw the record link network diagram.

    layout: 'circular' | 'shell' | 'grid'
    """
    G = nx.DiGraph()
    for source, targets in relationships.items():
        for target in targets:
            G.add_edge(source, target)
        if not relationships[source]:
            G.add_node(source)   # Include isolated nodes (no links)

    if layout == 'circular':
        pos         = nx.circular_layout(G, scale=5)
        node_color  = 'lightcoral'
        title       = 'Record Link Network — Circular Layout'
        figsize     = (20, 20)

    elif layout == 'shell':
        degrees    = dict(G.degree())
        shells     = [
            [n for n, d in degrees.items() if d == 0],
            [n for n, d in degrees.items() if 1 <= d < 4],
            [n for n, d in degrees.items() if d >= 4],
        ]
        shells     = [s for s in shells if s]   # Remove empty shells
        pos        = nx.shell_layout(G, nlist=shells, scale=4)
        node_color = 'lightgreen'
        title      = 'Record Link Network — Shell Layout (by connectivity)'
        figsize    = (18, 18)

    elif layout == 'grid':
        nodes  = list(G.nodes())
        cols   = int(np.ceil(np.sqrt(len(nodes))))
        pos    = {node: ((i % cols) * 3, (i // cols) * 3) for i, node in enumerate(nodes)}
        node_color = 'gold'
        title  = 'Record Link Network — Grid Layout'
        figsize = (24, 16)

    else:
        raise ValueError(f"Unknown layout: {layout!r}. Use 'circular', 'shell', or 'grid'.")

    plt.figure(figsize=figsize)
    nx.draw(
        G, pos,
        with_labels=True,
        node_size=4000,
        node_color=node_color,
        edge_color='darkgray',
        width=2,
        arrows=True,
        arrowsize=30,
        font_size=12,
        font_weight='bold',
        font_color='black'
    )
    plt.title(title, fontsize=18, pad=20)
    plt.axis('off')
    plt.tight_layout()
    plt.show()


# ── Run ───────────────────────────────────────────────────────────────────────
print("Fetching form relationships...")
relationships = build_relationships()

linked = {k: v for k, v in relationships.items() if v}
print(f"Found {len(relationships)} apps, {len(linked)} with outbound record links\n")

# Choose a layout: 'circular', 'shell', or 'grid'
# Circular is recommended for most organizations.
visualize(relationships, layout='circular')
```

## Layout Options

**Circular** — nodes arranged in a ring. Best for orgs with up to ~20 apps. Easy to trace link chains around the circle.

**Shell** — nodes in concentric rings by connection count. Highly connected "hub" apps appear in the center ring; standalone apps in the outer ring.

**Grid** — nodes on a uniform grid with maximum spacing. Best when app names are long and labels overlap in other layouts.

## Example Output

A circular diagram where a `Work Orders` node in the center has arrows pointing to it from `Inspections`, `Daily Reports`, and `Assets`, while those nodes also connect to each other.

## Notes

**Install matplotlib backend for headless environments.** If running in a server environment without a display, add `matplotlib.use('Agg')` before importing `pyplot`, then save to a file with `plt.savefig('record_links.png', dpi=150, bbox_inches='tight')` instead of `plt.show()`.

**Large orgs (50+ apps) may need layout tuning.** Increase `figsize`, reduce `font_size`, or use the grid layout to avoid label overlaps. The `node_size` and `arrowsize` values may also need adjustment.

**Hierarchical layout (optional).** If you have `pygraphviz` installed (`pip install pygraphviz`), you can use `nx.nx_agraph.graphviz_layout(G, prog='dot')` for a top-down tree layout that clearly shows which apps are "root" apps vs. "leaf" apps in the dependency chain.
