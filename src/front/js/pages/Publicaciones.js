import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "/workspaces/PetPals80/src/front/styles/MyFeed.css";
import { Context } from "/workspaces/PetPals80/src/front/js/store/appContext";
import MyFeed from "./MyFeed";

const Publicaciones = ({ posts, setPosts }) => {
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentTexts, setCommentTexts] = useState({});
  const [activePost, setActivePost] = useState(null);
  const [comments, setComments] = useState({});
  const handleAddPost = () => {
    setIsAddingPost(true);
  };

  const Publicaciones_ID = store.currentPublicacionesID;

  useEffect(() => {
    loadPosts();
  }, []);
  const loadPosts = async () => {
    try {
      setIsLoading(true);
      const posts = await actions.getPublicacionesPosts(Publicaciones_ID);
      if (!posts) {
        setError("Error loading posts. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while loading posts.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmitPost = async (e) => {
    e.preventDefault();
    console.log("handleSubmitPost called");
    if (!newPost.trim()) {
      console.log("New post is empty");
      return;
    }
    if (!localStorage.getItem("token")) {
      console.log("No token found, navigating to login");
      navigate("/login");
      return;
    }
    try {
      console.log("Creating post with ID:", Publicaciones_ID, "and content:", newPost);
      const success = await actions.createPublicacionesPost(Publicaciones_ID, newPost);
      if (success) {
        console.log("Post created successfully");
        setNewPost("");
        await loadPosts();
      } else {
        console.log("Error creating post");
        setError("Error creating post. Please try again.");
      }
    } catch (err) {
      console.error("An error occurred while creating the post:", err);
      setError("An error occurred while creating the post.");
    }
  };
  const handleCommentChange = (postId, value) => {
    setCommentTexts((prev) => ({
      ...prev,
      [postId]: value,
    }));
  };
  const loadComments = async (postId) => {
    try {
      const postComments = await actions.getPostComments(postId);
      if (postComments) {
        setComments((prev) => ({
          ...prev,
          [postId]: postComments,
        }));
      }
    } catch (err) {
      console.error("Error loading comments:", err);
    }
  };
  const handleSubmitComment = async (postId) => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    try {
      if (commentTexts[postId]?.trim()) {
        console.log("Submitting comment for post:", postId, "Comment:", commentTexts[postId]);
        const success = await actions.createComment(postId, commentTexts[postId]);
        if (success) {
          setCommentTexts((prev) => ({
            ...prev,
            [postId]: "",
          }));
          await loadComments(postId);
        } else {
          setError("Error creating comment. Please try again.");
        }
      }
    } catch (err) {
      setError("An error occurred while creating the comment.");
      console.error(err);
    }
  };
  return (
    <div className="Post-page">
      <div className="decorative-line-1"></div>
      <div className="decorative-line-2"></div>
      <div className="Post-content">
        <div className="content-section">
      
        <form onSubmit={handleSubmitPost}>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Write your post..."
            className="post-input"
          />
          <button type="submit">Post</button>
        </form>
        <div className="posts-list">
          {isLoading ? (
            <div>Loading posts...</div>
          ) : store.currentPublicacionesPosts?.length === 0 ? (
            <div>No posts yet. Be the first to post!</div>
          ) : (
            store.currentPublicacionesPosts?.map((post) => (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <div className="user-info">
                    <div className="avatar-circle">
                      {post.username ? post.username[0].toUpperCase() : "?"}
                      <div className="user-details">
                        <span className="username">{post.username}</span>
                        <span className="post-time">
                          {new Date(post.created_at).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                  <div className="post-content">{post.content}</div>
                  <div className="comments-section">
                  <button
                    onClick={() => {
                      setActivePost(activePost === post.id ? null : post.id);
                      if (activePost !== post.id) {
                        loadComments(post.id);
                      }
                    }}
                  >
                    {activePost === post.id ? "Hide Comments" : "Show Comments"}
                  </button>
                  {activePost === post.id && (
                    <div className="comments-container">
                      {comments[post.id]?.map((comment) => (
                        <div key={comment.id} className="comment-card">
                          <div className="comment-header">
                            <div className="avatar-circle">
                              {comment.username
                                ? comment.username[0].toUpperCase()
                                : "?"}
                            </div>
                            <div className="user-details">
                              <span className="username">
                                {comment.username}
                              </span>
                              <span className="post-time">
                                {new Date(comment.created_at).toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <div className="comment-content">{comment.content}</div>
                        </div>
                      ))}
                      <textarea
                        value={commentTexts[post.id] || ""}
                        onChange={(e) => {
                          console.log("Comment changed for post:", post.id, "New value:", e.target.value);
                          handleCommentChange(post.id, e.target.value);
                        }}
                        placeholder={
                          localStorage.getItem("token")
                            ? "Write your comment..."
                            : "Please log in to comment"
                        }
                        className="post-input"
                      />
                      <button
                        onClick={() => {
                          console.log("Submit button clicked for post:", post.id);
                          handleSubmitComment(post.id);
                        }}
                        disabled={
                          !commentTexts[post.id]?.trim() ||
                          !localStorage.getItem("token")
                        }
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
        </div>
      </div>
  );
}
export default Publicaciones;

