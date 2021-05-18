document.addEventListener('DOMContentLoaded', function (event) {
  const requestURL = 'datastore.json'
  const request = new XMLHttpRequest()
  request.open('GET', requestURL)
  request.responseType = 'json'
  request.send()
  request.onload = processData

  function processData() {
    const data = request.response
    let jsonData = JSON.parse(JSON.stringify(data))
    let categories = Object.keys(jsonData)
    let scriptNumber = 1
    for (category in categories) {
      var category_scripts = jsonData[categories[category]]
      for (script in category_scripts) {
        var scriptDetails = {
          name: script,
          summary: category_scripts[script][5],
          author: category_scripts[script][4],
          folder: category_scripts[script][0],
          file: category_scripts[script][1],
        }
        populateCards(scriptNumber, scriptDetails)
        scriptNumber++
      }
    }
  }

  // Bind event handlers to buttons
  let loadMore = document.getElementById('load-more')
  loadMore.addEventListener('click', More)

  let search = document.getElementById('search')
  search.addEventListener('keydown', Search)

  function populateCards(scriptNumber, scriptDetails) {
    let cardHolder = document.getElementById('card-holder')
    let isHidden = scriptNumber <= 20 ? '' : 'hidden'

    let divHTML = `<div class="col-sm-6 col-md-3 ${isHidden} ">
                      <div class="card shadow">
                          <div class="card-body">
                              <h5 class="card-title">${scriptDetails['name']}</h5>
                              <p class="card-text">${scriptDetails['summary']}</p>
                              <p>- <a href="https://github.com/${scriptDetails['author']}">${scriptDetails['author']}</a></p><br>
                              <a href="https://github.com/avinashkranjan/Amazing-Python-Scripts/blob/master/${scriptDetails['folder']}/${scriptDetails['file']}" class="btn btn-primary">Take Me</a>
                          </div>
                      </div>
                  </div>`
    cardHolder.innerHTML += divHTML
  }

  function More() {
    loadMore.style.display = 'none'
    let cardsCount = document.getElementById('card-holder').children.length
    let cards = document.getElementById('card-holder').children
    for (let count = 0; count < cardsCount; count++) {
      cards[count].style.display = 'block'
    }
  }

  function Search() {
    let cardsCount = document.getElementById('card-holder').children.length
    let cards = document.getElementById('card-holder').children
    let searchKey = document.getElementById('search').value.toLowerCase()
    for (let count = 0; count < cardsCount; count++) {
      scriptTitle = cards[count]
        .getElementsByTagName('h5')[0]
        .innerHTML.toLowerCase()
      if (scriptTitle.includes(searchKey)) {
        cards[count].style.display = 'block'
      } else {
        cards[count].style.display = 'none'
      }
    }
  }
})