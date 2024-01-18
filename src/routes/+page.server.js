import { getUser, getTrendingPosts, getFollowingPosts } from "$lib/firebase";

export async function load({ cookies }) {
  const user = cookies.get("user");
  let posts = await getFollowingPosts(user);
  if (user.length > 0) {
    return {
      user: await getUser(user),
      posts: posts,
    };
  }
}
