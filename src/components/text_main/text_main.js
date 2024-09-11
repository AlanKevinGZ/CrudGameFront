import { LitElement, html, css } from 'lit';

export class Text_Main extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                color:white;
            }
            p{
                font-size:1.3rem;
                margin:0;
            }
        `
    ];

    static get properties() {
        return {
            textMain: { type: String },
        };
    }
    
    constructor(){
        super();
        this.textMain="text main";
    }

    render() {
        return html`
         <p> ${this.textMain} </p>
        `;
    }
}
customElements.define('text-main-components', Text_Main);
