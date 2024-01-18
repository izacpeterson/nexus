<script>
  import LandingPage from "$lib/components/LandingPage.svelte";

  import { findUserByEmail } from "$lib/firebase.js";

  export let data;

  let searchQuery = "";
  let results = [];
</script>

<div class="flex flex-col p-8 max-h-screen bg-slate-900 m-2 items-center rounded-3xl shadow">
  <h2 class="text-2xl text-blue-500 mb-4">Follow Users</h2>

  <span>
    <input bind:value={searchQuery} placeholder="ex. obiwan@gmail.com" type="text" class="bg-slate-800 rounded-xl text-xl p-2" />
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
          <img src={result.photoURL} alt="" class="rounded-full w-16 h-16 m-2 object-cover" />
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
    <div class="flex flex-col">
      <div class="flex flex-row">
        <img
          src="data:image/jpeg;base64,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"
          alt=""
          class="rounded-full w-16 h-16 m-2 object-cover"
        />
        <div class="flex flex-col">
          <a href="/user/1" class="text-xl">Darth Vader</a>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded-xl"> Follow </button>
        </div>
      </div>
    </div>
  </div>
</div>
