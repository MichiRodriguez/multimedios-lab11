class WarningBadge extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.greetName = "";
  }

  connectedCallback() {
    this.render();
  }

  greet(name) {
    this.greetName = name;
    this.render();
  }

  render() {
    const text = this.greetName
      ? `Hola profe ${this.greetName}`
      : "Sesión por expirar";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .badge {
          background: #fde68a;
          border-radius: 16px;
          padding: 1rem;
          font-weight: bold;
          text-align: center;
        }
      </style>

      <div class="badge">
        ${text}
      </div>
    `;
  }
}

customElements.define("warning-badge", WarningBadge);