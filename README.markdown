Tinymce Filter
==============

This extension provides a TinyMCE filter for the Radiant CMS. It allows you to edit the content of your pages in the TinyMCE editor.

Based on the plugin by Brandalism.

Installation
------------

Install the extension in your project.

  cd ~/Code/awesome_pies
  git submodule add http://github.com/tricycle/radiant-tinymce_filter.git vendor/extensions/tinymce_filter

Place the javascripts and stylesheets from the plugin in your radiant docroot.

  cp -rv vendor/extensions/tinymce_filter/public .

By default, TinyMCE will look for a /stylesheets/content.css file to use in the editor. If you want to add your own styling to the editor, you can create this file. Radiant code will automatically get a class name. Add the following CSS to your content.css file:

  .mceItemRadiantCode { 
    background: url('../javascripts/extensions/tiny_mce/plugins/codeprotect/images/radiant-code.png') no-repeat; 
    height: 18px;
    border: none;
  }

Settings
--------

If you want to change the settings of the editor, you can do this by editing the 'tiny_mce_settings.js' file. The 'codeprotect' plugin is used to protect the Radiant tags from being edited within the editor.

- Edwin Vlieg

http://code.google.com/p/radiant-tinymce-extension/
