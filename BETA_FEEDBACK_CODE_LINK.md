# Beta Feedback: Code Link Plugin & CLI

**Contributor:** [User]
**Environment:** macOS (Standard User, Non-Admin)
**Date:** April 24, 2026

## Summary
The current beta implementation of `framer-code-link` and the shared Vite configuration assumes the local user has `sudo` privileges to install SSL certificates via `mkcert`. For developers in restricted environments (Standard users), this creates a hard block that prevents the plugin and CLI from connecting to Framer.

## Friction Points Identified

### 1. Mandatory `mkcert -install` (CLI)
The CLI automatically attempts to run `mkcert -install` to trust the local CA. On macOS, this triggers a system-level `sudo` prompt. If the user is not in the `sudoers` file, the command fails and the process exits, preventing any sync from occurring.

### 2. Side-effects in Vite Plugin
The `vite-plugin-mkcert` used in the Plugin UI attempts to initialize and "ensure" certificates upon import/load. Even if the dev server is intended to run without it, the plugin's internal logic often triggers certificate checks that require admin rights.

### 3. Environment Variable Stripping (Turbo)
When trying to pass flags (like `VITE_MKCERT_DISABLE`) to bypass SSL logic, `turbo` strips these variables from the environment by default, preventing the configuration from seeing the user's intent to skip SSL setup.

### 4. The "su admin" Friction (Tested & Failed)
We empirically tested bypassing the restricted `sudo` by using `su admin -c "sudo mkcert -install"`. While this successfully installed the certificates into the system trust store using the admin credentials, it **failed to resolve the issue** for the developer. 

Because the browser session was running as the Standard user, it still encountered "Unable to Connect" errors in Framer. This confirms that for cross-origin local development (framer.com -> localhost), the "Advanced > Proceed" manual whitelist or a bypass flag is more effective than attempting to force a system-level installation via a secondary admin account.

---

## Solutions Implemented (Local Hacks)

To enable development for non-admin users, the following changes were made to this fork:

1.  **Non-Fatal CLI Setup:** Modified `packages/code-link-cli/src/helpers/certs.ts` to make the `-install` step optional. If it fails or is skipped, the CLI still starts the WSS server.
2.  **Dynamic Config:** Updated `packages/vite-config/src/index.ts` to use dynamic imports for `mkcert`. This ensures that the plugin is only loaded if specifically requested, preventing side-effect prompts.
3.  **Turbo Pass-through:** Added `VITE_MKCERT_DISABLE` to the `globalPassThroughEnv` in `turbo.json`.
4.  **Manual Cert Fallback:** Added logic to the Vite config to load certificates directly from the filesystem (`~/.vite-plugin-mkcert/`) if they exist, bypassing the plugin's automated (and privileged) logic.

## Recommendations for Public Release

1.  **Bypass Flag:** Officially support a `--no-ssl-install` or `DISABLE_MKCERT` flag in the CLI and Plugin dev environment.
2.  **Manual Whitelist Documentation:** Document that users can manually trust a port by visiting `https://localhost:[port]` and clicking "Advanced > Proceed." This is a viable non-admin alternative to system-wide CA installation.
3.  **Graceful Failures:** Ensure that `mkcert` failures in the CLI are non-fatal. Provide a warning with instructions on how to manually whitelist the port instead of exiting.
4.  **Browser Preference:** Note that Chrome's handling of insecure localhost (via flags or manual "Proceed") is significantly more developer-friendly than the Framer Desktop App or Safari for these edge cases.
