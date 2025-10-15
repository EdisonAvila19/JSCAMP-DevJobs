class DevJobsAvatar extends HTMLElement {
  constructor() {
    super(); // llamar al constructor de HTMLElement

    this.attachShadow({ mode: 'open' })
    
    this.service = this.getAttribute('service') ?? 'github'
    this.username = this.getAttribute('username') ?? 'midudev'
    this.size = this.getAttribute('size') ?? '40'
  }

  createUrl() {
    return `https://unavatar.io/${this.service}/${this.username}`
  }

  render() {

    const url = this.createUrl()

    this.shadowRoot.innerHTML = `
    <style>
      img {
        width: ${this.size}px;
        height: ${this.size}px;
        border-radius: 9999px;
      }
    </style>

      <img 
        src="${url}" 
        alt="Avatar de ${this.username}" 
        class="avatar"
      />
    `
  }

  connectedCallback() {
    this.render()
  }
}

customElements.define('devjobs-avatar', DevJobsAvatar)