import React,{ useState, useEffect} from 'react';
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, SearchOutlined, MoreVert, InsertEmoticon, Mic } from '@material-ui/icons';
import { useParams } from "react-router-dom";
import db from "../Server/firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";
import "../Styles/Chat.css";


function Chat() {

    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const { roomId } = useParams();       //returns an object of key/value pairs of URL parameters.params of the current <Route>.
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection("rooms")
                .doc(roomId)
                .onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)));

            db.collection("rooms")
                .doc(roomId)
                .collection("messages")
                .orderBy("timestamp", "asc")
                .onSnapshot(snapshot => 
                setMessages(snapshot.docs.map(doc => 
                    doc.data()
                    ))
                );
        }

    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));         //floor: Returns the greatest integer less than or equal to its numeric argument.
    
    }, [roomId]);  

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("messaeg", input);
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            name: user.displayName,
            userImage: user.photoURL,
        });

        setInput("");
    }

    return (
        <div className="chat">
            <div className="chat-header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat-headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        Last seen {" "}
                        {new Date(
                            messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()
                        }

                    </p>
                </div>
                <div className="chat-headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat-body">
                {messages.map(message => (                    
                    <p className={`chat-messages ${
                        message.name === user.displayName && "chat-reciever"}`}>
                        <span className="chat-name">
                            {message.name}
                        </span>
                        {message.message}
                        <span className="chat-timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
            </div>
            <div className="chat-footer">
                <InsertEmoticon />
                <form>
                    <input 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        placeholder="Type a message" 
                        type="text" 
                    />
                    <button 
                        onClick={sendMessage}
                        type="submit">
                            Send a message
                    </button>
                </form>
                <Mic />
            </div>
        </div>
    )
}

export default Chat;
