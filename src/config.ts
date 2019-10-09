const endpoint = {
  users: process.env.USERS_ENDPOINT
};

const maxUsernameLength = parseInt(process.env.MAX_USERNAME_LENGTH, 10);

export {
  endpoint,
  maxUsernameLength
};
