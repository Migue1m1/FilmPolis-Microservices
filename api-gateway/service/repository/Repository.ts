import { Application, Request, Response } from 'express';
import * as fs                            from 'fs';
import * as supertest from 'supertest';

class Repository {
    mappingServices: any[];

    constructor () {
        this.mappingServices = require('../../def/api-def.json');
    }

    private appMethod (app: any, proxyPath: any, host: any, port: any, path: any, method: any) {
        let proxyReq = null;
        let url = null;

        switch (method.toUpperCase()) {
            case "GET":
                app.get (proxyPath, (req: Request, res: Response) => {
                    let param = req.params.name === undefined? (req.params.title === undefined? (req.params.id === undefined? req.params.text: req.params.id): req.params.title): req.params.name;
                    url = host + ":" + port;
                    supertest(url)
                        .get(path + '/' + param)
                            .end((err, resServ) => {
                                if (resServ) {
                                    let resp = JSON.parse(resServ.text);
                                    return res.status(resp.status).json(resp);
                                }
                            });
                });
                break;
            case "POST":
                app.post (proxyPath, (req: Request, res: Response) => {
                    url = host + ":" + port;
                    console.log(req.body);
                    supertest(url)
                        .post(path)
                            .send(req.body)
                                .end((err, resServ) => {
                                    if (resServ) {
                                        let resp = JSON.parse(resServ.text);
                                        return res.status(resp.status).json(resp);
                                    }
                                });
                });
                break;
            case "POST ROLES":
                app.post (proxyPath, (req: Request, res: Response) => {
                    url = host + ":" + port;
                    console.log(req.body);
                    supertest(url)
                        .post(path)
                            .send(req.body)
                                .end((err, resServ) => {
                                    if (resServ) {
                                        return res.status(200).json({ data: JSON.parse(resServ.text).data });
                                    }
                                });
                });
                break;
            case "PUT":
                break;
            case "DELETE":
                break;
        }
    }

    public registerRoutes(app: Application) {
        for (let i = 0; i < this.mappingServices.length; i++) {
            let redirects = this.mappingServices[i].redirects;
            for (let j = 0; j < redirects.length; j++) {
                let method = redirects[j].method === undefined? "GET": redirects[j].method;
                let proxyRoute = '/api-gateway' + this.mappingServices[i].service + redirects[j].from;
                this.appMethod(app, proxyRoute, this.mappingServices[i].host, this.mappingServices[i].port, redirects[j].to, method);
            }
        }
    }
}

export { Repository };