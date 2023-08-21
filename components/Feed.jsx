"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const Feed = () => {
  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const [posts, setPosts] = useState([]);

  const PromptCardList = ({ data, handleTagClick }) => {
    return (
      <div className="mt-16 prompt-layout flex gap-3 flex-wrap">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    );
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const filteredPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return posts.filter(
      (post) =>
        regex.test(post.creator.username) ||
        regex.test(post.tag) ||
        regex.test(post.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        setSearchedResults(filteredPrompts(e.target.value));
      }, 200)
    );
  };

const handleTagClick = (tag) => {
  setSearchText(tag);
  setSearchedResults(filteredPrompts(tag));
};

return (
  <section className="feed">
    <form className="relative w-full flex-center">
      <input
        type="text"
        placeholder="Search for a tag or a username"
        value={searchText}
        onChange={handleSearchChange}
        required
        className="search_input peer"
      />
    </form>
    {searchText ? (
      <PromptCardList data={searchedResults} handleTagClick={handleTagClick} />
    ) : (
      <PromptCardList data={posts} handleTagClick={handleTagClick} />
    )}
  </section>
);
};

export default Feed;
