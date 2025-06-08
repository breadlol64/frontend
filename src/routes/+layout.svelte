<script lang="ts">
    import "../app.css"
    import "../i18n.ts"
    import { _, locale } from 'svelte-i18n'
    import { page } from "$app/state";
    // @ts-ignore
    import { PUBLIC_DISCORD_AUTH_URL, PUBLIC_API_URL } from "$env/static/public"
    import { onMount } from "svelte";

    let { children } = $props();

    let username: string = $state("");
    let avatar: string = $state("");
    let balance: number = $state(0);
    
    onMount(() => {
        fetch(`${PUBLIC_API_URL}/user/me`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `${localStorage.getItem('token')}`,
                    }
                })
                .then(response => response.json())
                .then(data => {
                        username = data.username;
                        avatar = data.avatar;
                        balance = data.balance;
                })
                .catch(error => {
                    console.error('failed to fetch user data:', error);
                });
    });
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
            {#if localStorage.getItem("token")}
                {#if page.url.pathname != "/bober"}
                    <p>{balance} ₿</p>
                {/if}
                <a href="/profile">
                    <div class="is-flex is-align-items-center">
                        <p class="username">{username}</p>
                        <img class="avatar" src={avatar} alt="avatar">
                    </div>
                </a>
            {:else}
                <a style="decoration: none;" href={PUBLIC_DISCORD_AUTH_URL}>
                    <button class="button is-link">
                        <span>{$_("login")}</span>
                        <span class="icon">
                            <i class="fab fa-discord"></i>
                        </span>
                    </button>
                </a>
            {/if}
        </div>
    </div>
</nav>

<style>
    .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }
    .username {
        color: white; 
        font-weight: bold; 
        font-size: larger;
        margin-right: 10px;
    }
</style>
{@render children()}