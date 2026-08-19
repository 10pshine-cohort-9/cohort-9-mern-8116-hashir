import { Plus } from "lucide-react";
import { useNavigate } from "react-router";

const CreateNote = () => {
  const navigate = useNavigate();

  const handleCreateNote = () => {
    navigate("/notes/create");
  };

  return (
    <button className="create-note-btn" onClick={handleCreateNote}>
      <Plus size={20} />
      <span>Create Note</span>
    </button>
  );
};

export default CreateNote;
