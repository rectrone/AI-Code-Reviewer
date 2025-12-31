// import { getResponse } from '../Controllers/Ai.Controller';
// const AiController= require('../Controllers/Ai.Controller')

// const express = require('express');

// const router = express.Router();

// router.post('/get-review',AiController.getReview);


// module.exports= router;

const express = require('express');
const { getReview } = require('../Controllers/Ai.Controller');

const router = express.Router();

router.post('/get-review', getReview);

module.exports = router;
