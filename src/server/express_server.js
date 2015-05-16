/*
 * ===========================================================================
 * File: server.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import errorHandler from 'errorhandler';
import path from 'path';
import http from 'http';
import * as routes from './routes';

class ExpressServer {
    constructor() {
        this.app = express();
        this.server = null;

        this._configureExpress();
    }

    listen(port = 8000) {
        this.port = process.env.PORT || port;

        // create the HTTP Server and start listening.
        this.server = http.createServer(this.app);
        this.server.listen(port, () => {
          console.log('Express server listening on port: ' + port);
        });

        return this;
    }

    _configureExpress() {
        this.app.use(bodyParser());
        this.app.use(methodOverride());
        this.app.use(cookieParser('your secret here'));
        this.app.use(session());
        this.app.use(express.static(path.join(__dirname, '../../dist')));

        this._configureRoutes();

        // enable development mode by default to aid with debugging.
        var env = process.env.NODE_ENV || 'development';
        if ('development' == env) {
          this.app.use(errorHandler());
        }
    }

    _configureRoutes() {
        this.app.get('/', routes.index);
    }
}

export default ExpressServer;
