<script>
  import LandingPage from "$lib/components/LandingPage.svelte";

  import { findUserByEmail } from "$lib/firebase.js";

  export let data;

  let searchQuery = "dan@demo.com";
  let results = [];
</script>

<div class="flex flex-col p-8 max-h-screen bg-slate-900 m-2 items-center rounded-3xl shadow">
  <h2 class="text-2xl text-blue-500 mb-4">Follow Users</h2>

  <span>
    <input bind:value={searchQuery} placeholder="ex. dan@demo.com" type="text" class="bg-slate-800 rounded-xl text-xl p-2" />
    <button
      on:click={async () => {
        results = await findUserByEmail(searchQuery);
        console.log(results);
      }}>Search</button
    >
  </span>

  <div>
    <!-- search result -->
    {#each results as result}
      <div class="flex flex-col">
        <div class="flex flex-row">
          <img src={result.photoURL} alt="" class="rounded-full w-16 h-16 m-2" />
          <div class="flex flex-col">
            <a href={`/user/${result.uid}`} class="text-xl">{result.name}</a>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded-xl"> Follow </button>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <div class="mt-8">
    <h2 class="text-xl">Recommended Users</h2>
    <div class="flex flex-col">
      <div class="flex flex-row">
        <img src="https://lh3.googleusercontent.com/a/ACg8ocIAJLNjS07yL-f9Jt2MNdTTPXfadAR0r9tDfKTon45Cvg=s96-c" alt="" class="rounded-full w-16 h-16 m-2" />
        <div class="flex flex-col">
          <a href="/user/Lw9IriEFN7R5aZqD9FcItpvjJOm1" class="text-xl">Izac Peterson</a>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded-xl"> Follow </button>
        </div>
      </div>
    </div>
  </div>
</div>
