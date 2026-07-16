"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { v4 as uuidv4 } from "uuid";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import Typewriter from "./Typewriter";
import ParticleBackground, {
  ParticleBackgroundHandle,
} from "./ParticleBackground";
import { useIsMobile } from "@/hooks/useIsMobile";

interface Message {
  id: string;
  text: string;
  sender: "user" | "twin";
}

const API_URL =
  "https://ai-digital-twin-301513903198.northamerica-northeast2.run.app";

export default function HeroSection() {
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionInitialized, setSessionInitialized] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatFeedRef = useRef<HTMLDivElement>(null);
  const particleRef = useRef<ParticleBackgroundHandle>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const desktopChatRef = useRef<HTMLDivElement>(null);
  const bootOverlayRef = useRef<HTMLDivElement>(null);
  const bootTextRef = useRef<HTMLSpanElement>(null);
  const isMobile = useIsMobile();
  const [isBooting, setIsBooting] = useState(true);

  const handleTechStackClick = useCallback(() => {
    if (particleRef.current) {
      particleRef.current.moveParticles();
    }
  }, []);

  useEffect(() => {
    const generatedSessionId = uuidv4();
    setSessionId(generatedSessionId);

    const initializeSession = async () => {
      try {
        const response = await fetch(`${API_URL}/init-session`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ session_id: generatedSessionId }),
        });

        if (!response.ok) {
          throw new Error(
            `Failed to initialize session: ${response.statusText}`,
          );
        }
        setSessionInitialized(true);
        console.log(
          "Session initialized successfully with ID:",
          generatedSessionId,
        );
      } catch (error) {
        console.error("Error initializing session:", error);
      }
    };

    initializeSession();

    setChatHistory([
      {
        id: uuidv4(),
        text: "¡Bienvenido! Soy el gemelo digital de Daniel, impulsado por arquitectura RAG para proporcionar información real y precisa sobre su trayectoria profesional. Estoy aquí para resolver tus dudas sobre sus herramientas, experiencia o proyectos anteriores. ¿Qué te gustaría saber?",
        sender: "twin",
      },
    ]);
  }, []);

  useEffect(() => {
    if (chatFeedRef.current) {
      chatFeedRef.current.scrollTop = chatFeedRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Lock body scroll when popup is open on mobile
  useEffect(() => {
    if (isMobile && isChatOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, isChatOpen]);

  // ─── GSAP Boot Animation ──────────────────────────────────────────
  useEffect(() => {
    gsap.registerPlugin(ScrambleTextPlugin);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Scale-in the desktop chat container
      if (desktopChatRef.current) {
        tl.fromTo(
          desktopChatRef.current,
          { scaleY: 0, opacity: 0, transformOrigin: "top center" },
          { scaleY: 1, opacity: 1, duration: 0.7 },
        );
      }

      // 2. Scanline pulse
      const scanline = desktopChatRef.current?.querySelector(".scanline");
      if (scanline) {
        tl.to(
          scanline,
          { opacity: 0.8, duration: 0.3 },
          "-=0.4",
        );
        tl.to(scanline, { opacity: 0.15, duration: 0.5 });
      }

      // 3. Scramble the boot text
      if (bootTextRef.current) {
        tl.to(
          bootTextRef.current,
          {
            duration: 2.2,
            scrambleText: {
              text: "BIENVENIDO — GEMELO_DIGITAL v3.1 LISTO",
              chars:
                "░▒▓█ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789▲►◄",
              speed: 0.6,
            },
            ease: "power2.inOut",
          },
          "-=0.3",
        );
      }

      // 4. Fade out the boot overlay to reveal the chat
      if (bootOverlayRef.current) {
        tl.to(
          bootOverlayRef.current,
          { opacity: 0, duration: 0.4, onComplete: () => setIsBooting(false) },
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (particleRef.current) {
      particleRef.current.moveParticles();
    }
    if (!sessionInitialized) {
      console.log("Session not initialized yet. Cannot send message.");
      return;
    }

    const trimmed = inputValue.trim();
    if (!trimmed) {
      return;
    }

    const userMessage: Message = {
      id: uuidv4(),
      text: trimmed,
      sender: "user",
    };

    setChatHistory((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Session-ID": sessionId,
        },
        body: JSON.stringify({ message: trimmed }),
      });

      setInputValue("");

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.status === "success" && data.data) {
        const twinMessage: Message = {
          id: uuidv4(),
          text: data.data,
          sender: "twin",
        };
        setChatHistory((prev) => [...prev, twinMessage]);
      } else {
        console.error("Unexpected response format:", data);
        const errorMessage: Message = {
          id: uuidv4(),
          text: "Recibí una respuesta inesperada del servidor. Intenta de nuevo.",
          sender: "twin",
        };
        setChatHistory((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: uuidv4(),
        text: "Lo siento, tengo problemas para conectarme con mi lógica central. Intenta de nuevo más tarde.",
        sender: "twin",
      };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  }, [inputValue, sessionId, sessionInitialized]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // ─── GSAP Input Interaction ──────────────────────────────────────
  const handleInputFocus = useCallback(() => {
    // Jitter effect on the chat container
    if (desktopChatRef.current) {
      gsap.to(desktopChatRef.current, {
        x: "+=4",
        duration: 0.04,
        repeat: 3,
        yoyo: true,
        ease: "power1.inOut",
        onComplete: () => {
          gsap.set(desktopChatRef.current, { x: 0 });
        },
      });

      // Smooth border glow transition
      gsap.to(desktopChatRef.current, {
        borderColor: "#6ddd81",
        boxShadow:
          "rgba(0, 0, 0, 0.5) 0px 0px 40px, rgba(109, 221, 129, 0.35) 0px 0px 25px",
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, []);

  const handleInputBlur = useCallback(() => {
    if (desktopChatRef.current) {
      gsap.to(desktopChatRef.current, {
        borderColor: "rgba(255, 255, 255, 0.15)",
        boxShadow:
          "rgba(0, 0, 0, 0.5) 0px 0px 40px, rgba(173, 198, 255, 0.1) 0px 0px 20px",
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, []);

  const closeChat = useCallback(() => {
    setIsChatOpen(false);
  }, []);

  // ─── Shared Chat Content ─────────────────────────────────────────────
  const renderChatContent = (isPopup: boolean) => (
    <>
      {/* Scanline */}
      <div className="scanline"></div>

      {/* Header */}
      <div
        className="px-4 py-3 md:px-6 md:py-4 border-b border-border-glass flex items-center justify-between shrink-0"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          color: "#e0e0e0",
        }}
      >
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <div className="w-3 h-3 rounded-full bg-secondary shadow-[0_0_8px_rgba(109,221,129,0.8)] shrink-0"></div>
          <span className="font-label-code text-xs md:text-label-code text-on-surface-variant truncate">
            DANIEL BAZÁN: ACTIVO
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {isPopup ? (
            <button
              onClick={closeChat}
              className="w-7 h-7 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Cerrar chat"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          ) : (
            <>
              <div className="w-2 h-2 rounded-full bg-border-glass"></div>
              <div className="w-2 h-2 rounded-full bg-border-glass"></div>
            </>
          )}
        </div>
      </div>

      {/* Chat Feed */}
      <div
        ref={chatFeedRef}
        className={`overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 font-body-md text-sm md:text-label-code ${
          isPopup ? "flex-1" : "h-72 md:h-96"
        }`}
        style={isPopup ? { overscrollBehavior: "contain" } : undefined}
      >
        {chatHistory.map((message) => (
          <div
            key={message.id}
            className={`flex gap-2 md:gap-4 ${
              message.sender === "user" ? "justify-end" : ""
            }`}
          >
            {message.sender === "twin" && (
              <div className="w-8 h-8 rounded bg-primary-container/20 border border-primary flex items-center justify-center shrink-0">
                <span
                  className="material-symbols-outlined text-primary text-sm"
                  style={{ color: "#e9e47b" }}
                >
                  memory
                </span>
              </div>
            )}
            <div
              className={`p-3 md:p-4 rounded-lg border max-w-[85%] md:max-w-[80%] ${
                message.sender === "user"
                  ? "bg-primary/10 border-primary/30 text-right"
                  : "bg-surface-container-high/40 border-border-glass"
              }`}
              style={
                message.sender === "user"
                  ? {
                      backgroundColor: "#001735",
                      borderColor: "#003471",
                      color: "#e0e0e0",
                    }
                  : {
                      backgroundColor: "#003f8a",
                      borderColor: "#005cc5",
                      color: "#e0e0e0",
                    }
              }
            >
              {message.text}
            </div>
            {message.sender === "user" && (
              <div className="w-8 h-8 rounded bg-secondary-container/20 border border-secondary flex items-center justify-center shrink-0">
                <span
                  className="material-symbols-outlined text-secondary text-sm"
                  style={{ color: "#ff9da4" }}
                >
                  person
                </span>
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-2 md:gap-4">
            <div className="w-8 h-8 rounded bg-primary-container/20 border border-primary flex items-center justify-center shrink-0">
              <span
                className="material-symbols-outlined text-primary text-sm"
                style={{ color: "#e9e47b" }}
              >
                memory
              </span>
            </div>
            <div
              className="bg-surface-container-high/40 p-3 md:p-4 rounded-lg border border-border-glass max-w-[85%] md:max-w-[80%]"
              style={{
                backgroundColor: "#003f8a",
                borderColor: "#005cc5",
                color: "#e0e0e0",
              }}
            >
              <span className="text-primary-fixed-dim">EJECUTANDO_CONSULTA...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div
        className="p-3 md:p-4 border-t border-border-glass shrink-0"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          paddingBottom: isPopup
            ? "calc(0.75rem + env(safe-area-inset-bottom, 0px))"
            : undefined,
        }}
      >
        {/* Quick-action chips */}
        <div className="flex flex-wrap gap-2 mb-3 md:mb-4 font-label-code text-[10px]">
          <button
            onClick={handleTechStackClick}
            className="px-2.5 py-2 md:px-3 md:py-1.5 rounded border border-primary/30 bg-primary/5 text-primary hover:bg-primary/20 hover:border-primary transition-all duration-300"
          >
            MI_TECH_STACK
          </button>
          <button
            onClick={handleTechStackClick}
            className="px-2.5 py-2 md:px-3 md:py-1.5 rounded border border-secondary/30 bg-secondary/5 text-secondary hover:bg-secondary/20 hover:border-secondary transition-all duration-300"
          >
            PROYECTOS_RECIENTES
          </button>
          <button className="px-2.5 py-2 md:px-3 md:py-1.5 rounded border border-tertiary/30 bg-tertiary/5 text-tertiary hover:bg-tertiary/20 hover:border-tertiary transition-all duration-300">
            COMO_LIDERAS_EQUIPOS?
          </button>
        </div>

        {/* Input row */}
        <div className="relative">
          <input
            ref={inputRef}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            className="w-full bg-void-black border border-border-glass rounded px-4 py-3 font-label-code text-primary focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
            placeholder="INGRESA_UN_COMANDO..."
            style={{
              backgroundColor: "rgb(255, 255, 255)",
              color: "rgb(0, 36, 81)",
              borderColor: "rgb(255, 255, 255)",
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 2px 4px inset, rgba(173, 198, 255, 0.2) 0px 0px 15px",
            }}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={loading}
          />
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-white transition-colors"
            style={{ color: "#002451" }}
            onClick={handleSendMessage}
            disabled={loading}
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>
    </>
  );

  // ─── Desktop Inline Card ─────────────────────────────────────────────
  if (!isMobile) {
    return (
      <section className="relative min-h-[85vh] md:min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-margin-mobile md:px-margin-desktop py-8 md:py-0">
        <div className="absolute inset-0 z-0">
          <ParticleBackground ref={particleRef} />
        </div>

        {/* Background Mosaic */}
        <div className="absolute inset-0 z-1 opacity-20 pointer-events-none mosaic-bg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-full p-4 md:p-8 scale-110">
            <div
              className="bg-cover bg-center rounded-xl border border-border-glass shadow-2xl bg-stellar-white"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAbdZ7IStlvnhsc2-X6xSUwdcxlzSbmNlVNJPf4I1rXyFs0x01PIRq_Kxkrk5O3oDSvuIx8ZJq52gBLMQgUBOnJuS-EcbwmOtt-gef6Xj0BISQjztuvJN3tcq2BSBTWU4PfHYmw_XORZNb9bQcV8-A0osnCmzk7RzmBFClhXloiFIWq4sitaQNQp21AKgCmD_kJtFfBVrixdeKysk8oKUzygObEMSmQPLNV42HvlJZlflrKNl8EJ6LsT1ozYphiv7ssRCj_8oLY')",
              }}
            ></div>
            <div
              className="bg-cover bg-center rounded-xl border border-border-glass opacity-60 bg-stellar-white"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCXsyyc40NbmHQmFe9Eqzyupv30dmAx2-KluuM02_QHdACFb-HMENtUOrXXQGYl4-hkZi3ED9rxkdnX5CTIsemRYvhfOH2uT2j4M0bh8vI88IKbxKgHJ1R-tEE5JuAR1Sm4MkR-EqE3pWa53nFV11lwQjwQnVD1VR7PtziLTxZRs2yLQeTBn7pQ1oPIr-LINkzRb8xa5ZouWGUAMmtCq6y-LrcnVFKqHj3vsj0_mnrn1eVBQetDpYs4eLGfcsRW49RQjFsksFiw')",
              }}
            ></div>
            <div
              className="bg-cover bg-center rounded-xl border border-border-glass opacity-60 bg-stellar-white"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuApvslf8pL1EVrriuBZ4tMGDUz-h7-Ngjtrm3kmUZ0wgyb5bZt5EIz3FD7FuwQPuhYg7pfFaP4ZYl4lLS7l9wRb_vcIkh-f0grXKU_iQVSKVXOfpo-FfliKpiY9EMqSbSDECN_ffXKnZYWucWkjjEY-FM_EDeimLw4eQkFOuuNHK92nzyddgglRyLd2VeosTiK_La_hfx2PNcFLKHicqjIi-eVbSwcNFv9UNej84HyLOMlECjPmX04tEm5msOjwEPZa3B7_Fukz')",
              }}
            ></div>
            <div
              className="bg-cover bg-center rounded-xl border border-border-glass opacity-60 bg-stellar-white"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBU_kcqB6heU5vje-CfhyWj66PsARJBK45nXIvZmzeKQYVRfdQyQisNqo1VUeYEoNqnbPjdel981U26CY5Cltg_I5pUKg76cqtsPH1AIYC7mJYqkB3_IOHDYiYqTDN-wb5vPUrUK8Q2l7ZliIBFUsPm2pCJC2I70OKRaJUGLdICFlCPAUsV5U0ksw51-Li8z8NwfNDWZhnNg-3eV0ewrIelcKNQonAd-MDm9xHuSQOl8NbcMoEhm_BXKMOAwke20JkxUtC1QnkQ')",
              }}
            ></div>
          </div>
        </div>

        <div className="relative z-20 text-center mb-8 md:mb-12 px-2 w-full">
          <h1 className="font-display-lg text-2xl sm:text-3xl md:text-5xl mb-3 md:mb-4 tracking-tighter leading-tight">
            <Typewriter
              parts={[
                "¿Tienes un minuto? ",
                1000,
                "En esto hemos estado trabajando.",
              ]}
            />
          </h1>
          <p className="font-label-code text-xs sm:text-sm md:text-xl text-primary uppercase tracking-widest max-w-xs sm:max-w-none mx-auto">
            ¿PREGUNTAS RÁPIDAS? HABLA CON MI GEMELO DIGITAL.
          </p>
        </div>

        {/* Chat Interface — inline */}
        <div
          ref={desktopChatRef}
          className="relative z-30 w-full max-w-2xl glass-panel rounded-xl shadow-2xl overflow-hidden"
          style={{
            backgroundColor: "rgba(0, 36, 81, 0.95)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(24px)",
            boxShadow:
              "rgba(0, 0, 0, 0.5) 0px 0px 40px, rgba(173, 198, 255, 0.1) 0px 0px 20px",
          }}
        >
          {/* Boot Overlay */}
          {isBooting && (
            <div
              ref={bootOverlayRef}
              className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-4"
              style={{
                backgroundColor: "rgba(0, 36, 81, 0.97)",
                backdropFilter: "blur(4px)",
              }}
            >
              <div className="flex items-center gap-3 font-label-code">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: "#6ddd81",
                    boxShadow: "0 0 8px rgba(109,221,129,0.8)",
                    animation: "pulse 1s ease-in-out infinite",
                  }}
                ></span>
                <span
                  ref={bootTextRef}
                  className="text-lg tracking-widest uppercase"
                  style={{ color: "#adc6ff" }}
                >
                  INICIALIZANDO_SECUENCIA...
                </span>
              </div>
              <div
                className="h-px w-48"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #6ddd81, transparent)",
                  animation: "pulse 1.2s ease-in-out infinite",
                }}
              ></div>
            </div>
          )}
          {renderChatContent(false)}
        </div>
      </section>
    );
  }

  // ─── Mobile: Hero + FAB + Popup ──────────────────────────────────────
  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-margin-mobile md:px-margin-desktop py-8 md:py-0">
      <div className="absolute inset-0 z-0">
        <ParticleBackground ref={particleRef} />
      </div>

      {/* Background Mosaic */}
      <div className="absolute inset-0 z-1 opacity-20 pointer-events-none mosaic-bg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-full p-4 md:p-8 scale-110">
          <div
            className="bg-cover bg-center rounded-xl border border-border-glass shadow-2xl bg-stellar-white"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAbdZ7IStlvnhsc2-X6xSUwdcxlzSbmNlVNJPf4I1rXyFs0x01PIRq_Kxkrk5O3oDSvuIx8ZJq52gBLMQgUBOnJuS-EcbwmOtt-gef6Xj0BISQjztuvJN3tcq2BSBTWU4PfHYmw_XORZNb9bQcV8-A0osnCmzk7RzmBFClhXloiFIWq4sitaQNQp21AKgCmD_kJtFfBVrixdeKysk8oKUzygObEMSmQPLNV42HvlJZlflrKNl8EJ6LsT1ozYphiv7ssRCj_8oLY')",
            }}
          ></div>
          <div
            className="bg-cover bg-center rounded-xl border border-border-glass opacity-60 bg-stellar-white"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCXsyyc40NbmHQmFe9Eqzyupv30dmAx2-KluuM02_QHdACFb-HMENtUOrXXQGYl4-hkZi3ED9rxkdnX5CTIsemRYvhfOH2uT2j4M0bh8vI88IKbxKgHJ1R-tEE5JuAR1Sm4MkR-EqE3pWa53nFV11lwQjwQnVD1VR7PtziLTxZRs2yLQeTBn7pQ1oPIr-LINkzRb8xa5ZouWGUAMmtCq6y-LrcnVFKqHj3vsj0_mnrn1eVBQetDpYs4eLGfcsRW49RQjFsksFiw')",
            }}
          ></div>
          <div
            className="bg-cover bg-center rounded-xl border border-border-glass opacity-60 bg-stellar-white"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuApvslf8pL1EVrriuBZ4tMGDUz-h7-Ngjtrm3kmUZ0wgyb5bZt5EIz3FD7FuwQPuhYg7pfFaP4ZYl4lLS7l9wRb_vcIkh-f0grXKU_iQVSKVXOfpo-FfliKpiY9EMqSbSDECN_ffXKnZYWucWkjjEY-FM_EDeimLw4eQkFOuuNHK92nzyddgglRyLd2VeosTiK_La_hfx2PNcFLKHicqjIi-eVbSwcNFv9UNej84HyLOMlECjPmX04tEm5msOjwEPZa3B7_Fukz')",
            }}
          ></div>
          <div
            className="bg-cover bg-center rounded-xl border border-border-glass opacity-60 bg-stellar-white"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBU_kcqB6heU5vje-CfhyWj66PsARJBK45nXIvZmzeKQYVRfdQyQisNqo1VUeYEoNqnbPjdel981U26CY5Cltg_I5pUKg76cqtsPH1AIYC7mJYqkB3_IOHDYiYqTDN-wb5vPUrUK8Q2l7ZliIBFUsPm2pCJC2I70OKRaJUGLdICFlCPAUsV5U0ksw51-Li8z8NwfNDWZhnNg-3eV0ewrIelcKNQonAd-MDm9xHuSQOl8NbcMoEhm_BXKMOAwke20JkxUtC1QnkQ')",
            }}
          ></div>
        </div>
      </div>

      <div className="relative z-20 text-center mb-8 md:mb-12 px-2 w-full">
        <h1 className="font-display-lg text-2xl sm:text-3xl md:text-5xl mb-3 md:mb-4 tracking-tighter leading-tight">
          <Typewriter
            parts={[
              "¿Un minuto? ",
              1000,
              "Esto es en lo que he estado trabajando.",
            ]}
          />
        </h1>
        <p className="font-label-code text-xs sm:text-sm md:text-xl text-primary uppercase tracking-widest max-w-xs sm:max-w-none mx-auto">
          ¿PREGUNTAS RÁPIDAS? HABLA CON MI GEMELO DIGITAL.
        </p>
      </div>

      {/* ─── Floating Action Button ─────────────────────────────────── */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="relative z-30 inline-flex items-center gap-3 px-6 py-4 rounded-2xl font-label-code text-sm font-bold transition-all duration-300 active:scale-95 shadow-2xl"
        style={{
          backgroundColor: "#003f8a",
          color: "#e0e0e0",
          border: "1px solid rgba(173, 198, 255, 0.3)",
          boxShadow:
            "rgba(0, 0, 0, 0.4) 0px 8px 32px, rgba(173, 198, 255, 0.15) 0px 0px 20px",
        }}
      >
        <span
          className="material-symbols-outlined text-lg"
          style={{ color: "#6ddd81" }}
        >
          smart_toy
        </span>
        <span>HABLA CON MI GEMELO DIGITAL</span>
        <span className="material-symbols-outlined text-lg text-primary">
          arrow_upward
        </span>
      </button>

      {/* ─── Chat Popup Overlay ──────────────────────────────────────── */}
      {isChatOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex flex-col animate-chat-popup-in"
            style={{
              backgroundColor: "rgba(0, 36, 81, 0.98)",
              height: "100dvh",
            }}
          >
            {/* Close handle bar (visual cue) */}
            <div className="flex justify-center pt-2 pb-1 shrink-0">
              <div className="w-10 h-1 rounded-full bg-white/20"></div>
            </div>

            {/* Chat content fills the rest */}
            <div
              className="flex flex-col flex-1 overflow-hidden rounded-t-2xl"
              style={{
                backgroundColor: "rgba(0, 36, 81, 0.95)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }}
            >
              {renderChatContent(true)}
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}
