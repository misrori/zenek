const fs = require('fs');
const path = require('path');

const dir = '/Users/misrori/prod/zenek';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mp3'));

// Additional artist mappings
const additionalArtists = {
  '*NSYNC': { era: '2000s', genre: 'pop' },
  'FanEOne': { era: '2020s', genre: 'edm' },
  'Malbek ft. Suzanna': { era: '2010s', genre: 'electronic' },
  'Lo Air': { era: '2010s', genre: 'electronic' },
  'Ricardo and The Boys': { era: '2010s', genre: 'edm' },
  'Various Artists': { era: 'mixed', genre: 'mixed' },
  'C+C Music Factory': { era: '90s', genre: 'dance' },
  'Scatman John': { era: '90s', genre: 'eurodance' },
  'DJ Casper': { era: '2000s', genre: 'dance' },
  "Destiny's Child": { era: '2000s', genre: 'r&b' },
  "Guns N' Roses": { era: '90s', genre: 'rock' },
  "LA Vision & Gigi D'Agostino": { era: '2020s', genre: 'edm' },
  "Sinéad O'Connor": { era: '90s', genre: 'pop' },
  'Pedro Capó': { era: '2010s', genre: 'latin pop' },
  'Fousheé': { era: '2020s', genre: 'r&b' },
  'Beyoncé & Shakira': { era: '2000s', genre: 'pop' },
  'Alizée': { era: '2000s', genre: 'pop' },
};

