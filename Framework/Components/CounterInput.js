const stylesCounterInput = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    fontFamily: "Roboto, sans-serif",
    width: "100%",
    margin: "10px",
  },
  counterBtn: {
    height: "100%",
    width: "20%",
    fontSize: "2rem",
    fontWeight: "bold",
    backgroundColor: "var(--primary)",
    color: "var(--on-primary)",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s"
  },
  input: {
    height: "100%",
    width: "60%",
    textAlign: "center",
    fontSize: "2rem",
    padding: "0.5rem",
    border: "1px solid var(--on-surface)",
    borderRadius: "6px",
    backgroundColor: "var(--surface)",
    color: "var(--on-surface)",
    outline: "none",
    transition: "background-color 0.3s, color 0.3s, border-color 0.3s"
  }
};

class CounterInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || 0,
      variant: this.props.variant || 'primary',
    };
  }

  build() {
    const variant = this.state.variant;

    const container = document.createElement("div");
    Object.assign(container.style, stylesCounterInput.container);

    const minusBtn = document.createElement("button");
    Object.assign(minusBtn.style, stylesCounterInput.counterBtn);
    minusBtn.textContent = "−";
    minusBtn.onmousedown = () => {
      this.setState({ value: this.state.value - 1 });
      this.inputRef.value = this.state.value;
    };
    minusBtn.style.backgroundColor = variantStyles[variant].backgroundColor;
    minusBtn.style.color = variantStyles[variant].color;

    const input = document.createElement("input");
    input.type = "number";
    input.id = "counter-input"
    input.value = this.state.value;
    Object.assign(input.style, stylesCounterInput.input);
    input.onchange = () => {
      const val = parseInt(input.value, 10);
      if (!isNaN(val)) {
        this.setState({ value: val });
      }
    };

    const plusBtn = document.createElement("button");
    Object.assign(plusBtn.style, stylesCounterInput.counterBtn);
    plusBtn.textContent = "+";
    plusBtn.onmousedown = () => {
      this.setState({ value: this.state.value + 1 });
      this.inputRef.value = this.state.value;
    };
    plusBtn.style.backgroundColor = variantStyles[variant].backgroundColor;
    plusBtn.style.color = variantStyles[variant].color;

    container.appendChild(minusBtn);
    container.appendChild(input);
    container.appendChild(plusBtn);

    this.inputRef = input;

    return container;
  }

  getValue() {
    return this.inputRef ? parseInt(this.inputRef.value, 10) : 0;
  }
}