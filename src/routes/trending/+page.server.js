import { getUser, getTrendingPosts } from "$lib/firebase";

export async function load({ cookies }) {
  let posts = await getTrendingPosts();
  const user = cookies.get("user");
  if (user.length > 0) {
    return {
      user: await getUser(user),
      posts: posts,
    };
  }
}
