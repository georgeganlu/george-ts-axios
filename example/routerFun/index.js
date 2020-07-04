
const base = require('./base');
const error = require('./error');
const extend = require('./extend');
const config = require('./config');
const cancel = require('./cancel');
const cookie = require('./cookie');
const more = require('./more');
const withCredentials = require('./withCredentials');
const csrf = require('./csrf');
const progress = require('./progress');
module.exports = function(Router) {
    base(Router);
    error(Router);
    extend(Router);
    config(Router);
    cancel(Router);
    cookie(Router);
    more(Router);
    withCredentials(Router);
    csrf(Router);
    progress(Router);
}