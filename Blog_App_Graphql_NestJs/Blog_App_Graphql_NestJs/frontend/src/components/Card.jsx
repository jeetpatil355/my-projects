/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useNavigate } from "react-router-dom";
import { ONE_BLOG_MUTATION } from "../mutations/blog";
import { useMutation } from "@apollo/client";
import { FaPencilAlt } from "react-icons/fa";
import { FaShare } from "react-icons/fa";

const Card = ({
  blog,
  index,
  is_private,
  diff,
  onMarkPublicBlog,
  onMarkPrivateBlog,
  onDeleteBlog,
  onUpdateBlog,
  onShareBlog,
}) => {
  const navigate = useNavigate();
  const [getOneBlog] = useMutation(ONE_BLOG_MUTATION);

  const handleClick = async (id) => {
    const result = await getOneBlog({
      variables: {
        id,
      },
    });
    const res = {
      blog_id: result.data.getBlogById.blog_id,
      title: result.data.getBlogById.title,
      content: result.data.getBlogById.content,
      file_path: result.data.getBlogById.file_path,
      category_name: result.data.getBlogById.category_name,
      is_private: result.data.getBlogById.is_private,
      publish_date: result.data.getBlogById.publish_date,
    };
    localStorage.setItem("shareBlog", JSON.stringify(res));
    navigate("/display");
  };

  return (
    <div key={index} className="col-12 col-lg-4 ">
      <article>
        <div className="card border-0">
          <div className="card-body border bg-white rounded-3">
            <a
              onClick={() => {
                handleClick(blog.blog_id);
              }}
              style={{ cursor: "pointer" }}
            >
              <img
                className="img-fluid bsb-scale bsb-hover-scale-up rounded-3 "
                loading="lazy"
                src={blog.file_path}
                alt={blog.category_name}
              />
            </a>
            <figcaption>
              <h4 className="h6 text-white bsb-hover-fadeInRight">Read More</h4>
            </figcaption>
            <div className="entry-header mb-4">
              <ul className="entry-meta list-unstyled d-flex flex-column">
                <li>
                  <a
                    className="link-primary text-decoration-none"
                    href="#!"
                    onClick={() => handleClick(blog.blog_id)}
                  >
                    {blog.category_name}
                  </a>
                </li>
              </ul>
              <h2 className="card-title entry-title h4 mb-0">
                <a className="link-dark text-decoration-none" href="#!">
                  {blog.title}
                </a>
              </h2>
            </div>
            {/* <p className="card-text entry-summary text-secondary">
                            {content}
                        </p> */}

            {diff === 1 && (
              <>
                <a
                  onClick={() => {
                    onUpdateBlog(blog.blog_id);
                  }}
                  className="btn btn-primary m-1 rounded-5 text-nowrap entry-more"
                >
                  <FaPencilAlt /> {/* Update */}
                </a>
                <a
                  onClick={() => {
                    onDeleteBlog(blog.blog_id);
                  }}
                  className="btn btn-danger m-1 text-nowrap rounded-5  entry-more"
                >
                  <span className="material-symbols-outlined">delete</span>
                </a>
                <a
                  onClick={() => {
                    onShareBlog(blog.blog_id);
                  }}
                  className="btn btn-success m-1 text-nowrap rounded-5 entry-more"
                >
                  <FaShare /> {/* Share */}
                </a>
              </>
            )}
            {is_private === 1 && diff === 1 && (
              <button
                onClick={() => {
                  onMarkPublicBlog(blog.blog_id);
                }}
                className="btn btn-primary m-1 text-nowrap rounded-5 float-end  entry-more"
              >
                <span className="material-symbols-outlined">public</span>
              </button>
            )}

            {is_private === 0 && diff === 1 && (
              <button
                onClick={() => {
                  onMarkPrivateBlog(blog.blog_id);
                }}
                className="btn btn-primary m-1 text-nowrap rounded-5 float-end  entry-more"
              >
                <span className="material-symbols-outlined">lock</span>
              </button>
            )}
          </div>
          <div className="card-footer border border-top-0 bg-light">
            <ul className="entry-meta list-unstyled d-flex align-items-center">
              <li>
                <p>
                  {/* <b>Created By: </b> <span>{blog.user.firstName} {blog.user.lastName}</span> */}
                </p>
                <p>
                  <b>Publish Date: </b> <span>{blog.publish_date}</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Card;
