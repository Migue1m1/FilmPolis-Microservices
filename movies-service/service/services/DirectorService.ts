import * as Supertest from 'supertest';

class DirectorService {
    
    getDirectors(roles: any) {
        return new Promise((resolve, reject) => {
            Supertest('localhost:9090')
                .post('/api-gateway/directors/id')
                    .send(roles)
                        .end((err, res) => {
                            if (res) //Validar la respuesta
                                resolve(JSON.parse(res.text).data);
                            else resolve([]);
                    });
                });
    }
}

export { DirectorService };