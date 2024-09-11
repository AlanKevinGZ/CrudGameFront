import { LitElement, html, css } from "lit";
import '../../components/list/list.js';
import { GetVideoGamesDm } from '../../datamanger/getInfoCharacterDm.js';
import {DeleteGameDm} from '../../datamanger/deleteGameDm.js'

export class ListPage extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        color: white;
      }
    `,
  ];

  static get properties() {
    return {
      items: { type: Array },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    // Escuchar el evento 'delete-item'
    this.addEventListener('delete-item', this._handleDeleteItem);
    this.addEventListener('edit-item', this._handleEditItem);
  }

  _handleDeleteItem(event) {
    const { itemId } = event.detail; // Obtener el id del item
    this.deleteVideoGames.getApi(itemId)
    console.log('Eliminar item con ID:', itemId);
    
  }

   _handleEditItem(event) {
    const { item } = event.detail; 
    sessionStorage.setItem('gameToEdit', JSON.stringify(item));
    
    window.location.href =  '/options-games.html';
    
  }
  

  constructor() {
    super();
    this.items = []; // Inicializa items como un array vacío
    this.videoGameObject = new GetVideoGamesDm();
    this.deleteVideoGames=new DeleteGameDm();
    this.renderApi();
  }

  async renderApi() {
    try {
      let res = await this.videoGameObject.getApi();
      this.items = res || []; 
      console.log(this.items);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      this.items = []; 
    }
  }

  render() {
    return html`
      <list-componentes .items=${this.items}></list-componentes>
    `;
  }

  disconnectedCallback() {
    // Eliminar el listener del evento para evitar fugas de memoria
    this.removeEventListener('delete-item', this._handleDeleteItem);
  }

}

customElements.define("list-page", ListPage);
