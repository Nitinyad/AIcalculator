// const express = require('express');
// const router = express.Router();
// const base64 = require('base-64'); // Using a well-established library for base64 encoding/decoding
// const Jimp = require('jimp'); // Popular image processing library for Node.js

// // Import your analyze_image function (assuming it's in a separate file)
// const analyzeImage = require('./utils');

// // Define your ImageData schema (if needed)
// const ImageData = {
//   image: String,
//   dict_of_vars: Object, // Assuming dict_of_vars is an object
// };

// router.post('/', async (req, res) => {
//   try {
//     console.log("request body : " , req.body)
//     const { image, dict_of_vars } = req.body;

//     // Validate request body (optional but recommended)
//     if (!image || !dict_of_vars) {
//       return res.status(400).json({ message: 'Missing required fields in request body' });
//     }

//     // Decode base64 image data
//     const imageData = base64.decode(image.split(',')[1]);

//     // Create a Jimp image object
//     const imageBuffer = new Buffer(imageData, 'base64');
//     const jimpImage = await Jimp.read(imageBuffer);

//     // Analyze the image
//     const responses = await analyzeImage(jimpImage, dict_of_vars);

//     // Prepare the response data
//     const data = responses.map(response => response); // Assuming responses is an array

//     res.json({ message: 'Image processed', data, status: 'success' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// module.exports = router;



//// before claude ans

// const express = require('express');
// const base64 = require('base-64');
// const Jimp = require('jimp');
// const analyzeImage = require('./utils'); // Import your analyze_image function
// const router = express.Router();
// const { imageDataSchema } = require('../../schema');
// // import * as JimpObj from 'jimp';

// // const Jimp = JimpObj.default;

// // POST route
// router.post('/', async (req, res) => {
//   try {
//     console.log(req.body);
//     const { error } = imageDataSchema.validate(req.body);
    
//     if (error) {
//       return res.status(400).json({ message: error.details[0].message });
//     }

//     const { image, dict_of_vars } = req.body;

//     // Ensure you split the base64 data correctly
//     const base64Image = image.split(',')[1]; // This extracts the actual base64 string
//     const imageBuffer = Buffer.from(base64Image, 'base64'); // Decode the base64 string to a buffer

//     console.log('Image Buffer:', imageBuffer);


//     // Read image using Jimp
    
//     const jimpImage = await Jimp.default.read(imageBuffer);

//     // Analyze the image
//     const responses = await analyzeImage(jimpImage, dict_of_vars);

//     // Prepare the response data
//     const data = responses.map(response => response);

//     res.json({ message: 'Image processed', data, status: 'success' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// module.exports = router;


const express = require('express');
const base64 = require('base-64');
const sharp = require('sharp');
const analyzeImage = require('./utils'); // Import your analyze_image function
const router = express.Router();
const { imageDataSchema } = require('../../schema');

// POST route
router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const { error } = imageDataSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { image, dict_of_vars } = req.body;

    // Ensure you split the base64 data correctly
    const base64Image = image.split(',')[1]; // This extracts the actual base64 string
    const imageBuffer = Buffer.from(base64Image, 'base64'); // Decode the base64 string to a buffer

    console.log('Image Buffer:', imageBuffer);

    // Create a new Sharp image from the buffer
    const sharpImage = sharp(imageBuffer);

    // Analyze the image
    const responses = await analyzeImage(sharpImage, dict_of_vars);

    // Prepare the response data
    const data = responses.map(response => response);

    res.json({ message: 'Image processed', data, status: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;