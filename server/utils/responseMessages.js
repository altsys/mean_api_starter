function errorMesssages(statusCode) {
    return {
        200: "OK. Request successfully returned.",
        201: "Created. Resource is Successfully Created.",
        202: "Accepted. Your request is being processed.",
        203: "No Content. There is no resource. ",
        301: "Moved. The requested URI has been moved.",
        400: "Bad Request. Your request fails validation.",
        401: "Unauthorized. You need to get authenticated to access the resource.",
        403: "Forbidden. You don't have access right to the resource.",
        404: "Not Found. The server can not find the requested resource.",
        408: "Request Timeout.",
        500: "Internal Server Error.",
        501: "Not Implemented. The server doesn't recognize the request or it cannot fulfill it.",
        502: "Bad Gateway. There is an invalid response from the upstream server.",
        503: "Service Unavailable. Something unexpected happened."
    }[statusCode]
}
export const successResponse = (res, resource, statusCode) => {
    statusCode = statusCode || 200;
    res.status(statusCode).json(resource);
};
export const errorResponse = (res, error, statusCode) =>  {
    statusCode = statusCode || 500;
    const msg = errorMesssages(statusCode);
    res.status(statusCode).json({ msg, error: error });
};
export const notFoundResponse = (res, resource, statusCode) => {
    statusCode = statusCode || 404;
    const msg = errorMesssages(statusCode);
    if (!resource || resource.length === 0) {
        res.status(404).json({ msg });
    }
}


