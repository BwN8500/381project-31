const setHeaders = (req, res, next) => {
    if (!req) {
        return next();
    }
    if (!req.headers['authorization'] && req.cookies.token) {
        req.headers['authorization'] = `Bearer ${req.cookies.token}`;
    }
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    next();
};

module.exports = setHeaders;