class Padding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      padding: props.padding || "0px"
    };
  }

  build() {
    const div = document.createElement("div");
    div.style.padding = this.state.padding;
    return div;
  }

  setState(newState) {
    super.setState(newState);
    if (this.element) {
      this.element.style.padding = newState.padding;
    }
  }
}