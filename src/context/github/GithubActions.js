import axios from "axios";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const githubAxios = axios.create({
    baseURL: GITHUB_URL,
    headers: {
        Authorization: `token ${GITHUB_TOKEN}`
    }
})

export const searchUsers = async (text) => {

    const params = new URLSearchParams({
        q: text
    })

    const res = await githubAxios.get(`/search/users?${params}`)
    return res.data.items;
}

export const getUserAndRepos = async (login) => {

    const params = new URLSearchParams({
        sort: 'latest'
    })

    const [user, repos] = await Promise.all([
        githubAxios.get(`/users/${login}`),
        githubAxios.get(`/users/${login}/repos?${params}`),
    ])

    return {
        user: user.data,
        repos: repos.data
    }
}