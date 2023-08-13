
const getAccessToken = async(req, res) => {
    const token = await req.headers.authorization?.split(" ")[1];
    return token;
}
module.exports = {
    getAccessToken
}