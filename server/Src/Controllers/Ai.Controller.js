const generateContent = require('../AiService');

const getReview = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ message: 'Code is required' });
    }

    const response = await generateContent(code);
    res.json({ result: response });

  }catch (error) {
  console.error("AI ERROR:", error);
  res.status(500).json({ message: error.message });
}

};

module.exports = { getReview };
