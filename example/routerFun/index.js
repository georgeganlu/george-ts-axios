
const base = require('./base');
const error = require('./error');
const extend = require('./extend');

module.exports = function(Router) {
    base(Router);
    error(Router);
    extend(Router);
}