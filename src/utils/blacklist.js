const blackList = [];

async function addTokenToBlackList(token){
    blackList.push(token);
}
async function hasTheTokenInBlackList(token){
    return blackList.includes(token);
}
module.exports = {
    addTokenToBlackList,
    hasTheTokenInBlackList
};