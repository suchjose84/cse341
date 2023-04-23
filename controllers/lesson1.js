const yosemiteRoute = (req, res) => {
    res.send('Yosemite Sam');
};

const bugsRoute = (req, res) => {
    res.send('Bugs Bunny');
};

module.exports = {
    yosemiteRoute,
    bugsRoute
};