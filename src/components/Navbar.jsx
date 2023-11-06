export default function Navbar() {
  return (
    <div className="navbar">
      <span className="logo">Kieler Chat</span>
      <div className="user">
        <img
          src="https://images.pexels.com/photos/6976943/pexels-photo-6976943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />

        <span>Jessica</span>
        <button>Log out</button>
      </div>
    </div>
  );
}
