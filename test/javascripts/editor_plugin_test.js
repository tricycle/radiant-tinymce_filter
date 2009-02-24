
/*
 * Tests for the Radius to Html regexp.
 */
var RadiusToHtmlRegexpTest = TestCase.create({
  setup: function() {
	this.regexp = /<\/?r:[\w:]+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/?>/g;
  },

  test_plain_text: function() {
	this.assert_null('some text'.match(this.regexp));
  },
  test_html_tags: function() {
	this.assert_null('<p>text</p>'.match(this.regexp));
  },
  test_plain_text_and_html_tags: function() {
	this.assert_null('before <p>text</p> after'.match(this.regexp));
  },
  test_radiant_tag: function() {
	this.assert_not_null('<r:content>content</r:content>'.match(this.regexp));
  },
  test_radiant_tag_with_attribute: function() {
	this.assert_not_null('<r:content part="left">content</r:content>'.match(this.regexp));
  },
  test_radiant_tag_with_multiple_attributes: function() {
	this.assert_not_null('<r:content part="left" inherit="true">content</r:content>'.match(this.regexp));
  },
  test_empty_radiant_tag: function() {
	this.assert_not_null('<r:content />'.match(this.regexp));
  },
  test_namespaced_radiant_tag: function() {
	this.assert_not_null('<r:children:each>do something</r:children:each>'.match(this.regexp))
  },
  test_radiant_tag_and_plain_text: function() {
	this.assert_not_null('before <r:content>content</r:content> after'.match(this.regexp));
  },
  test_radiant_tag_and_html_tags: function() {
	this.assert_not_null('<b>test <r:content>content</r:content> </b>'.match(this.regexp));
  },
  test_multiple_radiant_tags: function() {
	matches = '<r:content>content 1</r:content> <r:content>content 2</r:content>'.match(this.regexp);
	this.assert_equal(4, matches.length)
  }
});

/*
 * Tests for the Html to Radius regexp.
 */
var HtmlToRadiusRegexpTest = TestCase.create({
  setup: function() {
	this.regexp = new RegExp('<span rel="([^"]*)?"( class="mceItemRadiantCode")? title="(.*?)"></span>', 'g');
  },

  test_plain_text: function() {
	this.assert_null('some text'.match(this.regexp));
  },
  test_html_tags: function() {
	this.assert_null('<p>text</p>'.match(this.regexp));
  },
  test_replacement_tag: function() {
	this.assert_not_null('<span rel="%3C\/r%3Afind%3E" class="mceItemRadiantCode" title="<\/r:find>"><\/span>'.match(this.regexp));
  },
  test_complex_replacement_tag: function() {
	this.assert_not_null(
	  '<span rel="%3Cr%3Afind%20url%3D%22\/case-studies\/pharmaceuticals%22%3E" class="mceItemRadiantCode" title="<r:find url=\'\/case-studies\/pharmaceuticals\'>"><\/span>'.
	match(this.regexp));
  },
  test_multiple_replacement_tags: function() {
	matches = '<span rel="" class="mceItemRadiantCode" title="<\/r:find>"><\/span> <span rel="" class="mceItemRadiantCode" title="<\/r:find>"><\/span>'.match(this.regexp);
	this.assert_equal(2, matches.length)
  }
});

/*
 * Test Suite for the editor plugin.
 */
var editor_plugin_test_suite = new TestSuite(RadiusToHtmlRegexpTest, HtmlToRadiusRegexpTest);