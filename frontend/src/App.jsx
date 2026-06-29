import { useState } from "react";
import axios from "axios";

function App() {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {

  if (!message) return;

  const userMessage = {
    sender: "You",
    text: message
  };

  setChat((prev) => [...prev, userMessage]);

  setMessage("");

  setLoading(true);

  try {

    const response = await axios.post(
      "https://soul-sync-ai.onrender.com/chat",
      {
        message: message
      }
    );

    const aiMessage = {
      sender: "SoulSync",
      text: response.data.reply
    };

    setChat((prev) => [...prev, aiMessage]);

  } catch (error) {

    console.log("ERROR:", error);
    console.log("Response:", error.response);
    console.log("Data:", error.response?.data);
    alert(JSON.stringify(error.response?.data || error.message));

  }

  setLoading(false);
};

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white flex flex-col items-center p-6 overflow-hidden">

      <div className="absolute w-[500px] h-[500px] bg-cyan-500 opacity-20 blur-[150px] rounded-full top-[-100px] left-[-100px]" />

      <div className="absolute w-[400px] h-[400px] bg-pink-500 opacity-20 blur-[150px] rounded-full bottom-[-100px] right-[-100px]" />

      <h1 className="text-6xl font-bold mb-2 bg-gradient-to-r from-cyan-300 to-pink-300 bg-clip-text text-transparent">
        SoulSync AI
      </h1>

      <p className="text-slate-300 mb-6 text-lg">
        Your safe emotional space ✨
      </p>

      <div className="w-full max-w-5xl h-[72vh]
      backdrop-blur-xl
      bg-white/10
      border border-white/20
      rounded-3xl
      p-6
      overflow-y-auto
      shadow-2xl">

        {chat.length === 0 && (

          <div className="h-full flex items-center justify-center text-center text-slate-300">

            <div>

              <h2 className="text-3xl font-semibold mb-4">
                How are you feeling today?
              </h2>

              <p className="text-lg opacity-80">
                You can talk freely here without judgment.
              </p>

            </div>

          </div>
        )}

        {chat.map((msg, index) => (

          <div
            key={index}
            className={`mb-5 flex ${
              msg.sender === "You"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-[75%]
              px-5
              py-4
              rounded-3xl
              shadow-lg
              ${
                msg.sender === "You"
                  ? "bg-cyan-400 text-black"
                  : "bg-white/10 backdrop-blur-lg border border-white/10"
              }`}
            >

              <p className="font-bold mb-2 text-sm opacity-80">
                {msg.sender}
              </p>

              <p className="text-lg leading-relaxed">
                {msg.text}
              </p>

            </div>

          </div>

        ))}

        {loading && (

          <div className="flex justify-start">

            <div className="bg-white/10 backdrop-blur-lg border border-white/10 px-5 py-4 rounded-3xl">

              <p className="font-bold text-sm mb-2 opacity-80">
                SoulSync
              </p>

              <div className="flex gap-2">

                <div className="w-3 h-3 bg-cyan-300 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-pink-300 rounded-full animate-bounce delay-100"></div>
                <div className="w-3 h-3 bg-purple-300 rounded-full animate-bounce delay-200"></div>

              </div>

            </div>

          </div>
        )}

      </div>

      <div className="w-full max-w-5xl flex mt-6 gap-4">

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share what's on your mind..."
          className="flex-1
          p-5
          rounded-2xl
          bg-white/10
          backdrop-blur-lg
          border border-white/20
          outline-none
          text-white
          placeholder:text-slate-300"
        />

        <button
          onClick={sendMessage}
          className="px-8
          rounded-2xl
          bg-gradient-to-r
          from-cyan-400
          to-pink-400
          text-black
          font-bold
          hover:scale-105
          transition-all
          duration-300
          shadow-xl"
        >
          Send
        </button>

      </div>

    </div>
  );
}

export default App;