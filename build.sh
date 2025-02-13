#!/bin/sh

if [[ ! -e ./dist ]]; then
  mkdir dist
fi

while IFS= read -r line; do
  if [[ $line == "<script id=\"program-data\" src=\"./program-data.js\"></script>" ]]; then
    echo "<script>" >> ./dist/program-embed.html
    cat ./program-data.js >> ./dist/program-embed.html
    echo "</script>" >> ./dist/program-embed.html
  else
    echo "$line" >> ./dist/program-embed.html
  fi
done < ./program-embed.html


cat ./dist/program-embed.html | pbcopy

echo 'Output to ./dist/program-embed.html and copied to clipboard'
