<script>
  import Feed from "$lib/components/Feed.svelte";

  export let data;
</script>

<div class="flex flex-col items-center w-1/3">
  <Feed posts={data.posts} />
</div>
