const blackList = [];

async function addTokenToBlackList(token){
    blackList.push(token);
}
async function hasTheTokenInBlackList(token){
    return blackList.includes(token);
}
async function getTokenBlackList(){
    return blackList;
}
module.exports = {
    addTokenToBlackList,
    hasTheTokenInBlackList,
    getTokenBlackList
};