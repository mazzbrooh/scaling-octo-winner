import { loadSync } from "https://deno.land/std/dotenv/mod.ts";

async function handler(request: Request): Promise<Response> {
    console.log(request.url);
    loadSync({
        envPath: `.env_${request.url.includes(Deno.env.get("DENO_DEPLOYMENT_ID")!) ? 'preview' : 'prod'}`,
        export: true
    });

    return new Response(Deno.env.get("GREETINGS")!);
}

Deno.serve(handler);