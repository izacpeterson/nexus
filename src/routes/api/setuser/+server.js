export function GET({ url, cookies }) {
  const user = url.searchParams.get("id");
  cookies.set("user", user, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
}
