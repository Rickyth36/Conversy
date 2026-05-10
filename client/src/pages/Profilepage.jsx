import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const Profilepage = () => {

  const {authUser, updateProfile} = useContext(AuthContext);

  const [image, setImage] = useState(null);
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!image) {
      await updateProfile({fullName: name, bio});
      navigate("/");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({
        profilePic: base64Image, fullName: name, bio
      })
      navigate('/') ;
    }
  };

  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
      <div
        className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2
      border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg"
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 p-10 flex-1"
        >
          <h3 className="text-lg">Profile details</h3>
          <label
            className="flex items-center gap-3 cursor-pointer"
            htmlFor="avatar"
          >
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png,.jpg,.jpeg"
              hidden
            />
            <img
              className={`w-12 h-12 rounded-full`}
              src={image ? URL.createObjectURL(image) : authUser.profilePic}
              alt=""
            />{" "}
            Upload profile image
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className=" p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2
          focus:ring-violet-500"
            placeholder="Your name"
            type="text"
            name=""
            id=""
            required
          />

          <textarea
            className="p-2 border border-gray-500 rounded-md focus:outline-none
           focus:ring-2 focus:ring-violet-500"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            placeholder="Write profile bio"
            required
            name=""
            id=""
          ></textarea>
          <button
            className="bg-linear-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full
          text-lg cursor-pointer"
            type="submit"
          >
            Save
          </button>
        </form>
        {
          image && 
          <img
            className="max-w-44 rounded-full mx-10 max-sm:mt-10"
            src={URL.createObjectURL(image)}
            alt=""
          />
        }
          {/* <img
            className="max-w-44 rounded-full mx-10 max-sm:mt-10"
            src={assets.logo_icon}
            alt=""
          /> */}
      </div>
    </div>
  );
};

export default Profilepage;
