const stylesTopBar = {
  topBar: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.75rem 1rem",
    backgroundColor: "var(--surface)",
    color: "var(--on-surface)",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    fontFamily: "Roboto, sans-serif",
    fontSize: "1.25rem",
    fontWeight: "500",
    transition: "background-color 0.3s, color 0.3s",
    position: "fixed",
    zIndex: 1000,
  },
  topBtn: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "1.5rem",
    color: "var(--on-surface)",
    cursor: "pointer",
    padding: "0.25rem 0.5rem",
    borderRadius: "4px",
    transition: "background-color 0.2s"
  },
  topBtnActive: {
    backgroundColor: "rgba(0, 0, 0, 0.1)"
  },
  title: {
    flexGrow: 1,
    textAlign: "center"
  }
};

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.handleBackTouch = this.handleBackTouch.bind(this);
    this.handleSettingsTouch = this.handleSettingsTouch.bind(this);
  }

  handleBackTouch(event) {
    const btn = event.currentTarget;
    Object.assign(btn.style, stylesTopBar.topBtnActive);
    setTimeout(() => {
      btn.style.backgroundColor = "";
      if (this.props.onBack) this.props.onBack();
    }, 150);
  }

  handleSettingsTouch(event) {
    const btn = event.currentTarget;
    Object.assign(btn.style, stylesTopBar.topBtnActive);
    setTimeout(() => {
      btn.style.backgroundColor = "";
      if (this.props.onSettings) this.props.onSettings();
    }, 150);
  }

  build() {
    const bar = document.createElement("div");
    Object.assign(bar.style, stylesTopBar.topBar);

    const backBtn = document.createElement("button");
    Object.assign(backBtn.style, stylesTopBar.topBtn);
    backBtn.innerHTML = "&#10094;";
    backBtn.style.visibility = this.props.showBack ? "visible" : "hidden";
    backBtn.addEventListener("mousedown", this.handleBackTouch);

    const title = document.createElement("div");
    title.textContent = this.props.title;
    Object.assign(title.style, stylesTopBar.title);

    const settingsBtn = document.createElement("button");
    Object.assign(settingsBtn.style, stylesTopBar.topBtn);
    settingsBtn.innerHTML = "&#9881;";
    settingsBtn.style.visibility = this.props.showSettings ? "visible" : "hidden";
    settingsBtn.style.marginRight = "32px";
    settingsBtn.addEventListener("mousedown", this.handleSettingsTouch);

    bar.appendChild(backBtn);
    bar.appendChild(title);
    bar.appendChild(settingsBtn);

    return bar;
  }
}