import restify from 'restify';
import logger from 'morgan';
import PrincipalRouter from '../routes';
import corsMiddleware from 'restify-cors-middleware2';

const server = restify.createServer({
    name: process.env.SERVICE_NAME || 'service-name',
    version: process.env.SERVICE_VERSION || '1.0.0',
});

server.use(logger('dev'));

const cors = corsMiddleware({
    allowHeaders : [ 'X-XSRF-TOKEN', 'Authorization', ],
    credentials : true,
    exposeHeaders : [],
    origins : ['http://lcoalhost:3000'],
});

server.pre(cors.preflight);
server.use(cors.actual);

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser()); //query -> Fronted -> STRING -> JSON.parse(query)
server.use(restify.plugins.bodyParser()); //body -> Fronted -> STRING -> JSON.parse(body)

server.get('/public/*', //don´t forget tje `/*`
    restify.plugins.serveStaticFiles('images')
);

PrincipalRouter.applyRoutes(server);

export {
    server,
};