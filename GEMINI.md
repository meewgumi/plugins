# Framer Plugins Official

Monorepo for official Framer plugins, built with the Framer Plugin SDK.

## Project Overview

This repository is a monorepo containing a collection of official Framer plugins. It uses Yarn Berry (v4) with workspaces and Turborepo for efficient management of multiple plugins and shared packages.

### Main Technologies
- **Language:** TypeScript
- **Framework:** React
- **Build System:** Turborepo, Yarn Berry
- **Development Server:** Vite
- **SDK:** `framer-plugin`
- **Linting & Formatting:** ESLint, Biome (for formatting)

### Architecture
- `plugins/`: Contains individual Framer plugins. Each plugin is a standalone project that can be developed and built independently.
- `packages/`: Shared packages used across plugins:
  - `eslint-config`: Shared ESLint configuration.
  - `vite-config`: Shared Vite configuration.
  - `plugin-tools`: CLI tools for plugin development and packaging.
- `starters/`: Template projects for creating new Framer plugins.
- `scripts/`: Internal scripts for project maintenance, validation, and submission workflows.

## Building and Running

### Prerequisites
- Node.js
- Yarn (v4)

### Commands
- **Install Dependencies:**
  ```bash
  yarn
  ```
- **Develop a Plugin:**
  ```bash
  yarn dev --filter=[plugin-name]
  ```
  Example: `yarn dev --filter=airtable`
- **Build All Plugins:**
  ```bash
  yarn build
  ```
- **Run All Checks (Lint, Types, Tests):**
  ```bash
  yarn check
  ```
- **Fix Formatting/Linting Issues:**
  ```bash
  yarn fix-biome
  yarn fix-eslint
  ```
- **Preview a Plugin:**
  ```bash
  yarn preview --filter=[plugin-name]
  ```

## Development Conventions

### Coding Style
- **Formatting:** Handled by Biome. Indent style is spaces (4), and semicolons are used only as needed.
- **Linting:** ESLint is used for logical checks, React hooks, and TypeScript-specific rules.
- **Naming:** Follow standard JavaScript/TypeScript camelCase conventions.

### Plugin Structure
Each plugin in `plugins/` follows a standard structure:
- `framer.json`: Plugin manifest (id, name, modes, etc.).
- `src/`: Plugin source code.
- `index.html`: Entry point for the plugin's UI (rendered in an iframe).
- `package.json`: Plugin-specific dependencies and scripts.

### Development Workflow
1. Enable "Developer Tools" in Framer via the Plugin sub-menu.
2. Run `yarn dev --filter=[plugin-name]` in the terminal.
3. Framer will connect to the local dev server (usually over HTTPS with `mkcert`).
4. For non-admin users without `sudo` access, use `VITE_MKCERT_DISABLE=true yarn dev --filter=[plugin-name]`.
