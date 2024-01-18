export async function load({ cookies }) {
  const user = cookies.get("user");
  if (user) {
    return {
      user: user,
    };
  } else {
    return {
      user: "null",
    };
  }
}
