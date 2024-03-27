import { gql } from '@apollo/client';

export const IMG_BLOG_MUTATION = gql`
mutation UploadImg(
    $image: String!
) {
  uploadImage(
    image: $image
  ) {
    status
    data
    message
  }
}
`;


export const CREATE_BLOG_MUTATION = gql`
mutation CreateBlog(
    $title: String! 
    $content: String! 
    $pic: String!  
    $category: String!  
    $is_private: Float!
    $id: String!
) {
  createBlog(
    title: $title
    content: $content
    pic: $pic
    category: $category
    is_private: $is_private
    id: $id
  ) {
    status
    data
  }
}
`;

export const UPDATE_BLOG_MUTATION = gql`
mutation updateBlogs(
    $id: Float!
    $title: String! 
    $content: String! 
    $pic: String!  
    $category: String!  
    $is_private: Float!
) {
  updateBlog(
    id: $id
    title: $title
    content: $content
    pic: $pic
    category: $category
    is_private: $is_private
  ) {
    status
    data
  }
}
`;


export const GET_BLOGS_MUTATION = gql`
mutation getMyBlogs(
    $id: String!
) {
  getBlogsByUserId(
    id: $id
  ) {
    status
    data{
      blog_id
      title
      content
      file_path
      category_name
      is_private
      publish_date
      user
    }
  }
}
`;

export const DELETE_BLOG_MUTATION = gql`
mutation deleteBlog(
    $id: Float!
) {
  deleteBlogById(
    id: $id
  ) {
    status
    data
  }
}
`;


export const MARK_PRIVATE_MUTATION = gql`
mutation markPrivate(
    $bid: Float!
    $uid: String!
) {
  markBlogAsPrivate(
    bid: $bid
    uid: $uid
  ) {
    status
    data
  }
}
`;

export const SEARCH_PUBLIC_BLOG_MUTATION = gql`
mutation searchPublicBlogs(
    $text: String!
) {
  searchBlogsByText(
    text: $text
  ) {
    status
    data{
      blog_id
      title
      content
      file_path
      category_name
      is_private
      publish_date
      user
    }
  }
}
`;


export const SEARCH_MY_BLOG_MUTATION = gql`
mutation searchMyBlogs(
    $text: String!
    $id: Float!
) {
  searchBlogsByTextForUser(
    text: $text
    id: $id
  ) {
    status
    data{
      blog_id
      title
      content
      file_path
      category_name
      is_private
      publish_date
      user
    }
  }
}
`;



export const SEARCH_SHARED_BLOG_MUTATION = gql`
mutation searchSharedBlogs(
    $text: String!
    $id: Float!
) {
  searchSharedBlogsByText(
    text: $text
    id: $id
  ) {
    status
    data{
      blog_id
      title
      content
      file_path
      category_name
      is_private
      publish_date
      user
    }
  }
}
`;

export const MARK_PUBLIC_MUTATION = gql`
mutation markPublic(
    $bid: Float!
    $uid: String!
) {
  markBlogAsPublic(
    bid: $bid
    uid: $uid
  ) {
    status
    data
  }
}
`;


export const GET_PUBLIC_BLOGS_MUTATION = gql`
mutation getPublicBlogs{
  getPublicBlogs {
    status
    data{
      blog_id
      title
      content
      file_path
      category_name
      is_private
      publish_date
      user
    }
  }
}
`;

export const ONE_BLOG_MUTATION = gql`
mutation getOneBlog(
  $id: Float!
){
  getBlogById (
    id: $id
  ) {
      blog_id
      title
      content
      file_path
      category_name
      is_private
      publish_date
  }
}
`;



export const SHARE_MUTATION = gql`
mutation shareBlog(
  $blog_id: Float!
  $user_id: Float!
  $my_id: Float!
){
  shareBlog (
    blog_id: $blog_id
    share_id: $user_id
    id: $my_id
  )
}
`;

export const UNSHARE_MUTATION = gql`
mutation unShareBlog(
  $blog_id: Float!
  $user_id: Float!
  $my_id: Float!
){
  unshareBlog (
    blog_id: $blog_id
    share_id: $user_id
    id: $my_id
  )
}
`;


export const UPDATE_USER_ADDED_MUTATION = gql`
mutation updateUserAdded(
  $blog_id: Float!
  $id: Float!
){
  updateIsAddedForSharedUsers (
    blog_id: $blog_id
    id: $id
  )
}
`;


export const SHARED_MUTATION = gql`
mutation getSharedBlog(
  $id: Float!
){
  getSharedBlogsForUser (
    id: $id
  ){
    status
    data{
      blog_id
      title
      content
      file_path
      category_name
      is_private
      publish_date
      user
    }
  }
}
`;