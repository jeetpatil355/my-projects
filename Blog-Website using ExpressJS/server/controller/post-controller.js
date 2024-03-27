import Post from "../model/post.js";
import user from "../model/user.js";

export const createPost = async (request, response) => {
  try {
    const post = await new Post(request.body);
    post.save();

    response.status(200).json("Post saved successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};

export const updatePost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);

    if (!post) {
      response.status(404).json({ msg: "Post not found" });
    }

    await Post.findByIdAndUpdate(request.params.id, { $set: request.body });

    response.status(200).json("post updated successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};

export const deletePost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);

    await post.delete();

    response.status(200).json("post deleted successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getPost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);

    response.status(200).json(post);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getAllPosts = async (request, response) => {
  let username = request.query.username || request.user.username;
  let category = request.query.category;
  let posts;
  try {
    if (username)
      posts = await Post.find({
        $or: [{ username: username }, { isPublic: true }],
      });
    else if (category)
      posts = await Post.find({
        $and: [{ categories: category }, { isPublic: true }],
      });
    else posts = await Post.find({ isPublic: true });

    response.status(200).json(posts);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const sharePost = async (request, response) => {
  //const postId = request.params.id;
  const { recipientId, postId } = request.body;
  console.log(`${recipientId} ${postId}`);

  try {
    const post = await Post.findById(postId);

    if (!post) {
      response.status(404).json({ msg: "Post not found" });
      return;
    }

    var recipientUser = await user.find({ username: recipientId });

    console.log("Recipient User" + recipientUser);
    if (!recipientUser) {
      response.status(400).json({ msg: "Invalid recipientId" });
      return;
    }

    post.sharedWith.push(recipientId);
    await post.save();

    response.status(200).json("Post shared successfully");
  } catch (error) {
    response.status(500).json(error);
    console.log(error);
  }
};

export const getSharedPosts = async (request, response) => {
  const { recipientId } = request.params;

  try {
    // Find posts shared with the specified user
    const sharedPosts = await Post.find({ sharedWith: recipientId });

    if (!sharedPosts) {
      return response.status(404).json({ msg: "No shared posts found" });
    }

    return response.status(200).json(sharedPosts);
  } catch (error) {
    console.error("Error retrieving shared posts:", error);
    return response.status(500).json({ msg: "Internal server error" });
  }
};

// export const getSharedPosts = async (request, response) => {
//   const userId = request.user.id;

//   try {
//     // Find posts that are shared with the user
//     const sharedPosts = await Post.find({ sharedWith: userId });
//     console.log(sharePost);
//     response.status(200).json(sharedPosts);
//   } catch (error) {
//     response.status(500).json(error);
//   }
// };

export const searchPosts = async (request, response) => {
  try {
    const query = request.query.q;

    const searchResults = await Post.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });

    response.status(200).json(searchResults);
  } catch (error) {
    response.status(500).json({ error: "Internal server error" });
  }
};
