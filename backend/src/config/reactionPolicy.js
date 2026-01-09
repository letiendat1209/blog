// config/reactionPolicy.js

export const reactionPolicy = {
  COMMENT: {
    allowedTypes: ["UPVOTE"],
    maxPerUser: 1,
  },
  POST: {
    allowedTypes: ["LIKE", "HEART", "HAHA", "STAR"],
    maxPerUser: 1,
  },
  PHOTO: {
    allowedTypes: ["LIKE", "HEART", "HAHA", "STAR"],
    maxPerUser: 1,
  },
};


