<script lang="ts">
    import { browser } from "$app/environment";
    import "../app.css";
    import "../i18n.ts";
    import { _, locale } from "svelte-i18n";
    import { page } from "$app/state";
    // @ts-ignore
    import {
        PUBLIC_DISCORD_AUTH_URL,
        PUBLIC_API_URL,
    } from "$env/static/public";
    import { onMount } from "svelte";
    import { getCookie } from "../cookie";
    import { getUserByToken } from "../api";

    let { children } = $props();

    let user = $state<any>(null);
    let loading = $state(true);

    onMount(async () => {
        if (browser && getCookie("token")) {
            try {
                user = await getUserByToken();
                console.log("User loaded:", user);
            } catch (error) {
                console.error("Error loading user:", error);
            } finally {
                loading = false;
            }
        }
    });
</script>

<nav class="navbar" style="border-bottom: 2px solid #302c31;">
    <div class="navbar-start">
        <div class="navbar-item">
            <div class="field is-grouped">
                <p class="control">
                    <button
                        class="button is-small"
                        onclick={() => locale.set("en")}>🇬🇧</button
                    >
                </p>
                <p class="control">
                    <button
                        class="button is-small"
                        onclick={() => locale.set("ru")}>🇷🇺</button
                    >
                </p>
            </div>
        </div>
        <div class="navbar-item">
            <a href="/">{$_("home")}</a>
        </div>
        <div class="navbar-item">
            <a href="/bober">{$_("bober")}</a>
        </div>
        <div class="navbar-item">
            <a href="/y">Y</a>
        </div>
        <div class="navbar-item">
            <a href="/bobertube">bobertube</a>
        </div>
        <div class="navbar-item">
            <a href="/tiptop">TipTop</a>
        </div>
    </div>

    <div class="end">
        <div class="navbar-item">
            {#if browser && getCookie("token") && !loading && user}
                {#if page.url.pathname != "/bober"}
                    <p>{user.balance || 0} ₿</p>
                {/if}
                <a href="/profile">
                    <div class="is-flex is-align-items-center">
                        <p class="username">{user.username || "User"}</p>
                        <img class="avatar" src={user.avatar} alt="avatar" />
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
{@render children()}

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
    a {
        color: #e76f51;
    }
</style>
