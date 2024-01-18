<script>
  import Post from "$lib/components/Post.svelte";
  export let posts;
</script>

<div class="bg-slate-900 flex flex-col m-2 w-full items-center rounded-3xl shadow">
  {#each posts as post}
    <Post {post} />
    <!-- divider -->
    <div class="w-3/4 h-1 bg-slate-800"></div>
  {/each}

  {#if posts.length === 0}
    <p class="text-xl">No posts yet</p>
  {/if}
</div>
