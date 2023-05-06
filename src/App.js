import React, { useState, useEffect } from "react";
import "./Journal.css";

function Journal() {
  const [entries, setEntries] = useState([]);

  function addEntry(title, content) {
    const newEntry = { title, content };
    setEntries([...entries, newEntry]);
  }

  // useEffect(() => {
  //   const storedEntries = JSON.parse(localStorage.getItem("entries"));
  //   if (storedEntries) {
  //     setEntries(storedEntries);
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  return (
    <div className="journal">
      <h1>My Journal</h1>
      <EntryForm onAddEntry={addEntry} />
      <EntryList entries={entries} />
    </div>
  );
}

function EntryForm({ onAddEntry }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onAddEntry(title, content);
    setTitle("");
    setContent("");
  }

  return (
    <form onSubmit={handleSubmit} className="entry-form">
      <h2>New Entry</h2>
      <label htmlFor="title">Title:</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />
      <label htmlFor="content">Content:</label>
      <textarea
        id="content"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        required
      />
      <button type="submit">Add Entry</button>
    </form>
  );
}

function EntryList({ entries }) {
  return (
    <div className="entry-list">
      <h2>Entries</h2>
      {entries.map((entry, index) => (
        <Entry key={index} title={entry.title} content={entry.content} />
      ))}
    </div>
  );
}

function Entry({ title, content }) {
  return (
    <div className="entry">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}

export default Journal;
