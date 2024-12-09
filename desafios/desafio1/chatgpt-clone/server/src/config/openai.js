const OpenAI = require("openai");

module.exports = class openai {
    static configuration() {
        return new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
        }

    static textCompletion({ prompt }) {
        return {
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 1,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        };
    }
};
