import React,{ useState, useEffect} from 'react';
import { Avatar } from "@material-ui/core";
import db from "../Server/firebase";
import { Link } from "react-router-dom";
import "../Styles/SidebarChat.css";

function SidebarChat({ id, name, addNewChat }) {

    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState("");

    useEffect(() => {
        if (id) {
            db.collection("rooms")
                .doc(id)
                .collection("messages")
                .orderBy("timestamp", "desc")
                .onSnapshot(snapshot => 
                setMessages(snapshot.docs.map(doc => 
                    doc.data()
                    ))
                );
        }
    }, [id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));         //floor: Returns the greatest integer less than or equal to its numeric argument.
    
    }, [])

    const createChat = () => {
        const roomName = prompt("Please enter name for chat");

        if (roomName) {
            db.collection("rooms").add({
                name: roomName,
            });
        }
    };

    return !addNewChat ? (
        <Link to={`/room/${id}`} >
            <div className="sidebarChat">
                <Avatar  src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebarChat-info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}{"..."}</p>
                </div>
            </div>
        </Link>
        
    ): (
        <div onClick={createChat} className="sidebarChat">
            <h1>Add New Chat</h1>
          
        </div>
    )
}

export default SidebarChat;
