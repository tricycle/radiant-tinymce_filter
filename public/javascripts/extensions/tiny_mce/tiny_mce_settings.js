tinyMCE.init({   
  editor_selector : "mceEditor",
  editor_deselector : "noMceEditor",
  mode : "textareas",
  theme : "advanced",
  theme_advanced_buttons1 : "bold,italic,underline,undo,redo,copy,paste,bullist,numlist,link,unlink,image,forecolor,formatselect",
  theme_advanced_buttons2 : "", 
  theme_advanced_buttons3 : "",
  theme_advanced_resizing: true,
  theme_advanced_resizing_max_width: 1180,
  theme_advanced_resizing_min_width: 400,
  theme_advanced_resizing_min_height: 200,
  theme_advanced_resizing_max_height: 700,
  theme_advanced_resizing_use_cookie: false,
  extended_valid_elements: "r:*,span[rel|class|title]",
  plugins: "safari,radiant_linking,codeprotect",
  content_css: "/javascripts/extensions/tiny_mce/tiny_mce_content.css",
  theme_advanced_toolbar_location : "top",
  theme_advanced_toolbar_align : "left",
  theme_advanced_statusbar_location : "bottom",
  apply_source_formatting : true
});
