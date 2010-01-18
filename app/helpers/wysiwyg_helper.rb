module WysiwygHelper
  include Admin::PagesHelper
  
  # specialised version of render_node in Admin::NodeHelper to explicitly
  # set the partial path to our simple partial
  def render_simple_node(page, locals={})
    @current_node = page
    locals.reverse_merge!(:level => 0, :simple => false).merge!(:page => page)
    render :partial => 'wysiwyg/node', :locals =>  locals
  end
  
  def radiant_popup(id, &content)
    close_link = link_to_function 'Close', "$(this).up('.popup').hide()", :class => 'close-link'
    inner_html = block_given? ? capture(&content) : ''
    container = content_tag :div, [inner_html, close_link, "\n"].join, :id => id, :class => 'popup', :style => 'display: none'
    concat container
  end
end
