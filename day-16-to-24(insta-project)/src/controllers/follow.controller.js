const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

// Controller to handle follow requests and relationships
async function followController(req, res) {
  const followerUsername = req.user.username; // Logged-in user (who is sending request)
  const followingUsername = req.params.username; // User to be followed (from URL)

  // Prevent user from following themselves
  if (followingUsername === followerUsername) {
    return res.status(400).json({
      message: "You cannot Follow Yourself",
    });
  }

  // Check if the user to follow exists
  const isFollowingExists = await userModel.findOne({
    username: followingUsername,
  });

  if (!isFollowingExists) {
    return res.status(404).json({
      message: "User you are trying to Follow does not exists",
    });
  }

  // Check if follow record already exists
  const isAlreadyFollowing = await followModel.findOne({
    follower: followerUsername,
    following: followingUsername,
  });

  if (isAlreadyFollowing) {
    // If already accepted
    if (isAlreadyFollowing.status === "accepted") {
      return res.status(400).json({
        message: `You are already following ${followingUsername}`,
      });
    }

    // If request is still pending
    if (isAlreadyFollowing.status === "pending") {
      return res.status(400).json({
        message: `Follow request is already sent`,
      });
    }

    // If previously rejected, resend request
    if (isAlreadyFollowing.status === "rejected") {
      isAlreadyFollowing.status = "pending";
      await isAlreadyFollowing.save();

      return res.status(200).json({
        message: "Follow request sent again",
        follow: isAlreadyFollowing,
      });
    }
  }

  // Create new follow request
  const followRecord = await followModel.create({
    follower: followerUsername,
    following: followingUsername,
  });

  res.status(201).json({
    message: `Follow Request sent to ${followingUsername}`,
    follow: followRecord,
  });
}

// Controller to accept a pending follow request
async function acceptFollowRequestController(req, res) {
  const loggedInUser = req.user.username; // Logged-in user (who is accepting request)
  const followerUsername = req.params.username; // Username who sent the request

  // Find pending follow request
  const followRequest = await followModel.findOne({
    follower: followerUsername,
    following: loggedInUser,
    status: "pending",
  });

  if (!followRequest) {
    return res.status(404).json({
      message: "Follow request not found",
    });
  }

  // Change status to accepted
  followRequest.status = "accepted";
  await followRequest.save();

  res.status(200).json({
    message: "Follow request accepted",
    follow: followRequest,
  });
}

// Controller to reject a pending follow request
async function rejectFollowRequestController(req, res) {
  const loggedInUser = req.user.username; // Logged-in user
  const followerUsername = req.params.username; // Username who sent request

  // Find pending follow request
  const followRequest = await followModel.findOne({
    follower: followerUsername,
    following: loggedInUser,
    status: "pending",
  });

  if (!followRequest) {
    return res.status(404).json({
      message: "Follow request not Found",
    });
  }

  // Change status to rejected
  followRequest.status = "rejected";
  await followRequest.save();

  res.status(200).json({
    message: "Follow request rejected",
  });
}

// Controller to unfollow an already accepted relationship
async function unfollowController(req, res) {
  const followerUsername = req.user.username; // Logged-in user (who wants to unfollow)
  const followingUsername = req.params.username; // User to unfollow

  // Check if follow relationship exists and it is accepted
  const isUserFollowing = await followModel.findOne({
    follower: followerUsername,
    following: followingUsername,
    status: "accepted",
  });

  if (!isUserFollowing) {
    return res.status(200).json({
      message: `User is not following ${followingUsername}`,
    });
  }

  // Delete follow record (unfollow)
  await followModel.findByIdAndDelete(isUserFollowing._id);

  res.status(200).json({
    message: `You have Unfollowed ${followingUsername}`,
  });
}

module.exports = {
  followController,
  unfollowController,
  acceptFollowRequestController,
  rejectFollowRequestController,
};
