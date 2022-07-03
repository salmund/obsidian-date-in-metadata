 # Insert date and time in metadata automatically on file creation event
 
 Obsidian plugin allowing to insert the current date and time in YAML frontmatter on file creation (which is otherwise not possible). 
 
 If you use the [Templater](https://github.com/SilentVoid13/Templater) plugin and you create a new note based on a template which happens to include a YAML frontmatter, the plugin updates the frontmatter automatically.
 
 - But how does it differ from using templates?

Using templates to insert date and time is a solution when you want to create a new file with a keyboard shortcut, but when you create a new file from a markdown link, it doesn't work (assuming you don't use folders templates like me, because tags are more convenients than folders - that's another topic...), and that's where my plugin comes in.

<a href="https://www.buymeacoffee.com/whiteeagleH" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

(donate only if you can afford it, just a little is already very stimulating ;))

## Demo

See how the date is inserted even after link-based-file-creation.

![moi](https://user-images.githubusercontent.com/105465034/168185897-17e87af8-9d33-4fc9-8164-04de5e1a8883.gif)

## Settings

Of course you can customize your frontmatter

![image](https://user-images.githubusercontent.com/105465034/168187197-8e6541a0-8547-4594-bf22-56fca6ae886b.png)


## Plugin

This plugin uses

- [JS Yaml](https://github.com/nodeca/js-yaml)
- [Front-matter](https://www.npmjs.com/package/front-matter)

## To do
- [x] make sure that the plugin can work directly after loading a vault (at the moment you have to wait a few seconds if you just launched obsidian, before creating a file so that the plugin can detect the file correctly) - fixed in 1.0.1
