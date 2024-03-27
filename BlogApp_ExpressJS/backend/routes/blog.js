const express = require("express");
const router = express.Router();
const db = require("../db");
const utils = require("../utils");
const added = require("./upload");

router.post("/uploadImage", async (request, response) => {
  try {
    const image = request.body.image;
    const result = await added(image);

    if (result) {
      return response.status(200).send(
        utils.createSuccess({ result, message: "Image uploaded successfully" })
      );
    } else {
      return response.send(
        utils.createError("Error Occurred while posting image")
      );
    }
  } catch (error) {
    console.log(error);
    return response.send(utils.createError(error.message));
  }
});

router.post("/create-blog", async (request, response) => {
  try {
    const { title, content, pic, category, is_private } = request.body;

    if (!title) {
      return response.status(400).send(utils.createError("Please fill title"));
    } else if (!content) {
      return response.status(400).send(utils.createError("Please fill content"));
    } else if (!pic) {
      return response.status(400).send(utils.createError("Please upload image"));
    } else if (!category || category === "0") {
      return response.status(400).send(utils.createError("Please select category"));
    }

    const [result] = await db.execute(
      "select * from Blogs where title = ? and content = ? and file_path = ? and category_name = ? and user_id = ? and is_private = ?",
      [title, content, pic, category, request.user.id, is_private]
    );

    if (result.length !== 0) {
      return response.status(208).send(utils.createError("Blog Already Exists"));
    }

    const [blog] = await db.execute(
      `insert into Blogs (title, content, file_path,category_name, user_id,is_private) values (?, ?, ?, ?, ?,?)`,
      [title, content, pic, category, request.user.id, is_private]
    );

    if (blog) {
      return response.status(200).send(utils.createSuccess("Blog created successfully"));
    } else {
      return response.send(
        utils.status(400).createError("Error Occurred while creating blog")
      );
    }
  } catch (error) {
    console.log(error);
    return response.send(utils.createError(error.message));
  }
});

router.put("/update-blog/:id", async (request, response) => {
  try {
    const { title, content, pic, category, is_private } = request.body;
    const { id } = request.params;

    if (!title) {
      return response.status(400).send(utils.createError("Please fill title"));
    } else if (!content) {
      return response.status(400).send(utils.createError("Please fill content"));
    } else if (!pic) {
      return response.status(400).send(utils.createError("Please upload image"));
    } else if (!category || category === "0") {
      return response.status(400).send(utils.createError("Please select category"));
    }

    const [blog] = await db.execute(
      `update Blogs set title = ?, content = ?, file_path = ?,category_name = ?,is_private = ? where user_id = ? and blog_id = ?`,
      [title, content, pic, category, is_private, request.user.id, id]
    );

    if (blog) {
      return response.status(200).send(utils.createSuccess("Blog updated successfully"));
    } else {
      return response.status(400).send(
        utils.createError("Error Occurred while updating blog")
      );
    }
  } catch (error) {
    console.log(error);
    return response.send(utils.createError(error.message));
  }
});

router.get("/get-blogs", async (request, response) => {
  try {
    const [result] = await db.execute("select * from Blogs where user_id= ?", [
      request.user.id,
    ]);

    if (result) {
      return response.status(200).send(utils.createSuccess({ result }));
    } else {
      return response.status(400).send(
        utils.createError("Error Occurred while getting my blogs")
      );
    }
  } catch (error) {
    console.log(error);
    return response.send(utils.createError(error.message));
  }
});

router.patch("/private/:id", async (request, response) => {
  const { id } = request.params;

  try {
    await db.execute(
      `update Blogs set is_private = 1 where blog_id = ? and user_id = ?`,
      [id, request.user.id]
    );
    response.status(200).send(utils.createSuccess("Marked Private"));
  } catch (ex) {
    response.status(400).send(utils.createError(ex));
  }
});

router.patch("/public/:id", async (request, response) => {
  const { id } = request.params;

  try {
    await db.execute(
      `update Blogs set is_private = 0 where blog_id = ? and user_id = ?`,
      [id, request.user.id]
    );
    response.status(200).send(utils.createSuccess("Marked Public"));
  } catch (ex) {
    response.status(400).send(utils.createError(ex));
  }
});

router.get("/public", async (request, response) => {
  try {
    const [blog] = await db.execute(`select * from Blogs where is_private = 0`);

    response.status(200).send(utils.createSuccess(blog));
  } catch (ex) {
    response.status(400).send(utils.createError(ex));
  }
});

router.patch("/:id", async (request, response) => {
  const { id } = request.params;
  const { isPrivate } = request.body;

  try {
    if (typeof isPrivate !== "boolean") {
      throw new Error(
        "Invalid value for 'isPrivate'. Please provide a boolean value."
      );
    }

    await db.execute(
      `UPDATE Blogs SET is_private = ? WHERE blog_id = ? AND user_id = ?`,
      [isPrivate ? 1 : 0, id, request.user.id]
    );

    const message = isPrivate ? "Marked Private" : "Marked Public";
    response.status(200).send(utils.createSuccess(message));
  } catch (ex) {
    response.status(400).send(utils.createError(ex.message));
  }
});

router.get("/shared", async (request, response) => {
  try {
    const [blogIds] = await db.execute(
      `SELECT blog_id FROM SharedBlogs WHERE shared_with_user_id = ?`,
      [request.user.id]
    );

    const ids = blogIds.map((blog) => blog.blog_id);

    if (ids.length === 0) {
      return response.status(200).send(utils.createSuccess([]));
    }

    // Using the IN clause to retrieve blogs directly
    const [blogs] = await db.execute(
      `SELECT * FROM Blogs WHERE blog_id IN (?)`,
      [ids]
    );

    response.status(200).send(utils.createSuccess(blogs));
  } catch (ex) {
    response.status(400).send(utils.createError(ex));
  }
});

