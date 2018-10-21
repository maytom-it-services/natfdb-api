"use strict";
// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: @loopback/rest
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * An implementation of trie for routes. The key hierarchy is built with parts
 * of the route path delimited by `/`
 */
class Trie {
    constructor() {
        this.root = { key: '', children: {} };
    }
    /**
     * Create a node for a given path template
     * @param pathTemplate The path template,
     * @param value Value of the route
     */
    create(routeTemplate, value) {
        const keys = routeTemplate.split('/').filter(Boolean);
        return createNode(keys, 0, value, this.root);
    }
    /**
     * Match a route path against the trie
     * @param path The route path, such as `/customers/c01`
     */
    match(path) {
        const keys = path.split('/').filter(Boolean);
        const params = {};
        const resolved = search(keys, 0, params, this.root);
        if (resolved == null || !isNodeWithValue(resolved.node))
            return undefined;
        return {
            node: resolved.node,
            params: resolved.params,
        };
    }
    /**
     * List all nodes with value of the trie
     */
    list() {
        const nodes = [];
        traverse(this.root, node => {
            nodes.push(node);
        });
        return nodes;
    }
}
exports.Trie = Trie;
function isNodeWithValue(node) {
    return node.value != null;
}
/**
 * Use depth-first preorder traversal to list all nodes with values
 * @param root Root node
 * @param visitor A function to process nodes with values
 */
function traverse(root, visitor) {
    if (isNodeWithValue(root))
        visitor(root);
    for (const k in root.children) {
        traverse(root.children[k], visitor);
    }
}
/**
 * Match the given key to a child of the parent node
 * @param key Key
 * @param parent Parent node
 */
function matchChild(key, parent) {
    // Match key literal first
    let child = parent.children[key];
    if (child) {
        return {
            node: child,
        };
    }
    // Match templates
    for (const k in parent.children) {
        child = parent.children[k];
        if (!child.names || !child.regexp)
            continue;
        const match = child.regexp.exec(key);
        if (match) {
            const resolved = { params: {}, node: child };
            let i = 0;
            for (const n of child.names) {
                const val = match[++i];
                resolved.params[n] = decodeURIComponent(val);
            }
            return resolved;
        }
    }
}
/**
 * Search a sub list of keys against the parent node
 * @param keys An array of keys
 * @param index Starting index of the key list
 * @param params An object to receive resolved parameter values
 * @param parent Parent node
 */
function search(keys, index, 
// tslint:disable-next-line:no-any
params, parent) {
    const key = keys[index];
    const resolved = { node: parent, params };
    if (key === undefined)
        return resolved;
    const child = matchChild(key, parent);
    if (child) {
        Object.assign(params, child.params);
        return search(keys, index + 1, params, child.node);
    }
    // no matches found
    return undefined;
}
/**
 * Create a node for a sub list of keys against the parent node
 * @param keys An array of keys
 * @param index Starting index of the key list
 * @param value Value of the node
 * @param parent Parent node
 */
function createNode(keys, index, value, parent) {
    const key = keys[index];
    if (key === undefined)
        return parent;
    const isLast = keys.length - 1 === index;
    let child = parent.children[key];
    if (child != null) {
        // Found an existing node
        if (isLast) {
            if (child.value == null) {
                child.value = value;
            }
            else {
                if (child.value !== value) {
                    throw new Error('Duplicate key found with different value: ' + keys.join('/'));
                }
            }
        }
        return createNode(keys, index + 1, value, child);
    }
    /**
     * Build a new node
     */
    child = {
        children: {},
        key: key,
    };
    if (isLast) {
        child.value = value;
    }
    // Check if the key has variables such as `{var}`
    const pattern = /\{([^\{]*)\}/g;
    const names = [];
    let match;
    while ((match = pattern.exec(key))) {
        names.push(match[1]);
    }
    if (names.length) {
        child.names = names;
        const re = '^' + key.replace(/\{([^\}]+)\}/g, '(.+)') + '$';
        child.regexp = new RegExp(re);
    }
    // Add the node to the parent
    parent.children[key] = child;
    // Create nodes for rest of the keys
    return createNode(keys, index + 1, value, child);
}
//# sourceMappingURL=trie.js.map