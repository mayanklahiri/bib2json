bib2json
========

Javascript Bibtex to JSON for nodejs and the browser.  It can:

 * operate in streaming or block mode, extracting entries as arrays of dictionaries. 
 * convert Latex directives to UTF-8.
 * best-effort parse malformed entries.
 * run in a CommonJS environment (e.g., node) or a browser, without any dependencies.
 * be advanced-compiled by Google Closure Compiler.
 * parse "real-world" Bibtex, such as those found [here](http://liinwww.ira.uka.de/bibliography/).
 
Handwritten as a labor of love, not cruelly auto-generated from a grammar, tested with [Jasmine](https://jasmine.github.io/edge/introduction.html).

Usage
-----

Synchronous, block mode:

```
var entries = BibtexParser(text);
console.log(entries);
```

Asynchronous, stream mode:
 
```
var entryCallback = function(entry) { console.log(entry); }
var parser = new BibtexParser(entryCallback);
parser.parse(chunk1);
parser.parse(chunk2);
```
