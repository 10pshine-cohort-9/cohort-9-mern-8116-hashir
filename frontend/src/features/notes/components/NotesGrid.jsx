import NoteCard from "./NoteCard";

const NotesGrid = ({ notes = [] }) => {
  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <NoteCard key={note._id} note={note} />
      ))}
    </div>
  );
};

export default NotesGrid;
