const result = document.querySelector('.result')
const baseUrl = `${window.location.origin}/api`
const fetchAlbums = async (search_string) => {
  const url = search_string != '' ? `${baseUrl}/query?search=${search_string}` : `${baseUrl}/albums`

  try {
    const { data } = await axios.get(url)
    console.log(data)
    const albums = data.data.map((album) => {
      return createAlbumCard(album)
    })
    result.innerHTML = `<div class="row">
                         ${albums.join('')} 
                        </div>`
  } catch (error) {
    console.log(error)
    result.innerHTML = `<div class="alert alert-danger mt-3">Error fetching data</div>`
  }
}

const createAlbumCard = (album) => {
  return `<div class="col-sm-4 pt-4">
            <div class="card">
              <div class="card-body">
              <h5 class="card-title">${album.title}</h5>
              <p class="card-text">${album.artist}</p>
              <p class="card-text">${album.year}</p>
              <p class="card-text">${album.genre}</p>
              </div>
            </div>
          </div>
          `
}

const setNotification = (msg) => {
  formAlert = document.querySelector('.form-alert')
  formAlert.textContent = msg
  setTimeout(() => { formAlert.textContent = '' }, 5000)
}
  
// search functionality
const searchField = document.querySelector('#searchField')
  searchField.addEventListener('input', async (e) => {
  e.preventDefault()
  fetchAlbums(searchField.value)
})
  
// submit form
const btn = document.querySelector('.btn-primary')
const titleInput = document.querySelector('#title')
const artistInput = document.querySelector('#artist')
const yearInput = document.querySelector('#year')
  
const emptyFields = () => {
  titleInput.value = ''
  artistInput.value = ''
  yearInput.value = ''
}

btn.addEventListener('click', async (e) => {
  e.preventDefault()
  const title = titleInput.value
  const artist = artistInput.value
  const year = yearInput.value

  try {
    const { data } = await axios.post(`${baseUrl}/albums`, { title, artist ,year })
    fetchAlbums('')
    emptyFields(titleInput, artistInput, yearInput)
  } catch (error) {
    const { msg } = error.response.data
    setNotification(msg)
  }
})

// Fetch albums on page load
fetchAlbums(search_string = '')