import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import firebaseAppInit from "../firebase.config";

function Profile() {
  firebaseAppInit;
  const auth = getAuth();
  const [user, setUser] = useState(null);
  useEffect(() => {
    // set the current profile user
  }, [user]);
  return user && <div> Welcome {user.email}</div>;
}

export default Profile;
