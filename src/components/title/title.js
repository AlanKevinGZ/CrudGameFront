import { LitElement, html, css } from 'lit';

export class Title extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                color:white;
            }
            h1{
                font-size:2.5rem;
            }
        `
    ];
    
    static get properties() {
        return {
            title: { type: String },
        };
    }


    constructor(){
        super();
        this.title="Title";
        
    }

    render() {
        return html`
            <h1> ${this.title}  </h1>
        `;
    }
}
customElements.define('title-component', Title);
