describe("BaseCases", function() {

  it("Parse an empty string without errors or results", function() {
    var result = BibtexParser('  \t\t\n   \n\n');
    expect(result.entries.length).toEqual(0);
    expect(result.errors.length).toEqual(0);
  });

  it("Parse braces within braces", function() {
    var result = BibtexParser('@book { pollock, title={{{A}} very {Big} Book.} }')
    expect(result.entries.length).toEqual(1);
    expect(result.errors.length).toEqual(0);
    expect(result.entries[0].Fields.title).toEqual('A very Big Book.');
  });

  it("Parse braces within quotes", function() {
    var result = BibtexParser('@book { pollock, title="{A} very {Big} Book."}')
    expect(result.entries.length).toEqual(1);
    expect(result.errors.length).toEqual(0);
    expect(result.entries[0].Fields.title).toEqual('A very Big Book.');
  });

  it("Parse quotes within braces", function() {
    var result = BibtexParser('@book { pollock, title="{A} very {"Big"} Book."}');
    expect(result.entries.length).toEqual(1);
    expect(result.errors.length).toEqual(0);
    expect(result.entries[0].Fields.title).toEqual('A very "Big" Book.');
  });

  it("Respect backslashes", function() {
    var text = '@book { pollock, title="{A} \\\\very \\{{Big} \\"Book\\"."}';
    var result = BibtexParser(text);
    expect(result.entries.length).toEqual(1);
    expect(result.errors.length).toEqual(0);
    expect(result.entries[0].Fields.title).toEqual('A \\very {Big "Book".');
  });

  it("Convert some Latex characters to UTF-8", function() {
    var result = BibtexParser('@book { pollock, title="\\"{o}\\AA \\^{I}\\alpha " }');
    expect(result.entries.length).toEqual(1);
    expect(result.errors.length).toEqual(0);
    expect(result.entries[0].Fields.title).toEqual('\u00f6\u00c5\u00ce\u03b1');
  });

  it("Expand a predefined macro in the middle an entry", function() {
    var text = '@book{ pollock, month   = jan, title="A title!" }';
    var result = BibtexParser(text);
    expect(result.entries.length).toEqual(1);
    expect(result.errors.length).toEqual(0);
    expect(result.entries[0].Fields.month).toEqual('January');
  });

  it("Expand a macro at the end of an entry", function() {
    var text = '@string  \n{ howdy = "well, hello!" }@book{ pollock, title=howdy }';
    var result = BibtexParser(text);
    expect(result.entries.length).toEqual(1);
    expect(result.errors.length).toEqual(0);
    expect(result.entries[0].Fields.title).toEqual('well, hello!');
  });

});
