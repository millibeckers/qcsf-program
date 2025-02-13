const PROGRAM = {
  season: '',
  songs: [
    {
      title: '',
      credit: '',
      soloists: [],
      featuring: [],
      lyricsKey: '',
    },
    {
      title: 'Song name',
      credit: 'John Doe arr. Jay Doe',
      soloists: ['Jane Doe', 'Jay Doe'],
      featuring: ['Guitar: John Doe'],
      lyricsKey: 'song1',
    },
    'intermission',
  ],
  lyrics: {
    song1: `song1 lyrics line 1
song1 lyrics line 2
song1 lyrics line 3`,
  },
  directorsNotes: `input directors notes here.<br/>
<br/>
In this section, you have to put in those "br" tags if you want new lines to show up (this is different from the lyrics)`,
  members: {
    singers: [
      'John Doe',
      'Jane Doe',
      'Jay Doe',
    ],
    credits: [
      {role: 'Artistic Director', name: 'John Doe'},
      {role: 'Accompanist', name: 'Jane Doe'},
    ],
  },
  donors: [
    'John Doe',
    'Jane Doe',
  ],
};
window.PROGRAM = PROGRAM;
