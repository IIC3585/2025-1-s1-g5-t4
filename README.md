# 2025-1-s1-g5-t4

## Componentes de Suscripción y Acordeón

Este repositorio muestra dos formatos (Web Components & Lit Elements) de construcción para una misma implementación de tarjeta de suscripción, y además incluye un componente de acordeón reutilizable.

1. **Web Components estándar** (HTML Template + Shadow DOM + Custom Element)  
2. **LitElement + lit-html** (propiedades reactivas, `static styles`, `render`)
3. **Acordeón Web Component** (para mostrar/ocultar secciones de contenido)

El objetivo es comprender desde cero cómo:
- Aislar estilos y estructura en un Shadow DOM.  
- Exponer una API sencilla de atributos (`plan`, `precio`, `descripcion`, `header`).  
- Disparar eventos personalizados (`suscribirse`, `toggle`) que la página principal pueda capturar.  
- En la versión LitElement, aprovechar reactividad automática y sintaxis declarativa.

---

## Para probar

Usar live server (importante que renderice con http para el uso de módulos, por eso el server).

Elegir cualquiera de las dos carpetas e inspeccionar la página en la sección de consola para ver que los botones funcionan.

---

## Web Components (`suscripcion.js`)

### Características Técnicas

#### 1. **Arquitectura del Template**
```javascript
const templateSubscription = document.createElement('template');
templateSubscription.innerHTML = `...`;
```
- **Template HTML reutilizable**: Se define una sola vez y se clona para cada instancia
- **Encapsulación de estilos**: CSS definido dentro del template, aislado del DOM global
- **Estructura semántica**: Organización clara con clases CSS descriptivas

#### 2. **Clase SubscriptionCard extends HTMLElement**

**Constructor y Shadow DOM:**
```javascript
constructor() {
  super();
  this._shadow = this.attachShadow({ mode: 'open' });
  this._shadow.appendChild(templateSubscription.content.cloneNode(true));
}
```
- **Shadow DOM abierto**: Permite inspección desde DevTools
- **Clonación del template**: Cada instancia recibe una copia independiente
- **Referencias privadas**: Almacena elementos internos con prefijo `_`

**Propiedades y Atributos Observados:**
```javascript
static get observedAttributes() {
  return ['plan', 'visits', 'price', 'tax-included', 'description', 'features', 'highlighted'];
}
```

| Atributo | Tipo | Descripción | Procesamiento |
|----------|------|-------------|---------------|
| `plan` | String | Nombre del plan | Texto directo |
| `visits` | Number | Número de visitas permitidas | Formateo con `toLocaleString()` |
| `price` | Number | Precio base | Formateo con símbolo de moneda |
| `tax-included` | Boolean | Indica si mostrar precio con IVA | Cálculo automático (precio × 1.19) |
| `description` | String | Descripción del plan | Texto con control de visibilidad |
| `features` | JSON String | Array de características | Parsing JSON y renderizado de lista |
| `highlighted` | Boolean | Marca el plan como destacado | Estilos especiales y ribbon |

#### 3. **Ciclo de Vida del Componente**

**connectedCallback():**
- Se ejecuta cuando el elemento se agrega al DOM
- Inicializa el contenido y eventos
- Registra event listeners

**disconnectedCallback():**
- Limpia event listeners para prevenir memory leaks
- Se ejecuta cuando el elemento se remueve del DOM

**attributeChangedCallback(name, oldValue, newValue):**
- Responde a cambios en atributos observados
- Actualiza el contenido visual automáticamente
- Permite reactividad sin frameworks

#### 4. **Métodos de Formateo y Procesamiento**

```javascript
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
```

#### 5. **Sistema de Eventos Personalizados**
```javascript
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
    composed: true  // Permite que el evento salga del Shadow DOM
  }));
}
```

#### 6. **Responsive Design**
- **Breakpoint principal**: 1024px (móvil vs escritorio)
- **Transformaciones escalables**: `transform: scale()` para hover effects
- **Adaptación de tamaños**: Todos los elementos se escalan proporcionalmente
- **Media queries específicas**: Estilos diferenciados para móvil y escritorio

### Uso en index.html

* Importa `suscripcion.js` y `acordion.js` como módulos ES (type="module").

