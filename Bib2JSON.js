var Parser = require('./Parser'),
    fs     = require('fs');

if (process.argv.length < 4) {
  console.log('Usage: node Bib2JSON.js <bibtex file> <output JSON file>');
  process.exit(1);
}
fs.readFile(process.argv[2], 'utf-8', function(err, data) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Read', data.length, 'bytes from', process.argv[1]);
  var result = Parser(data);
  var entries = result.entries;
  var errors = result.errors;
  if (errors.length)
    console.error(errors);
  fs.writeFile(process.argv[3], JSON.stringify(entries));
})
