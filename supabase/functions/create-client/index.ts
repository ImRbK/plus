import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "Não autenticado." }, 401);

    const url = Deno.env.get("SUPABASE_URL")!;
    const publishable = Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY")!;
    const caller = createClient(url, publishable, { global: { headers: { Authorization: authHeader } } });
    const { data: { user }, error: userError } = await caller.auth.getUser();
    if (userError || !user) return json({ error: "Sessão inválida." }, 401);

    const { data: admin, error: adminError } = await caller.from("admins").select("user_id").eq("user_id", user.id).maybeSingle();
    if (adminError || !admin) return json({ error: "Sem permissões de administrador." }, 403);

    const body = await req.json();
    const { email, password, full_name, initial_weight, current_weight, height, goal_weight, goal, start_date } = body;
    if (!email || !password || !full_name) return json({ error: "Nome, email e password são obrigatórios." }, 400);
    if (String(password).length < 6) return json({ error: "A password deve ter pelo menos 6 caracteres." }, 400);

    const secret = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const secretKeysRaw = Deno.env.get("SUPABASE_SECRET_KEYS");
    let secretKey = secret;
    if (!secretKey && secretKeysRaw) {
      try { secretKey = JSON.parse(secretKeysRaw)?.default ?? JSON.parse(secretKeysRaw)?.service_role; } catch (_) {}
    }
    if (!secretKey) return json({ error: "A Secret Key não está disponível na Edge Function." }, 500);

    const adminClient = createClient(url, secretKey);
    const { data: created, error: createError } = await adminClient.auth.admin.createUser({ email: String(email).trim(), password, email_confirm: true });
    if (createError || !created.user) return json({ error: createError?.message || "Não foi possível criar a conta." }, 400);

    const { error: profileError } = await adminClient.from("clients").insert({
      id: created.user.id, full_name: String(full_name).trim(), email: String(email).trim(),
      initial_weight: initial_weight ?? null, current_weight: current_weight ?? null,
      height: height ?? null, goal_weight: goal_weight ?? null, goal: goal || null,
      start_date: start_date || new Date().toISOString().slice(0, 10),
    });
    if (profileError) {
      await adminClient.auth.admin.deleteUser(created.user.id);
      return json({ error: "Conta criada mas não foi possível criar o perfil.", details: profileError.message }, 400);
    }
    return json({ success: true, user_id: created.user.id }, 200);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "Erro desconhecido." }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}
