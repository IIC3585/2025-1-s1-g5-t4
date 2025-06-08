import { LitElement, html, css } from 'https://unpkg.com/lit?module';

export class SubscriptionCardLit extends LitElement {
  static get properties() {
    return {
      plan:         { type: String, reflect: true },
      visits:       { type: Number, reflect: true },
      price:        { type: Number, reflect: true },
      taxIncluded:  { type: Boolean, reflect: true, attribute: 'tax-included' },
      description:  { type: String, reflect: true },
      features:     { type: String, reflect: true },
      highlighted:  { type: Boolean, reflect: true }
    };
  }

  static styles = css`
    :host {
      display: block;
      position: relative;
      width: 280px;
      margin: 16px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      transition: transform 0.3s ease;
    }

    .card {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 32px 24px;
      box-sizing: border-box;
      position: relative;
      transition: all 0.3s ease;
      width: 100%;
      height: 100%;
      min-height: 500px;
      display: flex;
      flex-direction: column;
    }

    :host([highlighted]) .card {
      border: 2px solid #3b82f6;
      box-shadow: 0 10px 25px -3px rgba(59, 130, 246, 0.1), 0 4px 6px -2px rgba(59, 130, 246, 0.05);
    }

    :host([highlighted]) {
      transform: scale(1.03);
    }

    .card:hover {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    /* Responsive design for mobile devices */
    @media (max-width: 1024px) {
      :host {
        width: 100%;
        max-width: 500px;
        margin: 16px auto;
      }
      
      .card {
        padding: 40px 32px;
        min-height: 600px;
      }
    }

    /* Desktop hover effects - placed after media queries to ensure priority */
    @media (min-width: 1025px) {
      :host(:hover) {
        transform: scale(1.05);
      }

      :host([highlighted]:hover) {
        transform: scale(1.08);
      }
    }

    /* Mobile hover effects */
    @media (max-width: 1024px) {
      :host(:hover) {
        transform: scale(1.02);
      }
      
      :host([highlighted]:hover) {
        transform: scale(1.05);
      }
    }

    .ribbon {
      position: absolute;
      top: -1px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      color: white;
      padding: 8px 24px;
      border-radius: 0 0 8px 8px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
    }

    .plan-name {
      font-size: 1.5rem;
      font-weight: 700;
      color: #111827;
      margin-bottom: 8px;
      text-align: center;
    }

    .visits {
      color: #6b7280;
      font-size: 0.875rem;
      text-align: center;
      margin-bottom: 24px;
    }

    .pricing {
      text-align: center;
      margin-bottom: 24px;
    }

    .price {
      font-size: 3rem;
      font-weight: 800;
      color: #111827;
      line-height: 1;
      margin-bottom: 4px;
    }

    .tax-included {
      color: #6b7280;
      font-size: 0.875rem;
    }

    .description {
      color: #4b5563;
      font-size: 0.875rem;
      text-align: center;
      margin-bottom: 32px;
      line-height: 1.5;
    }

    .features {
      list-style: none;
      padding: 0;
      margin: 0 0 32px 0;
      flex-grow: 1;
    }

    .feature-item {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      font-size: 0.875rem;
      color: #374151;
    }

    .check-icon {
      width: 20px;
      height: 20px;
      background: #10b981;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
      flex-shrink: 0;
    }

    .check-icon::after {
      content: '✓';
      color: white;
      font-size: 0.75rem;
      font-weight: bold;
    }

    .cta-button {
      width: 100%;
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      color: white;
      border: none;
      padding: 16px 24px;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: auto;
    }

    .cta-button:hover {
      background: linear-gradient(135deg, #1d4ed8, #1e40af);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
    }

    .cta-button:active {
      transform: translateY(0);
    }

    :host([highlighted]) .cta-button {
      background: linear-gradient(135deg, #059669, #047857);
    }

    :host([highlighted]) .cta-button:hover {
      background: linear-gradient(135deg, #047857, #065f46);
    }

    /* Mobile-specific larger styles */
    @media (max-width: 1024px) {
      .card {
        padding: 60px 50px;
        min-height: 900px;
      }
      
      .plan-name {
        font-size: 3.5rem;
        margin-bottom: 32px;
      }
      
      .visits {
        font-size: 1.75rem;
        margin-bottom: 48px;
      }
      
      .pricing {
        margin-bottom: 56px;
      }
      
      .price {
        font-size: 6rem;
        margin-bottom: 16px;
      }
      
      .tax-included {
        font-size: 1.5rem;
      }
      
      .description {
        font-size: 1.625rem;
        margin-bottom: 56px;
        line-height: 1.8;
      }
      
      .features {
        margin: 0 0 56px 0;
      }
      
      .feature-item {
        margin-bottom: 24px;
        font-size: 1.5rem;
      }
      
      .check-icon {
        width: 40px;
        height: 40px;
        margin-right: 24px;
      }
      
      .check-icon::after {
        font-size: 1.25rem;
      }
      
      .cta-button {
        padding: 36px 48px;
        font-size: 1.75rem;
        border-radius: 20px;
      }
      
      .ribbon {
        padding: 20px 48px;
        font-size: 1.125rem;
        border-radius: 0 0 20px 20px;
      }
    }
  `;

  constructor() {
    super();
    this.plan = '';
    this.visits = 0;
    this.price = 0;
    this.taxIncluded = false;
    this.description = '';
    this.features = '';
    this.highlighted = false;
  }

  get _parsedFeatures() {
    if (!this.features) return [];
    try {
      return JSON.parse(this.features);
    } catch (e) {
      return [];
    }
  }

  get _priceWithTax() {
    return (this.price * 1.19).toFixed(0);
  }

  get _formattedVisits() {
    if (this.visits === 0) return 'Visitas ilimitadas';
    return `${this.visits.toLocaleString()} visitas/mes`;
  }

  get _formattedPrice() {
    return `$${this.price}`;
  }

  render() {
    return html`
      <div class="card">
        ${this.highlighted ? html`<div class="ribbon">Best</div>` : ''}
        
        <div class="plan-name">${this.plan}</div>
        
        ${this.visits ? html`<div class="visits">${this._formattedVisits}</div>` : ''}
        
        <div class="pricing">
          <div class="price">${this._formattedPrice}</div>
          ${this.taxIncluded ? 
            html`<div class="tax-included">$${this._priceWithTax} incluyendo el IVA</div>` : 
            html`<div class="tax-included">IVA incluido</div>`
          }
        </div>
        
        ${this.description ? html`<div class="description">${this.description}</div>` : ''}
        
        ${this._parsedFeatures.length > 0 ? html`
          <ul class="features">
            ${this._parsedFeatures.map(feature => html`
              <li class="feature-item">
                <div class="check-icon"></div>
                ${feature}
              </li>
            `)}
          </ul>
        ` : ''}
        
        <button class="cta-button" @click="${this._onSubscribe}">
          Get Started
        </button>
      </div>
    `;
  }

  _onSubscribe() {
    const detail = { 
      plan: this.plan, 
      price: this.price,
      visits: this.visits,
      taxIncluded: this.taxIncluded
    };
    this.dispatchEvent(new CustomEvent('subscribe', {
      detail: detail,
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('subscription-card-lit', SubscriptionCardLit);