<script>
  import { signInWithGoogle, signOutWithGoogle, loadMockPosts, newPost, loadMockUsers } from "$lib/firebase.js";
  import { onMount } from "svelte";

  import Feed from "$lib/components/Feed.svelte";

  onMount(async () => {
    // loadMockPosts();
    // loadMockUsers();
  });

  export let data;

  let newPostText = "";
  let user = data.user;
</script>

<!-- {#if data.user}
  <div>
    <h1>Hello, {data.user.name}</h1>
    <img src={data.user.photoURL} alt="user" />
  </div>
{/if} -->

<div class="flex flex-col items-center w-1/3">
  <span>Hey {data.user.name}, welcome to Nexus Social</span>

  <div class="bg-slate-900 flex m-2 p-4 w-full items-center rounded-3xl shadow">
    <span class="">New Post</span>
    <img src={data.user.photoURL} alt="" class="rounded-full w-16 h-16 object-cover" />
    <textarea bind:value={newPostText} name="" id="" cols="30" rows="3" class="bg-slate-900 p-2 m-2 w-full" placeholder={`Hello, World! I'm ${data.user.name}!`}></textarea>
    <button
      on:click={() => {
        newPost({
          text: newPostText,
          uid: data.user.uid,
          username: data.user.name,
          likes: [],
          comments: [],
          date: new Date().toLocaleDateString(),
          userPhotoURL: data.user.photoURL,
        }).then(() => {
          alert("Posted!");
          window.location.reload();
        });
      }}
      class="bg-blue-500 text-white rounded-xl px-4 py-2">Post</button
    >
  </div>
  <Feed posts={data.posts} />
</div>
