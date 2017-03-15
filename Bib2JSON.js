var fs     = require('fs'),
    Parser = require('./Parser');

if (process.argv.length < 3) {
  console.log('Usage: node Bib2JSON.js <bibtex file> <output JSON file>');
  process.exit(1);
}

fs.readFile(process.argv[2], 'utf-8', function(err, data) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  var result = Parser(data);
  var entries = result.entries;
  var errors = result.errors;

  if (errors.length) console.error(errors);
  entries = JSON.stringify(entries);
  if (process.argv[3]) {
    console.log('Read', data.length, 'bytes from', process.argv[1]);
    fs.writeFileSync(process.argv[3], entries);
  }
  else console.info(entries);
})
