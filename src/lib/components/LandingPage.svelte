<script>
  import { signInWithGoogle, loginAsDemoUser } from "$lib/firebase.js";
</script>

<div class="flex items-center justify-evenly w-1/2 m-auto h-screen">
  <h1 class="text-4xl">Welcome to Nexus</h1>

  <button on:click={signInWithGoogle} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded-xl">Sign in with Google</button>
  <span>or</span>
  <button
    on:click={() => {
      loginAsDemoUser().then(() => {
        window.location.reload();
      });
    }}
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded-xl">Sign in as Demo User</button
  >
</div>
