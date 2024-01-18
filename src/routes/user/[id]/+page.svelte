<script>
  import { followUser } from "$lib/firebase.js";
  import Feed from "$lib/components/Feed.svelte";

  export let data;
</script>

<div class="flex flex-col min-h-screen items-center">
  <img src={data.user.photoURL} alt="" class="rounded-full w-64 h-64 object-cover" />
  <h1 class="text-4xl">
    {data.user.name}
  </h1>
  <span>{data.user.email}</span>
  <button
    on:click={() => {
      followUser(data.currentUser, data.user.uid);
    }}
    class="bg-blue-500 p-2 m-4 rounded-xl">Follow</button
  >

  <h2>Posts</h2>

  <Feed posts={data.posts} />
</div>