const artistEraMap = {
  'ABBA': { era: '70s', genre: 'pop' },
  'AC/DC': { era: '80s', genre: 'rock' },
  'Ace of Base': { era: '90s', genre: 'pop' },
  'Aerosmith': { era: '90s', genre: 'rock' },
  'Akon': { era: '2000s', genre: 'r&b' },
  'Alanis Morissette': { era: '90s', genre: 'alternative rock' },
  'Alicia Bridges': { era: '70s', genre: 'disco' },
  'Alien Ant Farm': { era: '2000s', genre: 'alternative rock' },
  'Alizée': { era: '2000s', genre: 'pop' },
  'Alizee': { era: '2000s', genre: 'pop' },
  'ANGEMI': { era: '2010s', genre: 'edm' },
  'Aqua': { era: '90s', genre: 'eurodance' },
  'Audioslave': { era: '2000s', genre: 'rock' },
  'Avril Lavigne': { era: '2000s', genre: 'pop rock' },
  'Azahriah': { era: '2020s', genre: 'hungarian pop' },
  'Backstreet Boys': { era: '90s', genre: 'pop' },
  'Bay City Rollers': { era: '70s', genre: 'pop rock' },
  'Beastie Boys': { era: '80s', genre: 'hip-hop' },
  'Bee Gees': { era: '70s', genre: 'disco' },
  'Beton.Hofi': { era: '2020s', genre: 'hungarian hip-hop' },
  'Beyoncé': { era: '2000s', genre: 'r&b' },
  'Big & Rich': { era: '2000s', genre: 'country' },
  'Billy Idol': { era: '80s', genre: 'rock' },
  'Blackstreet': { era: '90s', genre: 'r&b' },
  'Blondie': { era: '70s', genre: 'new wave' },
  'Bloodhound Gang': { era: '90s', genre: 'alternative rock' },
  'Blur': { era: '90s', genre: 'britpop' },
  'Bob Seger': { era: '70s', genre: 'rock' },
  'Bon Jovi': { era: '90s', genre: 'rock' },
  'Brandy & Monica': { era: '90s', genre: 'r&b' },
  'Britney Spears': { era: '2000s', genre: 'pop' },
  'Brooks & Dunn': { era: '90s', genre: 'country' },
  'Bryan Adams': { era: '90s', genre: 'rock' },
  'Cascada': { era: '2000s', genre: 'eurodance' },
  'CeCe Peniston': { era: '90s', genre: 'dance' },
  'Cher': { era: '90s', genre: 'pop' },
  'CHIC': { era: '70s', genre: 'disco' },
  'Christina Aguilera': { era: '2000s', genre: 'pop' },
  'Ciara': { era: '2000s', genre: 'r&b' },
  'Coldplay': { era: '2000s', genre: 'alternative rock' },
  'Coolio': { era: '90s', genre: 'hip-hop' },
  'Creed': { era: '2000s', genre: 'rock' },
  'Culture Beat': { era: '90s', genre: 'eurodance' },
  'Cyndi Lauper': { era: '80s', genre: 'pop' },
  'DJ BoBo': { era: '90s', genre: 'eurodance' },
  'Daddy Yankee': { era: '2000s', genre: 'reggaeton' },
  'David Bowie': { era: '80s', genre: 'pop rock' },
  'David Guetta': { era: '2000s', genre: 'edm' },
  'De La Soul': { era: '80s', genre: 'hip-hop' },
  'Dead Or Alive': { era: '80s', genre: 'synth-pop' },
  'Deee-Lite': { era: '90s', genre: 'dance' },
  "Destiny's Child": { era: '2000s', genre: 'r&b' },
  'Dido': { era: '2000s', genre: 'pop' },
  'Digital Underground': { era: '90s', genre: 'hip-hop' },
  'DJ Casper': { era: '2000s', genre: 'dance' },
  'Don Juvi': { era: '2020s', genre: 'latin' },
  'Dr. Dre': { era: '2000s', genre: 'hip-hop' },
  'Earth, Wind & Fire': { era: '70s', genre: 'funk' },
  'Eiffel 65': { era: '90s', genre: 'eurodance' },
  'Elvis Presley': { era: '50s', genre: 'rock and roll' },
  'Eminem': { era: '2000s', genre: 'hip-hop' },
  'Enrique Iglesias': { era: '90s', genre: 'latin pop' },
  'Evanescence': { era: '2000s', genre: 'rock' },
  'Extreme': { era: '90s', genre: 'rock' },
  'Fatboy Slim': { era: '90s', genre: 'electronic' },
  'Feder': { era: '2010s', genre: 'edm' },
  'Fergie': { era: '2000s', genre: 'pop' },
  'Flo Rida': { era: '2000s', genre: 'hip-hop' },
  'Follow The Flow': { era: '2010s', genre: 'hungarian rock' },
  'Foo Fighters': { era: '90s', genre: 'rock' },
  'Fousheé': { era: '2020s', genre: 'r&b' },
  'Fugees': { era: '90s', genre: 'hip-hop' },
  'Garth Brooks': { era: '90s', genre: 'country' },
  'Gloria Estefan': { era: '80s', genre: 'latin pop' },
  'Green Day': { era: '90s', genre: 'punk rock' },
  "Guns N' Roses": { era: '90s', genre: 'rock' },
  'Gustavo Santaolalla': { era: '2000s', genre: 'electronic' },
  'Gwen Stefani': { era: '2000s', genre: 'pop' },
  'Gym Class Heroes': { era: '2000s', genre: 'pop rock' },
  'Haddaway': { era: '90s', genre: 'eurodance' },
  'Hoobastank': { era: '2000s', genre: 'rock' },
  'House of Pain': { era: '90s', genre: 'hip-hop' },
  'Ice MC': { era: '90s', genre: 'eurodance' },
  '50 Cent': { era: '2000s', genre: 'hip-hop' },
  'Jamiroquai': { era: '90s', genre: 'funk' },
  'Jay Sean': { era: '2000s', genre: 'pop' },
  'Jay-Z': { era: '90s', genre: 'hip-hop' },
  'Jennifer Lopez': { era: '2000s', genre: 'pop' },
  'John Travolta': { era: '70s', genre: 'pop' },
  'Jon Secada': { era: '90s', genre: 'pop' },
  'K-Ci & JoJo': { era: '90s', genre: 'r&b' },
  'KC & The Sunshine Band': { era: '70s', genre: 'disco' },
  'Kanye West': { era: '2000s', genre: 'hip-hop' },
  'Katy Perry': { era: '2010s', genre: 'pop' },
  'Ke$ha': { era: '2010s', genre: 'pop' },
  'Kenny Loggins': { era: '80s', genre: 'pop rock' },
  'Kid Rock': { era: '2000s', genre: 'rock' },
  'Kool & The Gang': { era: '80s', genre: 'funk' },
  'Korn': { era: '90s', genre: 'nu-metal' },
  'Kylie Minogue': { era: '2000s', genre: 'pop' },
  'LA Vision & Gigi D\'Agostino': { era: '2020s', genre: 'edm' },
  'La Bouche': { era: '90s', genre: 'eurodance' },
  'Lady Gaga': { era: '2010s', genre: 'pop' },
  'Lauryn Hill': { era: '90s', genre: 'hip-hop' },
  'Lenny Kravitz': { era: '90s', genre: 'rock' },
  'Lily Allen': { era: '2000s', genre: 'pop' },
  'Limp Bizkit': { era: '2000s', genre: 'nu-metal' },
  'Linkin Park': { era: '2000s', genre: 'nu-metal' },
  'Lionel Richie': { era: '80s', genre: 'pop' },
  'Los del Rio': { era: '90s', genre: 'latin pop' },
  'Lou Bega': { era: '90s', genre: 'latin pop' },
  'Macy Gray': { era: '90s', genre: 'r&b' },
  'Madonna': { era: '2000s', genre: 'pop' },
  'Manu Chao': { era: '2000s', genre: 'latin' },
  'Marcia Griffiths': { era: '80s', genre: 'reggae' },
  'Mariah Carey': { era: '90s', genre: 'pop' },
  'Marilyn Manson': { era: '90s', genre: 'industrial rock' },
  'Mark Morrison': { era: '90s', genre: 'r&b' },
  'Maroon 5': { era: '2010s', genre: 'pop' },
  'Mary J. Blige': { era: '2000s', genre: 'r&b' },
  'Mazzy Star': { era: '90s', genre: 'dream pop' },
  'Meat Loaf': { era: '90s', genre: 'rock' },
  'Metallica': { era: '90s', genre: 'metal' },
  'Michael Jackson': { era: '90s', genre: 'pop' },
  'Miley Cyrus': { era: '2010s', genre: 'pop' },
  'Moby': { era: '2000s', genre: 'electronic' },
  'Modjo': { era: '2000s', genre: 'house' },
  'Mr.President': { era: '90s', genre: 'eurodance' },
  'Natalie Imbruglia': { era: '90s', genre: 'pop rock' },
  'Neil Diamond': { era: '60s', genre: 'pop rock' },
  'Nelly': { era: '2000s', genre: 'hip-hop' },
  'Nelly Furtado': { era: '2000s', genre: 'pop' },
  'Nirvana': { era: '90s', genre: 'grunge' },
  'No Doubt': { era: '90s', genre: 'ska punk' },
  'Oasis': { era: '90s', genre: 'britpop' },
  'Outkast': { era: '2000s', genre: 'hip-hop' },
  "P!nk": { era: '2000s', genre: 'pop rock' },
  'Papa Roach': { era: '2000s', genre: 'rock' },
  'Paul Kalkbrenner': { era: '2010s', genre: 'techno' },
  'Pedro Capó': { era: '2010s', genre: 'latin pop' },
  'Pitbull': { era: '2000s', genre: 'hip-hop' },
  'Post Malone': { era: '2010s', genre: 'hip-hop' },
  'Prince': { era: '80s', genre: 'pop' },
  'Puff Daddy': { era: '90s', genre: 'hip-hop' },
  'Punnany Massif': { era: '2010s', genre: 'hungarian pop' },
  'PUNNANY MASSIF': { era: '2010s', genre: 'hungarian pop' },
  'R.E.M.': { era: '90s', genre: 'alternative rock' },
  'Radiohead': { era: '90s', genre: 'alternative rock' },
  'Real McCoy': { era: '90s', genre: 'eurodance' },
  'Red Hot Chili Peppers': { era: '90s', genre: 'alternative rock' },
  'Rednex': { era: '90s', genre: 'eurodance' },
  'Rick James': { era: '80s', genre: 'funk' },
  'Rick Springfield': { era: '80s', genre: 'pop rock' },
  'Ricky Martin': { era: '90s', genre: 'latin pop' },
  'Right Said Fred': { era: '90s', genre: 'pop' },
  'Rihanna': { era: '2000s', genre: 'pop' },
  'Robin S': { era: '90s', genre: 'house' },
  'Ronan Keating': { era: '90s', genre: 'pop' },
  'Rose Royce': { era: '70s', genre: 'funk' },
  'Santana': { era: '2000s', genre: 'latin rock' },
  'Scatman John': { era: '90s', genre: 'eurodance' },
  'Scorpions': { era: '90s', genre: 'rock' },
  'Shakira': { era: '2000s', genre: 'latin pop' },
  'Shania Twain': { era: '90s', genre: 'country pop' },
  'Shop Boyz': { era: '2000s', genre: 'hip-hop' },
  "Sinéad O'Connor": { era: '90s', genre: 'pop' },
  'Sir Mix-A-Lot': { era: '90s', genre: 'hip-hop' },
  'Sisqo': { era: '2000s', genre: 'r&b' },
  'Sixpence None The Richer': { era: '90s', genre: 'pop rock' },
  'Skrillex': { era: '2010s', genre: 'edm' },
  'Sly & The Family Stone': { era: '60s', genre: 'funk' },
  'Smash Mouth': { era: '90s', genre: 'pop rock' },
  'Soundgarden': { era: '90s', genre: 'grunge' },
  'Spice Girls': { era: '90s', genre: 'pop' },
  'Sting': { era: '90s', genre: 'pop rock' },
  'Sum 41': { era: '2000s', genre: 'punk rock' },
  'Surfaris': { era: '60s', genre: 'surf rock' },
  'System Of A Down': { era: '2000s', genre: 'metal' },
  'Tag Team': { era: '90s', genre: 'hip-hop' },
  'Tevin Campbell': { era: '90s', genre: 'r&b' },
  "The B-52's": { era: '80s', genre: 'new wave' },
  'The Bangles': { era: '80s', genre: 'pop rock' },
  'The Black Eyed Peas': { era: '2000s', genre: 'pop' },
  'The Cardigans': { era: '90s', genre: 'pop rock' },
  'The Commodores': { era: '70s', genre: 'funk' },
  'The Cranberries': { era: '90s', genre: 'alternative rock' },
  'The Doobie Brothers': { era: '70s', genre: 'rock' },
  'The Kingsmen': { era: '60s', genre: 'rock and roll' },
  'The Offspring': { era: '90s', genre: 'punk rock' },
  'The Pussycat Dolls': { era: '2000s', genre: 'pop' },
  'The Trammps': { era: '70s', genre: 'disco' },
  'The Troggs': { era: '60s', genre: 'rock' },
  'The Verve': { era: '90s', genre: 'britpop' },
  'Timbaland': { era: '2000s', genre: 'r&b' },
  'Tina Turner': { era: '90s', genre: 'pop rock' },
  'Tone Loc': { era: '80s', genre: 'hip-hop' },
  'Toni Braxton': { era: '90s', genre: 'r&b' },
  'Tommy James & The Shondells': { era: '60s', genre: 'pop rock' },
  'UB40': { era: '80s', genre: 'reggae' },
  'Unlike Pluto': { era: '2010s', genre: 'electronic' },
  'Usher': { era: '2000s', genre: 'r&b' },
  'Van Morrison': { era: '60s', genre: 'rock' },
  'Vanilla Ice': { era: '90s', genre: 'hip-hop' },
  'Vengaboys': { era: '90s', genre: 'eurodance' },
  'Village People': { era: '70s', genre: 'disco' },
  'Violent Femmes': { era: '80s', genre: 'alternative rock' },
  'Whitney Houston': { era: '90s', genre: 'pop' },
  'Wild Cherry': { era: '70s', genre: 'funk' },
  'Young MC': { era: '80s', genre: 'hip-hop' },
  'Fort Minor': { era: '2000s', genre: 'hip-hop' },
  'Tujamo': { era: '2010s', genre: 'edm' },
  'twenty one pilots': { era: '2010s', genre: 'alternative' },
  'Sam Smith': { era: '2020s', genre: 'pop' },
  'MEDUZA': { era: '2020s', genre: 'house' },
  '2Pac': { era: '90s', genre: 'hip-hop' },
  '2Scratch': { era: '2010s', genre: 'hip-hop' },
  '4 Non Blondes': { era: '90s', genre: 'alternative rock' },
  'PURE NEGGA': { era: '2020s', genre: 'hungarian hip-hop' },
  'Bossmane Beno': { era: '2020s', genre: 'hip-hop' },
  'Ivan Gough & Feenixpawl': { era: '2010s', genre: 'edm' },
  'JJ': { era: '2010s', genre: 'edm' },
  'Maniacs Squad': { era: '2010s', genre: 'edm' },
  'Maisy Kay': { era: '2020s', genre: 'pop' },
  'ProdWithFlavor': { era: '2020s', genre: 'hip-hop' },
  'Yellow Claw': { era: '2010s', genre: 'edm' },
  'lo_air': { era: '2010s', genre: 'electronic' },
  'Ricardo': { era: '2010s', genre: 'edm' },
  'C+C Music Factory': { era: '90s', genre: 'dance' },
  'Hundred Sins': { era: '2020s', genre: 'hungarian hip-hop' },
};

