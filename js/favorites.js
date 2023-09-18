export class GithubUser {
  static search (username) {
    const endpoint = `https://api.github.com/users/${username}`
    return fetch(endpoint)
    .then( data => data.json())
    .then(({ login, name, public_repos, followers}) => ({
      login, 
      name,
      public_repos,
      followers
    }))
      
    }
}



// classe que vai conter a lógica dos dados
// como os dados serão estruturados
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
    this.tbody = this.root.querySelector("table tbody")
  }

  load() {
    const entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
    console.log(entries)
    this.entries = []
  }
  // cria um array e filtra o que será colocado dentro do array
  delete(user) {
    const filteredEntries = this.entries.filter(entry => entry.login !== user.login)
    this.entries = filteredEntries
    this.update()
  }
}
//classe que vai criar a visualização e eventos do HTML
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)
    this.update()
  }
  // Função roda a função removeAllTr
  update() {
    this.removeAllTr()
    this.entries.forEach((user) => {
      const row = this.createRow()
      row.querySelector(".user img").src = `https://github.com/${user.login}.png`
      row.querySelector('.user img').alt = `Imagem de ${user.name}`
      row.querySelector(".user p").textContent = user.name
      row.querySelector('.user span').textContent = user.login
      row.querySelector('.repositories').textContent = user.public_repos
      row.querySelector('.followers').textContent = user.followers
      row.querySelector('.remove').onclick = () => {
        const isOk = confirm('Tem certeza que deseja deletar essa linha?')
        if(isOk){
          this.delete(user)
        }
      }

      this.tbody.append(row)
    })
  }

  createRow() {
    const tr = document.createElement("tr")
    tr.innerHTML = `
            <td class="user">
              <img
                src="https://github.com/lexfernandes.png"
                alt="Imagem do Alex"
              />
              <a href="https://github.com/lexfernandes" target="_blank"
                ><p>Alex Fernandes</p>
                <span>lexfernandes</span>
              </a>
            </td>
            <td class="repositories">76</td>
            <td class="followers">9589</td>
            <td><button class="remove">&times;</button></td>
          `
    return tr
  }

  // remove a listagem ao atualizar a página.(Função)
  removeAllTr() {
    this.tbody.querySelectorAll("tr").forEach((tr) => {
      tr.remove()
    })
  }
}
