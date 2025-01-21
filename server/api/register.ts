import { H3Event } from "h3";

import User from "../models/User";

export default defineEventHandler(async (event: H3Event) => {
  const { username, password } = await readBody(event);
  if (!username || !password) {
    setResponseStatus(event, 400);
    return { error: "missing fields" };
  }

  // check if username exists
  const usernameexists = await User.find({ username });
  if (usernameexists.length > 0) {
    setResponseStatus(event, 400);
    return { error: "Username already exists" };
  }

  const user = new User({
    username,
    password,
  });
  await user.save();

  // Set user session
  await setUserSession(event, {
    user: { username: user.username, id: user.id },
  });
  return {};
});
