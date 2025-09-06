class Navigator {
    constructor(rootComponent) {
        this.rootComponent = rootComponent;
        this.pageStack = [{ name: "home", params: {} }];
        this.counter = 0;

        // Handle back button in browser
        window.addEventListener('popstate', (event) => {
            if (this.pageStack.length > 1) {
                this.pageStack.pop();
                this.update();
            } else {
                // Optional: go to a default state or do nothing
                window.history.pushState({}, "", ""); // Re-add a dummy state if needed
            }
        });
    }

    push(pageName, params = {}) {
        this.pageStack.push({ name: pageName, params });
        // Add history entry without changing the URL
        window.history.pushState({ page: pageName }, "", "");
        this.update();
    }

    pop() {
        if (this.pageStack.length > 1) {
            window.history.back();
        }
    }

    popToRoot() {
        while (this.pageStack.length > 1) {
            this.pageStack.pop();
        }
        window.history.pushState({ page: "home" }, "", "");
        this.update();
    }

    reload() {
        this.buildCurrentPage();
    }

    getCurrentPage() {
        return this.pageStack[this.pageStack.length - 1];
    }

    getCurrentPageName() {
        return this.getCurrentPage().name;
    }

    getCurrentPageParams() {
        return this.getCurrentPage().params;
    }

    isRoot() {
        return this.pageStack.length === 1;
    }

    update() {
        this.rootComponent.setState({});
    }

    replaceWith(pageName, params = {}) {
        this.pageStack.pop();
        this.pageStack.push({ name: pageName, params });
        window.history.replaceState({ page: pageName }, "", "");
        this.update();
    }

    buildCurrentPage() {
        const { name: page, params } = this.getCurrentPage();

        switch (page) {
            case "home":
                return new Page({
                    title: "PLANS",
                    showBack: false,
                    showSettings: true,
                    onSettings: () => this.push("settings"),
                    child: new HomeContent({ navigator: this, ...params })
                });

            case "settings":
                return new Page({
                    title: "SETTINGS",
                    showBack: true,
                    showSettings: false,
                    onBack: () => this.pop(),
                    child: new SettingsContent({ navigator: this, ...params })
                });

            case "plan":
                return new Page({
                    title: params.plan.name || "Plan Details",
                    showBack: true,
                    showSettings: false,
                    onBack: () => this.pop(),
                    child: new PlanContaint({ navigator: this, ...params })
                });

            case "day":
                return new Page({
                    title: params.dayName || "Day Details",
                    showBack: true,
                    showSettings: false,
                    onBack: () => this.pop(),
                    child: new DayContent({ navigator: this, ...params })
                });

            case "block":
                return new Page({
                    title: params.block.name || "Block Details",
                    showBack: true,
                    showSettings: false,
                    onBack: () => this.pop(),
                    child: new BlockContent({ navigator: this, ...params })
                });

            case "exercise":
                return new Page({
                    title: params.exercise.name || "Exercise Details",
                    showBack: true,
                    showSettings: false,
                    onBack: () => this.pop(),
                    child: new ExerciseContent({ navigator: this, ...params })
                });

            case "addPlan": return new Page({
                title: "ADD PLAN",
                showBack: true,
                showSettings: false,
                onBack: () => this.pop(),
                child: new AddPlanContent({ navigator: this, ...params })
            });

            case "addDay":
                return new Page({
                    title: "ADD DAY",
                    showBack: true,
                    showSettings: false,
                    onBack: () => this.pop(),
                    child: new AddDayContent({ navigator: this, ...params })
                });

            case "addBlock":
                return new Page({
                    title: "ADD BLOCK",
                    showBack: true,
                    showSettings: false,
                    onBack: () => this.pop(),
                    child: new AddBlockContent({ navigator: this, ...params })
                });

            case "addExercise":
                return new Page({
                    title: "ADD EXERCISE",
                    showBack: true,
                    showSettings: false,
                    onBack: () => this.pop(),
                    child: new AddExerciseContent({ navigator: this, ...params })
                });

            case "starting":
                return new Page({
                    title: "STARTING PRACTICE",
                    showBack: true,
                    showSettings: false,
                    onBack: () => this.pop(),
                    child: new StartingContent({ navigator: this, ...params })
                });

            case "switching":
                return new Page({
                    title: "SWITCHING",
                    showBack: true,
                    showSettings: false,
                    onBack: () => this.pop(),
                    child: new SwitchingContent({ navigator: this, ...params })
                });

            case "practicing":
                return new Page({
                    title: "PRACTICING",
                    showBack: true,
                    showSettings: false,
                    onBack: () => this.pop(),
                    child: new PracticingContent({ navigator: this, ...params })
                });

            case "resting":
                return new Page({
                    title: "RESTING",
                    showBack: true,
                    showSettings: false,
                    onBack: () => this.pop(),
                    child: new RestingContent({ navigator: this, ...params })
                });

            case "finished":
                return new Page({
                    title: "FINISHED",
                    showBack: true,
                    showSettings: false,
                    onBack: () => this.pop(),
                    child: new FinishedContent({ navigator: this, ...params })
                });

            default:
                return new Page({
                    title: "404",
                    showBack: true,
                    onBack: () => this.pop(),
                    child: new Text({ text: "Page introuvable" })
                });
        }
    }
}