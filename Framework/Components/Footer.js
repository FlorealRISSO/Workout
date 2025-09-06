const footerStyle = {
    position: "fixed",
    bottom: 0,
    width: "100%",
    backgroundColor: "#000",
    textalign: "center",
}
class Footer extends Component {
    constructor(props) {
        super(props);
        //this.child = props.child;
    }

    build() {
        const footer = document.createElement("div");
        footer.id = "footer";
        footer.className = "footer";
        Object.assign(footer.style, footerStyle);

        // if (this.child) {
        //     this.child.mount(footer);
        // }

        return footer;
    }
}
