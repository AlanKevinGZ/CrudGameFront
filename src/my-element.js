import { LitElement, html, css } from 'lit';
import '../src/pages/home-page/home-page.js';
import '../src/components/menu/menu.js';
import '../src/pages/list-games/list-page.js';

export class MyElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      a{
        color:black;
        text-decoration:none;
        font-size:1.4rem;
        background-color:#ffcd1e;
        padding:6px;
        display:block;
        margin-top:2rem;
        text-align:center;

      }
    `
  ];

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
      <responsive-menu 
        .itemsMenu=${[
          { url: "#", page: "Home" }, 
          { url: "#about", page: "About" }, 
          { url: "#services", page: "Services" }, 
          { url: "#contact", page: "Contact" }
        ]}>
      </responsive-menu>

      <home-page></home-page>

      <a href="options-games.html">Add New Game</a>
      
      <list-page></list-page>
    `;
  }
}

customElements.define('index-page', MyElement);
