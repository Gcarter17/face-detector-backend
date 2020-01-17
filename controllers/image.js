const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: 'ada3f2cb8b004417988b6634aa04cc6c'
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            console.log(data);
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'))
    }

const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
    // .update({})
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
        // console.log(entries)
    })
    .catch(err => res.status(400).json('0'))
}

module.exports = {handleImage, handleApiCall}

// C:\Program Files\heroku\client\node_modules\yarn\lib