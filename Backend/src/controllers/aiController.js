const { generateContent } = require('../../Services/aiServices')

module.exports.getResponse = async (req, res) => {
    const code = req.body.code

    if (!code) {
        return res.status(400).json({ error: 'Prompt is required' })
    }

    try {
        const response = await generateContent(code)
        res.send(response)
    } catch (error) {
        console.error('AI request error:', error)
        res.status(500).json({ error: error.message || 'Failed to generate AI response' })
    }
}
