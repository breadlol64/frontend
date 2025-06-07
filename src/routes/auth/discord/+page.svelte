<script lang="ts">
    import { onMount } from 'svelte';
    // @ts-ignore
    import { PUBLIC_API_URL } from '$env/static/public';
    import { page } from '$app/state';
    import { goto } from '$app/navigation';

    let code: string | null = null;

    onMount(() => {
        code = page.url.searchParams.get('code');
        if (code) {
            fetch(`${PUBLIC_API_URL}/auth/discord`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code })
            })
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('token', data.token);
                    goto('/profile');
                })
                .catch(error => {
                    console.error('Error during authentication:', error);
                });
        } else {
            console.error('No code provided in the URL');
        }
    });
</script>

<h1>code: {code}</h1>