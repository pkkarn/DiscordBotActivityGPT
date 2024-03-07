const { jsonGPT } = require('../openai/index')

let paramExtractionPrompt = (message) => `
    Extract username and date from following message: ${message} and return in defined json format.\n
    Available Projects:  [
        'GoMad',
        'Boundless',
        'TWE',
        'Pearson',
        'Leap',
        'TransforME',
    ]\n

    JSON FORMAT: {
        username: <username>, 
        date: <date_in_iso_format e.g. 2024-03-05T12:56:39.568Z>, 
        project_name: <choose_closest_matching_project_from_available_projects_if_not_available_use_GoMad>
    }
`

module.exports = {
    async extractUsernameAndDate(message) {
        const prompt = paramExtractionPrompt(message);
        const response = await jsonGPT(prompt)

        return response
    }
}