const WEATHER_URL = (city) => `https://goweather.xyz/v2/weather/${city}`;

class WeatherTime extends HTMLElement {
  #data = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.#fetchWeather();
  }

  async #fetchWeather() {
    const city = this.getAttribute("city") ?? "liberia+guanacaste";
    try {
      const res  = await fetch(WEATHER_URL(city));
      this.#data = await res.json();
    } catch {
      this.#data = { temperature: "31 °C", description: "Sunny" };
    }
    this.render();
  }

  render() {
    const temp   = this.#data?.temperature ?? null;
    const desc   = this.#data?.description ?? "";
    const city   = (this.getAttribute("city") ?? "liberia+guanacaste").replace(/\+/g, " ");

    this.shadowRoot.innerHTML = /* html */`
      <style>
        :host {
          display: block;
        }
        .wrapper {
          background: linear-gradient(135deg, #0f3460 0%, #0a2540 100%);
          border: 1px solid rgba(34, 211, 238, 0.2);
          border-radius: 14px;
          padding: 1.1rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.85rem;
          min-height: 84px;
        }
        .loading {
          display: flex;
          gap: 5px;
          align-items: center;
        }
        .dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #22d3ee;
          animation: bounce 1s infinite alternate;
        }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce {
          from { transform: translateY(-5px); opacity: 0.4; }
          to   { transform: translateY(0);    opacity: 1;   }
        }
        .icon {
          font-size: 2rem;
          filter: drop-shadow(0 0 8px rgba(34, 211, 238, 0.5));
        }
        .info {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }
        .temp {
          font-family: 'Courier New', monospace;
          font-size: 1.3rem;
          font-weight: 700;
          color: #e2e8f0;
          line-height: 1;
        }
        .desc {
          font-family: 'Courier New', monospace;
          font-size: 0.7rem;
          color: #22d3ee;
          text-transform: capitalize;
        }
        .city {
          font-family: 'Courier New', monospace;
          font-size: 0.6rem;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
      </style>
      <div class="wrapper">
        ${temp ? `
          <div class="icon" part="icon">🌤</div>
          <div class="info" part="info">
            <span class="temp">${temp}</span>
            <span class="desc">${desc}</span>
            <span class="city">${city}</span>
          </div>
        ` : `
          <div class="loading">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        `}
      </div>
    `;
  }
}

customElements.define("weather-time", WeatherTime);