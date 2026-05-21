class UserDashboard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.listen();
  }

  listen() {
    this.addEventListener("usercard:greet", (event) => {
      const badge =
        this.shadowRoot.querySelector("warning-badge");

      if (badge) {
        badge.greet(event.detail.name);
      }
    });
  }

  render() {
    const image =
      this.getAttribute("image") || "";

    const name =
      this.getAttribute("name") || "Alonso";

    const role =
      this.getAttribute("role") || "Profesor";

    const city =
      this.getAttribute("city") || "Liberia";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 700px;
        }

        .dashboard {
          background: #fca5a5;
          padding: 2rem;
          border-radius: 20px;

          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        warning-badge {
          grid-column: 1 / 3;
        }
      </style>

      <div class="dashboard">

        <user-card
          image="${image}"
          name="${name}"
          role="${role}">
        </user-card>

        <weather-time
          city="${city}">
        </weather-time>

        <warning-badge>
        </warning-badge>

      </div>
    `;
  }
}

customElements.define(
  "user-dashboard",
  UserDashboard
);