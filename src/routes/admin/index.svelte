<script context="module">
	let posts;
	export async function preload() {
		try {
			const res = await this.fetch('blog.json');
			if (res.ok) {
				const posts = await res.json();
				return {posts};

			} else {
				const msg = await res.text();
				this.error(res.statusCode, 'Post preload: ' + msg);
			}
		} catch (e) {
			this.error(500, 'Posts preload error: ' + e.message);
		}
	}
</script>

<script>
  export let posts = [];
  posts.sort(function (l, r) {
  	return l.id - r.id;
  })
	// $: sortedPosts = Object.values(postMap).sort((post1, post2) =>
	//   post1.id.localeCompare(post2.id)
	// );

</script>

<!-- <style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
</style> -->

<svelte:head>
	<title>Blog</title>
</svelte:head>
<h1>Recent posts</h1>
<ul>
	{#each posts as post}
		<li>{post.id} • <a rel=prefetch href="blog/{post.slug}">{post.title}</a></li>
	{/each}
</ul>