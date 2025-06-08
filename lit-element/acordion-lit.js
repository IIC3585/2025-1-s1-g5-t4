// acordion-lit.js
import { LitElement, html, css } from 'https://unpkg.com/lit?module';

class AcordionItemLit extends LitElement {
  static properties = {
    titulo: { type: String, reflect: true },
    abierto: { type: Boolean }
  };

  constructor() {
    super();
    this.titulo = '';
    this.abierto = false;
  }

  static styles = css`
    .item {
      border: 1px solid #ddd;
      margin: 8px 0;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: box-shadow 0.3s ease;
    }

    .item.open {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    .header {
      background: #f5f5f5;
      padding: 12px 16px;
      cursor: pointer;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: background 0.3s ease;
    }

    .header:hover {
      background: #e0e0e0;
    }

    .icon {
      transition: transform 0.3s ease;
    }

    .item.open .icon {
      transform: rotate(90deg);
    }

    .content {
      padding: 12px 16px;
      display: none;
      animation: fadein 0.3s ease-in-out;
    }

    .item.open .content {
      display: block;
    }

    @keyframes fadein {
      from {
        opacity: 0;
        transform: translateY(-5px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  render() {
    return html`
      <div class="item ${this.abierto ? 'open' : ''}">
        <div class="header" @click=${this._onClick}>
          <span>${this.titulo}</span>
          <span class="icon">▶</span>
        </div>
        <div class="content"><slot></slot></div>
      </div>
    `;
  }

  _onClick() {
    this.dispatchEvent(
      new CustomEvent('toggle-lit', {
        bubbles: true,
        composed: true
      })
    );
  }

  close() {
    this.abierto = false;
  }

  open() {
    this.abierto = true;
  }
}

class AcordionLit extends LitElement {
  static styles = css``;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('toggle-lit', (e) => {
      const items = this.querySelectorAll('acordion-item-lit');
      items.forEach((item) => item.close());
      e.target.open();
    });
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('acordion-item-lit', AcordionItemLit);
customElements.define('acordion-lit', AcordionLit);
