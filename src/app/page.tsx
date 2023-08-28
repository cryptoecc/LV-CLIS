"use client";
import React, { useState } from "react";
import Search from "@/src/components/search";
import Wordcloud from "@/src/components/wordCloud";
import NetworkChart from "@/src/components/networkChart";
import NewsChart from "@/src/components/newsChart";
import RelevantNews from "@/src/components/relevantNews";
import WeeklyKeyword from "@/src/components/weeklyKeyword";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchTermChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  };
  return (
    <article className="border body">
      <div className="headsection">
        <div className="logo text-5xl">LOGO</div>
        <Search onSearchTermChange={handleSearchTermChange} />
      </div>
      <div className="section">
        <Wordcloud searchTerm={searchTerm} />
        <NetworkChart searchTerm={searchTerm} />
        {/* <NewsChart /> */}
      </div>
      <div className="section">
        {/* <WeeklyKeyword searchTerm={searchTerm} /> */}
        <RelevantNews searchTerm={searchTerm} />
      </div>
    </article>
  );
}
