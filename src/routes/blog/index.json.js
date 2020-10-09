import {getPosts} from './_posts.js';

let result;
export async function get(req, res) {
  try {
    const result = await getPosts();
    res.end(JSON.stringify(result));
  } catch (e) {
    console.error('index.json.js get: ', e);
  }
}