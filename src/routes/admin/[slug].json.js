import {getPosts} from './_posts.js';
let result;
export async function get(req, res) {
	const slug = req.params.slug
	try {
		const articles = await getPosts()
		const result = articles.find(post => post.slug == slug)
    res.end(JSON.stringify(result));
  } catch (e) {
  	console.error('[slug].json.js get: ', e);
	}
}