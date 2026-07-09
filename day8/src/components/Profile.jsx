import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <div>
      <h2>Profile</h2>

      <p>Name : {user?.name || "Guest"}</p>
      <p>Email : {user?.email || "No email"}</p>
      <p>Role : User</p>
    </div>
  );
}

export default Profile;