const inputPrompt = require("../models/input-prompt");
const openai = require("../config/openai");

module.exports = {
    async sendText(req, res) {
        const openaiAPI = openai.configuration();
        const inputModel = new inputPrompt(req.body);

        try {
            const response = await openaiAPI.chat.completions.create(
                openai.textCompletion(inputModel)
            );

            return res.status(200).json({
                success: true,
                data: response.choices[0].message.content,
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error.response?.data || error.message || 'An error occurred'
            });
        }
    },
};
