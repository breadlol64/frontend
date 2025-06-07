<script lang="ts">
    // @ts-ignore
    import { PUBLIC_API_URL } from "$env/static/public";

    let username: string
    let avatar: string
    
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
            })
            .catch(error => {
                console.error('failed to fetch user data:', error);
            });
</script>

<div class="is-flex is-flex-direction-column is-align-items-center" style="height: 90vh; padding-top: 20px;">
    <div class="is-flex is-align-items-center">
        <img class="avatar" src={avatar} alt="avatar">
        <p class="username"style="">{username}</p>
    </div>
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