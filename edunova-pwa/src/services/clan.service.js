import http from '../http-common';

class clanDataService {
  async getAll() {
    return await http.get('/clan');
  }



  async getBySifra(sifra) {
    return await http.get('/clan/' + sifra);
  }

  async post(clan){
    //console.log(smjer);
    const odgovor = await http.post('/clan',clan)
       .then(response => {
         return {ok:true, poruka: 'Unio clana'}; // return u odgovor
       })
       .catch(error => {
        console.log(error.response);
         return {ok:false, poruka: error.response.data}; // return u odgovor
       });
 
       return odgovor;
  }

  async put(sifra,clan){
    const odgovor = await http.put('/clan/' + sifra,clan)
       .then(response => {
         return {ok:true, poruka: 'Promjenio clana'}; // return u odgovor
       })
       .catch(error => {
        console.log(error.response);
         return {ok:false, poruka: error.response.data}; // return u odgovor
       });
 
       return odgovor;
     }


  async delete(sifra){
    
    const odgovor = await http.delete('/clan/' + sifra)
       .then(response => {
         return {ok:true, poruka: 'Obrisao uspješno'};
       })
       .catch(error => {
         console.log(error);
         return {ok:false, poruka: error.response.data};
       });
 
       return odgovor;
     }
     
 
}

export default new ClanDataService();