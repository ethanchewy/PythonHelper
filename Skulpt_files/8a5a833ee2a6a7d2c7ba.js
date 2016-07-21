document.write('<link rel="stylesheet" href="https://assets-cdn.github.com/assets/gist-embed-2f0c18bbf9db8afe105a9b5045800d52ba7ce16d394e711a8ed05ca5112bb486.css">')
document.write('<div id=\"gist12637058\" class=\"gist\">\n    <div class=\"gist-file\">\n      <div class=\"gist-data\">\n        <div class=\"js-gist-file-update-container js-task-list-container file-box\">\n  <div id=\"file-gistfile1-js\" class=\"file\">\n    \n\n  <div itemprop=\"text\" class=\"blob-wrapper data type-javascript\">\n      <table class=\"highlight tab-size js-file-line-container\" data-tab-size=\"8\">\n      <tr>\n        <td id=\"file-gistfile1-js-L1\" class=\"blob-num js-line-number\" data-line-number=\"1\"><\/td>\n        <td id=\"file-gistfile1-js-LC1\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-smi\">Sk<\/span>.<span class=\"pl-en\">onAfterImport<\/span> <span class=\"pl-k\">=<\/span> <span class=\"pl-k\">function<\/span>(<span class=\"pl-smi\">library<\/span>) {<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-gistfile1-js-L2\" class=\"blob-num js-line-number\" data-line-number=\"2\"><\/td>\n        <td id=\"file-gistfile1-js-LC2\" class=\"blob-code blob-code-inner js-file-line\">  <span class=\"pl-k\">switch<\/span>(library) {<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-gistfile1-js-L3\" class=\"blob-num js-line-number\" data-line-number=\"3\"><\/td>\n        <td id=\"file-gistfile1-js-LC3\" class=\"blob-code blob-code-inner js-file-line\">    <span class=\"pl-k\">case<\/span> <span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span>pygal<span class=\"pl-pds\">&#39;<\/span><\/span><span class=\"pl-k\">:<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-gistfile1-js-L4\" class=\"blob-num js-line-number\" data-line-number=\"4\"><\/td>\n        <td id=\"file-gistfile1-js-LC4\" class=\"blob-code blob-code-inner js-file-line\">      <span class=\"pl-c\">// make charts render instantly<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-gistfile1-js-L5\" class=\"blob-num js-line-number\" data-line-number=\"5\"><\/td>\n        <td id=\"file-gistfile1-js-LC5\" class=\"blob-code blob-code-inner js-file-line\">      <span class=\"pl-smi\">Highcharts<\/span>.<span class=\"pl-en\">setOptions<\/span>({<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-gistfile1-js-L6\" class=\"blob-num js-line-number\" data-line-number=\"6\"><\/td>\n        <td id=\"file-gistfile1-js-LC6\" class=\"blob-code blob-code-inner js-file-line\">        plotOptions<span class=\"pl-k\">:<\/span> {<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-gistfile1-js-L7\" class=\"blob-num js-line-number\" data-line-number=\"7\"><\/td>\n        <td id=\"file-gistfile1-js-LC7\" class=\"blob-code blob-code-inner js-file-line\">          series<span class=\"pl-k\">:<\/span> {<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-gistfile1-js-L8\" class=\"blob-num js-line-number\" data-line-number=\"8\"><\/td>\n        <td id=\"file-gistfile1-js-LC8\" class=\"blob-code blob-code-inner js-file-line\">            animation<span class=\"pl-k\">:<\/span> <span class=\"pl-c1\">false<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-gistfile1-js-L9\" class=\"blob-num js-line-number\" data-line-number=\"9\"><\/td>\n        <td id=\"file-gistfile1-js-LC9\" class=\"blob-code blob-code-inner js-file-line\">          }<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-gistfile1-js-L10\" class=\"blob-num js-line-number\" data-line-number=\"10\"><\/td>\n        <td id=\"file-gistfile1-js-LC10\" class=\"blob-code blob-code-inner js-file-line\">        }<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-gistfile1-js-L11\" class=\"blob-num js-line-number\" data-line-number=\"11\"><\/td>\n        <td id=\"file-gistfile1-js-LC11\" class=\"blob-code blob-code-inner js-file-line\">      });<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-gistfile1-js-L12\" class=\"blob-num js-line-number\" data-line-number=\"12\"><\/td>\n        <td id=\"file-gistfile1-js-LC12\" class=\"blob-code blob-code-inner js-file-line\">      <span class=\"pl-k\">break<\/span>;<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-gistfile1-js-L13\" class=\"blob-num js-line-number\" data-line-number=\"13\"><\/td>\n        <td id=\"file-gistfile1-js-LC13\" class=\"blob-code blob-code-inner js-file-line\">    <span class=\"pl-k\">case<\/span> <span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span>turtle<span class=\"pl-pds\">&#39;<\/span><\/span><span class=\"pl-k\">:<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-gistfile1-js-L14\" class=\"blob-num js-line-number\" data-line-number=\"14\"><\/td>\n        <td id=\"file-gistfile1-js-LC14\" class=\"blob-code blob-code-inner js-file-line\">      <span class=\"pl-c\">// make turtle draw instantly<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-gistfile1-js-L15\" class=\"blob-num js-line-number\" data-line-number=\"15\"><\/td>\n        <td id=\"file-gistfile1-js-LC15\" class=\"blob-code blob-code-inner js-file-line\">      <span class=\"pl-smi\">Sk<\/span>.<span class=\"pl-smi\">tg<\/span>.<span class=\"pl-smi\">defaults<\/span>.<span class=\"pl-smi\">animate<\/span> <span class=\"pl-k\">=<\/span> <span class=\"pl-c1\">false<\/span>;<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-gistfile1-js-L16\" class=\"blob-num js-line-number\" data-line-number=\"16\"><\/td>\n        <td id=\"file-gistfile1-js-LC16\" class=\"blob-code blob-code-inner js-file-line\">      <span class=\"pl-smi\">Sk<\/span>.<span class=\"pl-smi\">tg<\/span>.<span class=\"pl-smi\">Turtle<\/span>.<span class=\"pl-c1\">prototype<\/span>.<span class=\"pl-en\">speed<\/span> <span class=\"pl-k\">=<\/span> <span class=\"pl-k\">function<\/span>() {}<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-gistfile1-js-L17\" class=\"blob-num js-line-number\" data-line-number=\"17\"><\/td>\n        <td id=\"file-gistfile1-js-LC17\" class=\"blob-code blob-code-inner js-file-line\">      <span class=\"pl-smi\">Sk<\/span>.<span class=\"pl-smi\">tg<\/span>.<span class=\"pl-smi\">Turtle<\/span>.<span class=\"pl-c1\">prototype<\/span>.<span class=\"pl-en\">delay<\/span> <span class=\"pl-k\">=<\/span> <span class=\"pl-k\">function<\/span>() {}<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-gistfile1-js-L18\" class=\"blob-num js-line-number\" data-line-number=\"18\"><\/td>\n        <td id=\"file-gistfile1-js-LC18\" class=\"blob-code blob-code-inner js-file-line\">      <span class=\"pl-k\">break<\/span>;<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-gistfile1-js-L19\" class=\"blob-num js-line-number\" data-line-number=\"19\"><\/td>\n        <td id=\"file-gistfile1-js-LC19\" class=\"blob-code blob-code-inner js-file-line\">  }<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-gistfile1-js-L20\" class=\"blob-num js-line-number\" data-line-number=\"20\"><\/td>\n        <td id=\"file-gistfile1-js-LC20\" class=\"blob-code blob-code-inner js-file-line\">}<\/td>\n      <\/tr>\n<\/table>\n\n  <\/div>\n\n  <\/div>\n  \n<\/div>\n\n      <\/div>\n      <div class=\"gist-meta\">\n        <a href=\"https://gist.github.com/bzwheeler/8a5a833ee2a6a7d2c7ba/raw/ac6a3ef66af6e353a862c2d4dce2bdf7eaeec169/gistfile1.js\" style=\"float:right\">view raw<\/a>\n        <a href=\"https://gist.github.com/bzwheeler/8a5a833ee2a6a7d2c7ba#file-gistfile1-js\">gistfile1.js<\/a>\n        hosted with &#10084; by <a href=\"https://github.com\">GitHub<\/a>\n      <\/div>\n    <\/div>\n<\/div>\n')
