import http from "../http-common";


class KazetaDataService{

    async get(){
        return await http.get('/Kazeta');
    }

    async getBySifra(sifra) {
        return await http.get('/Kazeta/' + sifra);
      }

    async delete(sifra){
        const odgovor = await http.delete('/Kazeta/' + sifra)
        .then(response => {
            return {ok: true, poruka: 'Obrisao uspješno'};
        })
        .catch(e=>{
            return {ok: false, poruka: e.response.data};
        });

        return odgovor;
    }


    async post(Kazeta){
        //console.log(smjer);
        const odgovor = await http.post('/Kazeta',Kazeta)
           .then(response => {
             return {ok:true, poruka: 'Unio kazetu'}; // return u odgovor
           })
           .catch(error => {
            //console.log(error.response);
             return {ok:false, poruka: error.response.data}; // return u odgovor
           });
     
           return odgovor;
    }

    async put(sifra,kazeta){
        //console.log(smjer);
        const odgovor = await http.put('/Kazeta/' + sifra,kazeta)
           .then(response => {
             return {ok:true, poruka: 'Promjenio kazetu'}; // return u odgovor
           })
           .catch(error => {
            //console.log(error.response);
             return {ok:false, poruka: error.response.data}; // return u odgovor
           });
     
           return odgovor;
         }

}

export default new KazetaDataService();