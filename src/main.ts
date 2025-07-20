import { Notice, Plugin } from "obsidian";
import { HOME_VIEW_TYPE, HomeView } from "./HomeView";

export default class MyPlugin extends Plugin {
	async onload() {
		this.registerView(HOME_VIEW_TYPE, (leaf) => new HomeView(leaf));

		this.addRibbonIcon("dice", "Open Vue Component", () => {
			this.activateView().then(() => {
				new Notice("Vue Component opened");
			});
		});
	}

	async activateView() {
		this.app.workspace.detachLeavesOfType(HOME_VIEW_TYPE);

		await this.app.workspace.getRightLeaf(false)?.setViewState({
			type: HOME_VIEW_TYPE,
			active: true,
		});

		this.app.workspace.revealLeaf(
			this.app.workspace.getLeavesOfType(HOME_VIEW_TYPE)[0]
		);
	}

	onunload() {
		if (import.meta.env.MODE !== "development") {
			this.app.workspace.detachLeavesOfType(HOME_VIEW_TYPE);
		}
	}
}
