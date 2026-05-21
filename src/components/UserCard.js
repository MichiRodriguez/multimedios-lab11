class UserCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const avatar = this.getAttribute("avatar") ?? "👤";
    const name   = this.getAttribute("name")   ?? "Usuario";
    const role   = this.getAttribute("role")   ?? "Invitado";
    this.render(avatar, name, role);
  }

  render(avatar, name, role) {
    this.shadowRoot.innerHTML = /* html */`
      <style>
        :host {
          display: block;
        }
        .card {
          background: linear-gradient(135deg, #1a2a4a 0%, #0d1b35 100%);
          border: 1px solid rgba(100, 160, 255, 0.25);
          border-radius: 14px;
          padding: 1.1rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .avatar {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
          box-shadow: 0 0 12px rgba(99, 102, 241, 0.5);
        }
        .info {
          flex: 1;
          min-width: 0;
        }
        .name {
          font-family: 'Courier New', monospace;
          font-size: 0.9rem;
          font-weight: 700;
          color: #e2e8f0;
          margin: 0 0 0.15rem;
          letter-spacing: 0.04em;
        }
        .role {
          font-family: 'Courier New', monospace;
          font-size: 0.65rem;
          color: #64a0ff;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0;
        }
        button {
          background: linear-gradient(135deg, #2563eb, #4f46e5);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 0.5rem 1rem;
          font-family: 'Courier New', monospace;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 0 8px rgba(79, 70, 229, 0.4);
          transition: transform 0.15s, box-shadow 0.15s;
        }
        button:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 16px rgba(79, 70, 229, 0.7);
        }
      </style>
      <div class="card">
        <div class="avatar" part="avatar">${avatar}</div>
        <div class="info" part="info">
          <p class="name">${name}</p>
          <p class="role">${role}</p>
        </div>
        <button part="btn">Saludar</button>
      </div>
    `;

    this.shadowRoot.querySelector("button").addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("usercard:greet", {
        bubbles: true,
        composed: true,
        detail: { name }
      }));
    });
  }
}

customElements.define("user-card", UserCard);