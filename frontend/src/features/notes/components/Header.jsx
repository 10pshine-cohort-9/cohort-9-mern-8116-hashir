import { Search, Bell } from "lucide-react";

const Header = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className="header">
      <div className="search">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </div>

      <div className="profile">
        <div className="avatar">H</div>
        <span>Hashir</span>
      </div>
    </header>
  );
};

export default Header;
