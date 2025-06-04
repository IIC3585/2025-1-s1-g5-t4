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

    * Para que el navegador acepte módulos ES (type="module"), es obligatorio servir con HTTP (no file://). Recomendación: usar live server.