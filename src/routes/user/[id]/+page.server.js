import { getUser, getUserPosts } from "$lib/firebase";

export async function load({ params, cookies }) {
  let currentUser = cookies.get("user");
  const user = await getUser(params.id);
  const posts = await getUserPosts(params.id);
  return {
    user: user,
    currentUser: currentUser,
    posts: posts,
  };
}
