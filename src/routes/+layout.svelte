<script>
  import FollowUsers from "$lib/components/FollowUsers.svelte";

  import "../app.css";

  import LandingPage from "$lib/components/LandingPage.svelte";

  import { signInWithGoogle, signOutWithGoogle, followUser } from "$lib/firebase.js";

  export let data;

  console.log(data);
</script>

{#if data.user !== "null"}
  <div class="flex justify-evenly">
    <header class="flex flex-col p-8 max-h-screen bg-slate-900 m-2 items-center rounded-3xl shadow">
      <h1 class="text-4xl text-blue-500">NEXUS</h1>

      <div class="flex flex-col text-xl">
        <a href="/" class="p-2">Home</a>
        <a href="/trending" class="p-2">Trending</a>
        <!-- <a href="" class="p-2">Messages</a> -->
        <button
          on:click={() => {
            signOutWithGoogle();
          }}
          class="p-2">Logout</button
        >
        <!-- <button
          on:click={() => {
            signInWithGoogle();
          }}>sign in</button
        > -->
      </div>
    </header>
    <slot />
    <FollowUsers />
  </div>
{:else}
  <LandingPage />
{/if}
