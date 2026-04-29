import { useEffect, useRef } from "react";
import assets, { messagesDummyData } from "../assets/assets";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const scrollEnd = useRef();

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behaviour: "smooth" });
    }
  });
  return selectedUser ? (
    <div className="relative h-full overflow-scroll backdrop-blur-lg" >
      {/* above area/ */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <img className="w-8 rounded-full" src={assets.profile_martin} alt="" />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          Martin johnson
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt=""
          className="md:hidden max-w-6 cursor-pointer"
        />
        <img src={assets.help_icon} alt="" className="max-md:hidden max-w-5" />
      </div>
      {/* chat area */}
      <div className="flex flex-col h-[calc(100%_-_120px)] overflow-y-scroll p-3 pb-6">
        {messagesDummyData.map((msg, index) => {
          const isMe = msg.senderId === "680f50e4f10f3cd28382ecf9";

          return (
            <div
              key={index}
              className={`w-full flex items-end mb-3 ${
                isMe ? "justify-end" : "justify-start"
              }`}
            >
              {!isMe && (
                <img
                  src={assets.profile_martin}
                  alt=""
                  className="w-7 h-7 rounded-full mr-2"
                />
              )}

              <div className="flex flex-col max-w-[230px]">
                {msg.image ? (
                  <img
                    className="border border-gray-700 rounded-lg overflow-hidden"
                    src={msg.image}
                    alt=""
                  />
                ) : (
                  <p
                    className={`p-2 md:text-sm font-light rounded-lg break-words text-white ${
                      isMe
                        ? "bg-violet-500 rounded-br-none"
                        : "bg-slate-700 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </p>
                )}
                <p className="text-xs text-gray-200 mt-1">
                  {formatMessageTime(msg.createdAt)}
                </p>
              </div>

              {isMe && (
                <img
                  src={assets.avatar_icon}
                  alt=""
                  className="w-7 h-7 rounded-full ml-2"
                />
              )}
            </div>
          );
        })}
        <div ref={scrollEnd}></div>
      </div>

      {/* bottom area */}
      <div className="absolute bottom-0 left-0 right-0 flex items-centre gap-3 p-3">
        <div className="flex-1 flex items-center bg-gray-100/12 px-3 rounded-full">
          <input
            className="flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400"
            type="text"
            placeholder="Send a message"
            name=""
            id=""
          />
          <input
            type="file"
            name=""
            id="image"
            accept="image/png, image/jpeg"
            hidden
          />
          <label htmlFor="image">
            <img
              src={assets.gallery_icon}
              alt=""
              className="w-5 mr-2 cursor-pointer"
            />
          </label>
        </div>
        <img className="w-7 cursor-pointer" src={assets.send_button} alt="" />
      </div>
    </div>
  ) : (
    <div className=" flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
      <img className="max-w-16" src={assets.logo_icon} alt="" />
      <p className="text-lg font-medium text-white">
        Stay close, no matter the distance.
      </p>
    </div>
  );
};

export default ChatContainer;
