const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true,    
  },
  artist: { 
    type: String,
    required: true,
  },
  year: {
    type: Number,
    min: 1900,
    max: new Date().getFullYear(),
    required: true
  },
  genre: Array,
  tracks: { 
    type: Number,
    min: 1
  }
})

module.exports = mongoose.model('Album', albumSchema)
