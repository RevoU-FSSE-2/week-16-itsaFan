

const test = async (req, res) => {
    res.json({ message: "This is a protected resource." });
}


module.exports = {
    test,
}