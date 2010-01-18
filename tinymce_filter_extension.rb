require_dependency 'application_controller'

class TinymceFilterExtension < Radiant::Extension
  version "1.1"
  description "Provides a TinyMCE filter for the Radiant CMS."
  url "http://github.com/tricycle/radiant-tinymce_filter/tree"
  
  define_routes do |map|
    map.connect '/admin/pagetree/children/:id/:level', :controller => 'wysiwyg', :action => 'children'
  end
  
  def activate
    preload_filter
    
    Admin::PagesController.helper WysiwygHelper
    admin.page.edit.add :main, "/wysiwyg/link_dialog", :after => "edit_buttons"
    
    include_extension_javascripts
    include_extension_stylesheets
  end
  
  def deactivate
  end
  
private
  def preload_filter
    TinyMceFilter
  end
  
  def extension_asset_paths(*filenames)
    filenames.collect{|filename| "extensions/tiny_mce/#{filename}" }
  end
  
  def include_extension_stylesheets
    include_css = Proc.new do
      before_filter :add_tinymce_stylesheets, :only => [:edit, :new]
      def add_tinymce_stylesheets
        @stylesheets << 'extensions/tiny_mce/tinymce_integration'
      end
      private :add_tinymce_stylesheets
    end
    
    Admin::PagesController.class_eval(&include_css)
    Admin::SnippetsController.class_eval(&include_css)
  end
  
  def include_extension_javascripts
    include_js = lambda do
      before_filter :add_tinymce_javascripts, :only => [:edit, :new]
      def add_tinymce_javascripts
        (@javascripts << %w[
          admin/sitemap
          extensions/tiny_mce/tiny_mce
          extensions/tiny_mce/tiny_mce_settings
          extensions/tiny_mce/tinymce_filter
        ]).flatten!
      end
      private :add_tinymce_javascripts
    end
    
    Admin::PagesController.class_eval(&include_js)
    Admin::SnippetsController.class_eval(&include_js)
  end
end
