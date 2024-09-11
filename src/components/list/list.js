import { LitElement, html, css } from 'lit';

export class List extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin-top: 2rem;
    }

    .card {
      margin-top: 2rem;
      background-color: #1e1e1e;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      transition: transform 0.3s;
    }

    .card:hover {
      transform: translateY(-5px);
    }

    .img_card img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }

    .info_card {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .info_card h3 {
      margin: 0;
      font-size: 1.5rem;
      color: #ffcd1e;
    }

    .info_card p {
      margin: 0.5rem 0;
      color: #aaa;
      font-size: 1rem;
    }

    .info_card a {
      text-decoration: none;
      color: #ffcd1e;
      font-weight: bold;
      margin-top: auto;
      display: inline-block;
      transition: color 0.3s;
    }

    .info_card a:hover {
      color: white;
    }

    .category {
      margin-top: 1rem;
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .category span {
      background-color: #333;
      padding: 0.3rem 0.6rem;
      border-radius: 5px;
      font-size: 0.9rem;
    }

    @media (min-width: 600px) {
      .card {
        flex-direction: row;
        gap: 1rem;
      }

      .img_card {
        flex: 1;
      }

      .info_card {
        flex: 2;
      }
    }

    @media (min-width: 900px) {
      :host {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
      }
    }
  `;

  static get properties() {
    return {
      items: { type: Array },
    };
  }

  constructor() {
    super();
    this.items = []; 
    setTimeout(() => {
      console.log(this.items);
    }, 1000);
    
  }

_handlerClickDelete(item){
  const deleteEvent = new CustomEvent('delete-item', {
    detail: { itemId: item.id }, // Paso de datos
    bubbles: true, // Permite que el evento suba en el DOM
    composed: true // Permite que el evento atraviese los límites del Shadow DOM
  });

  this.dispatchEvent(deleteEvent);
 this.items=this.items.filter((game)=>{
  return game.id !== item.id;
 })
  
}

_handlerClickEdit(item){
  const deleteEvent = new CustomEvent('edit-item', {
    detail: { item: item }, // Paso de datos
    bubbles: true, // Permite que el evento suba en el DOM
    composed: true // Permite que el evento atraviese los límites del Shadow DOM
  });

  this.dispatchEvent(deleteEvent);
 this.items=this.items.filter((game)=>{
  return game.id !== item.id;
 })
  
}

  render() {
    return html`
      ${this.items.map((item,id) => {
        return html`
          <div class="card">
            <div class="img_card">
              <img src="${item.img}" alt="${item.name}" />
            </div>
            <div class="info_card">
              <h3>${item.name}</h3>
              <a href="#">Buy now $${item.cost} USD</a>
              <div class="category">
                ${(item.categories || []).map(
                  (category) => html`<span>${category}</span>`
                )}
              </div>
               <button @click="${()=>this._handlerClickDelete(item)}">Delete</button>
               <button  @click="${()=>this._handlerClickEdit(item)}">Edit</button>
            </div>
          </div>
        `;
      })}
    `;
  }
}

customElements.define('list-componentes', List);
