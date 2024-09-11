import { LitElement, html, css } from 'lit';

export class Button extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    render() {
        return html``;
    }
}
customElements.define('button-componets', Button);
