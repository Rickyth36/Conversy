import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";

const Profilepage = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("Your name");
  const [bio, setBio] = useState("Hi everyone I'm using Conversy");
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/");
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
              accept=".png .jpg .jpeg"
              hidden
            />
            <img
              className={`w-12 h-12 ${image && "rounded-full"}`}
              src={image ? URL.createObjectURL(image) : assets.avatar_icon}
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
            className="p-2 border bordergray-500 rounded-md focus:outline-none
           focus:ring-2 focus:ring-violet-500"
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="Write profile bio"
            required
            name=""
            id=""
          ></textarea>
          <button
            className="bg-linear-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full
          text-lf cursor-pointer"
            type="submit"
          >
            Save
          </button>
        </form>
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
