const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const auth = require('../middleware/auth');
const checkObjectId = require('../middleware/checkObjectId.js');

// Create Controller Variable
const characterController = require('../controller/characterController');


//@route    POST api/characters
//@desc     Create a new Charaters
//@access   Private

router.post("/",[auth,[ check('name',"Name is required").not().isEmpty(),
check('age',"Age is required").not().isEmpty(),
check('gender',"Gender is required").not().isEmpty(),
check('occupation',"Occupation is required").not().isEmpty(),
]],characterController.createCharacter);


    // @route    GET api/characters
    // @desc     Get all Characters
    // @access   Public

router.get("/",characterController.getAllCharacter);

// @route    GET api/characters/:id
// @desc     Get character by ID
// @access   Public

router.get("/:id",[checkObjectId('id')],characterController.getCharacter);

// @route    DELETE api/characters/:id
// @desc     Delete a Character
// @access   Private

router.delete('/:id',[auth,checkObjectId('id')],characterController.deleteCharacter);

// @desc      Upload photo for Character
// @route     PUT /api/characterss/:id/photo
// @access    Private
router.put('/:id/photo',[auth,checkObjectId('id')],characterController.uploadPhotos);

// @route    PUT api/characters/relation/:id
// @desc     Add a Relation
// @access   Private
router.put('/relation/:id', auth, checkObjectId('id'), characterController.addRelations);


// @desc    Update character
// @route   PUT /api/characters/:id
// @access  Private

router.put('/update/:id', auth, checkObjectId('id'), characterController.updateCharacter);
  
  

module.exports = router;