const bugsRoute = (req, res) => {
    res.send('Bugs Bunny');
};
const daffyRoute = (req, res) => {
    res.send('Daffy Duck');
};
const yosemiteRoute = (req, res) => {
    res.send('Yosemite Sam');
};

module.exports = {
    yosemiteRoute,
    bugsRoute,
    daffyRoute
};