* Cada `<suscripcion-card>` recibe atributos: plan (texto), precio (texto) y descripcion (texto).

* El evento `suscribirse` se captura con addEventListener.

* El acordeón se usa así:

```html
<acordion-list>
  <acordion-item header="Sección 1">Contenido 1</acordion-item>
  <acordion-item header="Sección 2">Contenido 2</acordion-item>
</acordion-list>
```

* Solo una sección del acordeón puede estar abierta a la vez.  
* El atributo `header` define el título visible de cada sección.

### Implementación en suscripcion.js

* Nombre de Custom Element

    * Debe incluir un guión (-), p. ej. `suscripcion-card`, De lo contrario, customElements.define arroja un error.

* Uso de `<template>` + attachShadow

    * El `<template>` define estructura y estilos una sola vez.

    * Al clonar su contenido dentro del Shadow, cada instancia es idéntica y aislada de estilos globales.

* observedAttributes + attributeChangedCallback

    * Permiten detectar cambios en atributos y actualizar el UI interno sin código adicional.

    * Ejemplo: si alguien hace element.setAttribute('precio', '20 USD/mes'), se reflejará automáticamente.

* Evento CustomEvent('suscribirse')

    * Se configura con bubbles: true y composed: true para que salga del Shadow y llegue al DOM principal.

    * El objeto detail transporta { plan, precio }.

* Encapsulación de estilos

    * Un CSS global que afecte a button { background: red; } no romperá el botón dentro del Shadow.

    * De igual manera, los estilos internos no "contaminarán" el resto de la página.

