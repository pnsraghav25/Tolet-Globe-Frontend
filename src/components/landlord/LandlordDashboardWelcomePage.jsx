import propertyimage1 from "../../assets/property/blog-1.png";
import propertyimage2 from "../../assets/property/blog-2.jpg";
import propertyimage3 from "../../assets/property/blog-3.jpg";

import { CiHeart, CiShare2 } from "react-icons/ci";
import { MdMoreVert } from "react-icons/md";

import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";

const LandlordDashboard = ({ myProperties }) => {
  const phoneRef = useRef(null);
  const navigate = useNavigate();
  const phone = 8707727347;
  const [showNumber, setShowNumber] = useState(false);

  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (phoneRef.current && !event.target.closest(".contact-support-box")) {
        setShowNumber(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // States to track liked status for each property
  const [likedProperties, setLikedProperties] = useState([false, false, false]);

  // Handle like button click
  // const handleLikeClick = (index) => {
  //   const updatedLikes = likedProperties.map((liked, i) =>
  //     i === index ? !liked : liked
  //   );
  //   setLikedProperties(updatedLikes);
  // };

  const cards = myProperties.map((property) => (
    <div key={property._id} className=" bg-black p-4 rounded-md">
      <img
        src={property.images[0]}
        alt="Property"
        className=" relative  h-[200px] w-full object-cover rounded-md  mb-4 hover:cursor-pointer"
        onClick={() => navigate(`/property/${property.slug}`)}
      />
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          {property?.firstName} {property?.lastName}
        </h3>

        {/* Icons Section */}
        <div className="icon-box flex mr-6 p-2">
          <a
            href="#"
            className="relative"
            style={{ width: "25px", height: "25px", left: "10px" }}
          >
            <CiHeart className="card_icon text-red-500 bg-[#3E3E3E4D] relative" />
          </a>
          <a
            href="#"
            className="relative"
            style={{ width: "25px", height: "25px", left: "20px" }}
          >
            <CiShare2
              className="card_icon bg-[#3E3E3E4D]"
              style={{ color: "#40B5A8" }}
            />
          </a>
          <a
            href="#"
            className="relative"
            style={{ width: "25px", height: "25px", left: "30px" }}
          >
            <MdMoreVert
              className="card_icon bg-[#3E3E3E4D]"
              style={{ color: "#808080", fontSize: "16px" }} // Adjust size if needed
            />
          </a>
        </div>
      </div>
      <p className="text-gray-400">
        {property.locality}, {property.city}, India
      </p>
      <p className="text-gray-400 mt-1">Rs. {property.rent}</p>
    </div>
  ));

  return (
    <div className="flex-1 bg-black text-white">
      {/* Header (Welcome Message) */}
      <div className="mt-5 mb-8">
        <h1 className="text-4xl font-bold">
          {authState.userData
            ? authState.userData.firstName?.charAt(0).toUpperCase() +
              authState.userData.firstName?.slice(1).toLowerCase()
            : "User"}
          ! Welcome to your Landlord Dashboard
        </h1>
      </div>
      {/* Quick Actions */}
      <div className="flex flex-col gap-y-8">
        <h2 className="text-xl font-bold text-left">Quick Actions</h2>
        <div className="flex justify-between items-center border-[1.13px] border-[#C8A117] p-[22.5px] rounded-xl">
          <div>
            <h2 className="text-lg font-bold text-left">Add a new property</h2>
            <p className="text-gray-400">
              Easily add a property to your account
            </p>
          </div>
          <button
            className="bg-gray-800 text-white py-2 px-6 rounded cursor-pointer"
            onClick={() => {
              navigate("/landlord-dashboard", {
                state: { content: "AddProperty" },
              });
            }}
          >
            Add Property
          </button>
        </div>

        <div className="flex justify-between items-center border-[1.13px] border-[#C8A117] p-[22.5px] rounded-xl">
          <div>
            <h2 className="text-lg font-bold text-left">
              Get help with an issue
            </h2>
            <p className="text-lg leading-7 text-[#ABADB0]">
              Need help with something? We're here to help
            </p>
          </div>
          <div className="relative">
            <button
              className="bg-gray-800 text-white py-2 px-6 rounded flex items-center cursor-pointer contact-support-box"
              onClick={() => {
                navigate("/contact");
              }}
            >
              <span className="mr-2">🎧</span> Contact Support
            </button>
          </div>
        </div>
      </div>
      {/* Recent Properties */}
      <div className="mt-8">
        <h2 className="text-2xl text-left font-semibold mb-4">
          Recent Properties
        </h2>
        {myProperties.length > 0 ? (
          <>
            <div className="grid grid-cols-3">
              {cards.slice(0, 3)}

              {/* import MyProperty */}
              {/* <MyProperty /> */}
            </div>
            <div className="flex justify-end mt-6">
              <button className="bg-gray-800 text-white py-2 px-4 rounded">
                View all (3)
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-400 text-center text-2xl text-bold py-4">
            You have no properties yet !
          </p>
        )}
      </div>
    </div>
  );
};

export default LandlordDashboard;
