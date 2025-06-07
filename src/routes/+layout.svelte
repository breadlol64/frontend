<script>
    import "../app.css"
    import "../i18n.ts"
    import { _, locale } from 'svelte-i18n'
    // @ts-ignore
    import { DISCORD_AUTH_URL } from "$env/static/public"

    let { children } = $props();
</script>

<nav class="navbar" style="border-bottom: 2px solid #302c31;">
    <div class="navbar-start">
        <div class="navbar-item">
            <div class="field is-grouped">
                <p class="control">
                    <button class="button is-small" onclick={() => locale.set("en")}>🇬🇧</button>
                </p>
                <p class="control">
                    <button class="button is-small" onclick={() => locale.set("ru")}>🇷🇺</button>
                </p>
            </div>
        </div>
        <div class="navbar-item">
            <a href="/">{$_("home")}</a>
        </div>
        <div class="navbar-item">
            <a href="/bober">{$_("bober")}</a>
        </div>
    </div>

    <div class="end">
        <div class="navbar-item">
            <a style="decoration: none;" href={DISCORD_AUTH_URL}>
                <button class="button is-link">
                    <span>{$_("login")}</span>
                    <span class="icon">
                        <i class="fab fa-discord"></i>
                    </span>
                </button>
            </a>
        </div>
    </div>
</nav>
{@render children()}