function cleanFilename(filename) {
  let name = filename.replace(/\.mp3$/, '');

  // Remove common YouTube/download artifacts
  const removePatterns = [
    /\s*\(Official\s*(Music\s*)?Video\)/i,
    /\s*\(Official\s*(HD\s*)?Video\)/i,
    /\s*\(Official\s*4K\s*(Music\s*)?Video\)/i,
    /\s*\(Official\s*Video\s*-?\s*[^)]*\)/i,
    /\s*\(Official\s*HD\s*Music\s*Video\)/i,
    /\s*\(Official\s*Audio\)/i,
    /\s*\(Official\s*Lyric\s*Video\s*\)/i,
    /\s*\(Official\s*Visualizer\)/i,
    /\s*\[Official\s*(Music\s*)?Video\]/i,
    /\s*\[Official\s*4K\s*(Music\s*)?Video\]/i,
    /\s*\[Official\s*HD\s*(Music\s*)?Video\]/i,
    /\s*\[Official\s*Video\]/i,
    /\s*\[4K\s*Remaster\]/i,
    /\s*\[4K\s*Upgrade\]/i,
    /\s*\[HD\s*UPGRADE\]/i,
    /\s*\[HD\]/i,
    /\s*\(HD\)/i,
    /\s*\[Full\s*HD\s*Remastered\]/i,
    /\s*\(Official\)/i,
    /\s*\(Audio\)/i,
    /\s*\(Lyric\s*Video\)/i,
    /\s*\(Videoclip\)/i,
    /\s*\(Live\)/i,
    /\s*\[HD\s*Remastered\]/i,
    /\s*HD\s*Remastered/i,
    /\s*\(HD\s*Remastered\)/i,
    /\s*\[HD\]/i,
    /\s*\(HQ\s*with\s*lyrics\)/i,
    /\s*\(HQ\)/i,
    /\s*HQ/i,
    /\s*w⧸\s*lyrics/i,
    /\s*\(Video\s*Oficial\)/i,
    /\s*\(Official\s*Video\s*HD\s*Remastered\)/i,
    /\s*\[.*?kbps.*?\]/i,
    /\s*\(128\s*kbps\)/i,
    /\s*\(Bass\s*Boosted\)/i,
    /\s*\[Bass\s*Boosted\]/i,
    /\s*_Slowed_/i,
    /\s*\(Subtitulada\s*en\s*Español\)/i,
    /\s*\(Off The Porch Live Performance\)/i,
    /\s*onlymp3\.to\s*-\s*/i,
    /\s*-[A-Za-z0-9_-]{11}-256k-\d+/i,
    /\s*\|\s*.*$/,
    /\s*ᴴᴰ/,
    /\s*neildiamond/i,
    /\s*\(unofficial\)\s*video/i,
    /\s*\(Official\s*HD\s*Video\)/i,
  ];

  for (const pattern of removePatterns) {
    name = name.replace(pattern, '');
  }

  // Fix special characters from YouTube filenames
  name = name.replace(/⧸/g, '/');
  name = name.replace(/＂/g, '"');
  name = name.replace(/：/g, ':');
  name = name.replace(/｜/g, '|');
  name = name.replace(/＊/g, '*');
  name = name.replace(/＂/g, '"');
  name = name.replace(/\s+/g, ' ').trim();

  return name;
}

