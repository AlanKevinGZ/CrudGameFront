import { LitElement, html, css } from 'lit';

import "../../components/title/title.js";
import "../../components/imagenes/image.js";
import "../../components/text_main/text_main.js"

export class HomePage extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
            .main_header{
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                align-items:center;
                gap:1rem;
                margin-top:2rem
            }
        `
    ];

    render() {
        return html`
            <div class="main_header">
               <div class="text_main">
                  <title-component title="Discover Your Next Gaming Adventure"></title-component>
                  <text-main-components textMain="Browse our extensive catalog of the latest and greatest video games. Find your perfect match and start playing today."></text-main-components>
               </div>
                <div class="img_main">
                 <image-componets src="https://image.api.playstation.com/vulcan/ap/rnd/202212/0711/nqyAJzSXromWZPf7SzCiDtZh.jpg?w=5000&thumb=false" alt="main_img"></image-componets>
                </div>
            </div>
        
        `;
    }
}
customElements.define('home-page', HomePage);
