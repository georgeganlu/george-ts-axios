
const base = require('./base');
const error = require('./error');
const extend = require('./extend');
const config = require('./config');

module.exports = function(Router) {
    base(Router);
    error(Router);
    extend(Router);
    config(Router);
}