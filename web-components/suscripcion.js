const templateSubscription = document.createElement('template');
templateSubscription.innerHTML = `
  <style>
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
        padding: 28px 24px;
        min-height: 480px;
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
      display: none;
    }

    :host([highlighted]) .ribbon {
      display: block;
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
      display: none;
    }

    .visits.visible {
      display: block;
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
      display: none;
    }

    .tax-included.visible {
      display: block;
    }

    .description {
      color: #4b5563;
      font-size: 0.875rem;
      text-align: center;
      margin-bottom: 32px;
      line-height: 1.5;
      display: none;
    }

    .description.visible {
      display: block;
    }

    .features {
      list-style: none;
      padding: 0;
      margin: 0 0 32px 0;
      flex-grow: 1;
      display: none;
    }

    .features.visible {
      display: block;
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
        padding: 32px 24px;
        min-height: 480px;
      }
      
      .plan-name {
        font-size: 2rem;
        margin-bottom: 16px;
      }
      
      .visits {
        font-size: 1rem;
        margin-bottom: 24px;
      }
      
      .pricing {
        margin-bottom: 32px;
      }
      
      .price {
        font-size: 3.5rem;
        margin-bottom: 8px;
      }
      
      .tax-included {
        font-size: 0.875rem;
      }
      
      .description {
        font-size: 1rem;
        margin-bottom: 32px;
        line-height: 1.5;
      }
      
      .features {
        margin: 0 0 32px 0;
      }
      
      .feature-item {
        margin-bottom: 16px;
        font-size: 0.875rem;
      }
      
      .check-icon {
        width: 24px;
        height: 24px;
        margin-right: 16px;
      }
      
      .check-icon::after {
        font-size: 0.875rem;
      }
      
      .cta-button {
        padding: 16px 24px;
        font-size: 1rem;
        border-radius: 8px;
      }
      
      .ribbon {
        padding: 8px 24px;
        font-size: 0.75rem;
        border-radius: 0 0 8px 8px;
      }
    }
  </style>
  <div class="card">
    <div class="ribbon">Best</div>
    <div class="plan-name"></div>
    <div class="visits"></div>
    <div class="pricing">
      <div class="price"></div>
      <div class="tax-included"></div>
    </div>
    <div class="description"></div>
    <ul class="features"></ul>
    <button class="cta-button">Get Started</button>
  </div>
`;

class SubscriptionCard extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(templateSubscription.content.cloneNode(true));
    
    // Obtener referencias de elementos
    this._planNameEl = this._shadow.querySelector('.plan-name');
    this._visitsEl = this._shadow.querySelector('.visits');
    this._priceEl = this._shadow.querySelector('.price');
    this._taxIncludedEl = this._shadow.querySelector('.tax-included');
    this._descriptionEl = this._shadow.querySelector('.description');
    this._featuresEl = this._shadow.querySelector('.features');
    this._btn = this._shadow.querySelector('.cta-button');
    
    this._onClick = this._onClick.bind(this);
  }

  static get observedAttributes() {
    return ['plan', 'visits', 'price', 'tax-included', 'description', 'features', 'highlighted'];
  }

  connectedCallback() {
    this._updateContent();
    this._btn.addEventListener('click', this._onClick);
  }

  disconnectedCallback() {
    this._btn.removeEventListener('click', this._onClick);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this._updateContent();
    }
  }

  _formatVisits(visits) {
    const visitsNum = parseInt(visits);
    if (visitsNum === 0) return 'Visitas ilimitadas';
    return `${visitsNum.toLocaleString()} visitas/mes`;
  }

  _formatPrice(price) {
    return `$${price}`;
  }

  _calculatePriceWithTax(price) {
    const priceNum = parseFloat(price);
    return (priceNum * 1.19).toFixed(0);
  }

  _updateContent() {
    // Actualizar nombre del plan
    this._planNameEl.textContent = this.getAttribute('plan') || '';
    
    // Actualizar visitas
    const visits = this.getAttribute('visits');
    if (visits) {
      this._visitsEl.textContent = this._formatVisits(visits);
      this._visitsEl.classList.add('visible');
    } else {
      this._visitsEl.classList.remove('visible');
    }
    
    // Actualizar precio
    const price = this.getAttribute('price');
    this._priceEl.textContent = price ? this._formatPrice(price) : '';
    
    // Actualizar IVA incluido
    const taxIncluded = this.hasAttribute('tax-included');
    if (price) {
      if (taxIncluded) {
        this._taxIncludedEl.textContent = `$${this._calculatePriceWithTax(price)} incluyendo el IVA`;
      } else {
        this._taxIncludedEl.textContent = 'IVA incluido';
      }
      this._taxIncludedEl.classList.add('visible');
    } else {
      this._taxIncludedEl.classList.remove('visible');
    }
    
    // Actualizar descripción
    const description = this.getAttribute('description');
    if (description) {
      this._descriptionEl.textContent = description;
      this._descriptionEl.classList.add('visible');
    } else {
      this._descriptionEl.classList.remove('visible');
    }
    
    // Actualizar características
    const featuresAttr = this.getAttribute('features');
    if (featuresAttr) {
      try {
        const features = JSON.parse(featuresAttr);
        this._featuresEl.innerHTML = '';
        features.forEach(feature => {
          const li = document.createElement('li');
          li.className = 'feature-item';
          li.innerHTML = `
            <div class="check-icon"></div>
            ${feature}
          `;
          this._featuresEl.appendChild(li);
        });
        this._featuresEl.classList.add('visible');
      } catch (e) {
        this._featuresEl.classList.remove('visible');
      }
    } else {
      this._featuresEl.classList.remove('visible');
    }
  }

  _onClick() {
    const detail = {
      plan: this.getAttribute('plan'),
      price: this.getAttribute('price'),
      visits: this.getAttribute('visits'),
      taxIncluded: this.hasAttribute('tax-included')
    };
    this.dispatchEvent(new CustomEvent('subscribe', {
      detail: detail,
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('subscription-card', SubscriptionCard);