function parseArtistTitle(cleanName, originalFilename) {
  let artist = '';
  let title = '';

  // Special cases
  if (originalFilename.includes('Black or White (Single Version)')) {
    return { artist: 'Michael Jackson', title: 'Black or White' };
  }
  if (originalFilename.includes('In Da Club')) {
    return { artist: '50 Cent', title: 'In Da Club' };
  }
  if (originalFilename.includes('In The End') && originalFilename.includes('Linkin Park')) {
    return { artist: 'Linkin Park', title: 'In The End' };
  }
  if (originalFilename.includes('Can I Get A')) {
    return { artist: 'Jay-Z', title: 'Can I Get A...' };
  }
  if (originalFilename.includes('Car Music Mix 2016')) {
    return { artist: 'Various Artists', title: 'Car Music Mix 2016' };
  }
  if (originalFilename.includes('video_set')) {
    return { artist: 'Various Artists', title: 'Video Set' };
  }
  if (originalFilename.includes('Gonna Make You Sweat')) {
    return { artist: 'C+C Music Factory', title: 'Gonna Make You Sweat (Everybody Dance Now)' };
  }
  if (originalFilename.includes('remember_the_name')) {
    return { artist: 'Fort Minor', title: 'Remember the Name' };
  }
  if (originalFilename.includes('tujamo_drop_that_low')) {
    return { artist: 'Tujamo', title: 'Drop That Low (When I Dip)' };
  }
  if (originalFilename.includes('lo_air_day_and_night')) {
    return { artist: 'Lo Air', title: 'Day and Night' };
  }
  if (originalFilename.includes('fergie_london_bridge')) {
    return { artist: 'Fergie', title: 'London Bridge (Oh Snap)' };
  }
  if (originalFilename.includes('PETRUNKO REMIX')) {
    return { artist: 'FanEOne', title: 'Petrunko Remix' };
  }
  if (originalFilename.includes('Мальбэк')) {
    return { artist: 'Malbek ft. Suzanna', title: 'Hypnozy (Symbolnatic Remix)' };
  }
  if (originalFilename.includes('Kiss Me') && originalFilename.includes('There She Goes')) {
    return { artist: 'Sixpence None The Richer', title: 'Kiss Me (There She Goes Version)' };
  }
  if (originalFilename.includes('Bob Seger')) {
    return { artist: 'Bob Seger', title: 'Old Time Rock n Roll' };
  }
  if (originalFilename.includes('Ricardo and The Boys')) {
    return { artist: 'Ricardo and The Boys', title: 'Bass Boost' };
  }
  if (originalFilename.includes('Bossmane Beno')) {
    return { artist: 'Bossmane Beno', title: 'Whole Thang' };
  }
  if (originalFilename.includes('Scatman')) {
    return { artist: 'Scatman John', title: 'Scatman (Ski-Ba-Bop-Ba-Dop-Bop)' };
  }
  if (originalFilename.includes('Dj Casper') || originalFilename.includes('DJ Casper')) {
    return { artist: 'DJ Casper', title: 'Cha Cha Slide' };
  }
  if (originalFilename.includes('Destiny') && originalFilename.includes('Child')) {
    return { artist: "Destiny's Child", title: "Jumpin' Jumpin'" };
  }
  if (originalFilename.includes('Guns N') && originalFilename.includes('Roses')) {
    return { artist: "Guns N' Roses", title: "Don't Cry" };
  }
  if (originalFilename.includes('LA Vision') && originalFilename.includes('Gigi')) {
    return { artist: "LA Vision & Gigi D'Agostino", title: 'Hollywood' };
  }
  if (originalFilename.includes('Sinéad') || originalFilename.includes("O_Connor")) {
    return { artist: "Sinéad O'Connor", title: 'Nothing Compares 2 U' };
  }
  if (originalFilename.includes('Pedro Cap')) {
    return { artist: 'Pedro Capó', title: 'Calma (Remix)' };
  }
  if (originalFilename.includes('Fousheé') || originalFilename.includes('Foushee')) {
    return { artist: 'Fousheé', title: 'Deep End' };
  }
  if (originalFilename.includes('Beyoncé') && originalFilename.includes('Shakira')) {
    return { artist: 'Beyoncé & Shakira', title: 'Beautiful Liar' };
  }
  if (originalFilename.includes("J_en Ai Marre") || originalFilename.includes("Alizée")) {
    return { artist: 'Alizée', title: "J'en Ai Marre" };
  }

  // Standard "Artist - Title" format
  const dashSplit = cleanName.match(/^(.+?)\s*[-–—:]\s*(.+)$/);
  if (dashSplit) {
    artist = dashSplit[1].trim();
    title = dashSplit[2].trim();
  } else {
    artist = cleanName;
    title = cleanName;
  }

  // Clean up featuring info from title but keep it in metadata
  title = title.replace(/\s*ft\.?\s+.*$/i, '').trim();
  title = title.replace(/\s*feat\.?\s+.*$/i, '').trim();
  title = title.replace(/\s*featuring\s+.*$/i, '').trim();
  title = title.replace(/\s*\[feat\.?\s+[^\]]*\]/i, '').trim();
  title = title.replace(/\s*\(feat\.?\s+[^)]*\)/i, '').trim();
  title = title.replace(/\s*\(ft\.?\s+[^)]*\)/i, '').trim();

  // Clean remaining brackets/parens with video info
  title = title.replace(/\s*\(Dir[\.:][^)]*\)/i, '').trim();
  title = title.replace(/\s*\(Dirty Version\)/i, '').trim();
  title = title.replace(/\s*\(Clean Version\)/i, '').trim();
  title = title.replace(/\s*\(Squeaky Clean Version\)/i, '').trim();
  title = title.replace(/\s*\(Official[^)]*\)/i, '').trim();
  title = title.replace(/\s*\[Official[^\]]*\]/i, '').trim();
  title = title.replace(/\s*\(Original\s*version\s*\)/i, '').trim();
  title = title.replace(/\s*\(Original Video.*?\)/i, '').trim();
  title = title.replace(/\s*\(PMXV Version\)/i, '').trim();
  title = title.replace(/\s*\(Orange Version\)/i, '').trim();
  title = title.replace(/\s*\(US Version\)/i, '').trim();
  title = title.replace(/\s*\(Long Version\)/i, '').trim();
  title = title.replace(/\s*\(Official\s*Video\)/i, '').trim();
  title = title.replace(/\s*\(Single Version\)/i, '').trim();
  title = title.replace(/\s*\[from .*?\]/i, '').trim();
  title = title.replace(/\s*\(Original Mix.*?\)/i, '').trim();
  title = title.replace(/\s*\(2006 Version\)/i, '').trim();
  title = title.replace(/\s*\(Original Mix - 2006 Version\)/i, '').trim();
  title = title.replace(/\s*\(1978\)/i, '').trim();
  title = title.replace(/\s*\(1996\)/i, '').trim();
  title = title.replace(/\s*\[1993\]/i, '').trim();
  title = title.replace(/\s*\(1994\)/i, '').trim();
  title = title.replace(/\s*\(clip\s*8\s*mile\)/i, '').trim();

  // Clean artist from featuring
  artist = artist.replace(/\s*ft\.?\s+.*$/i, '').trim();
  artist = artist.replace(/\s*feat\.?\s+.*$/i, '').trim();
  artist = artist.replace(/\s*\[feat\.?\s+[^\]]*\]/i, '').trim();
  artist = artist.replace(/\s*,\s+.*$/i, '').trim();

  // Remove leading "onlymp3.to - "
  artist = artist.replace(/^onlymp3\.to\s*-\s*/i, '').trim();

  // Fix underscore-based filenames
  if (artist.includes('_') && !artist.includes(' ')) {
    artist = artist.replace(/_/g, ' ');
    artist = artist.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  }
  if (title.includes('_') && !title.includes(' ')) {
    title = title.replace(/_/g, ' ');
    title = title.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  }

  return { artist, title };
}

