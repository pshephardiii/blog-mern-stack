const { model, Schema } = require('mongoose')
const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken') 

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }]
} , {
  timestamps: true
})

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})

userSchema.methods.generateAuthToken = async function() {
  const token = jwt.sign({ _id: this._id }, process.env.SECRET)
  return token
}

const User = model('User', userSchema)

module.exports = User