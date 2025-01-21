import { H3Event } from "h3";

import User from "../models/User";

export default defineEventHandler(async (event: H3Event) => {
  const { username, password } = await readBody(event);

  // Check if required fields are present
  if (!username || !password) {
    setResponseStatus(event, 400);
    return { error: "missing fields" };
  }

  try {
    // Find user in database
    const user = await User.findOne({ username });
    if (!user) {
      setResponseStatus(event, 401);
      return { error: "Invalid username" };
    }

    // Check password
    const isValidPassword = await verifyPassword(user.password, password);
    if (!isValidPassword) {
      setResponseStatus(event, 401);
      return { error: "Invalid password" };
    }

    // Set user session
    await setUserSession(event, {
      user: { username: user.username, id: user.id },
    });
    return {};
  } catch (error) {
    setResponseStatus(event, 500);
    return { error: "Internal server error" };
  }
});
