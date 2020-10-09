<script context="module">
	let posts;
	export async function preload(req, res) {
		const slug = req.params.slug
		const result = await this.fetch(`blog/${slug}.json`);
		const data = await result.json();

		if (result.status === 200) {
			return { post: data };
		} else {
			this.error(result.status, data.message);
		}
	}

</script>

<script>
	export let post = [];

</script>



<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<h1>{post.title}</h1>
<p>{post.body}</p>
<pre>{post.slug}</pre>

