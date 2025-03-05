import { useState, useEffect } from "react";

export default function Ollama() {
    const [input, setInput] = useState("");
    const [responses, setResponses] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(false);
  
    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && input.trim() !== "") {
        event.preventDefault();

        setResponses((prev) => [...prev, { who: 'Me', text: input }]);

        const payload = [...responses, { who: 'Me', text: input }].map(x => `${x.who}: ${x.text}\n`).join(' ');

        setLoading(true);
        try {
          const response = await fetch("http://localhost:4001/ollama", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: payload })
          });
  
          if (!response.ok) {
            throw new Error("Failed to fetch response from Ollama");
          }
  
          const data = await response.json();

          setResponses((prev) => [...prev, { who: 'AI', text: data.response }]);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
          setInput("");
        }
      }
    };
  
    return (
      <div className="p-4 max-w-md mx-auto">
        <ul className="mt-4 space-y-2">
          {responses.map((response, index) => {

            let classes = '';
            classes += response.who === 'Me' ? 'bg-black text-blue' : '';

            if (response.who === 'AI') {
                return <li key={index} className="p-2 border rounded text-left px-3">
                    {response.who}: {response.text}
                </li>
            }
            else {
                return (
                    <li key={index} className="p-2 border rounded bg-blue-500 text-white text-right px-3 my-2">
                        {response.who}: {response.text}
                    </li>
                )
            }

            })
          }
        </ul>
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Type your message and press Enter"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
      </div>
    );
};

type ChatMessage = {
  who: 'AI' | 'Me';
  text: string;
};