* Servidor HTTP local

    * Para que el navegador acepte módulos ES (type="module"), es obligatorio servir con HTTP (no file://).

---

## Lit Elements (`suscripcion-lit.js`)

### Características Técnicas

#### 1. **Importación y Herencia**
```javascript
import { LitElement, html, css } from 'https://unpkg.com/lit?module';

export class SubscriptionCardLit extends LitElement {
```
- **Import desde CDN**: Usa unpkg.com para desarrollo rápido
- **Herencia de LitElement**: Proporciona funcionalidad base reactiva
- **Export de clase**: Permite reutilización modular

#### 2. **Sistema de Propiedades Reactivas**
```javascript
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
```

**Características del sistema de propiedades:**
- **Tipado fuerte**: Cada propiedad tiene un tipo definido
- **Reflect: true**: Cambios en propiedades se reflejan en atributos HTML
- **Attribute mapping**: `taxIncluded` ↔ `tax-included` (camelCase ↔ kebab-case)
- **Reactividad automática**: Cambios disparan re-renderizado

#### 3. **Estilos Estáticos con CSS Tagged Templates**
```javascript
static styles = css`
  :host {
    display: block;
    position: relative;
    /* ... más estilos ... */
  }
  /* Todos los estilos CSS aquí */
`;
```
- **Encapsulación automática**: Estilos solo afectan al componente
- **CSS Tagged Template**: Sintaxis nativa de CSS con interpolación
- **Performance optimizada**: Estilos se procesan una sola vez
- **Shadow DOM automático**: LitElement maneja el Shadow DOM

#### 4. **Getters Computados**
```javascript
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
```
- **Computación lazy**: Solo se calculan cuando se necesitan
- **Caching automático**: Se recalculan solo cuando cambian las dependencias
- **Error handling**: Manejo seguro de JSON parsing

#### 5. **Método render() con HTML Tagged Templates**
```javascript
render() {
  return html`
    <div class="card">
      ${this.highlighted ? html`<div class="ribbon">Best</div>` : ''}
      
      <div class="plan-name">${this.plan}</div>
      
      ${this.visits ? html`<div class="visits">${this._formattedVisits}</div>` : ''}
      
      <!-- Renderizado condicional y loops -->
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
```

**Características del renderizado:**
- **Declarativo**: Describe lo que debe mostrarse, no cómo
- **Interpolación reactiva**: `${expression}` se actualiza automáticamente
- **Renderizado condicional**: Usando operadores ternarios y lógicos
- **Event binding**: `@click` para manejar eventos
- **Loops con map()**: Renderizado de listas dinámicas

#### 6. **Diferencias Arquitecturales con Web Components Puros**

| Aspecto | Web Components Puros | LitElement |
|---------|---------------------|------------|
| **Reactividad** | Manual (`attributeChangedCallback`) | Automática (sistema de propiedades) |
| **Estilos** | Template HTML con `<style>` | `static styles = css\`...\`` |
| **Renderizado** | Manipulación directa del DOM | Declarativo con `render()` |
| **Boilerplate** | Alto (template, callbacks, refs) | Bajo (propiedades + render) |
| **Performance** | Control manual completo | Optimizada con diffing |
| **Debugging** | Más verboso | Más limpio |
| **Tamaño** | Sin dependencias externas | Requiere librería Lit (~10KB) |

### Uso en index.html

* Se importa suscripcion-lit.js como módulo ES.

* Cada `<suscripcion-card-lit>` recibe los mismos atributos (plan, precio, descripcion).

* Se escucha el evento suscribirse igual que en la versión "pura".

### Implementación en suscripcion-lit.js

* Propiedades reactivas + reflejo automático

* Al declarar properties, cualquier cambio en this.plan se refleja en el atributo HTML y provoca un re-render:

```js
static get properties() {
    return {
        plan:        { type: String, reflect: true },
        precio:      { type: String, reflect: true },
        descripcion: { type: String, reflect: true }
    };
}
```

* static styles = css\…`;`

    * Los estilos se inyectan en el Shadow DOM automáticamente.

    * Aíslan completamente el componente de estilos globales.

* Sintaxis declarativa con lit-html. En render() se usa un return donde ${this.plan} se actualiza de manera reactiva.

```js
return html`
  <div class="card">
    <div class="titulo">${this.plan}</div>
    <div class="precio">${this.precio}</div>
    <div class="descripcion">${this.descripcion}</div>
    <button @click="${this._onSuscribir}">Suscribirse</button>
  </div>
`;
```

* Menos boilerplate

    * No hace falta observedAttributes ni attributeChangedCallback.

    * Lit se encarga de toda la lógica de sincronización atributo → propiedad → render.

* Shadow DOM por defecto

    * LitElement ya crea y administra el Shadow DOM detrás de escena.

    * Solo definimos estilos con static styles y la función render().

* Importación desde CDN vs Bundler

    * En demos simples se usa import { LitElement, html, css } from 'https://unpkg.com/lit?module'.

    * En un proyecto real con npm, sería import { LitElement, html, css } from 'lit'; y se usaría un bundler (Vite, Rollup, etc.).

---

## Componente Acordeón

### Uso en index.html

* Importa `acordion.js` como módulo ES (type="module").

* Estructura básica:

```html
<acordion-list>
  <acordion-item header="Título 1">Contenido 1</acordion-item>
  <acordion-item header="Título 2">Contenido 2</acordion-item>
</acordion-list>
```

* Cada `<acordion-item>` recibe el atributo `header` para el título de la sección.

* Al hacer clic en el encabezado, se despliega el contenido y se cierra cualquier otro abierto.

* Puedes escuchar el evento `toggle` si necesitas reaccionar a la apertura/cierre desde el DOM principal.

---

## Comparación de Enfoques

### Cuándo usar Web Components Puros
- **Control total** sobre el comportamiento y performance
- **Sin dependencias externas** (bundle size mínimo)
- **Compatibilidad máxima** con navegadores modernos
- **Proyectos simples** con pocos componentes
- **Aprendizaje** de los fundamentos de Web Components

### Cuándo usar LitElement
- **Desarrollo rápido** con menos código
- **Aplicaciones complejas** con muchos componentes
- **Equipos que prefieren** sintaxis declarativa
- **Proyectos donde el bundle size** no es crítico
- **Integración con ecosistemas** que ya usan Lit

### Consideraciones de Performance

| Métrica | Web Components | LitElement |
|---------|----------------|------------|
| **Bundle Size** | 0 KB (nativo) | ~10 KB (Lit library) |
| **Tiempo de carga inicial** | Más rápido | Ligeramente más lento |
| **Reactividad** | Manual (más control) | Automática (optimizada) |
| **Memory footprint** | Menor | Ligeramente mayor |
| **Desarrollo** | Más tiempo | Menos tiempo |