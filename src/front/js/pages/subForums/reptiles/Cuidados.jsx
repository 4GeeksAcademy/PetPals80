import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../store/appContext";
import "../../../../styles/subForum.css";
import reptiles from "../../../../img/Reptiles.png";
import { FORUM_IDS } from "../forumIds";

const CuidadosReptiles = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentTexts, setCommentTexts] = useState({});
  const [activePost, setActivePost] = useState(null);
  const [comments, setComments] = useState({});

  const FORUM_ID = FORUM_IDS.REPTILES.CUIDADOS;

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      const posts = await actions.getForumPosts(FORUM_ID);
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
    if (!newPost.trim()) return;

    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    try {
      const success = await actions.createForumPost(FORUM_ID, newPost);
      if (success) {
        setNewPost("");
        await loadPosts();
      } else {
        setError("Error creating post. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while creating the post.");
      console.error(err);
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
        const success = await actions.createComment(
          postId,
          commentTexts[postId]
        );
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
      console.error("Error in handleSubmitComment:", err);
      setError("An error occurred while creating the comment.");
    }
  };

  return (
    <div className="subforum-page">
      <div className="decorative-line-1"></div>
      <div className="decorative-line-2"></div>

      <div className="subforum-content">
        <div className="content-section">
          <div className="image-section">
            <img src={reptiles} alt="Reptiles" className="perros-image" />
          </div>
          <h1 className="main-title">Cuidados</h1>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmitPost} className="post-form">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder={
              localStorage.getItem("token")
                ? "Write your post here..."
                : "Please log in to post"
            }
            className="post-input"
          />
          <button
            type="submit"
            disabled={!newPost.trim() || !localStorage.getItem("token")}
          >
            Post
          </button>
        </form>

        <div className="posts-list">
          {isLoading ? (
            <div>Loading posts...</div>
          ) : store.currentForumPosts?.length === 0 ? (
            <div>No posts yet. Be the first to post!</div>
          ) : (
            store.currentForumPosts?.map((post) => (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <div className="user-info">
                    <div className="avatar-circle">
                      {post.username ? post.username[0].toUpperCase() : "?"}
                    </div>
                    <div className="user-details">
                      <span className="username">{post.username}</span>
                      <span className="post-time">
                        {new Date(post.created_at).toLocaleString()}
                      </span>
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
                        onChange={(e) =>
                          handleCommentChange(post.id, e.target.value)
                        }
                        placeholder={
                          localStorage.getItem("token")
                            ? "Write your comment..."
                            : "Please log in to comment"
                        }
                        className="post-input"
                      />
                      <button
                        onClick={() => handleSubmitComment(post.id)}
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
  );
};

export default CuidadosReptiles;