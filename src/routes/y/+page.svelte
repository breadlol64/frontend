<script lang="ts">
    import { onMount } from "svelte";
    import { getCookie } from "../../cookie";
    import { PUBLIC_API_URL } from "$env/static/public";

    let posts: any[] = [];
    let currentPage = 1;
    let loading = false;
    let hasMore = true;
    // !!!
    // TODO: !!! MAKE FUNCTION FOR GETTING USER DATA !!!
    // !!!
    async function loadPosts(page: number) {
        if (loading || !hasMore) return;

        loading = true;
        try {
            const response = await fetch(
                `${PUBLIC_API_URL}/post?page=${page}`,
                {
                    method: "GET",
                },
            );
            const response_data = await response.json();
            const newPosts = response_data.posts;

            if (newPosts.length === 0) {
                hasMore = false;
            } else {
                posts = [...posts, ...newPosts];
                currentPage = page;
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            loading = false;
        }
    }

    function handleScroll(event: Event) {
        const target = event.target as Document;
        const bottom = target.documentElement.scrollHeight - window.innerHeight;
        const scrollPosition = window.scrollY;

        // load more when user is within 100px of bottom
        if (bottom - scrollPosition < 100 && !loading && hasMore) {
            loadPosts(currentPage + 1);
        }
    }

    onMount(() => {
        loadPosts(1);
        document.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    });

    function formatDate(dateStr: string) {
        const date = new Date(dateStr);
        return date.toLocaleString();
    }
</script>

<div class="posts-container">
    {#if posts.length === 0 && loading}
        <p>Loading posts...</p>
    {:else}
        {#each posts as post}
            <article class="box post">
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-64x64">
                            <img src="" alt="Author avatar" />
                        </figure>
                    </div>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <strong>test</strong>
                                <br />
                                <small>{formatDate(post["created_at"])}</small>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="content">
                    <h2 class="title is-4">{post["title"]}</h2>
                    <p>{post["content"]}</p>
                </div>
            </article>
        {/each}

        {#if loading}
            <div class="loading">Loading more posts...</div>
        {/if}

        {#if !hasMore && posts.length > 0}
            <div class="no-more">No more posts to load</div>
        {/if}
    {/if}
</div>

<style>
    .posts-container {
        display: flex;
        flex-direction: column;
        gap: 0;
        width: 100%;
        max-width: 750px;
        margin: 0 auto;
        min-height: 100vh;
    }

    .post {
        box-shadow: none;
        border: 1px solid #333;
        border-radius: 0px;
        margin: 0 !important;
        padding: 1rem !important;
    }

    .loading,
    .no-more {
        text-align: center;
        padding: 1rem;
        border: 1px solid #333;
        border-top: none;
    }

    .media {
        margin-bottom: 0.5rem !important;
    }

    .content {
        padding: 0 !important;
    }

    .title.is-4 {
        margin-bottom: 0.5rem !important;
    }
</style>
