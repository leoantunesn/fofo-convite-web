import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useCallback } from "react";
import hornet from "@/assets/hornet.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Quer sair comigo?" },
      { name: "description", content: "Um convite fofo e especial" },
      { property: "og:title", content: "Quer sair comigo?" },
      { property: "og:description", content: "Um convite fofo e especial" },
    ],
  }),
  component: Index,
});

const noMessages = [
  "Não 😅",
  "Eita, quase! 😜",
  "Tente de novo! 🙈",
  "Sou rápido demais! 🏃",
  "Não vai conseguir! 😏",
  "Quase! 🤭",
  "Persistente, hein? 😼",
  "Haha, errou! 😂",
  "Só aceita o sim! 💕",
  "Desiste não! 😘",
  "Tá difícil? 😎",
  "Vai, clica no sim! 🥺",
];

function Index() {
  const [showYes, setShowYes] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNoButton = useCallback(() => {
    const btn = noButtonRef.current;
    const container = containerRef.current;
    if (!btn || !container) return;

    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    const maxX = containerRect.width - btnRect.width - 16;
    const maxY = containerRect.height - btnRect.height - 16;

    const randomX = Math.max(8, Math.random() * maxX);
    const randomY = Math.max(8, Math.random() * maxY);

    btn.style.position = "absolute";
    btn.style.left = `${randomX}px`;
    btn.style.top = `${randomY}px`;

    setAttempts((prev) => prev + 1);
  }, []);

  if (showYes) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md w-full text-center animate-bounce-slow">
          <div className="rounded-3xl border-2 border-primary/20 bg-card p-8 shadow-xl">
            <img
              src={cuteBunny}
              alt="Coelhinho fofo feliz"
              width={200}
              height={200}
              className="mx-auto mb-6"
            />
            <h1 className="text-3xl font-bold text-primary mb-4">
              Yay! 🎉
            </h1>
            <p className="text-lg text-card-foreground">
              Mal posso esperar pela nossa saída! Vai ser incrível! 💕
            </p>
            <div className="mt-6 text-4xl">💖✨🌸</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center bg-background px-4 overflow-hidden"
    >
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="absolute top-[10%] left-[10%] text-2xl animate-float opacity-60">💖</span>
        <span className="absolute top-[20%] right-[15%] text-xl animate-float opacity-40" style={{ animationDelay: "1s" }}>✨</span>
        <span className="absolute top-[60%] left-[5%] text-lg animate-float opacity-50" style={{ animationDelay: "2s" }}>🌸</span>
        <span className="absolute bottom-[20%] right-[10%] text-2xl animate-float opacity-40" style={{ animationDelay: "0.5s" }}>💕</span>
        <span className="absolute top-[40%] right-[5%] text-xl animate-float opacity-30" style={{ animationDelay: "1.5s" }}>💗</span>
        <span className="absolute bottom-[30%] left-[15%] text-lg animate-float opacity-50" style={{ animationDelay: "2.5s" }}>✨</span>
      </div>

      <div className="max-w-md w-full">
        <div className="rounded-3xl border-2 border-primary/20 bg-card p-8 shadow-2xl text-center">
          <img
            src={cuteBunny}
            alt="Coelhinho fofo com balão de coração"
            width={180}
            height={180}
            className="mx-auto mb-6 drop-shadow-lg"
          />

          <h1 className="text-2xl font-bold text-foreground mb-8 leading-relaxed">
            Quer sair cmg na sua próxima folga?
          </h1>

          <div className="flex items-center justify-center gap-4 relative min-h-[80px]">
            <button
              onClick={() => setShowYes(true)}
              className="rounded-full bg-primary px-8 py-3 text-lg font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
            >
              Sim! 💕
            </button>

            <button
              ref={noButtonRef}
              onClick={moveNoButton}
              onMouseEnter={moveNoButton}
              className="rounded-full bg-muted px-6 py-3 text-lg font-medium text-muted-foreground border border-border shadow-md transition-transform whitespace-nowrap"
            >
              {noMessages[attempts % noMessages.length]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
