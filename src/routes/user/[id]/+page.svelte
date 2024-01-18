<script>
  import { followUser } from "$lib/firebase.js";
  import Feed from "$lib/components/Feed.svelte";

  export let data;
</script>

<div class="flex flex-col min-h-screen">
  <h1>
    {data.user.name}
  </h1>
  <span>{data.user.email}</span>
  <img src={data.user.photoURL} alt="" />

  <button
    on:click={() => {
      followUser(data.currentUser, data.user.uid);
    }}>Follow</button
  >

  <h2>Posts</h2>

  <Feed posts={data.posts} />
</div>
