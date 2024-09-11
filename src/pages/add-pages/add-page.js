import { LitElement, html, css } from "lit";
import "../../components/inputs/inputs.js";
import { GetGenereDm } from "../../datamanger/getGenereDm.js";
import { postGameDm } from "../../datamanger/postGameDm.js";

import { UpdateGameDm } from "../../datamanger/updateGameDm.js";

export class AddPage extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        padding: 20px;
      }

      form {
        background-color: #2c2c2c;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        max-width: 400px;
        margin: auto;
      }

      label {
        color: #fff;
        font-weight: bold;
        margin-bottom: 8px;
        display: block;
      }

      input,
      select,
      button {
        width: 100%;
        padding: 10px;
        margin: 10px 0;
        border: none;
        border-radius: 5px;
        box-sizing: border-box;
      }

      input[type="text"],
      input[type="number"] {
        background-color: #444;
        color: #fff;
      }

      input::placeholder {
        color: #aaa;
      }

      button,
      input[type="submit"] {
        background-color: #4caf50;
        color: white;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.3s;
      }

      button:hover,
      input[type="submit"]:hover {
        background-color: #45a049;
      }

      .loading {
        font-size: 1rem;
        color: #666;
        text-align: center;
      }

      .genre-list {
        color: #fff;
        margin-top: 10px;
        font-size: 1.3rem;
      }

      .error-message {
        color: #ffffff;
        font-size: 1.5rem;
        margin-top: 10px;
        text-align: center;
        background-color: red;
      }

      .checkbox-container {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      .checkbox-container label {
        background-color: #444;
        color: #fff;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        user-select: none;
      }

      .checkbox-container input[type="checkbox"] {
        display: none;
      }

      .checkbox-container input[type="checkbox"]:checked + label {
        background-color: #4caf50;
      }
    `,
  ];

  static properties = {
    genres: { type: Array },
    loading: { type: Boolean },
    errorMessage: { type: String },
    selectedGenres: { type: Array },
  };

  constructor() {
    super();
    this.objectGenere = new GetGenereDm();
    this.objectPost = new postGameDm();
    this.objectUpdate = new UpdateGameDm();
    this.genres = [];
    this.generosId = [];
    this.selectedGenres = [];
    this.errorMessage = "";
    this.game = this._getGameFromStorage();
    this.getGenere();
  }

  async getGenere() {
    try {
      this.genres = await this.objectGenere.getApi();
      this.requestUpdate();
      this.markSelectedGenres();
    } catch (error) {
      console.error("Error al cargar géneros:", error);
      this.errorMessage = "Error al cargar géneros";
    }
  }

  _getGameFromStorage() {
    const gameData = sessionStorage.getItem("gameToEdit");
    if (!gameData) {
      return;
    }

    sessionStorage.removeItem("gameToEdit");
    return gameData ? JSON.parse(gameData) : {};
  }

  getFormData() {
    if (this.game) {
      this.shadowRoot
        .querySelector('inputs-components[name="name"]')
        .shadowRoot.querySelector("input").value = this.game.name;
      this.shadowRoot
        .querySelector('inputs-components[name="cost"]')
        .shadowRoot.querySelector("input").value = this.game.cost;
      this.shadowRoot
        .querySelector('inputs-components[name="img"]')
        .shadowRoot.querySelector("input").value = this.game.img;
    }
  }

  markSelectedGenres() {
    if (this.game) {
      this.updateComplete.then(() => {
        if (this.game.categories && this.genres.length > 0) {
          this.genres.forEach((genre) => {
            const checkbox = this.shadowRoot.querySelector(
              `#genre-${genre.id}`
            );
            if (checkbox && this.game.categories.includes(genre.name)) {
              checkbox.checked = true;
              this.generosId.push(genre.id.toString());
              this.selectedGenres.push(genre.name);
            }
          });
        }
      });
    }
  }

  async firstUpdated() {
    // Asegura que los inputs se llenen después de que el DOM esté listo
    await this.updateComplete;
    this.getFormData();
  }

  _handleSubmit(e) {
    e.preventDefault();
    setTimeout(() => {
      this.errorMessage = "";
    }, 1500);

    const nameInput = this.shadowRoot
      .querySelector('inputs-components[name="name"]')
      .shadowRoot.querySelector("input");
    const nameValue = nameInput.value;

    const costInput = this.shadowRoot
      .querySelector('inputs-components[name="cost"]')
      .shadowRoot.querySelector("input");
    const costValue = costInput.value;

    const imgInput = this.shadowRoot
      .querySelector('inputs-components[name="img"]')
      .shadowRoot.querySelector("input");
    const imgValue = imgInput.value;

    let formObject = {
      name: nameValue,
      cost: costValue,
      img: imgValue,
      categoryIds: this.generosId,
    };

    if (this.game) {
      console.log(typeof this.game.id);
      
      this.putApi(formObject,this.game.id);
    } else {
      this.postApi(formObject);
    }
  }

  _handleGenreSelection(e) {
    const generoValue = e.target.value;
    const selected = e.target.checked;
    if (selected) {
      this.generosId.push(generoValue);
      const selectedGenre = this.genres.find(
        (genre) => genre.id === parseInt(generoValue, 10)
      );
      if (selectedGenre) {
        this.selectedGenres.push(selectedGenre.name);
      }
    } else {
      this.generosId = this.generosId.filter((id) => id !== generoValue);
      this.selectedGenres = this.selectedGenres.filter(
        (name) =>
          name !==
          this.genres.find((genre) => genre.id === parseInt(generoValue, 10))
            .name
      );
    }
  }

  async postApi(body) {
    try {
      let response = await this.objectPost.postApi(body);

      if (typeof response === "string") {
        try {
          this.errorMessage = JSON.parse(response);
        } catch (parseError) {
          console.error("Error al parsear la respuesta:", parseError);
          this.errorMessage = { message: response };
        }
      } else if (typeof response === "object") {
        this.errorMessage = response;
      } else {
        this.errorMessage = { message: "Respuesta inesperada de la API" };
      }

      if (!this.errorMessage || !this.errorMessage.message) {
        window.location.href = "/index.html";
      }
    } catch (error) {
      this.errorMessage = "Ocurrió un error al procesar la solicitud";
      console.error("Error en la petición:", error);
    }
  }

  async putApi(bodyUpdate,id) {
    let response = await this.objectUpdate.getApiUpdate(bodyUpdate,id);
    window.location.href = "/index.html";
  }

  render() {
    return html`
      <form @submit="${this._handleSubmit}">
        <inputs-components
          label="Name Game"
          name="name"
          type="text"
          placeHolder="Name game"
        ></inputs-components>
        <inputs-components
          label="Costo"
          name="cost"
          type="number"
          placeHolder="Costo"
        ></inputs-components>
        <inputs-components
          label="Imagen"
          name="img"
          type="text"
          placeHolder="url"
        ></inputs-components>

        <div class="checkbox-container">
          ${this.genres.map(
            (genre) => html`
              <input
                type="checkbox"
                id="genre-${genre.id}"
                value="${genre.id}"
                @change="${this._handleGenreSelection}"
              />
              <label for="genre-${genre.id}">${genre.name}</label>
            `
          )}
        </div>

        ${this.game
          ? html`<input type="submit" value="Editar" />`
          : html`<input type="submit" value="Agregar" />`}
      </form>

      ${this.errorMessage
        ? html`<div class="error-message">${this.errorMessage.message}</div>`
        : ""}
    `;
  }
}

customElements.define("add-page", AddPage);
