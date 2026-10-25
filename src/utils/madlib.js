// for converting nouns/adj/verbs etc into blanks

// basically this acts as a function to parse through all the text
// and finds blank spots
export function parseTemplate(text) {
    let blank = 0

    return text
    //splits the array if a pattern matches and keeps the curly brackets
    .split(/(\{[^}]+\})/)
    // the filter function removes pieces that aren't empty
    .filter((piece) => piece !== '')
    .map((piece) => {
        
        if (/^\{[^}]+\}$/.test(piece)) {
            // if it's a placeholder, 
            // we slice the first and last character (which are the curly braces)
            // shows up as just VERB (for e.g)
            return {
                //adds to the the array another attribute
                type: 'blank',
                label: piece.slice(1, -1).replace(/_/g, ' ').trim(),
                index: blankCount++,
            }
        }
        return { type: 'text', value: piece}
    })
}