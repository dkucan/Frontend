import http from '../http-common';

class clanDataService {
  async getAll() {
    return await http.get('/Clan');
  }



  async getBySifra(sifra) {
    return await http.get('/Clan/' + sifra);
  }

  async post(clan){
    //console.log(smjer);
    const odgovor = await http.post('/Clan',clan)
       .then(response => {
         return {ok:true, poruka: 'Unio Clana'}; // return u odgovor
       })
       .catch(error => {
        console.log(error.response);
         return {ok:false, poruka: error.response.data}; // return u odgovor
       });
 
       return odgovor;
  }

  async put(sifra,Clan){
    const odgovor = await http.put('/Clan/' + sifra,Clan)
       .then(response => {
         return {ok:true, poruka: 'Promjenio Clana'}; // return u odgovor
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

export default new clanDataService();