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
  }
  // remove a listagem ao atualizar a página.(Função)
  removeAllTr() {
    const tbody = this.root.querySelector("table tbody")
    tbody.querySelectorAll("tr").forEach((tr) => {
      tr.remove()
    })
  }
}
