
/*
function error(res, status, message) {
    res.status(status);
    return res.json({
        type: 'error',
        error: status,
        message: message
    });
}

export function notFound(req, res) {
    return error(res, 404, `ressource non disponible : ${req.url}`);
}

export function badRequest(req, res, message = null) {
    return error(res, 400, message ?? `requête mal formée : ${req.url}`);
}

export function forbidden(req, res, message = null) {
    return error(res, 403, message ?? `accès interdit : ${req.url}`);
}

export function internalServerError(req, res, message = null) {
    return error(res, 500, message ?? `une erreur s'est produite sur le serveur`);
}

export function methodNotAllowed(req, res) {
    return error(res, 405, `méthode non autorisée : ${req.method} ${req.url}`);
}
*/