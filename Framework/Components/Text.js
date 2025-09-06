const textStyles = {
  text: {
    fontSize: "16px",
    lineHeight: "1.5",
    marginBottom: "1rem",
    color: "var(--on-background)",
    backgroundColor: "var(--background)"
  }
};

class Text extends Component {
  build() {
    const p = document.createElement("p");
    Object.assign(p.style, textStyles.text);
    p.textContent = this.props.text;
    return p;
  }
}