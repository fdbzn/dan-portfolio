"use client";
import { useState } from "react";

export default function HeroSection() {
  const [inputValue, setInputValue] = useState("");

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      console.log("Command received:", inputValue);
      setInputValue("");
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-margin-mobile md:px-margin-desktop">
      {/* Background Mosaic */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mosaic-bg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-full p-8 scale-110">
          <div
            className="bg-cover bg-center rounded-xl border border-border-glass shadow-2xl bg-stellar-white"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCqyzpAiY78mEi7HPmpnsuaf4src5Gbxf4bA6cya3M6wnWdbEt9Xw1uJgFXSMxX1QQD2LNJg2pbBX9PuS9RUce2E58Py9upeZmj5lFZmeRXIqiM9J8hHsHelhYz0DpuBEfI1bEh2vlNqrJ48dAvoYxq0KkcK2l0l68JJX95GOja12TDRud6nuUiigMp2yjsXjxxE1zKPS7EDoVSgH0o9LDY1sL7uiVRqZZLepTpArfyGG46BIcTmqmqe26RSe7GUkhbnmNXVObw')",
            }}
          ></div>
          <div
            className="bg-cover bg-center rounded-xl border border-border-glass opacity-60 bg-stellar-white"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9DoESU36X5gq4_FqE-wtlNNgvV9PI-tEwEb9A9FJGbwF5wdgdPFxHdQDPrcw9QC71BAw0U0q6B3h5_PbA3fv49gomGfQm9gFJTbj4r711L27Us4Y1UFG3U5LQV0Fu8vbWpZq42AAO1V7LloBpD94bMCt13ibMlm-R22pUhuy5AqIh9oC5fkmKQrniNnqndmjATuQ7ymSv4vqdfVTWoPnv60_Doe3WRgvcYoij8hD7g6zVLE0awvFOeYEvUNhGyjy8OV3UmAIz')",
            }}
          ></div>
          <div
            className="bg-cover bg-center rounded-xl border border-border-glass opacity-60 bg-stellar-white"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD0VsvRe7EfOQ9j1fhrefWKABWIOTFUrJyvNWfwS30jTfRCPrr1ofCqS7DoTrvBGWO-5oLzy5UtpWYHLq4Kl5oo3Uj0W5Za0eUfvw2dq3Ai3-3jBVp750OjywJAS_mNqxQIZQZgy4c4H603IEATHNy-IeaO6FXaM3tAH7UnQEHot0fIAorSVyeiYLsceItuaLU2m1thb8w6QkCTur_rcdta6oOs3kUq_PNkVitJ3GBdHp6T_QC3KTxpspNpN_GZgbrG5DqMtJpY')",
            }}
          ></div>
          <div
            className="bg-cover bg-center rounded-xl border border-border-glass opacity-60 bg-stellar-white"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCVqzWNgrp_UZDp2jdWeCDspy5IrLS6lBYPcxGVYnnUCjlHXThuan6X6_ytzEFof0oRDfTqJYk17Uqg0jj4K-mptRlMOrDRRu3D06HcAIyuDjloEbPAmSnyzs6d5dhqG1XieUcfBE5tr372wj4RejY8Xrwy3InryiZ4dqv1QIwC8Nv3S7krEEDLjQsyOHlJIYWFuQbqcv3caU7RqFiE-VPkiUAqoTxBu6V5Wcav6GuTYKjncP0v6XVx0ZxT2mB-q_OXkCCaLeYz')",
            }}
          ></div>
        </div>
      </div>

      <div className="relative z-20 text-center mb-12">
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-4 tracking-tighter">
          Hi, I'm John Doe.
        </h1>
        <p className="font-label-code text-label-code text-primary uppercase tracking-widest">
          Talk to my Digital Twin.
        </p>
      </div>

      {/* Chat Interface */}
      <div
        className="relative z-30 w-full max-w-2xl glass-panel rounded-xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-500"
        style={{
          backgroundColor: "rgba(0, 36, 81, 0.95)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(24px)",
          boxShadow:
            "rgba(0, 0, 0, 0.5) 0px 0px 40px, rgba(173, 198, 255, 0.1) 0px 0px 20px",
        }}
      >
        <div className="scanline"></div>
        {/* Header */}
        <div
          className="px-6 py-4 border-b border-border-glass flex items-center justify-between bg-surface-container-low/50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)", color: "#e0e0e0" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-secondary shadow-[0_0_8px_rgba(109,221,129,0.8)]"></div>
            <span className="font-label-code text-label-code text-on-surface-variant">
              INSTANCE_01: ACTIVE
            </span>
          </div>
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-border-glass"></div>
            <div className="w-2 h-2 rounded-full bg-border-glass"></div>
          </div>
        </div>
        {/* Chat Feed */}
        <div className="h-96 overflow-y-auto p-6 space-y-6 font-body-md text-label-code">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded bg-primary-container/20 border border-primary flex items-center justify-center shrink-0">
              <span
                className="material-symbols-outlined text-primary text-sm"
                style={{ color: "#e9e47b" }}
              >
                memory
              </span>
            </div>
            <div
              className="bg-surface-container-high/40 p-4 rounded-lg border border-border-glass max-w-[80%]"
              style={{
                backgroundColor: "#003f8a",
                borderColor: "#005cc5",
                color: "#e0e0e0",
              }}
            >
              Hello. I am the digital manifestation of John Doe's professional
              architectural logic. How can I assist your system inquiry today?
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <div
              className="bg-primary/10 p-4 rounded-lg border border-primary/30 max-w-[80%] text-right"
              style={{
                backgroundColor: "#001735",
                borderColor: "#003471",
                color: "#e0e0e0",
              }}
            >
              Tell me about your experience with enterprise-scale cloud migrations.
            </div>
            <div className="w-8 h-8 rounded bg-secondary-container/20 border border-secondary flex items-center justify-center shrink-0">
              <span
                className="material-symbols-outlined text-secondary text-sm"
                style={{ color: "#ff9da4" }}
              >
                person
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded bg-primary-container/20 border border-primary flex items-center justify-center shrink-0">
              <span
                className="material-symbols-outlined text-primary text-sm"
                style={{ color: "#e9e47b" }}
              >
                memory
              </span>
            </div>
            <div
              className="bg-surface-container-high/40 p-4 rounded-lg border border-border-glass max-w-[80%]"
              style={{
                backgroundColor: "#003f8a",
                borderColor: "#005cc5",
                color: "#e0e0e0",
              }}
            >
              <span className="text-primary-fixed-dim">QUERY_EXECUTING...</span>
              <br />
              I have led 3 major migrations involving 500+ microservices. My
              approach prioritizes zero-downtime cutovers using blue-green
              deployment strategies and automated canary analysis.
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border-glass bg-surface-container-low/50">
          <div className="flex flex-wrap gap-2 mb-4 font-label-code text-[10px]">
            <button className="px-3 py-1.5 rounded border border-primary/30 bg-primary/5 text-primary hover:bg-primary/20 hover:border-primary transition-all duration-300">
              TELL_ME_ABOUT_TECH_STACK
            </button>
            <button className="px-3 py-1.5 rounded border border-secondary/30 bg-secondary/5 text-secondary hover:bg-secondary/20 hover:border-secondary transition-all duration-300">
              VIEW_LATEST_PROJECTS
            </button>
            <button className="px-3 py-1.5 rounded border border-tertiary/30 bg-tertiary/5 text-tertiary hover:bg-tertiary/20 hover:border-tertiary transition-all duration-300">
              HOW_DO_YOU_LEAD_TEAMS?
            </button>
          </div>
          <div className="relative">
            <input
              className="w-full bg-void-black border border-border-glass rounded px-4 py-3 font-label-code text-primary focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
              placeholder="ENTER_SYSTEM_COMMAND..."
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
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-white transition-colors"
              style={{ color: "#002451" }}
              onClick={() => {
                if (inputValue) {
                  console.log("Command received:", inputValue);
                  setInputValue("");
                }
              }}
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
