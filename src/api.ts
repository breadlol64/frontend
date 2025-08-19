import { PUBLIC_API_URL } from "$env/static/public";
import { getCookie } from "./cookie";

export async function getUserByToken() {
    try {
        const response = await fetch(`${PUBLIC_API_URL}/user/me`, {
            method: "GET",
            headers: {
                Authorization: `${getCookie("token")}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.user;
    } catch (error) {
        console.error("failed to fetch user data:", error);
        throw error;
    }
}

export async function getUserById(id: string) {}

export async function getPostsPage(page: number, page_size: number = 10) {
    try {
        const response = await fetch(
            `${PUBLIC_API_URL}/post?page=${page}&page_size=${page_size}`,
            {
                method: "GET",
                headers: {
                    Authorization: `${getCookie("token")}`,
                },
            },
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.posts;
    } catch (error) {
        console.error("failed to fetch posts:", error);
        throw error;
    }
}
