import "../dashboard.scss";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import NotesGrid from "../components/NotesGrid";
import CreateNote from "../components/CreateNote";
import { getNotes } from "../services/note.api";
export const NotePage = () => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getNotes();
        setNotes(data.notes);
      } catch (err) {
        console.error("unable to fetch notes", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter((note) => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) {
      return true;
    }
    return (
      note.heading.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
    );
  });

  return (
    <div className="notes-page">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="dashboard">
        <section className="notes-section">
          <div className="notes-heading">
            <h1>My Notes</h1>
          </div>
          {loading && <p>Loading notes...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && <NotesGrid notes={filteredNotes} />}
        </section>
        <aside className="notes-intro">
          <div className="intro-content">
            <span className="intro-label">NOTEAPP</span>
            <h2>
              All your notes
              <br />
              <span>orgainized and easy to find. </span>
            </h2>
            <p className="intro-qoute">
              "Capture ideas, origanize thoughts, and never lose what matters."
            </p>
            <CreateNote />
          </div>
        </aside>
      </main>
    </div>
  );
};

export default NotePage;
