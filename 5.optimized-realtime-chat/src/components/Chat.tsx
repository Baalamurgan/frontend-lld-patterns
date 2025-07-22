"use client";

import { useEffect, useMemo, useRef, useState, useCallback, memo } from "react";
import { FakeWebSocket } from "../utils/faceWebSocket";

type Message = {
  id: number;
  sender: "me" | "other";
  text: string;
  timestamp: number;
};

export const ChatWithFakeWS = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const wsRef = useRef<FakeWebSocket | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ws = new FakeWebSocket();
    wsRef.current = ws;

    const handleMessage = (event: { data: string }) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "other",
          text: event.data,
          timestamp: Date.now(),
        },
      ]);
    };

    ws.addEventListener("message", handleMessage);

    return () => {
      ws.removeEventListener("message", handleMessage);
    };
  }, []);

  const myMessages = useMemo(
    () => messages.filter((i) => i.sender === "me"),
    [messages]
  );

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [myMessages.length]);

  const handleSend = useCallback(() => {
    if (!input.trim() || !wsRef.current) return;
    const newMsg: Message = {
      id: Date.now(),
      sender: "me",
      text: input,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMsg]);
    wsRef.current.send(input);
    setInput("");
  }, [input]);

  return (
    <div
      style={{
        maxWidth: 400,
        height: 500,
        border: "1px solid #ccc",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        ref={containerRef}
        role="log"
        aria-live="polite"
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 8,
          backgroundColor: "#f9f9f9",
        }}
      >
        <div role="list">
          {messages.map((msg) => (
            <MessageItem key={msg.id} msg={msg} />
          ))}
        </div>
      </div>

      <div style={{ display: "flex", borderTop: "1px solid #ccc" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          aria-label="Type a message"
          style={{ flex: 1, padding: 8, border: "none", outline: "none" }}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} style={{ padding: "8px 16px" }}>
          Send
        </button>
      </div>
    </div>
  );
};

const MessageItem = memo(({ msg }: { msg: Message }) => {
  console.log("MessageItem re-render:", msg.id, msg.text);
  return (
    <div
      role="listitem"
      style={{
        display: "flex",
        justifyContent: msg.sender === "me" ? "flex-end" : "flex-start",
        marginBottom: 4,
      }}
    >
      <div
        style={{
          padding: "8px 12px",
          borderRadius: 16,
          backgroundColor: msg.sender === "me" ? "#007bff" : "#e4e6eb",
          color: msg.sender === "me" ? "white" : "black",
          maxWidth: "70%",
        }}
      >
        {msg.text}
      </div>
    </div>
  );
});
