const WEATHER_URL = (city) =>
  `https://goweather.xyz/v2/weather/${city}`;

class WeatherTime extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.data = null;
  }

  connectedCallback() {
    this.render();
    this.fetchWeather();
  }

  async fetchWeather() {
    const city = this.getAttribute("city") || "Liberia";

    try {
      const response = await fetch(WEATHER_URL(city));
      this.data = await response.json();
    } catch (error) {
      this.data = {
        temperature: "31 °C",
        description: "Sunny"
      };
    }

    this.render();
  }

  render() {
    const temp = this.data?.temperature;
    const desc = this.data?.description;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .weather {
          background: #86efac;
          border-radius: 16px;
          padding: 1rem;
          min-height: 120px;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .content {
          text-align: center;
        }

        h2 {
          margin: 0;
        }

        p {
          margin: 0.3rem 0;
        }
      </style>

      <div class="weather">
        ${
          temp
            ? `
          <div class="content">
            <h2>🌤 ${temp}</h2>
            <p>${desc}</p>
          </div>
        `
            : `
          <p>Cargando clima...</p>
        `
        }
      </div>
    `;
  }
}

customElements.define("weather-time", WeatherTime);