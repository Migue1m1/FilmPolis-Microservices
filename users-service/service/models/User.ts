import * as mongoose from "mongoose";
import * as bcrypt   from 'bcrypt-nodejs';

interface IUser{
    username:string;
    password:string;

    genEncryptedPassword(password: string): any;
    validPassword(password: string): boolean;
}

interface IUserModel extends IUser, mongoose.Document{};
var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

userSchema.methods.genEncryptedPassword = function (password: any) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

userSchema.methods.validPassword = function (password: any) {
    return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model<IUserModel>("User", userSchema);

export = User;