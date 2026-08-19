import { useNavigate } from "react-router";

const NoteCard = ({ note }) => {
  const navigate = useNavigate();

  return (
    <div className="note-card" onClick={() => navigate(`/notes/${note._id}`)}>
      <div className="note-card-contet">
        <h3>{note.heading}</h3>

        <p>{note.content}</p>

        <small className="note-date">
          {new Date(note.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </small>
      </div>
    </div>
  );
};

export default NoteCard;
