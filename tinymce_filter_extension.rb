require_dependency 'application'

class TinymceFilterExtension < Radiant::Extension
  version "1.1"
  description "Provides a TinyMCE filter for the Radiant CMS."
  url "http://github.com/tricycle/radiant-tinymce_filter/tree"
  
  define_routes do |map|
    map.connect '/admin/pagetree', :controller => 'wysiwyg', :action => 'pagetree'
    map.connect '/admin/pagetree/children/:id/:level', :controller => 'wysiwyg', :action => 'children'
  end
  
  def activate
    preload_filter
    
    pages_controller.helper WysiwygHelper
    admin.page.edit.add :main, "/wysiwyg/link_dialog", :after => "edit_buttons"
    
    include_tinymce_javascripts
  end
  
  def deactivate
  end
  
private
  def preload_filter
    TinyMceFilter
  end
  
  def pages_controller
    defined?(Admin::PagesController) ? Admin::PagesController : Admin::PageController
  end
  
  def snippets_controller
    defined?(Admin::SnippetsController) ? Admin::SnippetsController : Admin::SnippetController
  end

  def include_tinymce_javascripts
    include_js = lambda do
      before_filter :add_tinymce_javascripts, :only => [:edit, :new]
      private
      def add_tinymce_javascripts
        @javascripts << 'extensions/tiny_mce/tiny_mce' << 'extensions/tiny_mce/tiny_mce_settings' << 'extensions/tiny_mce/tinymce_filter'
      end
    end
    
    pages_controller.class_eval(&include_js)
    snippets_controller.class_eval(&include_js)
  end
end
