import { useEffect, useState, useContext } from "react";
import { Grid, Box } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import { DataContext } from "../../../context/DataProvider";
import { API } from "../../../service/api";
import Post from "./Post";

const Posts = () => {
  const { account } = useContext(DataContext);
  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
      let response;
      if (account && account.username) {
        // Fetch posts only for the logged-in user
        response = await API.getAllPosts(account.username, {
          category: category || "",
        });
      } else {
        // Fetch all posts if user is not logged in
        response = await API.getAllPosts({ category: category || "" });
      }
      if (response.isSuccess) {
        setPosts(response.data);
      }
    };
    fetchData();
  }, [account, category]);

  const filterSharedPosts = () => {
    if (category === "Shared Blogs") {
      return posts.filter((post) => post.shared);
    }
    return posts;
  };

  return (
    <>
      {filterSharedPosts().length ? (
        filterSharedPosts().map((post) => (
          <Grid item lg={3} sm={4} xs={12} key={post._id}>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`details/${post._id}`}
            >
              <Post post={post} />
            </Link>
          </Grid>
        ))
      ) : (
        <Box style={{ color: "878787", margin: "30px 80px", fontSize: 18 }}>
          No shared posts available
        </Box>
      )}
    </>
  );
};

export default Posts;
