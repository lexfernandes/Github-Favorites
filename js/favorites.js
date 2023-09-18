// classe que vai conter a lógica dos dados
// como os dados serão estruturados
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
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
    [
      {
        login: "lexfernandes",
        name: "Lex Fernandes",
        public_repos: "76",
        followers: "2000",
      }
      {
        login: "maykbrito",
        name: "Mayk Brito",
        public_repos: "80",
        followers: "1200",
      }
    ]
  }
  createRow() {
    const tr = document.createElement("tr")
    tr.innerHTML = `
            <td class="users">
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
            <td class="Followers">9589</td>
            <td><button class="remove">&times;</button></td>
          `
    return tr
  }

  // remove a listagem ao atualizar a página.(Função)
  removeAllTr() {
    const tbody = this.root.querySelector("table tbody")
    tbody.querySelectorAll("tr").forEach((tr) => {
      tr.remove()
    })
  }
}
