import React from "react";
import SelectToWrite from "./SelectToWrite";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const List = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);

  function compare(b, a) {
    if (a.lastMessageTime < b.lastMessageTime) {
      return -1;
    }
    if (a.lastMessageTime > b.lastMessageTime) {
      return 1;
    }
    return 0;
  }

  return (
    <div className="  heightCalc scrollbar  hover:scrollbar-thumb-gray_500 scrollbar-thin">
      {data.connects.sort(compare).map((connect, i) => (
        <SelectToWrite
          key={i}
          senderEMail={connect.senderEMail}
          senderName={connect.senderName}
          profilePhoto={connect.profilePhoto}
          lastMessage={connect.lastMessage}
          lastMessageTime={connect.lastMessageTime}
          unReadMessage={connect.unReadMessage}
          seen={connect.seen}
          userSend={connect.userSend}
          group={connect.group}
          sender={connect.sender}
        />
      ))}
    </div>
  );
};

export default List;