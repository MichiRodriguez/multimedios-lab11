class UserCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const image = this.getAttribute("image") || "";
    const name = this.getAttribute("name") || "Usuario";
    const role = this.getAttribute("role") || "Invitado";

    this.render(image, name, role);
  }

  render(image, name, role) {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .card {
          background: #60a5fa;
          border-radius: 16px;
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          overflow: hidden;
          background: white;
          flex-shrink: 0;
        }

        .avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .text h3 {
          margin: 0;
          font-size: 1rem;
        }

        .text p {
          margin: 0;
          font-size: 0.8rem;
        }

        button {
          border: none;
          background: #2563eb;
          color: white;
          padding: 0.7rem 1rem;
          border-radius: 10px;
          cursor: pointer;
        }

        button:hover {
          background: #1d4ed8;
        }
      </style>

      <div class="card">
        <div class="info">

          <div class="avatar">
            <img src="${image}" alt="avatar">
          </div>

          <div class="text">
            <h3>${name}</h3>
            <p>${role}</p>
          </div>
        </div>

        <button>Saludar</button>
      </div>
    `;

    const button = this.shadowRoot.querySelector("button");

    button.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("usercard:greet", {
          bubbles: true,
          composed: true,
          detail: { name }
        })
      );
    });
  }
}

customElements.define("user-card", UserCard);