import * as Supertest from 'supertest';

class ActorService {
    
    getActors(roles: any) {
        return new Promise((resolve, reject) => {
            Supertest('https://filmpolis-api.herokuapp.com')
                .post('/api-gateway/actors/id')
                    .send(roles)
                        .end((err, res) => {
                            if (res) //Validar la respuesta
                                resolve(JSON.parse(res.text).data);
                            else resolve([]);
                    });
                });
    }
}

export { ActorService };