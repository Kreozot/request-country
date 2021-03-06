var getClientIp = require('request-ip').getClientIp;
var getGeo = require('geoip-country').lookup;

function requestCountry(req) {
	var geo = getGeo(getClientIp(req));
	return (geo && geo.country) || false;
}

requestCountry.middleware = function(options){
	var attr = options && options.attributeName || 'requestCountryCode';
	return function(req, res, next) {
		req[attr] = requestCountry(req);
		next();
	}
};

module.exports = requestCountry;
