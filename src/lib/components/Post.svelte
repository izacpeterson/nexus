<script>
  export let post;

  let likes = 0;

  likes = post.likes.length;
</script>

<div class="flex p-8 items-start">
  <img src={post.userPhotoURL} alt="" class="rounded-full w-16 h-16 m-2" />
  <div>
    <div class="flex items-center">
      <a href={`/user/${post.uid}`} class="text-xl font-bold underline text-blue-500 pr-4">{post.username}</a>
      <p>{post.date}</p>
    </div>
    <p class="text-xl">{post.text}</p>
    <!-- <button class="text-red-500">♥ {likes}</button> -->
  </div>
</div>
