export class GithubUser {
  static search (username) { // busca o username no api do github
    const endpoint = `https://api.github.com/users/${username}` //coloca na variavel endpoint
    return fetch(endpoint) // vá buscar a informação
    .then(data => data.json()) // retorne os dados em JSON
    .then(({login, name, public_repos, followers}) => ({ // desistrituração pegue somenre os alguns dados
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
  }

  load() {
    const entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
    console.log(entries)
    this.entries = []
  }

  save(){
    localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
  }


  async add(username){
    try {

      const userExists = this.entries.find(entry => entry.login === username)

      if(userExists) {
        throw new Error('Usuário já cadastrado')
      }


      const user = await GithubUser.search(username)// await aguardando um promessa 
      
      if(user.login === undefined){
        throw new Error('usuário não encontrado !')
      }

      this.entries = [user, ...this.entries]
      this.update()
      this.save()

    } catch(error) {
      alert(error.message)
  }
  }

  // cria um array e filtra o que será colocado dentro do array
  delete(user) {
    const filteredEntries = this.entries
    .filter(entry => entry.login !== user.login)

    this.entries = filteredEntries
    this.update()
    this.save()
  }
}
//classe que vai criar a visualização e eventos do HTML
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector("table tbody")

    this.update()
    
    this.onadd()
  }

  onadd(){
    const addButton = this.root.querySelector('.search button')
    addButton.onclick = () => {
      const { value } = this.root.querySelector('.search input') // desistruturando input, pegando somente o valor do input
      this.add(value)
    }
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
        const isOk = confirm('Tem certeza que deseja deletar essa linha?')//confirm retornar um boolean verdadeiro ou falso
        if(isOk){
          this.delete(user)
        }
      }
      this.tbody.append(row) // append serve para adicionar objeto dentro de uma array
    })
  }
// cria uma estrutura html utilizando javascript
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
