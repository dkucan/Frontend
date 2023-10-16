import http from '../http-common';

class ClanDataService {
  async getAll() {
    return await http.get('/Clan');
  }



  async getBySifra(sifra) {
    return await http.get('/Clan/' + sifra);
  }

  async post(clan){
    //console.log(kazeta);
    const odgovor = await http.post('/Clan',clan)
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
    const odgovor = await http.put('/Clan/' + sifra,clan)
       .then(response => {
         return {ok:true, poruka: 'Promjenio Clan'}; // return u odgovor
       })
       .catch(error => {
        console.log(error.response);
         return {ok:false, poruka: error.response.data}; // return u odgovor
       });
 
       return odgovor;
     }


  async delete(sifra){
    
    const odgovor = await http.delete('/Clan/' + sifra)
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