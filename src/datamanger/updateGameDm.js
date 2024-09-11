export class UpdateGameDm{

    async getApiUpdate(body,id) {
      console.log(id);
      
        let response = await this.makeRequest(
          `http://localhost:8080/videogames/update/${id}`,
          "PUT",
          body
        );
    
        
        return response;
      }
    
     
    
    
      
      async makeRequest(url, method = "GET",body) {
        try {
          
          let response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json", 
              },
              body: JSON.stringify(body),
          });
    
          return await response.json();
        } catch (error) {
          
          console.error("Error en makeRequest:", error);
          return null; 
        }
      }
}