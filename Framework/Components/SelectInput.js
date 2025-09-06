const stylesSelectInput = {
    select: {
        border: "none",
        borderRadius: "8px",
        padding: "0.75rem 1.5rem",
        fontSize: "2rem",
        fontWeight: "bold",
        cursor: "pointer",
        outline: "none",
        width: "100%",
        margin: "10px",
        appearance: "none",
        WebkitAppearance: "none",
        MozAppearance: "none",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 1rem center",
        backgroundSize: "1.5rem"
    }
};

class SelectInput extends Component {
    build() {
        const select = document.createElement("select");

        // Apply base styles
        Object.assign(select.style, stylesSelectInput.select);
        select.id = `select-${Date.now()}`;

        // Apply variant styles (only affecting color/backgroundColor)
        const variant = this.props.variant || "primary";
        if (variantStyles[variant]) {
            select.style.backgroundColor = variantStyles[variant].backgroundColor;
            select.style.color = variantStyles[variant].color;
            select.style.backgroundImage = `url("data:image/svg+xml,%3Csvg fill='black' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5H7z'/%3E%3C/svg%3E")`;
            select.style.backgroundSize = "2.5rem"; // make the arrow bigger
        }

        // Add options
        if (Array.isArray(this.props.options)) {
            this.props.options.forEach(opt => {
                const option = document.createElement("option");
                option.value = opt.value;
                option.textContent = opt.label;
                select.appendChild(option);
            });
        }

        // Set initial value
        if (this.props.value) {
            select.value = this.props.value;
        }

        // Change handler
        select.addEventListener("change", (e) => {
            if (this.props.onChange) {
                this.props.onChange(e.target.value);
            }
        });

        this.element = select;
        return select;
    }

    setState(newState) {
        super.setState(newState);
        if (newState.value !== undefined) {
            this.element.value = newState.value;
        }
    }
}