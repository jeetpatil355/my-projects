const express = require("express");
const router = express.Router();
const db = require("../db");
const utils = require("../utils");
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/register", async (request, response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone_number,
      password,
      confirmPassword,
    } = request.body;

    if (!firstName) {
      return response.send(utils.createError("Please fill firstName"));
    } else if (!lastName) {
      return response.send(utils.createError("Please fill lastName"));
    } else if (!email) {
      return response.send(utils.createError("Please fill email"));
    } else if (!phone_number) {
      return response.send(utils.createError("Please fill phone number"));
    } else if (!password) {
      return response.send(utils.createError("Please fill password"));
    } else if (password.length < 8) {
      return response.send(utils.createError("Password must be of 8 length"));
    } else if (!confirmPassword) {
      return response.send(utils.createError("Please fill confirm password"));
    } else if (confirmPassword.length < 8) {
      return response.send(
        utils.createError("Confirm password must be of 8 length")
      );
    } else if (password !== confirmPassword) {
      return response.send(
        utils.createError("Password & confirm password are not matching")
      );
    }

    const [result] = await db.execute("select * from user where email = ?", [
      email,
    ]);

    if (result.length !== 0) {
      return response.send(utils.createError("User Already Exists"));
    }

    const encryptedPassword = String(cryptoJs.SHA256(password));

    const [user] = await db.execute(
      `insert into user (firstName, lastName, email,phone_number, password) values (?, ?, ?, ?, ?)`,
      [firstName, lastName, email, phone_number, encryptedPassword]
    );

    if (user) {
      return response.send(utils.createSuccess("Registration successful"));
    } else {
      return response.send(
        utils.createError("Error Occurred while registration")
      );
    }
  } catch (error) {
    console.log(error);
    return response.send(utils.createError(error.message));
  }
});

router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email) {
      return response.send(utils.createError("Please fill email"));
    } else if (!password) {
      return response.send(utils.createError("Please fill password"));
    }

    const encryptedPassword = String(cryptoJs.SHA256(password));

    const [users] = await db.execute(
      `select id, firstName, lastName, email, phone_number from user where email = ? and password = ?`,
      [email, encryptedPassword]
    );

    if (users.length === 0) {
      return response.send(utils.createError("Invalid Credentials"));
    } else {
      // get the user details
      const user = users[0];

      // create a payload
      const payload = {
        id: user["id"],
        email,
      };

      // create a token
      const token = jwt.sign(payload, "123456789");
      return response.send(
        utils.createSuccess({
          id: user["id"],
          name: `${user["firstName"]} ${user["lastName"]}`,
          email: user["email"],
          phone: user["phone_number"],
          message: "Login successful",
          token,
        })
      );
    }
  } catch (error) {
    console.log(error);
    response.send(utils.createError(error.message));
  }
});

router.put("/change-password", async (request, response) => {
  try {
    const { newPassword, confirmPassword } = request.body;

    if (!newPassword) {
      return response.send(utils.createError("Please fill new password"));
    } else if (newPassword.length < 8) {
      return response.send(
        utils.createError("New password must be of 8 length")
      );
    } else if (!confirmPassword) {
      return response.send(utils.createError("Please fill confirm password"));
    } else if (confirmPassword.length < 8) {
      return response.send(
        utils.createError("confirm password must be of 8 length")
      );
    } else if (newPassword !== confirmPassword) {
      return response.send(
        utils.createError("New password & confirm password are not matching")
      );
    }

    if (newPassword === confirmPassword) {
      const encryptedPassword = String(cryptoJs.SHA256(newPassword));

      const [result] = await db.execute(
        "update user set password = ? where id = ?",
        [encryptedPassword, request.user.id]
      );

      if (result.length !== 0) {
        return response.send(
          utils.createSuccess("Password changed successfully")
        );
      } else {
        return response.send(
          utils.createError("Error Occurred while change password")
        );
      }
    }
  } catch (error) {
    console.log(error);
    return response.send(utils.createError(error.message));
  }
});

router.get("/get-details", async (request, response) => {
  try {
    const [result] = await db.execute(
      "select id, firstName, lastName, email,phone_number,created_at from user where id = ?",
      [request.user.id]
    );

    if (result.length) {
      return response.send(
        utils.createSuccess({
          result,
          message: "User details fetched successfully",
        })
      );
    } else {
      return response.send(
        utils.createError("Error Occurred while getting details")
      );
    }
  } catch (error) {
    console.log(error);
    return response.send(utils.createError(error.message));
  }
});

router.get("/get-single-user/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const [result] = await db.execute("select * from user where id = ?", [id]);

    if (result.length) {
      return response.send(
        utils.createSuccess(`${result[0].firstName} ${result[0].lastName}`)
      );
    } else {
      return response.send(
        utils.createError("Error Occurred while getting details")
      );
    }
  } catch (error) {
    console.log(error);
    return response.send(utils.createError(error.message));
  }
});

router.get("/get-users", async (request, response) => {
  try {
    const [result] = await db.execute("select * from user");

    if (result.length) {
      return response.send(utils.createSuccess(result));
    } else {
      return response.send(
        utils.createError("Error Occurred while getting users")
      );
    }
  } catch (error) {
    console.log(error);
    return response.send(utils.createError(error.message));
  }
});

router.get("/search-user/:text", async (request, response) => {
  const { text } = request.params;
  try {
    const [users] = await db.execute(
      `select * from user 
        where ((firstName LIKE '%${text}%') 
        or (lastName LIKE '%${text}%') 
        or (email LIKE '%${text}%'))`
    );

    response.send(utils.createSuccess(users));
  } catch (ex) {
    response.send(utils.createError(ex));
  }
});

module.exports = router;
