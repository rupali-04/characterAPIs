const Character = require('../model/character');
const Relation = require('../model/relation');
const User = require('../model/user');

exports.createCharacter = async(req,res)=>{
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
 };

 exports.getAllCharacter = async(req,res)=>{
    try{
        const characters = await Character.find().sort({date: -1});
        res.json(characters);
    }catch(err){
        console.log(err.message);
        res.status(500).json("Server Error.......");
    }
};

exports.getCharacter = async (req,res)=>{
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
};

exports.deleteCharacter = async(req,res)=>{
    try{
        const character = await Character.findById(req.params.id);

        if(!character) {
            return res.status(400).json({msg: "Character not found!!"});
        }
        //check user
        if(character.user.toString() !== req.user.id){
            return res.status(401).json({msg: "User not authorized"});
        }

        character.relations.forEach(
            async(relation) => await Character.deleteOne(relation)
        );
        
        //await character.remove();


        const deleteResult = await Character.deleteOne(character);

     

        res.json({msg: "Character removed......"});
    }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error.......");
    }
};

exports.uploadPhotos = async(req,res)=>{
    const character = await Character.findById(req.params.id);
  
    if (!character) {
      return res.status(400).send("Chracter not found....");
    }
  
    // Make sure user is character owner
    if (character.user.toString() !== req.user.id) {
        return res.status(400).send("User not Allowed to change in Character....");
    }
   
    if (!req.files) {
      return res.status(400).send("Please Upload a Photo");
    
    }
  
  
  
    const file = req.files.file;
  
    // Make sure the image is a photo
    if (!file.mimetype.startsWith('image')) {
      return res.status(400).send("Please Upload a Image Type file");
    }
  
  //   // Check filesize
  //   if (file.size > 400) {
  //     return next(
  //       new ErrorResponse(
  //         `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
  //         400
  //       )
  //     );
  //   }
  
  
    file.mv(`./public/uploads/${file.name}`, async err => {
      if (err) {
        console.error(err);
        return res.status(400).send("There is some issue in File Upload.....");
      }
  
        character.photos.unshift(file.name);
        await character.save();
      res.status(200).json({
        success: true,
        data: file.name
      });
    });
  };


exports.addRelations = async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);


        const tempRel = await Relation.find({idCharacter: req.body.idCharacter},'_id');
        const newArr = Array.from(tempRel, (rel) => rel._id)
        
    
        if(newArr.some((item) => character.relations.includes(item))){
           

            return res.status(400).send('Relation is Already there');
           }     
        

        const newRelation = new Relation({
            name: req.body.name,
            idCharacter: req.body.idCharacter,
            description: req.body.description,
        });

        const relation = await newRelation.save();
       

        character.relations.unshift(relation);
        await character.save();

      
      
  
      return res.json(character.relations);
    
            
              } catch (err) {
      //console.error(err);
      res.status(500).send('Server Error');
    }
  };

  exports.updateCharacter = async (req, res) => {
    try{
        let character = await Character.findById(req.params.id);
            if (!character) {
                return  res.status(401).send('Character dose not exsit');
            }
            // Make sure user is chracter owner
            if (character.user.toString() !== req.user.id) {
                return  res.status(401).send('User is not owner....');
            }
            character = await Character.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json({ success: true, data: character });
        
    }catch(err){
            return  res.status(500).send('Server Error');
    }
    };

    


