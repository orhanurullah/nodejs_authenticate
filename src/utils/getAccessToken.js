
const getAccessToken = async(req, res) => {
    return await req.headers.authorization?.split(" ")[1];
}
module.exports = {
    getAccessToken
}