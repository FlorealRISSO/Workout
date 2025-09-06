class Component {
  constructor(props = {}) {
    this.props = props;
    this.state = {};
    this.element = null;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    const newEl = this.build();
    this.element.replaceWith(newEl);
    this.element = newEl;
  }

  mount(parent) {
    this.element = this.build();
    parent.appendChild(this.element);
  }

  build() {
    throw new Error("build() must be implemented");
  }
}
