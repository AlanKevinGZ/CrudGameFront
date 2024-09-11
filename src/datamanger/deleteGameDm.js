export class DeleteGameDm{
    async getApi(id) {
        let response = await this.makeRequest(
          `http://localhost:8080/videogames/delete/${id}`,
          "DELETE"
        );
        return response;
      }
    
    
      
      async makeRequest(url, method = "GET") {
        try {
          
          let response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json", 
            },
          });
    
          return await response;
        } catch (error) {
          
          console.error("Error en makeRequest:", error);
          return null; 
        }
      }


}