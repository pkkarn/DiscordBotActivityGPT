require('dotenv').config();

const OpenAI = require('openai');

const openai = new OpenAI({
	apiKey: process.env.OPENAI_KEY,
});

module.exports = {
    async jsonGPT(prompt) {
        const messages = [{ 'role': 'user', 'content': prompt }];
    
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages,
            response_format: {
                type: 'json_object',
            },
        });
    
        return response.choices[0].message.content;
    }
}
