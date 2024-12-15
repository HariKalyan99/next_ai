"use client";

import React, { useEffect, useState } from "react";
import PromtCard from "./PromtCard";

const PromtCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 flex flex-wrap gap-3">
      {data.map((post) => (
        <PromtCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {

    const fetchPosts = async () => {
      const response = await fetch("/api/promt");
      const data = await response.json();
      setPosts(data);
    };
    
    fetchPosts();
  }, []);

  const filterpromts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.promt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterpromts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterpromts(tagName);
    setSearchedResults(searchResult);
  };
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
          required
        />
      </form>
      <section className="w-full">
        {searchText ? (
          <PromtCardList
            data={searchedResults}
            handleTagClick={handleTagClick}
          />
        ) : (
          <PromtCardList data={posts} handleTagClick={handleTagClick} />
        )}
      </section>
    </section>
  );
};

export default Feed;
