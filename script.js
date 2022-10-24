//https://www.youtube.com/watch?v=TlP5WIxVirU

const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let projects = []

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  projects.forEach(project => {
    const isVisible =
      project.title.toLowerCase().includes(value) || 
      project.role.toLowerCase().includes(value) ||
      project.tools.toLowerCase().includes(value)
    project.element.classList.toggle("hide", !isVisible)
  })
})


$(document).ready(function () {

  fetch("./data/projectsData.json")
    .then(res => res.json())
    .then(data => {
      projects = data.map(project => {
        const card = userCardTemplate.content.cloneNode(true).children[0]

        const header = card.querySelector("[data-header]")
        const body = card.querySelector("[data-body]")
        const tools = card.querySelector("[data-tools]")
        const path = card.querySelector("[data-path]")
        const image = card.querySelector("[data-image]")

        header.textContent = project.title
        body.textContent = project.role
        tools.textContent = project.tools
        path.href = 'projects/' + project.url + '/project.html'
        image.src = 'projects/' + project.url + '/templateBannerSize.png'


        //console.log(path)
        //console.log(project.bannerImage)
        //console.log(project.url)

        userCardContainer.append(card)
        return { title: project.title, role: project.role, tools: project.tools, path: project.path, element: card }
      })

      //I might delete this line... maybe should
      //.catch(error => console.log(error));
    })
});

