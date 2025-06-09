const templateSuscripcion = document.createElement('template');
templateSuscripcion.innerHTML = `
  <style>
    :host {
      display: block;
      max-width: 300px;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-family: Arial, sans-serif;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      margin: 16px;
      height: auto;
    }
    .card { padding: 16px; box-sizing: border-box; }
    .titulo { font-size: 1.25rem; margin-bottom: 8px; color: #333; }
    .precio { font-size: 1rem; font-weight: bold; margin-bottom: 12px; color: #1a73e8; }
    .descripcion { font-size: 0.9rem; margin-bottom: 16px; color: #555; }
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
    button:hover { background-color: #1669c1; }
  </style>
  <div class="card">
    <div class="titulo"></div>
    <div class="precio"></div>
    <div class="descripcion"></div>
    <button>Suscribirse</button>
  </div>
`;

class SuscripcionCard extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(templateSuscripcion.content.cloneNode(true));
    this._elTitulo = this._shadow.querySelector('.titulo');
    this._elPrecio = this._shadow.querySelector('.precio');
    this._elDescripcion = this._shadow.querySelector('.descripcion');
    this._btn = this._shadow.querySelector('button');
    this._onClick = this._onClick.bind(this);
  }

  static get observedAttributes() {
    return ['plan', 'precio', 'descripción'];
  }

  connectedCallback() {
    this._actualizarContenido();
    this._btn.addEventListener('click', this._onClick);
  }

  disconnectedCallback() {
    this._btn.removeEventListener('click', this._onClick);
  }

  attributeChangedCallback(nombre, viejo, nuevo) {
    if (viejo !== nuevo) this._actualizarContenido();
  }

  _actualizarContenido() {
    this._elTitulo.textContent = this.getAttribute('plan') || '';
    this._elPrecio.textContent = this.getAttribute('precio') || '';
    this._elDescripcion.textContent = this.getAttribute('descripción') || '';
  }

  _onClick() {
    const detalle = {
      plan: this.getAttribute('plan'),
      precio: this.getAttribute('precio')
    };
    this.dispatchEvent(new CustomEvent('suscribirse', {
      detail: detalle,
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('suscripcion-card', SuscripcionCard);
