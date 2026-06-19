"use client";

export default function ContactSection() {
  const handleFormClick = () => {
    alert("This contact form is currently under construction, but you can reach me through the other available channels.");
  };

  return (
    <section id="contact" className="scroll-mt-28 md:scroll-mt-24 relative bg-white text-void-black py-20 md:py-32 px-margin-mobile md:px-margin-desktop overflow-hidden">
      <div className="max-w-max-width mx-auto relative z-10 flex flex-col items-center">
        <div className="text-center mb-12 md:mb-24 z-20 px-2">
          <h2 className="font-headline-md text-display-lg-mobile md:text-display-lg mb-4 md:mb-6 text-void-black">Let's build something legendary together.</h2>
          <p className="font-body-lg text-base md:text-xl text-outline-variant max-w-3xl mx-auto">Whether you need a senior technical lead, a visionary product owner, or a full-stack expert to bridge the gap — I'm here to help.</p>
        </div>
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 z-30 relative">
          {/* Contact Form Floating Card */}
          <div
            className="w-full p-5 md:p-8 rounded-2xl border border-outline-variant/20 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-transform duration-500"
            onClick={handleFormClick}
          >
            <div className="flex items-center gap-3 mb-6 border-b border-outline-variant/10 pb-4">
              <div className="w-3 h-3 rounded-full bg-[#065f46] shadow-[0_0_8px_rgba(6,95,70,0.5)] shrink-0"></div>
              <span className="font-label-code text-xs sm:text-sm md:text-label-code text-outline-variant uppercase tracking-widest">INSTANCE_02: UPLINK_ACTIVE</span>
            </div>
            <div className="space-y-5">
              <div className="space-y-1">
                <label className="font-label-caps text-[10px] text-outline-variant opacity-70">IDENTITY_NAME</label>
                <input className="w-full bg-white/80 border border-outline-variant/20 rounded-lg px-4 py-3 font-label-code text-sm text-void-black focus:ring-2 focus:ring-[#065f46] focus:border-[#065f46] outline-none transition-all" placeholder="ENTER_NAME..." type="text" />
              </div>
              <div className="space-y-1">
                <label className="font-label-caps text-[10px] text-outline-variant opacity-70">RETURN_PATH</label>
                <input className="w-full bg-white/80 border border-outline-variant/20 rounded-lg px-4 py-3 font-label-code text-sm text-void-black focus:ring-2 focus:ring-[#065f46] focus:border-[#065f46] outline-none transition-all" placeholder="USER@DOMAIN.COM" type="email" />
              </div>
              <div className="space-y-1">
                <label className="font-label-caps text-[10px] text-outline-variant opacity-70">TRANSMISSION_DATA</label>
                <textarea className="w-full bg-white/80 border border-outline-variant/20 rounded-lg px-4 py-3 font-label-code text-sm text-void-black focus:ring-2 focus:ring-[#065f46] focus:border-[#065f46] outline-none transition-all resize-none" placeholder="MESSAGE_CONTENT..." rows={4}></textarea>
              </div>
              <button className="w-full py-4 bg-[#065f46] text-white font-label-code font-bold rounded-lg hover:bg-[#044030] transition-all active:scale-[0.98] shadow-xl shadow-[#065f46]/20 mt-2">
                EXECUTE_SEND
              </button>
              <p className="text-xs text-center text-outline-variant mt-4">Not available yet.</p>
            </div>
          </div>
          <div className="flex flex-col gap-6 justify-center">
            {/* Social Link 1: Email */}
            <a href="mailto:fdbazan1.0@gmail.com" className="w-full p-5 md:p-6 rounded-2xl border border-outline-variant/20 bg-white shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:scale-105 transition-all duration-500 group cursor-pointer">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#065f46]/10 flex items-center justify-center group-hover:bg-[#065f46]/20 transition-colors shrink-0">
                  <span className="material-symbols-outlined text-[#065f46]">mail</span>
                </div>
                <div className="min-w-0">
                  <div className="font-label-caps text-[10px] text-outline-variant">DIRECT_LINE</div>
                  <div className="font-label-code text-xs sm:text-sm text-void-black font-bold break-all">fdbazan1.0@gmail.com</div>
                </div>
              </div>
            </a>
            {/* Social Link 2: GitHub */}
            <a href="https://github.com/fdbzn" target="_blank" rel="noopener noreferrer" className="w-full p-5 md:p-6 rounded-2xl border border-outline-variant/20 bg-white shadow-[0_25px_45px_rgba(0,0,0,0.04)] hover:scale-105 transition-all duration-500 group cursor-pointer">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-void-black/5 flex items-center justify-center group-hover:bg-void-black/10 transition-colors shrink-0">
                  <span className="material-symbols-outlined text-void-black">code</span>
                </div>
                <div className="min-w-0">
                  <div className="font-label-caps text-[10px] text-outline-variant">SOURCE_CODE</div>
                  <div className="font-label-code text-xs sm:text-sm text-void-black font-bold break-all">github.com/fdbzn</div>
                </div>
              </div>
            </a>
            {/* Social Link 3: LinkedIn */}
            <a href="https://linkedin.com/in/dan-bazan-f1010" target="_blank" rel="noopener noreferrer" className="w-full p-5 md:p-6 rounded-2xl border border-outline-variant/20 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:scale-105 transition-all duration-500 group cursor-pointer">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#005ac1]/10 flex items-center justify-center group-hover:bg-[#005ac1]/20 transition-colors shrink-0">
                  <span className="material-symbols-outlined text-[#005ac1]">link</span>
                </div>
                <div className="min-w-0">
                  <div className="font-label-caps text-[10px] text-outline-variant">PROFESSIONAL_NODE</div>
                  <div className="font-label-code text-xs sm:text-sm text-void-black font-bold break-all">linkedin.com/in/dan-bazan-f1010</div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
