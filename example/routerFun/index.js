
const base = require('./base');
const error = require('./error');

module.exports = function(Router) {
    base(Router);
    error(Router);
}
