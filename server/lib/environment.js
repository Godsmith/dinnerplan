
Accounts.onCreateUser(function(options, user) {
  user.weeksBack = 1;
  user.weeksForward = 2;
  if (options.profile)
    user.profile = options.profile;
  return user;
});