router.get("/get-user/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const [users] = await db.execute(
      `select user_id from Blogs where blog_id = ?`,
      [id]
    );

    const [user_names] = await db.execute(
      `select id, firstName, lastName from user where id = ?`,
      [users[0].user_id]
    );

    response.send(utils.createSuccess(user_names[0]));
  } catch (ex) {
    response.send(utils.createError(ex));
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    await db.execute(`delete from Blogs where blog_id = ?`, [id]);
    response.send(utils.createSuccess("Blog Deleted Successfully"));
  } catch (error) {
    console.log(error);
    response.status(500).send(utils.createError("Internal Server Error"));
  }
});

router.get("/get-blog/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const [result] = await db.execute(`select * from Blogs where blog_id = ?`, [
      id,
    ]);
    response.send(utils.createSuccess(result));
  } catch (error) {
    console.log(error);
    response.status(500).send(utils.createError("Internal Server Error"));
  }
});

router.put("/clear-all", async (request, response) => {
  try {
    const [clear] = await db.execute(
      `update user set is_added = 0 where is_added = 1`
    );

    if (clear) {
      return response.send(utils.createSuccess("done"));
    } else {
      return response.send(
        utils.createError("Error Occurred while clearing added user")
      );
    }
  } catch (error) {
    console.log(error);
    response.status(500).send(utils.createError("Internal Server Error"));
  }
});

router.put("/update-add-user", async (request, response) => {
  try {
    const { blog_id } = request.body;

    const [userIds] = await db.execute(
      `select shared_with_user_id from SharedBlogs where blog_id = ? and sender_id = ?`,
      [blog_id, request.user.id]
    );

    for (let index = 0; index < userIds.length; index++) {
      await db.execute(`update user set is_added = 1 where id = ?`, [
        userIds[index].shared_with_user_id,
      ]);
    }

    if (userIds) {
      return response.send(utils.createSuccess("done"));
    } else {
      return response.send(
        utils.createError("Error Occurred while updating is_added ")
      );
    }
  } catch (error) {
    console.log(error);
    response.status(500).send(utils.createError("Internal Server Error"));
  }
});

router.post("/unShared", async (request, response) => {
  try {
    const { blog_id, shared_with_user_id } = request.body;

    const [share] = await db.execute(
      `delete from SharedBlogs where blog_id = ? and shared_with_user_id = ? and sender_id = ?`,
      [blog_id, shared_with_user_id, request.user.id]
    );

    const [users] = await db.execute(`select * from user where id = ?`, [
      shared_with_user_id,
    ]);

    await db.execute(`update user set is_added = 0 where id = ?`, [
      shared_with_user_id,
    ]);

    if (share) {
      return response.send(
        utils.createSuccess({
          share,
          message: `Blog unshared successfully to ${users[0].firstName} ${users[0].lastName}`,
        })
      );
    } else {
      return response.send(
        utils.createError("Error Occurred while unsharing blog")
      );
    }
  } catch (error) {
    console.log(error);
    response.status(500).send(utils.createError("Internal Server Error"));
  }
});

router.post("/share-blog", async (request, response) => {
  try {
    const { blog_id, shared_with_user_id } = request.body;

    const [share] = await db.execute(
      `insert into SharedBlogs (blog_id, shared_with_user_id, sender_id) values (?, ?, ?)`,
      [blog_id, shared_with_user_id, request.user.id]
    );

    const [users] = await db.execute(`select * from user where id = ?`, [
      shared_with_user_id,
    ]);

    await db.execute(`update user set is_added = 1 where id = ?`, [
      shared_with_user_id,
    ]);

    if (share) {
      return response.send(
        utils.createSuccess({
          share,
          message: `Blog shared successfully to ${users[0].firstName} ${users[0].lastName}`,
        })
      );
    } else {
      return response.send(
        utils.createError("Error Occurred while sharing blog")
      );
    }
  } catch (error) {
    console.log(error);
    return response.send(utils.createError(error.message));
  }
});

router.get("/search/:text", async (request, response) => {
  const { text } = request.params;
  try {
    const [blogs] = await db.execute(
      `select * from Blogs 
        where ((title LIKE '%${text}%') 
        or (content LIKE '%${text}%') 
        or (category_name LIKE '%${text}%'))
        and is_private = 0`
    );
    response.send(utils.createSuccess(blogs));
  } catch (ex) {
    response.send(utils.createError(ex));
  }
});

router.get("/my-search/:text", async (request, response) => {
  const { text } = request.params;
  try {
    const [blogs] = await db.execute(
      `select * from Blogs 
        where ((title LIKE '%${text}%') 
        or (content LIKE '%${text}%') 
        or (category_name LIKE '%${text}%'))
        and user_id = ?`,
      [request.user.id]
    );

    response.send(utils.createSuccess(blogs));
  } catch (ex) {
    response.send(utils.createError(ex));
  }
});

router.get("/shared-search/:text", async (request, response) => {
  const { text } = request.params;
  try {
    const [blogIds] = await db.execute(
      `select blog_id,sender_id from SharedBlogs where shared_with_user_id = ?`,
      [request.user.id]
    );

    const blogs = [];
    for (let index = 0; index < blogIds.length; index++) {
      const [res] = await db.execute(
        `select * from Blogs 
            where ((title LIKE '%${text}%') 
            or (category_name LIKE '%${text}%'))
            and user_id = ?`,
        [blogIds[index].sender_id]
      );

      if (res !== null) {
        blogs.push(res[0]);
      }
    }

    response.send(utils.createSuccess(blogs));
  } catch (ex) {
    response.send(utils.createError(ex));
  }
});

module.exports = router;
