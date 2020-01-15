const Dev = require('../models/Dev');

const convertTextWithCommaToArray = (multipleTexts) => {
    return multipleTexts.split(',').map(text => text.trim());
}

module.exports = {
    async index(request, response){
        const { latitude, longitude, techs } = request.query;
        const techsArray = convertTextWithCommaToArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location:{
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 1000,
                }
            }
        });

        return response.json({ devs: devs });
    }
};
