//https://www.youtube.com/watch?v=TlP5WIxVirU

const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let users = []

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  users.forEach(user => {
    const isVisible =
      user.gametitle.toLowerCase().includes(value) || 
      user.role.toLowerCase().includes(value) ||
      user.tools.toLowerCase().includes(value)
    user.element.classList.toggle("hide", !isVisible)
  })
})


$(document).ready(function () {

  fetch("./data/projectsData.json")
    .then(res => res.json())
    .then(data => {
      users = data.map(user => {
        const card = userCardTemplate.content.cloneNode(true).children[0]

        const header = card.querySelector("[data-header]")
        const body = card.querySelector("[data-body]")
        const tools = card.querySelector("[data-tools]")
        const path = card.querySelector("[data-path]")
        const image = card.querySelector("[data-image]")

        header.textContent = user.gametitle
        body.textContent = user.role
        tools.textContent = user.tools
        path.href = 'projects/' + user.url + '/project.html'
        image.src = 'projects/' + user.url + '/templateBannerSize.png'


        console.log(path)
        console.log(user.bannerImage)
        console.log(user.url)

        userCardContainer.append(card)
        return { gametitle: user.gametitle, role: user.role, tools: user.tools, path: user.path, element: card }
      }

      )

      //I might delete this line... maybe should
      .catch(error => console.log(error));
    })

});

