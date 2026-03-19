import type { VocalGender } from '@/lib/song-types';

export type ArtistSuggestion = {
  id: string;
  artist: string;
  tags: string[];
};

export type ArtistSuggestionWithImage = ArtistSuggestion & {
  image: string;
};

export const ARTIST_SUGGESTIONS = [
  {
    id: 'drake',
    artist: 'Drake',
    tags: ['hip-hop', 'trap', 'laid-back male vocals', 'ambient beats'],
  },
  {
    id: 'bruno-mars',
    artist: 'Bruno Mars',
    tags: ['funk-pop blend', 'groovy rhythms', 'male vocals', 'danceable'],
  },
  {
    id: 'fleetwood-mac',
    artist: 'Fleetwood Mac',
    tags: ['classic rock', 'mellow harmonies', 'emotional', '70s vibe'],
  },
  {
    id: 'ed-sheeran',
    artist: 'Ed Sheeran',
    tags: ['folk-pop', 'acoustic guitar loops', 'male vocals', 'mellow tone'],
  },
  {
    id: 'tim-mcgraw',
    artist: 'Tim McGraw',
    tags: ['country americana', 'steady rhythm', 'male vocals', 'heartfelt'],
  },
  {
    id: 'elton-john',
    artist: 'Elton John',
    tags: ['piano-driven glam rock', 'theatrical male vocals', 'vibrant 70s flair'],
  },
  {
    id: 'dolly-parton',
    artist: 'Dolly Parton',
    tags: ['country storytelling', 'twangy melodies', 'female vocals'],
  },
  {
    id: 'red-hot-chili-peppers',
    artist: 'Red Hot Chili Peppers',
    tags: ['funk rock', 'slap bass', 'male vocals', 'energetic'],
  },
  {
    id: 'coldplay',
    artist: 'Coldplay',
    tags: ['atmospheric alt-rock', 'ambient', 'male vocals', 'emotional piano'],
  },
  {
    id: 'taylor-swift',
    artist: 'Taylor Swift',
    tags: ['pop', 'alternative folk', 'emotional', 'female vocals'],
  },
  {
    id: 'elvis-presley',
    artist: 'Elvis Presley',
    tags: ['50s rock', 'hero theme', 'male vocals'],
  },
  {
    id: 'adele',
    artist: 'Adele',
    tags: ['soul', 'emotional', 'torch-lounge', 'female vocals'],
  },
  {
    id: 'ariana-grande',
    artist: 'Ariana Grande',
    tags: ['pop', 'dance pop', 'ethereal', 'female vocals'],
  },
  {
    id: 'billie-eilish',
    artist: 'Billie Eilish',
    tags: ['pop', 'dark', 'minimal', 'female vocals'],
  },
  {
    id: 'the-weeknd',
    artist: 'The Weeknd',
    tags: ['r&b', 'dark', 'cinematic', 'male vocals'],
  },
  {
    id: 'beyonce',
    artist: 'Beyoncé',
    tags: ['r&b', 'anthemic', 'danceable', 'female vocals'],
  },
  {
    id: 'kendrick-lamar',
    artist: 'Kendrick Lamar',
    tags: ['hip-hop', 'lyrical', 'storytelling', 'male vocals', 'conscious'],
  },
  {
    id: 'lady-gaga',
    artist: 'Lady Gaga',
    tags: ['pop', 'theatrical', 'dance', 'female vocals'],
  },
  {
    id: 'jay-z',
    artist: 'Jay-Z',
    tags: ['hip-hop', 'aggressive', 'storytelling', 'male vocals'],
  },
  {
    id: 'rihanna',
    artist: 'Rihanna',
    tags: ['r&b', 'dance pop', 'festive', 'female vocals'],
  },
  {
    id: 'kanye-west',
    artist: 'Kanye West',
    tags: ['hip-hop', 'progressive', 'eclectic', 'male vocals'],
  },
  {
    id: 'justin-bieber',
    artist: 'Justin Bieber',
    tags: ['pop', 'danceable', 'chillwave', 'male vocals'],
  },
  {
    id: 'katy-perry',
    artist: 'Katy Perry',
    tags: ['pop', 'glitter', 'festive', 'female vocals'],
  },
  {
    id: 'metallica',
    artist: 'Metallica',
    tags: ['thrash metal', 'aggressive riffs', 'pounding drums', 'male vocals'],
  },
  {
    id: 'acdc',
    artist: 'AC/DC',
    tags: ['hard rock', 'crunchy guitar riffs', 'raspy male vocals', 'driving rhythm'],
  },
  {
    id: 'madonna',
    artist: 'Madonna',
    tags: ['dance pop', 'high-nrg', 'female vocals'],
  },
  {
    id: 'david-bowie',
    artist: 'David Bowie',
    tags: ['70s british rock', 'art', 'eclectic', 'male vocals'],
  },
  {
    id: 'bob-dylan',
    artist: 'Bob Dylan',
    tags: ['folk', 'storytelling', 'acoustic guitar', 'male vocals'],
  },
  {
    id: 'post-malone',
    artist: 'Post Malone',
    tags: ['rap', 'ethereal', 'ambient', 'male vocals'],
  },
  {
    id: 'maroon-5',
    artist: 'Maroon 5',
    tags: ['pop rock', 'danceable', 'male vocals'],
  },
  {
    id: 'shakira',
    artist: 'Shakira',
    tags: ['latin', 'dance pop', 'festive', 'female vocals'],
  },
  {
    id: 'dua-lipa',
    artist: 'Dua Lipa',
    tags: ['disco', 'dance pop', 'groovy', 'female vocals'],
  },
  {
    id: 'michael-jackson',
    artist: 'Michael Jackson',
    tags: ['80s pop', 'dance', 'iconic', 'male vocals'],
  },
  {
    id: 'prince',
    artist: 'Prince',
    tags: ['funk', 'eclectic', 'glam', 'male vocals'],
  },
  {
    id: 'miley-cyrus',
    artist: 'Miley Cyrus',
    tags: ['pop', 'rock', 'party', 'female vocals'],
  },
  {
    id: 'imagine-dragons',
    artist: 'Imagine Dragons',
    tags: ['2010s rock', 'anthemic', 'emotion'],
  },
  {
    id: 'camila-cabello',
    artist: 'Camila Cabello',
    tags: ['pop', 'latin jazz', 'festive', 'female vocals'],
  },
  {
    id: 'harry-styles',
    artist: 'Harry Styles',
    tags: ['pop', 'rock', 'groovy', 'male vocals'],
  },
  {
    id: 'sam-smith',
    artist: 'Sam Smith',
    tags: ['soul', 'emotional', 'lounge', 'male vocals'],
  },
  {
    id: 'lizzo',
    artist: 'Lizzo',
    tags: ['pop', 'funk', 'empowering', 'female vocals'],
  },
  {
    id: 'gorillaz',
    artist: 'Gorillaz',
    tags: ['alternative rock', 'electronic', 'unusual'],
  },
  {
    id: 'the-beatles',
    artist: 'The Beatles',
    tags: ['60s british pop', 'classic', 'rock'],
  },
  {
    id: 'queen',
    artist: 'Queen',
    tags: ['rock', 'operatic', 'theatrical', 'male vocals'],
  },
  {
    id: 'led-zeppelin',
    artist: 'Led Zeppelin',
    tags: ['hard rock', 'blues rock', 'epic'],
  },
  {
    id: 'pink-floyd',
    artist: 'Pink Floyd',
    tags: ['80s rock', 'progressive', 'atmospheric'],
  },
  {
    id: 'the-rolling-stones',
    artist: 'The Rolling Stones',
    tags: ['rock', 'blues rock', 'classic'],
  },
  {
    id: 'bob-marley',
    artist: 'Bob Marley',
    tags: ['reggae', 'peaceful', 'soulful', 'male vocals'],
  },
  {
    id: 'frank-sinatra',
    artist: 'Frank Sinatra',
    tags: ['1940s big band', 'lounge singer', 'male vocals'],
  },
  {
    id: 'aretha-franklin',
    artist: 'Aretha Franklin',
    tags: ['soul', 'gospel', 'powerful', 'female vocals'],
  },
  {
    id: 'whitney-houston',
    artist: 'Whitney Houston',
    tags: ['pop', 'r&b', 'emotional', 'female vocals'],
  },
  {
    id: 'stevie-wonder',
    artist: 'Stevie Wonder',
    tags: ['soul', 'funk', 'joyful', 'male vocals'],
  },
  {
    id: 'the-chainsmokers',
    artist: 'The Chainsmokers',
    tags: ['edm-pop', 'bright synths', 'party energy', 'pulsing beats'],
  },
  {
    id: 'nicki-minaj',
    artist: 'Nicki Minaj',
    tags: ['rap-pop', 'bold female vocals', 'playful attitude', 'rhythmic flow'],
  },
  {
    id: 'green-day',
    artist: 'Green Day',
    tags: [
      'punk rock',
      'fast guitars',
      'youthful rebellion',
      'raw energy',
      'aggressive',
      'youthful',
    ],
  },
  {
    id: 'nirvana',
    artist: 'Nirvana',
    tags: ['90s grunge', 'dark male vocals', 'distorted guitars', 'raw angst'],
  },
  {
    id: 'amy-winehouse',
    artist: 'Amy Winehouse',
    tags: ['soul-jazz', 'smoky female vocals', 'retro horns', 'intimate'],
  },
  {
    id: 'linkin-park',
    artist: 'Linkin Park',
    tags: ['nu-metal', 'emotional male vocals', 'rap-rock fusion', 'heavy riffs'],
  },
  {
    id: 'aerosmith',
    artist: 'Aerosmith',
    tags: ['classic hard rock', 'raspy male vocals', 'bluesy guitars', 'swagger'],
  },
  {
    id: 'bon-jovi',
    artist: 'Bon Jovi',
    tags: ['arena rock', 'clean male vocals', 'big choruses', 'anthemic guitars'],
  },
  {
    id: 'billy-joel',
    artist: 'Billy Joel',
    tags: ['piano rock', 'male vocals', 'pop sensibility', 'melodic hooks', 'heartfelt'],
  },
  {
    id: 'phil-collins',
    artist: 'Phil Collins',
    tags: ['80s pop-rock', 'emotional male', 'cinematic drums', 'soft synths'],
  },
  {
    id: 'genesis',
    artist: 'Genesis',
    tags: ['progressive rock', 'layered textures', 'male vocals', 'synth-driven'],
  },
  {
    id: 'the-eagles',
    artist: 'The Eagles',
    tags: ['country rock', 'harmony vocals', 'smooth guitars', 'laid-back'],
  },
  {
    id: 'janis-joplin',
    artist: 'Janis Joplin',
    tags: ['blues-rock', 'female vocals', 'raw emotion', 'soulful', 'classic 60s'],
  },
  {
    id: 'jimi-hendrix',
    artist: 'Jimi Hendrix',
    tags: ['psychedelic rock', 'guitar virtuoso', 'wild solos', 'male vocals'],
  },
  {
    id: 'the-who',
    artist: 'The Who',
    tags: ['hard rock', 'theatrical male vocals', 'explosive guitars', 'dramatic'],
  },
  {
    id: 'iron-maiden',
    artist: 'Iron Maiden',
    tags: ['heavy metal', 'epic storytelling', 'galloping riffs', 'theatrical'],
  },
  {
    id: 'judas-priest',
    artist: 'Judas Priest',
    tags: ['heavy metal', 'soaring male vocals', 'fast riffs', 'powerful sound'],
  },
  {
    id: 'slayer',
    artist: 'Slayer',
    tags: ['thrash metal', 'dark aggression', 'rapid-fire guitars', 'male vocals'],
  },
  {
    id: 'ozzy-osbourne',
    artist: 'Ozzy Osbourne',
    tags: ['heavy metal', 'dark theatrics', 'male vocals', 'dramatic riffs'],
  },
  {
    id: 'skrillex',
    artist: 'Skrillex',
    tags: ['dubstep', 'electronic', 'intense', 'male vocals'],
  },
  {
    id: 'calvin-harris',
    artist: 'Calvin Harris',
    tags: ['edm', 'dance', 'festive', 'male vocals'],
  },
  {
    id: 'arctic-monkeys',
    artist: 'Arctic Monkeys',
    tags: ['indie rock', 'garage', 'cool'],
  },
  {
    id: 'tame-impala',
    artist: 'Tame Impala',
    tags: ['psychedelic rock', 'dreamy', 'mellifluous'],
  },
  {
    id: 'the-strokes',
    artist: 'The Strokes',
    tags: ['indie rock', 'cool', 'raw'],
  },
  {
    id: 'vampire-weekend',
    artist: 'Vampire Weekend',
    tags: ['indie rock', 'eclectic', 'upbeat'],
  },
  {
    id: 'kings-of-leon',
    artist: 'Kings of Leon',
    tags: ['rock', 'emotional', 'raw'],
  },
  {
    id: 'the-killers',
    artist: 'The Killers',
    tags: ['rock', 'synthpop', 'anthemic', 'male vocals'],
  },
  {
    id: 'system-of-a-down',
    artist: 'System of a Down',
    tags: ['metal', 'political', 'eccentric'],
  },
  {
    id: 'radiohead',
    artist: 'Radiohead',
    tags: ['alternative rock', 'experimental', 'atmospheric'],
  },
  {
    id: 'foo-fighters',
    artist: 'Foo Fighters',
    tags: ['rock', 'alternative', 'energetic'],
  },
  {
    id: 'muse',
    artist: 'Muse',
    tags: ['rock', 'progressive', 'theatrical'],
  },
  {
    id: 'rage-against-the-machine',
    artist: 'Rage Against the Machine',
    tags: ['rap metal', 'political', 'aggressive'],
  },
  {
    id: 'pearl-jam',
    artist: 'Pearl Jam',
    tags: ['grunge', 'rock', 'emotional'],
  },
  {
    id: 'soundgarden',
    artist: 'Soundgarden',
    tags: ['90s grunge', 'heavy', 'dark'],
  },
  {
    id: 'alice-in-chains',
    artist: 'Alice in Chains',
    tags: ['grunge', 'dark', 'melodic'],
  },
  {
    id: 'sigur-ros',
    artist: 'Sigur Rós',
    tags: ['post-rock', 'ethereal', 'atmospheric', 'icelandic'],
  },
  {
    id: 'bjork',
    artist: 'Björk',
    tags: ['alternative', 'experimental', 'unusual', 'female vocals'],
  },
  {
    id: 'marshmello',
    artist: 'Marshmello',
    tags: ['edm', 'dance', 'happy'],
  },
  {
    id: 'lana-del-rey',
    artist: 'Lana Del Rey',
    tags: ['pop', 'sadcore', 'cinematic', 'female vocals'],
  },
  {
    id: 'kacey-musgraves',
    artist: 'Kacey Musgraves',
    tags: ['country', 'pop', 'mellifluous', 'female vocals'],
  },
  {
    id: 'st-vincent',
    artist: 'St. Vincent',
    tags: ['art rock', 'eclectic', 'unusual', 'female vocals'],
  },
  {
    id: 'childish-gambino',
    artist: 'Childish Gambino',
    tags: ['hip-hop', 'funk', 'thoughtful', 'male vocals'],
  },
  {
    id: 'sza',
    artist: 'SZA',
    tags: ['r&b', 'neo soul', 'emotional', 'female vocals'],
  },
  {
    id: 'frank-ocean',
    artist: 'Frank Ocean',
    tags: ['r&b', 'soulful', 'introspective', 'male vocals'],
  },
  {
    id: 'tyler-the-creator',
    artist: 'Tyler, The Creator',
    tags: ['hip-hop', 'eclectic', 'unusual', 'male vocals'],
  },
  {
    id: 'solange',
    artist: 'Solange',
    tags: ['r&b', 'soul', 'artistic', 'female vocals'],
  },
  {
    id: 'brockhampton',
    artist: 'Brockhampton',
    tags: ['hip-hop', 'alternative', 'collective'],
  },
  {
    id: 'mac-demarco',
    artist: 'Mac DeMarco',
    tags: ['indie pop', 'slacker rock', 'chill', 'male vocals'],
  },
  {
    id: 'rufus-du-sol',
    artist: 'Rufus Du Sol',
    tags: ['electronic', 'dance', 'atmospheric'],
  },
  {
    id: 'bon-iver',
    artist: 'Bon Iver',
    tags: ['indie folk', 'ethereal', 'intimate', 'male vocals'],
  },
  {
    id: 'florence-the-machine',
    artist: 'Florence + The Machine',
    tags: ['indie rock', 'dramatic', 'ethereal'],
  },
  {
    id: 'jack-white',
    artist: 'Jack White',
    tags: ['rock', 'blues', 'raw', 'male vocals'],
  },
  {
    id: 'gary-clark-jr',
    artist: 'Gary Clark Jr.',
    tags: ['blues rock', 'soulful', 'gritty', 'male vocals'],
  },
  {
    id: 'leon-bridges',
    artist: 'Leon Bridges',
    tags: ['soul', 'r&b', 'retro', 'male vocals'],
  },
  {
    id: 'brittany-howard',
    artist: 'Brittany Howard',
    tags: ['rock', 'soul', 'powerful', 'female vocals'],
  },
  {
    id: 'alabama-shakes',
    artist: 'Alabama Shakes',
    tags: ['rock', 'blues rock', 'soulful'],
  },
  {
    id: 'glass-animals',
    artist: 'Glass Animals',
    tags: ['psychedelic pop', 'groovy', 'eclectic'],
  },
  {
    id: 'portugal-the-man',
    artist: 'Portugal, The Man',
    tags: ['alternative rock', 'psychedelic', 'catchy'],
  },
  {
    id: 'fka-twigs',
    artist: 'FKA Twigs',
    tags: ['r&b', 'electronic', 'avant-garde', 'female vocals'],
  },
  {
    id: 'the-national',
    artist: 'The National',
    tags: ['indie rock', 'melancholy', 'introspective'],
  },
  {
    id: 'mgmt',
    artist: 'MGMT',
    tags: ['psychedelic pop', 'electronic', 'playful'],
  },
  {
    id: 'empire-of-the-sun',
    artist: 'Empire of the Sun',
    tags: ['electronic', 'pop', 'theatrical'],
  },
  {
    id: 'grimes',
    artist: 'Grimes',
    tags: ['art pop', 'electronic', 'experimental', 'female vocals'],
  },
  {
    id: 'james-blake',
    artist: 'James Blake',
    tags: ['electronic', 'soul', 'minimalist', 'male vocals'],
  },
  {
    id: 'the-war-on-drugs',
    artist: 'The War on Drugs',
    tags: ['indie rock', 'heartland rock', 'melodic'],
  },
  {
    id: 'sufjan-stevens',
    artist: 'Sufjan Stevens',
    tags: ['indie folk', 'baroque pop', 'intimate', 'male vocals'],
  },
  {
    id: 'nicolas-jaar',
    artist: 'Nicolas Jaar',
    tags: ['electronic', 'experimental', 'atmospheric', 'male vocals'],
  },
  {
    id: 'flying-lotus',
    artist: 'Flying Lotus',
    tags: ['electronic', 'experimental hip-hop', 'fusion', 'male vocals'],
  },
  {
    id: 'thundercat',
    artist: 'Thundercat',
    tags: ['funk', 'jazz', 'experimental', 'male vocals'],
  },
  {
    id: 'kamasi-washington',
    artist: 'Kamasi Washington',
    tags: ['jazz', 'fusion', 'epic', 'male vocals'],
  },
  {
    id: 'massive-attack',
    artist: 'Massive Attack',
    tags: ['trip hop', 'dark', 'atmospheric'],
  },
  {
    id: 'portishead',
    artist: 'Portishead',
    tags: ['trip hop', 'dark', 'cinematic'],
  },
  {
    id: 'aphex-twin',
    artist: 'Aphex Twin',
    tags: ['idm', 'electronic', 'experimental', 'male vocals'],
  },
  {
    id: 'boards-of-canada',
    artist: 'Boards of Canada',
    tags: ['idm', 'downtempo', 'nostalgic'],
  },
  {
    id: 'j-dilla',
    artist: 'J Dilla',
    tags: ['hip-hop', 'soulful', 'experimental', 'male vocals'],
  },
  {
    id: 'mf-doom',
    artist: 'MF DOOM',
    tags: ['hip-hop', 'abstract', 'lyrical', 'male vocals'],
  },
  {
    id: 'blink-182',
    artist: 'Blink-182',
    tags: ['emo pop rock', 'fast-paced', 'exciting', 'male vocals'],
  },
  {
    id: 'phoebe-bridgers',
    artist: 'Phoebe Bridgers',
    tags: [
      'bedroom',
      'grungegaze',
      'catchy',
      'psychedelic',
      'acoustic tape recording',
      'female vocals',
    ],
  },
];

export const ARTIST_SUGGESTIONS_WITH_IMAGES = ARTIST_SUGGESTIONS.map((item) => ({
  ...item,
  image: `/images/artists/${item.id}.webp`,
}));

export function isVoiceTag(tag: string) {
  return /\bvocals?\b/i.test(tag);
}

export function detectGender(tag: string): VocalGender | null {
  if (/\bfemale vocals\b/i.test(tag)) return 'female';
  if (/\bmale vocals\b/i.test(tag)) return 'male';
  return null;
}
