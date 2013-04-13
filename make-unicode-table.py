#!/usr/bin/env python
import xml.etree.ElementTree as ET

tree = ET.parse('unicode.xml')
for node in tree.getroot():
  if node.tag == 'character':
    latex = node.find('latex')
    if latex != None:
      if len(latex.text) < 3:
        continue
      if latex.text[0] != '\\':
        continue
      regex = latex.text.replace('\\', '\\\\')
      regex = regex.replace('{', '\\{')
      regex = regex.replace('[', '\\[')
      regex = regex.replace(']', '\\]')
      regex = regex.replace('}', '\\}')
      regex = regex.replace('$', '\\$')
      regex = regex.replace('-', '\\-')
      regex = regex.replace('^', '\\^')

      if node.attrib['id'][1] == '0':
        uni = '\\u' + node.attrib['id'][2:]
        print '''    [ /{regex}/g, '{uni}' ],'''.format(**locals())
