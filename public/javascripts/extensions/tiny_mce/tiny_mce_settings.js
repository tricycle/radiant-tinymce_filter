tinyMCE.init({   
  editor_selector : "mceEditor",
  editor_deselector : "noMceEditor",
	mode : "textareas",
	theme : "advanced",
  extended_valid_elements: "r:*,hr[rel|class|title]",
  plugins: "codeprotect,radiant_linking",
  content_css: "/javascripts/extensions/tiny_mce/tiny_mce_content.css",
	theme_advanced_toolbar_location : "top",
	theme_advanced_toolbar_align : "left",
	theme_advanced_statusbar_location : "bottom",
	// default set of buttons
  // theme_advanced_buttons1 : "example,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect",
  // theme_advanced_buttons2 : "bullist,numlist,|,outdent,indent,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code",
  // theme_advanced_buttons3 : "hr,removeformat,visualaid|sub,sup,charmap",
	apply_source_formatting : true
});
