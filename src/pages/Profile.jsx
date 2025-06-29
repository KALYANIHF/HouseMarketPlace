import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAuth, updateProfile } from "firebase/auth";
import { db } from "../../firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;
  const onlogOut = () => {
    auth.signOut();
    navigate("/");
  };
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // update the displayname in Firebase
        await updateProfile(auth.currentUser, { displayName: name });
        // update in firestore
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      toast.error("Could not update profile Details");
    }
  };
  const handleChange = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">Welcome Back!</p>
        <button type="button" className="logOut" onClick={onlogOut}>
          LogOut
        </button>
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Profile Details</p>
          <p
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? "Done" : "Change"}
          </p>
        </div>
        <div className="profileCard">
          <form>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleChange}
              className={!changeDetails ? "profileName" : "profileNameActive"}
              disabled={!changeDetails}
            />
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={handleChange}
              className={!changeDetails ? "profileEmail" : "profileEmailActive"}
              disabled={!changeDetails}
            />
          </form>
        </div>
      </main>
    </div>
  );
}

export default Profile;
