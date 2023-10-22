import http from "../http-common";

class PosudbaDataService {
  getAll() {
    return http.get("/posudba");
  }

  async getBySifra(sifra) {
   // console.log(sifra);
    return await http.get('/posudba/' + sifra);
  }

  async getClanovi(sifra) {
    // console.log(sifra);
     return await http.get('/posudba/' + sifra + '/clan');
   }
 


  async post(posudba){
    //console.log(smjer);
    const odgovor = await http.post('/posudba',posudba)
       .then(response => {
         return {ok:true, poruka: 'Unio posudbu'}; // return u odgovor
       })
       .catch(error => {
        console.log(error.response);
         return {ok:false, poruka: error.response.data}; // return u odgovor
       });
 
       return odgovor;
}


  async delete(sifra){
    
    const odgovor = await http.delete('/posudba/' + sifra)
       .then(response => {
         return {ok:true, poruka: 'Obrisao uspješno'};
       })
       .catch(error => {
         console.log(error);
         return {ok:false, poruka: error.response.data};
       });
 
       return odgovor;
     }

     async obrisiClana(posudba, clan){
    
      const odgovor = await http.delete('/posudba/obrisiclan/' + posudba + '/' + clan)
         .then(response => {
           return {ok:true, poruka: 'Obrisao uspješno'};
         })
         .catch(error => {
           console.log(error);
           return {ok:false, poruka: error.response.data};
         });
   
         return odgovor;
       }

       async dodajclana(posudba, clan){
    
        const odgovor = await http.post('/posudba/dodajclan/' + posudba + '/' + clan)
           .then(response => {
             return {ok:true, poruka: 'Dodao uspješno'};
           })
           .catch(error => {
             console.log(error);
             return {ok:false, poruka: error.response.data};
           });
     
           return odgovor;
         }

}

export default new PosudbaDataService();