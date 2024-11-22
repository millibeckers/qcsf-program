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
   * Injected into the document as HTML - so HTML tags can be used. Newlines must be made with `<br/>`s etc.
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
     * For multiple people who should be credited the same way, put the role prefix ahead of the
     * first name in the list (e.g. `['Backup: Jane Doe', 'Jay Doe', 'John Doe']`)
     *
     * Any whitespace within these strings will be replaced with non-breaking spaces so that line
     * breaks occur between names.
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
   * Lyrics are injected as text
   */
  lyrics: { [lyricsKey: string]: string; };
};
```


## Development

For local development, you can open `wrapper.html` in your browser of choice. You will have to reload to pick up any changes.

Note that `wrapper.html` does not contain any of the stylesheets from the flipcause website, so the visual styling will appear very differently to the final site.

## Build and Upload

**Build Prereqs:**
1. Ruby is installed
2. `./build` has execute permissions (`chmod +x ./build`)

**To build:**
```
$ ./build
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
