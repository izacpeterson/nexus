import { signInWithGoogle } from "./firebase";

describe("signInWithGoogle", () => {
  it("should sign in with Google and reload the page", async () => {
    // Mock dependencies
    const signInWithPopupMock = jest.fn().mockResolvedValue({ user: { uid: "123" } });
    const userToDBMock = jest.fn().mockResolvedValue();
    const fetchMock = jest.fn().mockResolvedValue();

    // Mock global objects
    global.GoogleAuthProvider = jest.fn();
    global.auth = { signInWithPopup: signInWithPopupMock };
    global.fetch = fetchMock;
    global.window = { location: { reload: jest.fn() } };

    // Call the function
    await signInWithGoogle();

    // Assertions
    expect(signInWithPopupMock).toHaveBeenCalledTimes(1);
    expect(userToDBMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith("/api/setuser?id=123");
    expect(global.window.location.reload).toHaveBeenCalledTimes(1);
  });

  it("should log error if sign in fails", async () => {
    // Mock dependencies
    const signInWithPopupMock = jest.fn().mockRejectedValue(new Error("Sign in failed"));
    const consoleLogMock = jest.spyOn(console, "log").mockImplementation();

    // Mock global objects
    global.GoogleAuthProvider = jest.fn();
    global.auth = { signInWithPopup: signInWithPopupMock };

    // Call the function
    await signInWithGoogle();

    // Assertions
    expect(signInWithPopupMock).toHaveBeenCalledTimes(1);
    expect(consoleLogMock).toHaveBeenCalledTimes(1);
    expect(consoleLogMock).toHaveBeenCalledWith(new Error("Sign in failed"));
  });
});
