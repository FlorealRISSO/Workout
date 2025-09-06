const stylesPage = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "var(--surface)",
    color: "var(--on-surface)",
    fontFamily: "Roboto, sans-serif",
    transition: "background-color 0.3s, color 0.3s"
  },
  content: {
    flex: 1,
    padding: "1rem"
  }
};

class Page extends Component {
  build() {
    const page = document.createElement("div");
    Object.assign(page.style, stylesPage.container);

    const topBar = new TopBar({
      title: this.props.title,
      showBack: this.props.showBack,
      showSettings: this.props.showSettings,
      onBack: this.props.onBack,
      onSettings: this.props.onSettings
    });
    topBar.mount(page);

    const content = document.createElement("div");
    Object.assign(content.style, stylesPage.content);

    if (this.props.child) {
      this.props.child.mount(content);
    }

    page.appendChild(content);
    return page;
  }
}