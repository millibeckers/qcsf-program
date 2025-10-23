# QCSF Program Builder

Everything you need to construct a concert program and then upload it to our Flipcause Website.

## Structure

The main code lives inside of `program-embed.html`, and the program data can be found in `program-data.js`. The build process described below combines these two files into one file that can be pasted into the Flipcause website builder.

## Program Data

To input data into the program, update the `PROGRAM` object found in `program-data.js`. Documentation on the `PROGRAM` object can be found below:

```typescript
type ProgramData = {
  /**
   * The name of the current season (e.g. "Fall 2024").
   */
  season: string;
  /**
   * Director's notes
   *
   * Director's notes are parsed as GitHub-style markdown with line breaks preserved
   */
  directorsNotes: string;
  /**
   * Array of donor names to display in the Top Donors section
   *
   * List will not be sorted in code, must be pre-alphabatized
   */
  donors: string[];
  members: {
    /**
     * Array of singer names to display in the Our Members section
     *
     * List will not be sorted in code, must be pre-alphabatized
     */
    singers: string[];
    /**
     * Additional individually-credited members to list in the Our Members section, e.g. Artistic Director or Accompanist.
     *
     * List will be displayed in the order provided.
     */
    credits: {
      /**
       * Role with which to credit the individual (e.g. `'Artistic Director'`)
       */
      role: string;
      /**
       * Name of the person to credit
       */
      name: string;
    }[];
  };
  /**
   * List of songs to be displayed in the program
   *
   * Songs will be added in the order they are given in this list. Intermission is represented as
   * the string `'intermission'`
   */
  songs: ('intermission' | {
    /** Song title */
    title: string;
    /** Song credit (e.g. composer, arranger) */
    credit: string;
    /**
     * List of names of soloists for this piece.
     *
     * The prefix "Soloist: " or "Soloists: " will be automatically applied.
     *
     * Soloists will be displayed in the order provided, and any whitespace in their names will be
     * replaced with non-breaking spaces so that line breaks occur between names
     */
    soloists?: string[];
    /**
     * Additional featured individuals in a piece, e.g. guest instrumentalists.
     * Basically anyone who should be individually called out, but wouldn't be described as a "soloist".
     *
     * Unlike `soloists`, role _does_ need to be included here. e.g. `"Synth: Jay Doe"`
     * Each featured individual will be on their own line, so multiple people on the same part should
     * be part of the same string.
     *
     * Any whitespace that isn't immediately after a comma within these strings will be replaced with
     * non-breaking spaces so that line breaks occur between names.
     */
    featuring?: string[];
    /**
     * String key which corresponds to a key in the `lyrics` section.
     *
     * If provided (and lyrics are present in the `lyrics` object), those lyrics will be displayed in
     * the lyrics section of the program and links will be created between the two.
     */
    lyricsKey?: string;
  })[];
  /**
   * Lyrics information for the songs in the program.
   *
   * `lyricsKey` should correspond to a `lyricsKey` value in the `songs` object. If there is no song
   * with a matching `lyricsKey`, the lyrics will not be included in the program.
   *
   * Lyrics will be displayed in the order of their corresponding songs, not in the order that they
   * are provided here.
   *
   * Lyrics are in GitHub-style mardown with line breaks preserved
   */
  lyrics: { [lyricsKey: string]: string; };
};
```


## Development

For local development, you can open `wrapper.html` in your browser of choice. You will have to reload to pick up any changes.

Note that `wrapper.html` does not contain any of the stylesheets from the flipcause website, so the visual styling will appear very differently to the final site.

## Build and Upload

**To build:**
```
$ sh ./build.sh
```

This will output the built file to `dist/program-embed.html`, and it will copy the output to your clipboard for easy uploading.

**To Upload:**
1. Navigate to your website builder in Flipcause, and navigate to or create the page you want to put your program into
2. If one does not already exist, add an "Embed Code" widget to your page
3. Click on your widget and then click "Edit Custom HTML"
4. Paste the built file into the box
    - Note that the preview window does not have the correct stylesheets either, so this preview doesn't display anything close to what it will on the published site
5. Click "Publish"

Be sure that you have configured the page to be excluded from search results before uploading a file containing participants' names.

## Contributing
Since this is a public repository, **please do not push any commits containing participants' names**, even if you are on a separate branch or you have made a later commit that deletes the names.

If you have made a commit that contains participant names, please [rebase](https://git-scm.com/book/en/v2/Git-Branching-Rebasing) or otherwise alter the commit history so that no commits exist with participants' names in them.

## Instructions for Non-Developers
We are going to have to get a bit technical here, but don't panic! I'll walk you through each step.

The site you're looking at is called GitHub, and it's one way software engineers use to share code with each other.

1. Click the green "Code" button and then click "Download Zip" from the popup
2. Go to your Downloads folder and then unzip the new zip file
3. Open the file `"program-data.js"` in a text editor (the default one for Macs is TextEdit)
4. Use the instructions in the "Program Data" section of this page to fill in the data for the program.
5. Check how the data is going to show up by opening the `wrapper.html` file on your computer.
> Note! This page is going to be ugly, that's because the pretty parts all come from the Flipcause website. You mainly want to use this to see that your songs are showing up in the order you want and that your lyrics are labeled correctly.

Once you're ready to upload, you need to combine the program data with the program code.

1. Open up the `program-embed.html` file, and find the line that looks like this:
```html
<script id="program-data" src="./program-data.js"></script>
```
2. Delete that one line and replace it with this:
```html
<script>

</script>
```
3. Copy the entire `program-data.js` file and paste it in between the `<script>` and `</script>` lines you just added
4. Copy the whole new thing
5. Follow the instructions in the Upload section of this page to upload the file

> If you're comfortable using the terminal, you can avoid some of this hassle by using the provided build script. However, you should never run random scripts from the internet if you don't understand what you're doing - bad actors can easily trick you into really messing up your computer. The copy/pasting method I've written here, while annoying, is also safe.
