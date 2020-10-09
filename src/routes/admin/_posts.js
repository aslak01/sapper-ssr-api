import fetch from 'node-fetch'
let token = process.env.API_KEY;
let posts;

export async function getPosts() {
	if (!posts) {
		try {
			const response = await fetch('https://sappercrud-707a.restdb.io/rest/posts-1', {
	      method: "GET",
	      withCredentials: true,
	      headers: {
	        "x-apikey": token
	      }
			});
			const posts = await response.json();
			// console.log(posts);
			return posts
		} catch (e) {
			console.log("Server request failed: ", + e)
		}
	}
}