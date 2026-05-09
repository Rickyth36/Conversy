import { Children, createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({children}) => {
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unseenMessages, setUnseenMessges] = useState({})

    const {socket, axios} = useContext(AuthContext);

    // function to get all users for Sidebar
    const getUsers = async() => {
        try {
            const {data} = await axios.get("/api/messages/users");
            if(data.success) {
                setUsers(data.users);
                setUnseenMessges(data.unseenMessages);
            }

        } catch (error) {
            toast.error(error.message);
        }
    }
    
    // function to get message for selectes user
    const getMessages = async(userId) => {
        try {
            const {data} = await axios.get(`/api/messages/${userId}`);
            if(data.success) {
                setMessages(data.messages)
            }
            
        } catch (error) {
            toast.error(error.message);
        }
    } 

    const sendMessages = async(messageData) => {
        try {
            const {data} = await axios.post(`/api/messages/send/${selectedUser._id}`, messageData);
            if(data.success) {
                setMessages((prevMessages) => [...prevMessages, data.newMessage] );
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(data.message);
        }
    }

    // function to subscribe to messages for selectedUser

    const subscribeToMessages = async() => {
        if(!socket) return;

        socket.on("newMessage", (newMessage) => {
            if(selectedUser && newMessage.senderId === selectedUser._id) {
                newMessage.seen = true;
                setMessages((prevMessages) => [...prevMessages, newMessage])
                axios.put(`/api/messages/mark/${newMessage._id}`);
            } else {
                setUnseenMessges((prevUnseenMessages) => ({
                    ...prevUnseenMessages, [newMessage.senderId] : 
                    prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages[newMessage.senderId] + 1 : 1
                }))
            }
        } )
    }

    const value = {
        
    }
    return (
        <ChatContext.Provider value={value} >
            {children}
        </ChatContext.Provider>
    )
}