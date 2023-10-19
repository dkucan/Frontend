import http from "../http-common";


class kazetadataservice{

    async get(){
        return await http.get('/kazeta');
    }

    async getBySifra(sifra) {
        return await http.get('/kazeta/' + sifra);
      }

    async delete(sifra){
        const odgovor = await http.delete('/kazeta/' + sifra)
        .then(response => {
            return {ok: true, poruka: 'Obrisao uspješno'};
        })
        .catch(e=>{
            return {ok: false, poruka: e.response.data};
        });

        return odgovor;
    }


    async post(kazeta){
        //console.log(kazeta);
        const odgovor = await http.post('/kazeta',kazeta)
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
        //console.log(kazeta);
        const odgovor = await http.put('/kazeta/' + sifra,kazeta)
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

export default new kazetadataservice();