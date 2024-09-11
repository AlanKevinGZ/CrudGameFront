export class postGameDm {


    async postApi(body) {
        let response = await this.makeRequest(
          "http://localhost:8080/videogames/create",
          "POST",
          body
        );
        return response;
      }
        
      async makeRequest(url, method, body) {
        try {
          
          let response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json", 
            },
            body: JSON.stringify(body),
          });
          if (!response.ok) {
            return await response.text();
          }
          
          return await response.json();
        } catch (error) {
          
          console.error("Error", error);
          return null; 
        }
      }
}