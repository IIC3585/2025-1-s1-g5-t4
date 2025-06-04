import { LitElement, html, css } from 'https://unpkg.com/lit?module';

export class SuscripcionCardLit extends LitElement {
  static get properties() {
    return {
      plan:       { type: String, reflect: true },
      precio:     { type: String, reflect: true },
      descripcion:{ type: String, reflect: true }
    };
  }

  static styles = css`
    :host {
      display: block;
      max-width: 300px;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-family: Arial, sans-serif;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      margin: 16px;
    }
    .card {
      padding: 16px;
      box-sizing: border-box;
    }
    .titulo {
      font-size: 1.25rem;
      margin-bottom: 8px;
      color: #333;
    }
    .precio {
      font-size: 1rem;
      font-weight: bold;
      margin-bottom: 12px;
      color: #1a73e8;
    }
    .descripcion {
      font-size: 0.9rem;
      margin-bottom: 16px;
      color: #555;
    }
    button {
      background-color: #1a73e8;
      color: white;
      border: none;
      padding: 10px 16px;
      border-radius: 4px;
      font-size: 0.95rem;
      cursor: pointer;
      width: 100%;
    }
    button:hover {
      background-color: #1669c1;
    }
  `;

  constructor() {
    super();
    this.plan = '';
    this.precio = '';
    this.descripcion = '';
  }

  render() {
    return html`
      <div class="card">
        <div class="titulo">${this.plan}</div>
        <div class="precio">${this.precio}</div>
        <div class="descripcion">${this.descripcion}</div>
        <button @click="${this._onSuscribir}">Suscribirse</button>
      </div>
    `;
  }

    _onSuscribir() {
    const detalle = { plan: this.plan, precio: this.precio };
    this.dispatchEvent(new CustomEvent('suscribirse', {
        detail: detalle,
        bubbles: true,
        composed: true
    }));
    }
}

customElements.define('suscripcion-card-lit', SuscripcionCardLit);
