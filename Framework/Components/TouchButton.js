const variantStyles = {
  primary: {
    backgroundColor: "var(--primary)",
    color: "var(--on-primary)"
  },
  error: {
    backgroundColor: "var(--error)",
    color: "var(--on-error)"
  },
  surface: {
    backgroundColor: "var(--surface)",
    color: "var(--on-surface)"
  },
  success: {
    backgroundColor: "var(--success)",
    color: "var(--on-success)"
  },
  secondary: {
    backgroundColor: "var(--secondary)",
    color: "var(--on-secondary)"
  },
  warning: {
    backgroundColor: "var(--warning)",
    color: "var(--on-warning)"
  },
};

const stylesTouchButton = {
  btn: {
    border: "none",
    borderRadius: "8px",
    padding: "0.75rem 1.5rem",
    fontSize: "2rem",
    fontWeight: "bold",
    cursor: "pointer",
    outline: "none",
    transition: "transform 0.2s, box-shadow 0.2s",
    width: "100%",
    margin: "10px"
  },
  btnActive: {
    transform: "scale(0.98)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
  }
};

class TouchButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text || "",
      disabled: props.disabled || false,
      display: props.display == undefined ? true : false, 
    };
    this.element = null;
  }

  build() {
    const btn = document.createElement("button");

    Object.assign(btn.style, stylesTouchButton.btn);

    const variant = this.props.variant || "primary";
    if (variantStyles[variant]) {
      Object.assign(btn.style, variantStyles[variant]);
    }

    btn.textContent = this.props.text;

    if (this.state.disabled) {
      btn.style.opacity = "0.5";
      btn.style.cursor = "not-allowed";
    }

    if (!this.state.display) {
      btn.style.display = "none";
    }

    btn.addEventListener('mousedown', () => {
      if (this.props.onClick && !btn.disabled) {
        this.props.onClick();
      }
    }, { passive: true });

    this.element = btn;
    return btn;
  }

  setState(newState) {
    super.setState(newState);
  }

  setText(text) {
    this.state.text = text;
    this.element.textContent = text;
  }

  disable() {
    this.state.disabled = true;
    this.element.style.opacity = "0.5";
    this.element.style.cursor = "not-allowed";
  }

  enable() {
    this.state.disabled = false;
    this.element.style.opacity = "1";
    this.element.style.cursor = "pointer";
  }

  show() {
    this.state.display = true;
    this.element.style.display = "block";
  }

  hide() {
    this.state.display = false;
    this.element.style.display = "none"
  }
}
