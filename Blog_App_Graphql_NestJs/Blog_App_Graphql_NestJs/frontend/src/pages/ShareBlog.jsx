import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Search from "../components/Search";
import {
  GET_ALL_USERS_MUTATION,
  DETAIL_USER_MUTATION,
  CLEAR_SHARE_MUTATION,
  SEARCH_USER_MUTATION,
} from "../mutations/user";
import { useMutation } from "@apollo/client";
import { renderDate } from "../services/renderDate";
import {
  SHARE_MUTATION,
  UNSHARE_MUTATION,
  UPDATE_USER_ADDED_MUTATION,
} from "../mutations/blog";

const ShareBlog = ({ setIsShareOpen }) => {
  const [users, setUsers] = useState([]);
  const [myData, setMyData] = useState({});
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const [getUsers] = useMutation(GET_ALL_USERS_MUTATION);
  const [detailUserMutation] = useMutation(DETAIL_USER_MUTATION);
  const [shareWithUser] = useMutation(SHARE_MUTATION);
  const [unShareUser] = useMutation(UNSHARE_MUTATION);
  const [clearSharedList] = useMutation(CLEAR_SHARE_MUTATION);
  const [updateUserAdded] = useMutation(UPDATE_USER_ADDED_MUTATION);
  const [getSearchMyUsers] = useMutation(SEARCH_USER_MUTATION);

  const getAllUsers = async () => {
    const blog = JSON.parse(localStorage.getItem("shareBlog"));
    const id = localStorage.getItem("id");
    await updateUserAdded({
      variables: {
        blog_id: blog.blog_id,
        id: parseInt(id),
      },
    });
    const result = await getUsers();
    console.log(result);
    const myPersonal = await detailUserMutation({
      variables: {
        id,
      },
    });
    setUsers(result.data.getUsers.data);
    const publishDates = renderDate(
      myPersonal["data"].getUserDetails.created_at
    );
    setMyData({
      firstName: myPersonal["data"].getUserDetails.firstName,
      lastName: myPersonal["data"].getUserDetails.lastName,
      email: myPersonal["data"].getUserDetails.email,
      phone_number: myPersonal["data"].getUserDetails.phone_number,
      created_at: publishDates,
    });
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
    const result = await getSearchMyUsers({
      variables: {
        text,
      },
    });
    if (result["data"].searchUser.status === "success") {
      setUsers(result["data"].searchUser.data);
    } else {
      toast.error(result["data"].searchUser.data);
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
            return u.email !== myData.email;
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
