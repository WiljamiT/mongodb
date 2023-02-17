const Album = require('../models/Album')

const getAlbums = async (req, res) => {
  const albums = await Album.find({})
  res.status(200).json({ success: true, data: albums })
}

const createAlbum = async (req, res) => {
  const { title, artist, year, tracks, genre } = req.body
  if (!title || !artist || !year ) {
    return res
      .status(400)
      .json({ success: false, msg: 'All fields required' })
  }
  try {
    const album = await Album.create({title, artist, year, tracks, genre})
    res.status(201).send({ success: true, data: album })  
  } catch (error) {
      console.log(error)     
  }
}

const getSingleAlbum = async (req, res) => {
  const { id } = req.params
  try {
    const album = await Album.findById(id)
    if (!album) {
      return res
        .status(404)
        .json({ success: false, msg: `No album found with id ${id}` })
    }
    return res.status(200).json({ success: true, data: album })   
  } catch (error) {
      console.log(error)       
  }
}

const updateAlbum = async (req, res) => {
  const { title, artist, year, tracks, genre } = req.body
  try {
    const album = await Album.findById(id) 
    if (!album) {
      return res
        .status(404)
        .json({ success: false, msg: `No album found with id ${id}` })
    }
    const updatedAlbum = await Album.findByIdAndUpdate(id, {title, artist, year, tracks, genre})   
    res.status(200).json({ success: true, data: updatedAlbum })   
  } catch (error) {
      console.log(error)
  }
}

const deleteAlbum = async (req, res) => {
  const { id } = req.params
  try {
    const album = await Album.findById(id)
    if (!album) {
      return res
        .status(404)
        .json({ success: false, msg: `No album found with id ${id}` })
    }
    await Album.findByIdAndRemove(id)
    return res.status(200).json({ success: true })
    
  } catch (error) {
      console.log(error)
  }
}

module.exports = {
  getAlbums,
  createAlbum,
  getSingleAlbum,
  updateAlbum,
  deleteAlbum
}
