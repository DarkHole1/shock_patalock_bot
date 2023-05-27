import { z } from "zod"
import { readFileSync } from "fs-extra"

const RawConfig = z.object({
    token: z.string(),
    patalockFileId: z.string(),
    patalockChatId: z.number().int()
})
type RawConfig = z.infer<typeof RawConfig>

export function loadConfig(filename: string) {
    const contents = readFileSync(filename, { encoding: 'utf-8' })
    const parsed = JSON.parse(contents)
    return RawConfig.parse(parsed)
}