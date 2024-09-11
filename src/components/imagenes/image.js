import { LitElement, html, css } from 'lit';

export class Image extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
            img{
                width:100%;
            }
        `
    ];

    static get properties() {
        return {
            src: { type: String },
            alt: { type: String }
        };
    }

    render() {
        return html`
          <img src="${this.src}" alt="${this.alt}">
        `;
    }
}
customElements.define('image-componets', Image);
