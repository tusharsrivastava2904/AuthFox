import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Chat = () => {

    const [chats, setChat] = useState([]);

    const fetchChats = async () => {
        const {data} = await axios.get('/chat');
        setChat(data);
    }

    useEffect(()=>{
        fetchChats();
    },[]);
    

  return (
    <div>
        {chats.map((chat)=>(
        <div key={chat._id}>{chat.chatName}</div>
        ))}
    </div>
  )
}

export default Chat