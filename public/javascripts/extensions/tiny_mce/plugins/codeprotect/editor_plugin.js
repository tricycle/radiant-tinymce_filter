/*
  
  * Original Author: Tijmen Schep, Holland, 9-10-2005
  * modified by “flydesign.nl”, author of the first tinymce_filter extension 
    for Radiant (http://code.google.com/p/radiant-tinymce-extension/).
  * onBeforeSetContent Regexp orignally taken from Phil Haack’s blog
  * updated it to the latest TinyMCE API and fixed by Daniele Gozzi
  * Matching-regex fixed by Andrew Buntine/Tricycle Developments
  * Updated to not mangle namespaced Radius-tags by Gerrit Kaiser/Tricycle Developments
  
*/

(function() {
  var RadiusCodeProtect = {
    protectionClassName : 'mceItemRadiantCode',
    
    radiusToHtml : function(editor, options) {
      console.debug('radiusToHtml…');
      var radiusTagRegex = /<\/?r:[\w:]+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/?>/g;
      var matches = options.content.match(radiusTagRegex);
      var content = options.content;
      if (matches != null) {
        for (i=0; i < matches.length; i++) {
          var title = matches[i].replace(/"/g, "'");
          var match = escape(matches[i]);
          var regex = new RegExp('(' + matches[i] + ')', 'i');
          content = content.replace(regex, '<span rel="' + match + '" class="'+RadiusCodeProtect.protectionClassName+'" title="' + title + '"></span>');
        }
      }
      options.content = content;
    },
    htmlToRadius : function(editor, options) {
      console.debug('htmlToRadius…');
      var replacementRegex = new RegExp('<span rel="([^"]*)?"( class="'+RadiusCodeProtect.protectionClassName+'")? title="(.*?)"></span>', 'g');
      var matches = options.content.match(replacementRegex);
      if (matches != null) {
        for (i=0; i<matches.length; i++) {
          var match = unescape(matches[i].replace(replacementRegex, '$1'));
          options.content = options.content.replace(matches[i], match);
        }
      }
    }
  };
  
  
  tinymce.create('tinymce.plugins.CodeProtectPlugin', {
    init: function(ed, url) {
      ed.onBeforeSetContent.add(RadiusCodeProtect.radiusToHtml);
      ed.onGetContent.add(RadiusCodeProtect.htmlToRadius);
    }
  });

  // Register plugin
  tinymce.PluginManager.add('codeprotect', tinymce.plugins.CodeProtectPlugin);
})();
