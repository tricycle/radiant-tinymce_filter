module WysiwygHelper
  # HACK: duplicates Admin::PageController#index
  def find_homepage
    @homepage ||= Page.find_by_parent_id(nil)
  end
  
  # specialised version of render_node in Admin::NodeHelper to set the partial path
  def render_wysiwyg_node(page, locals={})
    @current_node = page
    locals.reverse_merge!(:level => 0, :simple => false).merge!(:page => page)
    render :partial => 'wysiwyg/node', :locals =>  locals
  end
  
  def radiant_popup(id, &content)
    close_link = link_to_function 'Close', "$(this).up('.popup').hide()", :class => 'close-link'
    inner_html = block_given? ? capture(&content) : ''
    container = content_tag :div, [inner_html, close_link, "\n"].join, :id => id, :class => 'popup', :style => 'display: none'
    concat container, content.binding
  end
end
