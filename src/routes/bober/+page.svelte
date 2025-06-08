<script lang="ts"> 
    // @ts-ignore
    import { PUBLIC_API_URL } from '$env/static/public';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    onMount(() => {
        if (!localStorage.getItem('token')) {
            goto('/');
        }
    });

    let balance = 0;

    onMount(async () => {
        try {
            const response = await fetch(`${PUBLIC_API_URL}/user/me`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            balance = data.balance;
        } catch (e) {
            console.error(e);
        }
    });

    async function click() {
        try {
            const response = await fetch(`${PUBLIC_API_URL}/click`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `${localStorage.getItem('token')}`
                }
            })
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            balance = data.balance;
        } catch (e) {
            console.error(e);
        }
    }
</script>

<div class="is-flex is-flex-direction-column is-align-items-center is-justify-content-space-evenly" style="height: 90vh;">
    <p class="title is-size-2">{balance}</p>
    <button class="circle-button" onclick={click}>
        <img src="bober.png" alt="click">
     </button>
</div>

<style>
    .circle-button {
        width: 300px;
        height: 300px;
        border-radius: 50%;
        border: none; /* Remove default button border */
        padding: 0; /* Remove default button padding */
        cursor: pointer;
        transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out; /* Smooth transitions */
        -webkit-tap-highlight-color: transparent; /* Remove blue tap highlight on mobile */
        outline: none; /* Remove focus outline if not desired, or style it */
    }

    .circle-button img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        display: block; /* Prevents small gap below image */
    }

    /* Hover Animation */
    .circle-button:hover {
        transform: scale(1.05); /* Slightly enlarge on hover */
        box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1); /* Optional: add a subtle shadow */
    }

    /* Click Animation */
    .circle-button:active {
        transform: scale(0.95); /* Slightly shrink on click */
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* Optional: make shadow a bit tighter */
    }
</style>