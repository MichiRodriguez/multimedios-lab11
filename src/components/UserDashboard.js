class UserDashboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.#listen();
  }

  #listen() {
    this.addEventListener("usercard:greet", (e) => {
      const badge = this.shadowRoot.querySelector("warning-badge");
      if (badge) badge.greet(e.detail.name);
    });
  }

  render() {
    const avatar = this.getAttribute("avatar") ?? "🧑‍🏫";
    const name   = this.getAttribute("name")   ?? "Alonso";
    const role   = this.getAttribute("role")   ?? "Profesor";
    const city   = this.getAttribute("city")   ?? "liberia+guanacaste";

    this.shadowRoot.innerHTML = /* html */`
      <style>
        :host {
          display: block;
        }
        .dashboard {
          background: linear-gradient(160deg, #0b1628 0%, #0d1f3c 50%, #091525 100%);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 20px;
          padding: 1.75rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.85rem;
          max-width: 540px;
          width: 100%;
          box-shadow:
            0 0 60px rgba(37, 99, 235, 0.08),
            0 25px 50px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }
        .header {
          grid-column: 1 / -1;
          font-family: 'Courier New', monospace;
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(99, 102, 241, 0.5);
        }
        user-card {
          grid-column: 1;
          display: block;
        }
        weather-time {
          grid-column: 2;
          display: block;
        }
        warning-badge {
          grid-column: 1 / -1;
          display: block;
        }
      </style>
      <div class="dashboard" part="dashboard">
        <div class="header">// &lt;user-dashboard&gt;</div>
        <user-card    avatar="${avatar}" name="${name}" role="${role}"></user-card>
        <weather-time city="${city}"></weather-time>
        <warning-badge pulsing>Sesión por expirar</warning-badge>
      </div>
    `;
  }
}

customElements.define("user-dashboard", UserDashboard);