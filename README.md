# 2025-1-s1-g5-t4

## Componentes de Suscripción

Este repositorio muestra dos formatos (Web Components & Lit Elements) de construcción para una misma implementación.

1. **Web Components estándar** (HTML Template + Shadow DOM + Custom Element)  
2. **LitElement + lit-html** (propiedades reactivas, `static styles`, `render`)

El objetivo es comprender desde cero cómo:
- Aislar estilos y estructura en un Shadow DOM.  
- Exponer una API sencilla de atributos (`plan`, `precio`, `descripcion`).  
- Disparar eventos personalizados (`suscribirse`) que la página principal pueda capturar.  
- En la versión LitElement, aprovechar reactividad automática y sintaxis declarativa.

## Para probar, por ahora:

Usar live server (importante que renderice con http para el uso de módulos, por eso el server).

Elegir cualquiera de las dos carpetas e inspeccionar la página en la sección de consola para ver que los botones funcionan.

## Web Components

### Uso en index.html

* Importa suscripcion.js como módulo ES (type="module").

* Cada <suscripcion-card> recibe atributos: plan (texto), precio (texto) y descripcion (texto)

* El evento suscribirse se captura con addEventListener.

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

    * De igual manera, los estilos internos no “contaminarán” el resto de la página.

* Servidor HTTP local

    * Para que el navegador acepte módulos ES (type="module"), es obligatorio servir con HTTP (no file://).

## Lit Elements

### Uso en index.html

* Se importa suscripcion-lit.js como módulo ES.

* Cada `<suscripcion-card-lit>` recibe los mismos atributos (plan, precio, descripcion).

* Se escucha el evento suscribirse igual que en la versión “pura”.

### Implementación en suscripcion.js

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