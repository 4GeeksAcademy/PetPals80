import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import MyFeed from "./MyFeed";

const Publicaciones = ({ posts }) => {
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
    <div className="publicaciones">
      <div className="posts-container">
        {posts.map((post, index) => (
          <div key={index} className="post">
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Publicaciones;

