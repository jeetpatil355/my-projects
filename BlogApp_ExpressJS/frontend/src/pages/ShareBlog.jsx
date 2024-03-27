import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, getUserDetails, getSearchMyUsers } from "../services/user";
import { toast } from "react-toastify";
import {
  shareWithUser,
  unShareUser,
  clearSharedList,
  updateUserAdded,
} from "../services/blog";
import Search from "../components/Search";

const ShareBlog = ({ setIsShareOpen }) => {
  const [users, setUsers] = useState([]);
  const [myData, setMyData] = useState({});
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const getAllUsers = async () => {
    const blog = JSON.parse(localStorage.getItem("shareBlog"));
    await updateUserAdded(blog.blog_id);
    const result = await getUsers();
    const myPersonal = await getUserDetails();
    if (result["status"] === "success") {
      setUsers(result["data"]);
      setMyData(myPersonal["data"].result[0]);
    } else {
      toast.error(result["error"]);
    }
  };

  const ShareBlog = async (id) => {
    const userId = id;
    const blog = JSON.parse(localStorage.getItem("shareBlog"));
    const myId = parseInt(localStorage.getItem("id"));
    const result = await shareWithUser({
      variables: {
        blog_id: blog.blog_id,
        user_id: userId,
        my_id: myId,
      },
    });
    if (result["data"].shareBlog === true) {
      if (text.length === 0) {
        getAllUsers();
      } else {
        getSearch(text);
      }
      setIsShareOpen(false);
      navigate("/my-blogs");
    } else {
      toast.error(result["error"]);
    }
  };

  const unShareBlog = async (id) => {
    const userId = id;
    const blog = JSON.parse(localStorage.getItem("shareBlog"));
    const myId = parseInt(localStorage.getItem("id"));
    const result = await unShareUser({
      variables: {
        blog_id: blog.blog_id,
        user_id: userId,
        my_id: myId,
      },
    });
    if (result["data"].unshareBlog === true) {
      if (text.length === 0) {
        getAllUsers();
      } else {
        getSearch(text);
      }
      setIsShareOpen(false);
      navigate("/my-blogs");
    } else {
      toast.error(result["error"]);
    }
  };

  const getSearch = async (text) => {
    const result = await getSearchMyUsers(text);
    if (result["status"] === "success") {
      setUsers(result["data"]);
    } else {
      toast.error(result["error"]);
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
    getSearch(text);
  };

  useEffect(() => {
    if (text.length === 0) {
      getAllUsers();
      setIsShareOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <>
      <Search
        text={text}
        handleChange={handleChange}
        title={"Search Users"}
        field={"Search"}
      />
      <ol className="list-group list-group-numbered">
        {users
          .filter((u) => {
            return u.id !== myData.id;
          })
          .map((user, index) => {
            return (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">
                    {user.firstName} {user.lastName}
                  </div>
                  {user.email}
                </div>

                {user.is_added === 0 ? (
                  <button
                    onClick={() => {
                      ShareBlog(user.id);
                    }}
                    className="btn btn-success m-1 text-nowrap entry-more"
                  >
                    Share
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      unShareBlog(user.id);
                    }}
                    className="btn btn-danger m-1 text-nowrap entry-more"
                  >
                    UnShare
                  </button>
                )}
              </li>
            );
          })}
      </ol>
    </>
  );
};

export default ShareBlog;
