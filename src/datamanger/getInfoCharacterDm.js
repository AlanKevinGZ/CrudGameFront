export class GetVideoGamesDm {
  async getApi() {
    let response = await this.makeRequest(
      "http://localhost:8080/videogames/get",
      "GET"
    );

    let mappedGames = this.mapperGames(response);
    return mappedGames;
  }

 
  mapperGames(response) {
    return response.map((item) => ({
      id:item.id,
      name: item.name,
      cost: item.cost,
      img: item.img,
      categories:item.categories.map((categorie)=>{
      return categorie.name;
       
      })
    }));
  }

  
  async makeRequest(url, method = "GET") {
    try {
      
      let response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json", 
          Accept: "application/json",
        },
      });

      return await response.json();
    } catch (error) {
      
      console.error("Error en makeRequest:", error);
      return null; 
    }
  }
}
