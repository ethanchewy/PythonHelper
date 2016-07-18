(function(hljs) {
  // save the original implementations of code, image and link handling
  // from the marked library so we can defer to them in cases
  // where our custom features are not relevant
  var originalCode    = marked.Renderer.prototype.code;
  var originalImage   = marked.Renderer.prototype.image;
  var originalLink    = marked.Renderer.prototype.link;

  var trinket_hosts   = trinketConfig.get('apphostname') === 'trinket.io'
    ? ['trinket.io'] : [trinketConfig.get('apphostname'), 'trinket.io'];
  var trinket_types   = ['console', 'python', 'turtle', 'charts', 'processing', 'html', 'music', 'glowscript', 'blocks', 'python3'];
  var inline_trinkets = ['python', 'python3', 'html', 'glowscript'];

  var EMBED_URLS = [
    {
      regex : /^(?:https?\:)?\/\/(?:www\.)?youtu\.?be(?:\.com)?\/(?:watch\?v=|embed\/)?(\S+)$/i,
      attrs : 'width="420" height="315" frameborder="0" allowfullscreen',
      url   : function(match) {
        return '//www.youtube.com/embed/' + match[1];
      }
    },
    {
      regex : /^(?:https?\:)?\/\/(?:www\.)?vimeo(?:\.com)?\/(?:video\/)?(\S+)$/i,
      attrs : 'width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen',
      url   : function(match) {
        return '//player.vimeo.com/video/' + match[1];
      }
    },
    {
      regex : /^\/components\/viewerjs\/index\.html#/i,
      attrs : 'width="600" height="400" frameborder="0" scrolling="no" allowfullscreen mozallowfullscreen webkitallowfullscreen',
      url   : function(match) {
        return trinketConfig.getUrl(match.input);
      }
    },
    {
      regex : new RegExp(
                '^(?:https?\\:)?\\/\\/(?:www\\.)?'
                + '(' + trinket_hosts.join('|') + ')'
                + '(?:\\/embed)?\\/(' + trinket_types.join('|') + ')(.*)', 'i'
              ),
      attrs : 'class="embedded-trinket" width="100%" height="400" frameborder="0" scrolling="no"',
      url   : function(match) {
        var type = match[2] === 'console' ? 'console' : 'python';
        return '//' + match[1] + '/embed/' + type + match[3];
      }
    },
    {
      regex : /^(?:https?\:)?\/\/www\.slideshare\.net\/slideshow\/embed_code\//i,
      attrs : 'width="427" height="356" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px 1px 0; margin-bottom:5px; max-width: 100%;" allowfullscreen'
    },
    {
      regex : /^(?:https?\:)?\/\/www\.google\.com\/maps\/embed/i,
      attrs : 'width="600" height="450" frameborder="0" style="border:0"'
    }
  ];

  var HTML_WHITELIST = {
    i: {"class": /^[a-z\-\s]+$/},
    iframe : {
      align                 : /^(left|right|top|middle|bottom)$/i,
      frameborder           : /^(0|1)$/,
      width                 : /^\d+(%|px)?$/,
      height                : /^\d+(%|px)?$/,
      marginwidth           : /^\d+$/,
      marginheight          : /^\d+$/,
      scrolling             : /^(no|yes|auto)$/i,
      seamless              : /^seamless$/i,
      allowfullscreen       : /^allowfullscreen$/i,
      webkitallowfullscreen : /^webkitallowfullscreen$/i,
      mozallowfullscreen    : /^mozallowfullscreen$/i,
      style                 : /^(.(?!expression|javascript|\-moz\-binding))*$/i,
      src                   : [
        /^(https?\:)?\/\/(www\.)?youtu(be\.com|\.be)\/embed\//i,
        /^(https?\:)?\/\/(www\.)?player\.vimeo\.com\/video\//i,
        /^(https?\:)?\/\/(www\.)?google\.com\/maps\/embed/i,
        /^(https?\:)?\/\/(www\.)?slideshare\.net\/slideshow\/embed_code\//i,
        /^(https?\:)?\/\/(www\.)?geogebratube\.org\/material\/iframe\//i,
        /^(https?\:)?\/\/(www\.)?pythontutor\.com\/iframe-embed\.html/i,
        /^(https?\:)?\/\/(www\.)?screencast\-o\-matic\.com\/embed/i,
        /^(https?\:)?\/\/(www\.)?plot\.ly\/\~[\w-]+\/\d+\/\.embed/i,
        new RegExp(
          '^(https?\\:)?\\/\\/(www\\.)?'
          + '(' + trinket_hosts.join('|') + ')'
          + '\\/embed\\/', 'i'
        ),
      ]
    }
  };

  var IPYNB_REGEXP   = /\.ipynb$/i;
  var HTML_ATTR_REGEXP = /(?:\s+(\w+)(?:\s*=\s*(?:"(.*?)"|'(.*?)'|([^'">\s]+)))?)/igm;

  var TAGS = [];

  function escape(html, encode) {
    return html
      .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function sanitizeTag(tag, whitelist) {
    var attrs, foundMatch, rule;

    if (!whitelist) return escape(tag);

    HTML_ATTR_REGEXP.lastIndex = 0;
    while ((attrs = HTML_ATTR_REGEXP.exec(tag)) !== null) {
      foundMatch = false,
      rule = whitelist[attrs[1].toLowerCase()];
      var value = attrs[2] != null ? attrs[2] :
                  attrs[3] != null ? attrs[3] :
                  attrs[4];
      // allow whitelisted attributes with no value
      if (rule && value == null) {
        foundMatch = true;
      }
      else if (rule instanceof Array) {
        for(var i = 0; i < rule.length; i++) {
          if (rule[i] instanceof RegExp) {
            if (rule[i].exec(value)) {
              foundMatch = true;
              break;
            }
          }
        }
      }
      else if (rule instanceof RegExp && rule.exec(value)) {
        foundMatch = true;
      }

      if (!foundMatch) {
        tag = tag.substr(0, attrs.index) + tag.substr(attrs.index + attrs[0].length);
        HTML_ATTR_REGEXP.lastIndex = attrs.index;
      }
    }

    return tag;
  }

  marked.setOptions({
    sanitize: function(html) {
      var close = html.match(/^\s*<\/(\w+)\s*>\s*$/),
          allow = false,
          open, src, tagName, cleaned;

      if (close) {
        if (close[1] === TAGS[TAGS.length-1]) {
          TAGS.pop();
          return html;
        }
        else {
          return escape(html);
        }
      }

      open = html.match(/^\s*<(\w+)(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)(\/>|>)\s*$/im);
      if (!open) {
        return escape(html);
      }

      tagName = open[1].toLowerCase();
      if (HTML_WHITELIST[tagName]) {
        cleaned = sanitizeTag(html, HTML_WHITELIST[tagName]);
        if (tagName === 'iframe') {
          try {
            if ($(cleaned).attr('src')) {
              allow = true;
              html = cleaned;
            }
          } catch(e) {}
        }
        else {
          allow = true;
          html = cleaned;
        }
      }

      if (allow && open[2] === '>') {
        TAGS.push(open[1]);
      }

      return allow ? html : escape(html);
    }
  });

  window.trinketMarkdown = function(options) {
    function processCode(code, lang, escaped) {

      var output = code,
          parts  = /^([a-z0-9]+)\.((?:run|trinket|console))(?:\:(.*))?$/.exec(lang),
          attrs  = {
            width  : '100%',
            height : '400'
          },
          attrStr = '',
          url, arg;

      // if it matched the regex make sure it is an inline-able trinket
      if (parts && inline_trinkets.indexOf(parts[1]) == -1) {
        parts = undefined;
      }

      if (parts) {
        if (parts[3]) {
          // accept arguments of the style x=y,x="y",x='y'
          while (arg = /(\w+)=([^,]+)/.exec(parts[3])) {
            attrs[arg[1]] = arg[2].replace(/^("|')|("|')$/g, '');
            parts[3]      = parts[3].substr(arg[0].length);
          }
        }

        for(var key in attrs) {
          attrStr += ' ' + key + '="' + attrs[key] + '"';
        }

        if (parts[1] === 'python' && parts[2] === 'console') {
          parts[1] = 'console';
        }

        url    = trinketConfig.getUrl('/embed/' + parts[1]);

        if (parts[1] === 'python3' && parts[2] === 'console') {
          url = url + '?runMode=console';
        }

        url    = url + '#code=' + encodeURIComponent(code);

        url    = url.replace(/'/g, "%27");
        output = '<iframe class="embedded-trinket" src="' + url + '"' + attrStr + ' frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe>';
      }
      else if (hljs.getLanguage(lang)) {
        output = '<pre><code class="hljs">' + hljs.highlight(lang, code).value + '</code></pre>';
      }
      else {
        output = originalCode.call(this, code, lang, escaped);
      }

      return output;
    }

    function checkForEmbedUrl(href, title, text) {
      var match;
      for (var i = 0; i < EMBED_URLS.length; i++) {
        if (match = href.match(EMBED_URLS[i].regex)) {
          return '<iframe title="' + (title || text) + '"'
                 + ' src="'
                 + (EMBED_URLS[i].url ? EMBED_URLS[i].url(match) : match.input)
                 + '" ' + EMBED_URLS[i].attrs + '></iframe>';
        }
      }

      return false;
    }

    function processImage(href, title, text) {
      if (text === "plotly") {
        var plotly_parts  = href.split(':')
          , plotly_user   = plotly_parts[0]
          , plotly_id     = plotly_parts[1]
          , plotly_width  = 640
          , plotly_height = 480
          , plotly_attr, plotly_code;

        if (/\s+=\d+(x\d+)?/.test(plotly_id)) {
          plotly_attr = /\s+=(\d+)(x(\d+))?/.exec(plotly_id);
          if (plotly_attr[1]) {
            plotly_width = plotly_attr[1];
          }
          if (plotly_attr[3]) {
            plotly_height = plotly_attr[3];
          }

          plotly_id = plotly_id.replace(/\s+=.+/, '');
        }

        plotly_code = "<iframe "
          + "width='" + plotly_width + "' "
          + "height='" + plotly_height + "' "
          + "frameborder='0' seamless='seamless' scrolling='no' "
          + "src='https://plot.ly/~" + plotly_user + "/" + plotly_id + "/.embed"
          + "?width=" + plotly_width + "&height=" + plotly_height + "'></iframe>";

        return plotly_code;
      }
      else {
        return checkForEmbedUrl(href, title, text)
               || originalImage.call(this, href, title, text);
      }
    }

    function processLink(href, title, text) {
      var ipynb, arg, attrs, html;

      var embed = checkForEmbedUrl(href, title, text);
      if (embed) {
        return embed;
      }

      if (/^trinket-widget$/.test(text)) {
        attrs = {};
        // accept arguments of the style x=y,x="y,z",x='y,z'
        while (arg = /(\w+)=(?:("|'|&quot;|&#39;)((?:(?=(\\?))\4.)*?)\2|()([^,]+))/.exec(href)) {
          attrs[arg[1]] = arg[3] || arg[6];
          href          = href.substr(arg[0].length);
        }

        if (attrs.type) {
          attrs.type = attrs.type.toLowerCase().replace(/\s/g, "");
          switch(attrs.type) {
            case "subscribe":
              html = '<form class="trinket-subscription-form">\
                <input type="email" name="email" placeholder="Email" required>\
                <a class="subscribe-btn button primary" data-list="' + attrs.list + '">Subscribe</a>\
              </form>';

              if (!options.preview) {
                window.ga && window.ga("send", "event", "Subscription", "Offered", attrs.list);
                html += '<script type="text/javascript" src="' + trinketConfig.prefix('/js/plugins/trinket/subscribe.js') + '"></script>';
              }

              return html;
          }
        }
      }
      
      if (ipynb = href.match(IPYNB_REGEXP) && href.charAt(0) == '/') {
        return '<a href="http://nbviewer.ipython.org/urls/' + trinketConfig.get('apphostname') + href + '" title="' + title + '">' + text + '</a>';
      }
      else {
        var link = originalLink.call(this, href, title, text);
        if (href.charAt(0) !== '#') {
          // open links in a new window
          link = link.replace(/^<a\s/, '<a target="_blank" ');
        }
        return link;
      }
    }

    return function(src) {
      marked.Renderer.prototype.code  = processCode;
      marked.Renderer.prototype.image = processImage;
      marked.Renderer.prototype.link  = processLink;

      // src should be a string; replace null and undefined with empty string
      if (typeof src === undefined || src === null) {
        src = ""
      }
      
      // check for and "protect" MathJax by adding backticks
      src = src.replace(/(\$\$|\$\(|\)\$)/g, '$1`');
      
      var frameIndex = 0,
          iframes    = [];
          markup     = marked(src);

      // remove any code tags or backticks that were added to protect MathJax
      markup = markup.replace(/(\$\$|\$\(|\)\$)(<(?:\/)?code>|\`)/g, '$1');

      var $markup    = $('<div>'+markup+'</div>');

      $markup.find('iframe').each(function(index) {
        var frame = $(this),
            width, height, style, host, placeholder;

        if (!frame.attr('src')) return;

        frame.attr('src', frame.attr('src').replace(/^https?:/, ''));

        if (options.preview) {
          // replace iframes with a placeholder in preview mode
          width       = frame.attr('width')  || '600';
          height      = frame.attr('height') || '400';
          if (width.match(/^\d+$/)) width += 'px';
          if (height.match(/^\d+$/)) height += 'px';
          style       = 'width:'+width+';height:'+height+';';
          host        = frame.attr('src').match(/^(?:https?\:)?\/\/(?:www\.)?([^\/]+)/i)[1];
          placeholder = '<div class="embedded-content embed-placeholder"'
                        + ' data-index="' + (frameIndex++) + '"'
                        + ' style="' + style + '">'
                        + '<p>'
                        + 'Your ' + host + ' content will display here.<br/>'
                        + 'Click to preview.'
                        + '</p></div>';

          iframes.push($("<div>").append(frame.clone()).html().replace(/('")/g, '\\$1'));
          frame.replaceWith(placeholder);
        }
        else {
          frame.addClass('embedded-content');
        }
      });

      if (options.preview && iframes.length) {
        var script = "<script type='text/javascript'>\n\
          (function($) {\n\
            var iframes = ['" + iframes.join("','") + "'];\n\
            $('.embed-placeholder').click(function(){\n\
              var index = $(this).data('index');\n\
              $(this).replaceWith(iframes[index]);\n\
            });\n\
          })(window.jQuery)\n\
          </script>";

        $markup.append(script);
      }

      return $markup.html();
    }
  }
})(window.hljs);
