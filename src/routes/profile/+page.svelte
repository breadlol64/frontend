<script lang="ts">
    // @ts-ignore
    import { _ } from "svelte-i18n";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { getCookie, deleteCookie } from "../../cookie";
    import { getUserByToken } from "../../api";

    let user = $state<any>(null);
    let loading = $state(true);

    onMount(async () => {
        if (!getCookie("token")) {
            goto("/");
            return;
        }

        try {
            user = await getUserByToken();
            console.log("User loaded:", user);
        } catch (error) {
            console.error("Error loading user:", error);
        } finally {
            loading = false;
        }
    });

    function logout() {
        deleteCookie("token");
        goto("/");
    }
</script>

<div
    class="is-flex is-flex-direction-column is-align-items-center is-justify-content-space-between"
    style="height: 90vh; padding-top: 20px;"
>
    {#if loading}
        <div class="is-flex is-justify-content-center">
            <p>Loading...</p>
        </div>
    {:else if user}
        <div class="is-flex is-align-items-center">
            <img class="avatar" src={user.avatar} alt="avatar" />
            <p class="username">{user.username || "Unknown User"}</p>
        </div>
        <button class="button is-danger is-outlined" onclick={logout}>
            {$_("logout")}
        </button>
    {:else}
        <div class="is-flex is-justify-content-center">
            <p>Failed to load user data</p>
        </div>
    {/if}
</div>

<style>
    .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    .username {
        color: white;
        font-weight: bold;
        font-size: larger;
        margin-left: 10px;
    }
</style>