function extractFeaturing(originalFilename) {
  let text = originalFilename.replace(/\.mp3$/, '');
  text = text.replace(/⧸/g, '/').replace(/＂/g, '"').replace(/：/g, ':');

  const patterns = [
    /\(feat\.?\s+([^)]+)\)/i,
    /\(ft\.?\s+([^)]+)\)/i,
    /\[feat\.?\s+([^\]]+)\]/i,
    /\bfeat\.?\s+([^(\[,\-]+)/i,
    /\bft\.?\s+([^(\[,\-]+)/i,
  ];

  for (const p of patterns) {
    const m = text.match(p);
    if (m) {
      let feat = m[1].trim();
      feat = feat.replace(/\s*\(.*$/, '').replace(/\s*\[.*$/, '').trim();
      return feat;
    }
  }
  return null;
}

function getEraAndGenre(artist, originalFilename) {
  const allMaps = { ...artistEraMap, ...additionalArtists };

  // Try direct lookup
  if (allMaps[artist]) return allMaps[artist];

  // Try case-insensitive
  const lower = artist.toLowerCase();
  for (const [key, val] of Object.entries(allMaps)) {
    if (key.toLowerCase() === lower) return val;
  }

  // Try partial match
  for (const [key, val] of Object.entries(allMaps)) {
    if (artist.includes(key) || key.includes(artist)) return val;
  }

  // Defaults
  return { era: 'unknown', genre: 'unknown' };
}

function generateTags(era, genre) {
  const tags = [];
  if (era !== 'unknown') tags.push(era);
  if (genre !== 'unknown') tags.push(genre);

  // Add decade-based party tags
  if (['70s', '80s'].includes(era)) tags.push('retro');
  if (['90s', '2000s'].includes(era)) tags.push('party classics');
  if (['eurodance', 'dance', 'edm', 'house'].includes(genre)) tags.push('dance');
  if (['hip-hop', 'r&b'].includes(genre)) tags.push('urban');
  if (['rock', 'alternative rock', 'grunge', 'punk rock', 'nu-metal', 'metal', 'industrial rock'].includes(genre)) tags.push('rock');
  if (['pop', 'pop rock', 'synth-pop'].includes(genre)) tags.push('pop');
  if (['disco', 'funk'].includes(genre)) tags.push('groove');
  if (['latin pop', 'latin', 'reggaeton', 'latin rock'].includes(genre)) tags.push('latin');
  if (['hungarian pop', 'hungarian rock', 'hungarian hip-hop'].includes(genre)) tags.push('hungarian');

  return [...new Set(tags)];
}

const metadata = [];

for (const file of files) {
  const cleaned = cleanFilename(file);
  let { artist, title } = parseArtistTitle(cleaned, file);
  const featuring = extractFeaturing(file);
  const { era, genre } = getEraAndGenre(artist, file);
  const tags = generateTags(era, genre);

  // Fix underscores that represent apostrophes
  title = title.replace(/_s\b/g, "'s").replace(/_t\b/g, "'t").replace(/_en\b/g, "'en").replace(/_ll\b/g, "'ll");
  artist = artist.replace(/_s\b/g, "'s").replace(/_t\b/g, "'t");

  // Remove trailing parentheses/brackets artifacts
  title = title.replace(/\s*\(\s*$/, '').replace(/\s*\[\s*$/, '').trim();

  const entry = {
    filename: file,
    path: file,
    artist: artist,
    title: title,
    genre: genre,
    era: era,
    tags: tags,
  };

  if (featuring) {
    entry.featuring = featuring;
  }

  metadata.push(entry);
}

// Sort by artist
metadata.sort((a, b) => a.artist.localeCompare(b.artist));

// Write JSON
fs.writeFileSync(
  path.join(dir, 'metadata', 'tracks.json'),
  JSON.stringify(metadata, null, 2),
  'utf-8'
);

console.log(`Generated metadata for ${metadata.length} tracks.`);
console.log(`Output: ${path.join(dir, 'metadata', 'tracks.json')}`);
