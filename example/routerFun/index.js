
const base = require('./base');
const error = require('./error');
const extend = require('./extend');
const config = require('./config');
const cancel = require('./cancel');

module.exports = function(Router) {
    base(Router);
    error(Router);
    extend(Router);
    config(Router);
    cancel(Router);
}