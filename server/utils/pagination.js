export const pagination = async (req, res) => {
    // const query = req.query ? req.query : ;
    const query = req.query;
    return {
        "page": query.page ? parseInt(query.page): 0,
        "perpage": query.perpage ? parseInt(query.perpage) : 10,
        "sortBy": query.sortBy ? query.sortBy : 'salesDate'
    }
};
    // const pagination = {"page" : page, "perpage": perpage, "sortBy": sortBy};

export default pagination;