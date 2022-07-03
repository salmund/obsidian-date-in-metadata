import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
const fronty = require('front-matter');
const yaml = require('js-yaml')
import moment from 'moment'

// Remember to rename these classes and interfaces!

interface dateInMetadataSettings {
	defaultKey: string,
	defaultFormat: string
}

const DEFAULT_SETTINGS: dateInMetadataSettings = {
	defaultKey: 'created',
	defaultFormat: "DD/MM/YYYY HH:mm"
}

export default class dateInMetadataSettings extends Plugin {
	settings: dateInMetadataSettings;

	async onload() {
		await this.loadSettings();
		let parametres = this.settings;
		this.registerEvent(this.app.vault.on("create", (created_file) => {
			// important de mettre un timeout sinon la vue éditeur n'est pas détectée
			setTimeout(function() {
				// console.log(created_file.name);
				// on regarde si le nom du fichier qui a été créé correspond au nom du fichier de la vue active
				// si c'est le cas, on continue, sinon on fait rien
				const view = this.app.workspace.getActiveViewOfType(MarkdownView);
				let active_file = this.app.workspace.getActiveFile();
				if ( (view) && (created_file.name == active_file.name) ) {
					const key = parametres.defaultKey;
					const default_format_moment = moment().format(parametres.defaultFormat);
					const active_editor = view.editor;
					const cursor = view.editor.getCursor();
					if (active_editor.getValue() == '') {
						const standard_to_add = `---\n${key}: ${default_format_moment}\n---\n\n`;
						active_editor.replaceRange(standard_to_add, cursor);
					}
					else {
						const contenu_avant = active_editor.getValue()
						const file = app.workspace.getActiveFile();
						let text = active_editor.getDoc().getValue()
						let fmc = app.metadataCache.getFileCache(file) ?.frontmatter;
						let end = fmc.position.end.line + 1
						const body = text.split("\n").slice(end).join("\n")

						const data = fronty(contenu_avant);
						let frontmatter_data = data.attributes;
						frontmatter_data = { ...frontmatter_data, [key]: default_format_moment };
						active_editor.setValue('');
						active_editor.replaceRange(body, cursor);
						active_editor.replaceRange(`---\n${yaml.dump(frontmatter_data)}---\n`, cursor);
					}
				}
			}, 250);
		}
		)
		)


		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new dateInMetadataSettingsTab(this.app, this));

	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class dateInMetadataSettingsTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl('h2', { text: 'YAML Settings' });

		new Setting(containerEl)
			.setName('Key')
			.setDesc('The default is "created".')
			.addText(text => text
				.setPlaceholder('created')
				.setValue(this.plugin.settings.defaultKey)
				.onChange(async (value) => {
					this.plugin.settings.defaultKey = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Format')
			.setDesc('(Moment JS)')
			.addText(text => text
				.setPlaceholder('DD/MM/YYYY HH:mm')
				.setValue(this.plugin.settings.defaultFormat)
				.onChange(async (value) => {
					this.plugin.settings.defaultFormat = value;
					await this.plugin.saveSettings();
				}));
	}
}
