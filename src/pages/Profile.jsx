import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

function Profile() {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        console.log(user);
      } else {
        setUser(null);
      }
    });
  }, []);
  return user && <div> Welcome to your profile {user.displayName}</div>;
}

export default Profile;
