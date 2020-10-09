
// https://discordapp.com/channels/457912077277855764/473466028106579978/749243846235390013

// https://discordapp.com/channels/457912077277855764/473466028106579978/749244686861860915



//??js

import {tokenPromise} from '../../components/security.js'

async function get_options() {
    return {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Headers':['Authorization'],
            'Authorization': "Bearer "+ await tokenPromise,
            'Content-Type': 'application/json'
        }
    }
}

async function post_options(query) {
    return {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Headers':['Authorization'],
            'Authorization': "Bearer "+ await tokenPromise,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
    }
}

export async function get_json_url(url) {
    return await fetch(url, await get_options()).then(response => response.json())
}

export async function post_json_url(url, json) {
    return await fetch(url, await post_options(json)).then(response => response.json())
}

export async function get_download(url,filename) {
    fetch(url, await get_options())
      .then( download(filename) )
}


//security.js
import { readable, writable, derived } from 'svelte/store'
import createAuth0Client from '@auth0/auth0-spa-js'
import auth_config from './auth_config.json'

export const is_authenticated = writable(false)
export const auth0Promise = process.browser?createAuth0Client(auth_config):new Promise(()=>{})

let resolveUser 

export const userPromise = new Promise((resolve,reject) => {resolveUser = resolve})
export const tokenPromise = new Promise(async (resolve,reject) => { resolve((await auth0Promise).getTokenSilently())})

export const logout = async () => {
    const auth0 = await auth0Promise
    auth0.logout({
        returnTo: window.location.origin
    })
}

export const login = async () => {
    const auth0 = await auth0Promise
    await auth0.loginWithRedirect({
        redirect_uri: window.location.origin
    })
}

export async function generateAuth0() {
    const auth0 = await auth0Promise
    const query = window.location.search
    if (query.includes("code=") && query.includes("state=")) {
        await auth0.handleRedirectCallback()
        window.history.replaceState({}, document.title, "/")
    }
    resolveUser(await auth0.getUser())
}

if (process.browser) {
    generateAuth0()
}