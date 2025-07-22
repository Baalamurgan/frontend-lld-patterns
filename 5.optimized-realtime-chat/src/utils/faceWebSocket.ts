type Listener = (event: { data: string }) => void;

export class FakeWebSocket {
  listeners: Listener[] = [];

  constructor() {
    setInterval(() => {
      const messages = [
        "Hello from server 👋",
        "This is a fake WebSocket",
        "Simulating real-time 🔄",
        "How's the project going?",
      ];
      const msg = messages[Math.floor(Math.random() * messages.length)];
      this.listeners.forEach((cb) => cb({ data: msg }));
    }, 4000);
  }

  send = (message: string) => {
    console.log("[FakeWS] Sent:", message);
  };

  addEventListener = (type: "message", callback: Listener) => {
    if (type === "message") this.listeners.push(callback);
  };

  removeEventListener = (type: "message", callback: Listener) => {
    if (type === "message") {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    }
  };
}
