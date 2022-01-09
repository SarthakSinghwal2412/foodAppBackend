const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
db_link ="mongodb+srv://admin:p0Svk5bZFsPxrSAw@cluster0.be5gy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// p0Svk5bZFsPxrSAw
mongoose.connect(db_link).then(function(db){
    console.log("databse connected");
})
.catch(function(err){
        console.log(err);
})

const userSchema = mongoose.Schema({
    name :{
        type : String,
        required : true,
    },
    email :{
        type : String,
        required : true,
        unique : true,
        validate:function(){
            return emailValidator.validate(this.email);
        }

    },
    password:{
        type : String,
        required : true,
        min : 7
    },
    confirmPassword:{
        type : String,
        required : true,
        min : 7,
        validate:function(){
            return this.confirmPassword == this.password;
        }
    },
    role:{
        type : String,
        enum:['admin','user','restaurantowner','deliveryboy'],
        default :'user'
    },
    profileImage:{
        type:String,
        default:"img/users/default.jpg"
    }
});

userSchema.pre("save",function(){
    this.confirmPassword = undefined;
})
// userSchema.pre("save",async function(){
//     let salt = await bcrypt.genSalt();
//     let hashsedString = await bcrypt.hash(this.password,salt);
//     this.password = hashsedString;
// })

// userSchema.post("save",function(doc){
//     console.log("after saving in db",doc);
// })
const userModel = mongoose.model("userModel",userSchema);

module.exports = userModel;