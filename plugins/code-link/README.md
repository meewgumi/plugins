# Code Link

Two-way sync between Framer code files and your local filesystem.

**By:** [@huntercaron](https://github.com/huntercaron)

<img src="../../assets/code-link.png" alt="Code Link">

## Features

- **Instant two-way sync** — Edits in locally instantly appear in Framer, and vice-versa
- **Automatic types** — TypeScript types for `framer`, `framer-motion`, `react` are automatically installed
- **Smart conflict resolution** — Auto-resolves when safe, prompts you to choose when both sides change
- **Zero config** — Creates config files on first run; re-run with just `npx framer-code-link`
- **AI skill** — Installs Framer component best-practices skill for Cursor, Claude, etc

## Quick Start

1. Open the **Code Link** Plugin in your Framer project
2. Copy the CLI command from the Plugin, eg. `npx framer-code-link (hash)`
3. Paste and run the command in your terminal
4. Edit files in `{project}/files/` — changes sync to Framer

### Non-Admin Users (Skip Sudo)

If your user does not have admin/sudo privileges, you can run the CLI from this repository using a bypass flag:

1.  **In your terminal**, run the CLI via the workspace:
    ```bash
    VITE_MKCERT_DISABLE=true yarn workspace framer-code-link dev [projectHash]
    ```
2.  **Whitelist the port:** Open `https://localhost:[port]` (the port shown in your terminal, e.g., 3942) in your browser. Click **Advanced** -> **Proceed to localhost**.
3.  The CLI will now show "Connected" in Framer.

## CLI Options

| Flag                    | Description                            |
| ----------------------- | -------------------------------------- |
| `-n, --name <name>`     | Project name for the created directory |
| `-d, --dir <directory>` | Target project directory               |
| `--once`                | Exit after the initial sync completes  |
| `-v, --verbose`         | Enable debug logging                   |

### Custom Directories

You can sync Framer components directly into an existing repository or a specific folder:

```bash
VITE_MKCERT_DISABLE=true yarn workspace framer-code-link dev [hash] --dir "~/code/my-repo/components"
```

Once a directory is linked, you can just `cd` into it and run the command without the hash; it will automatically detect the correct project.
