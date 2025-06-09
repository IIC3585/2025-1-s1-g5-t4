class AcordionItem extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        .item {
          border: 1px solid #ddd;
          margin: 8px 0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: box-shadow 0.3s ease;
          width: 100%;
          height: auto;
          max-width: 300px;
          
        }

        .item.open {
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
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
          from { opacity: 0; transform: translateY(-5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      </style>
      <div class="item">
        <div class="header">
          <span class="title"></span>
          <span class="icon">▶</span>
        </div>
        <div class="content"><slot></slot></div>
      </div>
    `;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const header = this.shadowRoot.querySelector('.header');
    const title = this.getAttribute('header') || 'Título';
    this.shadowRoot.querySelector('.title').textContent = title;

    header.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('toggle', {
        bubbles: true,
        composed: true
      }));
    });
  }

  open() {
    this.shadowRoot.querySelector('.item').classList.add('open');
  }

  close() {
    this.shadowRoot.querySelector('.item').classList.remove('open');
  }
}

class Acordion extends HTMLElement {
  connectedCallback() {
    this.addEventListener('toggle', (e) => {
      const items = this.querySelectorAll('acordion-item');
      items.forEach(item => item.close());
      const item = e.target.closest('acordion-item');
      if (item) item.open();
    });
  }
}

customElements.define('acordion-item', AcordionItem);
customElements.define('acordion-list', Acordion);
