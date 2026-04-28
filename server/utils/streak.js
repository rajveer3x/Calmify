const calculateAndUpdateStreak = async (user) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let updated = false;

  if (!user.lastActiveDate) {
    user.currentStreak = 1;
    user.lastActiveDate = today;
    updated = true;
  } else {
    const lastActive = new Date(user.lastActiveDate);
    lastActive.setHours(0, 0, 0, 0);

    const diffTime = today.getTime() - lastActive.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Logged in yesterday
      user.currentStreak += 1;
      user.lastActiveDate = today;
      updated = true;
    } else if (diffDays > 1) {
      // Missed a day(s), streak broken
      user.currentStreak = 1;
      user.lastActiveDate = today;
      updated = true;
    }
    // If diffDays === 0, they already logged in today. No update needed.
  }

  if (updated) {
    await user.save();
  }
  
  return user;
};

module.exports = { calculateAndUpdateStreak };
