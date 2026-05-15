import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function ChatBox({ item }) {
  const { user, sendMessage } = useApp();
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSend = () => {
    sendMessage(item.id, user?.name || "User", text, image);
    setText("");
    setImage("");
  };

  return (
    <div className="chat-box card">
      <h3>Item Chat</h3>

      <div className="chat-messages">
        {item.messages?.length > 0 ? (
          item.messages.map((msg) => (
            <div key={msg.id} className="chat-message">
              <div className="chat-meta">
                <strong>{msg.sender}</strong>
                <span>{msg.timestamp}</span>
              </div>

              {msg.text && <p>{msg.text}</p>}
              {msg.image && (
                <img
                  className="chat-image"
                  src={msg.image}
                  alt="Shared in chat"
                />
              )}
            </div>
          ))
        ) : (
          <p className="muted">No messages yet. Start the conversation.</p>
        )}
      </div>

      {image && <img className="chat-preview" src={image} alt="Preview" />}

      <div className="chat-input-row">
        <input
          type="text"
          placeholder="Type your message about this item..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <label className="image-chat-btn">
          Image
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>

        <button className="btn btn-primary" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}
