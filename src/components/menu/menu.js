import { LitElement, html, css } from 'lit';

export class ResponsiveMenu extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    h1 {
      color: white;
    }
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
    }
    .menu {
      display: flex;
      gap: 1rem;
    }
    .menu a {
      color: #ffcd1e;
      text-decoration: none;
      font-size:1.3rem;
    }
    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      cursor: pointer;
    }
    .hamburger div {
      width: 25px;
      height: 3px;
      background-color: white;
    }

    @media (max-width: 600px) {
      .menu {
        display: none; /* Oculta el menú por defecto en pantallas pequeñas */
        flex-direction: column;
        gap: 1rem;
        position: absolute;
        top: 60px;
        left: 0;
        width: 100%;
        background-color: #333;
        padding: 1rem;
      }
      .menu.show {
        display: flex; /* Muestra el menú cuando está activo */
      }
      .hamburger {
        display: flex; /* Muestra el ícono de hamburguesa en pantallas pequeñas */
      }
    }
  `;

    static get properties() {
        return {
            isOpen:{type:Boolean},
            menu: { type: Array },
        };
    }

  constructor() {
    super();
    this.isOpen = false;
    this.menu = [];
  }

  toggleMenu() {
    this.isOpen = !this.isOpen; 
  }

  render() {
    return html`
      <nav>
        <h1 class="logo">Logo</h1>
        <div class="hamburger" @click="${this.toggleMenu}">
          <div></div>
          <div></div>
          <div></div>
        </div>
       
        <div class="menu ${this.isOpen ? 'show' : ''}">
            ${this.itemsMenu.map((item)=>html `
               <a href="${item.url}">${item.page}</a>    
            `)}
        </div>
      </nav>
    `;
  }
}

customElements.define('responsive-menu', ResponsiveMenu);
