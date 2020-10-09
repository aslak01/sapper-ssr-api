import fetch from 'node-fetch'

let token = process.env.API_KEY;
let url = process.env.API_URL;
let posts;

export async function getPosts() {
	if (!posts) {
		try {
			const response = await fetch(url, {
	      method: "GET",
	      withCredentials: true,
	      headers: {
	        "x-apikey": token
	      }
			});
			const posts = await response.json();
			return posts
		} catch (e) {
			console.log("Server request failed: ", + e)
		}
	}
}
