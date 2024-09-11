import { LitElement, html, css } from 'lit';

export class Inputs extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }

            label{
                color:white;
            }
            input{
                width:100%;
                padding:0.5rem 0;
                margin:0.2rem 0
            }
        `
    ];

    static get properties() {
        return {
            type: { type: String  },
            name:{ type: String },
            placeHolder:{type:String},
            label:{type:String}
        };
    }

    constructor() {
        super();
        this.type="text";
        this.name="input";
        this.label="label"
    }
    
   

    render() {
        return html`
          <label for="${this.name}">${this.label}</label>
          <input type="${this.type}" name="${this.name}" id="${this.name}" placeholder="${this.placeHolder}">
        `;
    }
}
customElements.define('inputs-components', Inputs);
