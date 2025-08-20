const localStrategy = require('passport-local').Strategy;
const passport = require('passport');
const person = require('./Models/person');


passport.use(new localStrategy(async(USERNAME , Password , done) =>{
    try{
        console.log('Recived credentials', USERNAME ,Password);
        const user = await person.findOne({username : USERNAME});
        if(!user)
            return done(null, false ,{message : 'Invaild Username'});
        const isPassMatch = user.password === Password ? true : false;
        if(isPassMatch){
            return done(null , user);
        }else{
            return done(null , false , {message : 'Invalid password'});
        }       
    }catch(err){
        return done(err);
    }
}))

module.exports = passport;