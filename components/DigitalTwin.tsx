"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Message = { role: "user" | "assistant"; content: string };

const suggestions = [
  "What does Sandeep do at Finastra?",
  "Tell me about the AI/ML work",
  "What was HSBC Kinetic?",
  "How can I contact Sandeep?",
];

const greeting: Message = {
  role: "assistant",
  content:
    "Hi — I'm Sandeep's Digital Twin. Ask me anything about his 14+ years in banking, payments and AI/ML engineering leadership.",
};

export function DigitalTwin() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || streaming) return;

    const history: Message[] = [...messages, { role: "user", content: question }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // exclude the canned greeting from the model context
        body: JSON.stringify({ messages: history.slice(1) }),
      });

      if (!res.ok || !res.body) {
        const detail = await res.json().catch(() => null);
        throw new Error(detail?.error ?? `Request failed (${res.status})`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: answer }]);
      }
      if (!answer) {
        setMessages([
          ...history,
          {
            role: "assistant",
            content:
              "I didn't get a response that time — the free model may be busy. Please try again.",
          },
        ]);
      }
    } catch (err) {
      setMessages([
        ...history,
        {
          role: "assistant",
          content: `Something went wrong: ${
            err instanceof Error ? err.message : "unknown error"
          }. Please try again.`,
        },
      ]);
    } finally {
      setStreaming(false);
    }
  }

  return (
    <>
      {/* launcher */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4 }}
        onClick={() => setOpen((v) => !v)}
        aria-label="Chat with Sandeep's Digital Twin"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full border border-neon/40 bg-void/90 backdrop-blur-xl pl-4 pr-5 py-3 hover:shadow-[0_0_36px_rgba(34,211,238,0.3)] transition-shadow"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-neon opacity-60 animate-ping" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-neon" />
        </span>
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-neon">
          {open ? "Close" : "Digital Twin"}
        </span>
      </motion.button>

      {/* panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-22 right-6 z-50 flex h-[min(600px,calc(100dvh-8rem))] w-[min(400px,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-void/95 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
          >
            {/* header */}
            <div className="flex items-center gap-3 border-b border-white/8 px-5 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-neon/30 to-pulse/30 border border-neon/40 font-display font-bold text-neon">
                SK
              </div>
              <div>
                <p className="font-display text-sm font-bold text-white">
                  Digital Twin
                </p>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">
                  AI {"//"} career knowledge base
                </p>
              </div>
            </div>

            {/* messages */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                      m.role === "user"
                        ? "bg-neon/15 border border-neon/30 text-white rounded-br-sm"
                        : "bg-white/[0.05] border border-white/10 text-white/80 rounded-bl-sm"
                    }`}
                  >
                    {m.content ||
                      (streaming && i === messages.length - 1 ? (
                        <span className="inline-flex gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-neon animate-bounce [animation-delay:0ms]" />
                          <span className="h-1.5 w-1.5 rounded-full bg-neon animate-bounce [animation-delay:150ms]" />
                          <span className="h-1.5 w-1.5 rounded-full bg-neon animate-bounce [animation-delay:300ms]" />
                        </span>
                      ) : (
                        ""
                      ))}
                  </div>
                </div>
              ))}

              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-white/12 px-3 py-1.5 font-mono text-[11px] text-white/60 hover:border-neon/50 hover:text-neon transition-colors text-left"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-white/8 px-4 py-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Sandeep's career..."
                className="flex-1 rounded-full bg-white/[0.05] border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-neon/50 transition-colors"
              />
              <button
                type="submit"
                disabled={streaming || !input.trim()}
                className="rounded-full bg-neon/15 border border-neon/40 px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-neon disabled:opacity-40 hover:bg-neon/25 transition-colors"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
