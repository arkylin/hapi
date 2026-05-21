import { AcpSdkBackend } from '@/agent/backends/acp';

function filterEnv(env: NodeJS.ProcessEnv): Record<string, string> {
    const result: Record<string, string> = {};
    for (const [key, value] of Object.entries(env)) {
        if (value !== undefined) {
            result[key] = value;
        }
    }
    return result;
}

export function createKimiBackend(opts: {
    model?: string;
    resumeSessionId?: string | null;
    cwd?: string;
    permissionMode?: string;
}): AcpSdkBackend {
    const env: Record<string, string> = filterEnv(process.env);
    if (opts.cwd) {
        env.KIMI_PROJECT_DIR = opts.cwd;
    }

    return new AcpSdkBackend({
        command: 'kimi',
        args: ['acp'],
        env
    });
}
