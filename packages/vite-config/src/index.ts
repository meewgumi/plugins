import { readFileSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, type PluginOption } from "vite"
import framer from "vite-plugin-framer"

export default defineConfig(async () => {
    const plugins: PluginOption[] = [react(), framer(), tailwindcss()]

    const isMkcertDisabled =
        process.env.VITE_MKCERT_DISABLE === "true" ||
        process.env.VITE_MKCERT_DISABLE === "1"

    let httpsConfig: any = true

    if (isMkcertDisabled) {
        const certDir = join(homedir(), ".vite-plugin-mkcert")
        try {
            httpsConfig = {
                key: readFileSync(join(certDir, "dev.pem")),
                cert: readFileSync(join(certDir, "cert.pem")),
            }
        } catch {
            // Fallback to true if files don't exist
            httpsConfig = true
        }
    } else {
        const mkcert = (await import("vite-plugin-mkcert")).default
        plugins.push(mkcert())
    }

    return {
        server: {
            https: httpsConfig,
        },
        plugins,
    }
})
