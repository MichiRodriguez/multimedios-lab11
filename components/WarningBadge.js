class WarningBadge extends HTMLElement {
  #greetName = "";

  static get observedAttributes() {
    return ["pulsing", "mode"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback()        { this.render(); }
  attributeChangedCallback() { this.render(); }

  // API pública llamada desde UserDashboard
  greet(name) {
    this.#greetName = name;
    this.removeAttribute("pulsing");
    this.setAttribute("mode", "greet");
  }

  render() {
    const isGreet = this.getAttribute("mode") === "greet";
    const pulsing = this.hasAttribute("pulsing");
    const color   = isGreet ? "#22c55e" : "#f59e0b";
    const glow    = isGreet ? "rgba(34,197,94,0.35)" : "rgba(245,158,11,0.35)";
    const text    = isGreet
      ? `¡Hola, ${this.#greetName}! 👋`
      : (this.textContent.trim() || "Sesión por expirar");

    this.shadowRoot.innerHTML = /* html */`
      <style>
        :host {
          display: block;
        }
        .badge {
          border: 1.5px solid ${color};
          border-radius: 10px;
          padding: 0.9rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: ${isGreet ? "rgba(34,197,94,0.1)" : "rgba(245,158,11,0.1)"};
          transition: background 0.6s, border-color 0.6s;
        }
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: ${color};
          flex-shrink: 0;
          box-shadow: 0 0 8px ${glow};
          ${pulsing ? "animation: pulse 1.4s ease-in-out infinite;" : ""}
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1);   opacity: 1;   }
          50%       { transform: scale(1.5); opacity: 0.6; }
        }
        .text {
          font-family: 'Courier New', monospace;
          font-size: 0.82rem;
          font-weight: 700;
          color: ${color};
          letter-spacing: 0.04em;
        }
      </style>
      <div class="badge" part="badge">
        <div class="dot" part="dot"></div>
        <span class="text" part="text">${text}</span>
      </div>
    `;
  }
}

customElements.define("warning-badge", WarningBadge);