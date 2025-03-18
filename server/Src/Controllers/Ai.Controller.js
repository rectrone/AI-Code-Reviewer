const AiService = require('../AiService');


module.exports.getReview = async (req, res) => {
    const code = req.body.code;
    if (!code) {
        return res.status(400).json({ message: 'Prompt is required' });
    }

    const response = await AiService(code);
    res.send(response)
}