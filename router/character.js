const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auth');

const Character = require('../model/character');
const Relation = require('../model/relation');
const User = require('../model/user');

const checkObjectId = require('../middleware/checkObjectId.js');


//@route    POST api/characters
//@desc     Create a new Charaters
//@access   Private

router.post("/",[auth,[ check('name',"Name is required").not().isEmpty(),
check('age',"Age is required").not().isEmpty(),
check('gender',"Gender is required").not().isEmpty(),
check('occupation',"Occupation is required").not().isEmpty(),
]],async(req,res)=>{
   try{

   
        const user = await User.findById(req.user.id).select('-password');

        const newCharacter = new Character({
            name: req.body.name,
            user: req.user.id,
            age: req.body.age,
            gender: req.body.gender,
            occupation: req.body.occupation 
        });

        const character = await newCharacter.save();

        res.send(character);

    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error.....")
    }   
});


    // @route    GET api/characters
    // @desc     Get all Characters
    // @access   Public

router.get("/",async(req,res)=>{
    try{
        const characters = await Character.find().sort({date: -1});
        res.json(characters);
    }catch(err){
        console.log(err.message);
        res.status(500).json("Server Error.......");
    }
});

// @route    GET api/characters/:id
// @desc     Get character by ID
// @access   Public

router.get("/:id",[checkObjectId('id')],async (req,res)=>{
    try{
        const character = await Character.findById(req.params.id);

        if(!character){
            return res.status(400).send("No Character Available!!");
        }
        res.json(character);
    }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error.......");
    }
});

// @route    DELETE api/characters/:id
// @desc     Delete a Character
// @access   Private

router.delete('/:id',[auth,checkObjectId('id')],async(req,res)=>{
    try{
        const character = await Character.findById(req.params.id);

        if(!character) {
            return res.status(400).json({msg: "Character not found!!"});
        }
        //check user
        if(character.user.toString() !== req.user.id){
            return res.status(401).json({msg: "User not authorized"});
        }

        // await character.remove();
        const deleteResult = await Character.deleteOne(character);

        res.json({msg: "Character removed......"});
    }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error.......");
    }
});

// @route    PUT api/characters/relation/:id
// @desc     Add a Relation
// @access   Private
router.put('/relation/:id', auth, checkObjectId('id'), async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);
  
        const newRelation = new Relation({
            name: req.body.name,
            id: character.id,
            description: req.body.age,
        });

        const relation = await newRelation.save();

        res.send(character);
  
      
      await character.save();
  
      return res.json(character.relation);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
//   // @route    PUT api/posts/unlike/:id
//   // @desc     Unlike a post
//   // @access   Private
//   router.put('/unlike/:id', auth, checkObjectId('id'), async (req, res) => {
//     try {
//       const post = await Post.findById(req.params.id);
  
//       // Check if the post has not yet been liked
//       if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
//         return res.status(400).json({ msg: 'Post has not yet been liked' });
//       }
  
//       // remove the like
//       post.likes = post.likes.filter(
//         ({ user }) => user.toString() !== req.user.id
//       );
  
//       await post.save();
  
//       return res.json(post.likes);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   });
  
//   // @route    POST api/posts/comment/:id
//   // @desc     Comment on a post
//   // @access   Private
//   router.post(
//     '/comment/:id',
//     auth,
//     checkObjectId('id'),
//     check('text', 'Text is required').notEmpty(),
//     async (req, res) => {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
  
//       try {
//         const user = await User.findById(req.user.id).select('-password');
//         const post = await Post.findById(req.params.id);
  
//         const newComment = {
//           text: req.body.text,
//           name: user.name,
//           avatar: user.avatar,
//           user: req.user.id
//         };
  
//         post.comments.unshift(newComment);
  
//         await post.save();
  
//         res.json(post.comments);
//       } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//       }
//     }
//   );
  
//   // @route    DELETE api/posts/comment/:id/:comment_id
//   // @desc     Delete comment
//   // @access   Private
//   router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
//     try {
//       const post = await Post.findById(req.params.id);
  
//       // Pull out comment
//       const comment = post.comments.find(
//         (comment) => comment.id === req.params.comment_id
//       );
//       // Make sure comment exists
//       if (!comment) {
//         return res.status(404).json({ msg: 'Comment does not exist' });
//       }
//       // Check user
//       if (comment.user.toString() !== req.user.id) {
//         return res.status(401).json({ msg: 'User not authorized' });
//       }
  
//       post.comments = post.comments.filter(
//         ({ id }) => id !== req.params.comment_id
//       );
  
//       await post.save();
  
//       return res.json(post.comments);
//     } catch (err) {
//       console.error(err.message);
//       return res.status(500).send('Server Error');
//     }
//   });


module.exports = router;