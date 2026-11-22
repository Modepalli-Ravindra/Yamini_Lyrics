import { Category, Song } from './types';

export const SEED_CATEGORIES: Category[] = [
  {
    id: 'cat-ayyappa',
    name_telugu: 'అయ్యప్ప స్వామి',
    name_english: 'Ayyappa Swamy',
    subtitle_english: 'Lord of Sabarimala & Divine Protector',
    slug: 'ayyappa-swamy',
    icon: '/assets/deities/ayyappa-swamy.png',
    display_order: 1,
  },
  {
    id: 'cat-shiva',
    name_telugu: 'శివుడు',
    name_english: 'Lord Shiva',
    subtitle_english: 'Mahadev, Rudra & Auspicious Lord',
    slug: 'lord-shiva',
    icon: '/assets/deities/lord-shiva.png',
    display_order: 2,
  },
  {
    id: 'cat-venkateswara',
    name_telugu: 'వేంకటేశ్వర స్వామి',
    name_english: 'Lord Venkateswara',
    subtitle_english: 'Balaji & Lord of the Seven Sacred Hills',
    slug: 'lord-venkateswara',
    icon: '/assets/deities/lord-venkateswara.png',
    display_order: 3,
  },
  {
    id: 'cat-hanuman',
    name_telugu: 'హనుమంతుడు',
    name_english: 'Lord Hanuman',
    subtitle_english: 'Bajrangbali & Dispeller of All Sorrows',
    slug: 'lord-hanuman',
    icon: '/assets/deities/lord-hanuman.png',
    display_order: 4,
  },
  {
    id: 'cat-rama',
    name_telugu: 'శ్రీరాముడు',
    name_english: 'Sri Rama',
    subtitle_english: 'Maryada Purushottama & Ayodhya King',
    slug: 'sri-rama',
    icon: '/assets/deities/sri-rama.png',
    display_order: 5,
  },
  {
    id: 'cat-durga',
    name_telugu: 'దుర్గా దేవి',
    name_english: 'Durga Devi',
    subtitle_english: 'Supreme Goddess & Slayer of Mahishasura',
    slug: 'durga-devi',
    icon: '/assets/deities/durga-devi.png',
    display_order: 6,
  },
  {
    id: 'cat-ganesha',
    name_telugu: 'వినాయకుడు',
    name_english: 'Lord Ganesha',
    subtitle_english: 'Remover of Obstacles & Divine Wisdom',
    slug: 'lord-ganesha',
    icon: '/assets/deities/lord-ganesha.png',
    display_order: 7,
  },
  {
    id: 'cat-krishna',
    name_telugu: 'శ్రీకృష్ణుడు',
    name_english: 'Lord Krishna',
    subtitle_english: 'Murali Dhara & Supreme Divine Guide',
    slug: 'lord-krishna',
    icon: '/assets/deities/lord-krishna.png',
    display_order: 8,
  },
];

export const SEED_SONGS: Song[] = [
  {
    id: 'song-harivarasanam',
    category_id: 'cat-ayyappa',
    title_telugu: 'హరివరాసనం (శబరిమల నిత్య హారతి)',
    title_roman: 'Harivarasanam (Sabarimala Nitya Harati)',
    title_english: 'Harivarasanam - The Sacred Lullaby of Sabarimala',
    slug: 'harivarasanam-viswamohanam',
    tags: 'ayyappa, harivarasanam, sabarimala, harati, swamy saranam, stotram, english meaning',
    view_count: 1420,
    download_count: 530,
    lyrics_telugu: `హరివరాసనం విశ్వమోహనం
హరిదధీశ్వరం ఆరాధ్యపాదుకం
అరివిమర్దనం నిత్యనర్తనం
హరిహరాత్మజం దేవమాశ్రయే ॥

శరణకీర్తనం శక్తమానసం
భరణలోలుపం నర్తనాలసం
అరుణభాసురం భూతనాయకం
హరిహరాత్మజం దేవమాశ్రయే ॥

ప్రణయసత్యకం ప్రాణనాయకం
ప్రణతకల్పకం సుప్రభాంచితం
ప్రణవమందిరం కీర్తనప్రియం
హరిహరాత్మజం దేవమాశ్రయే ॥

తురగవాహనం సుందరాననం
వరగదాయుధం వేదవర్ణితం
గురుకృపాకరం కీర్తనప్రియం
హరిహరాత్మజం దేవమాశ్రయే ॥

శరణమయ్యప్ప స్వామి శరణమయ్యప్ప
శరణమయ్యప్ప స్వామి శరణమయ్యప్ప ॥`,
    lyrics_roman: `Harivarasanam Viswamohanam
Haridadheeswaram Aaradhyapaadukam
Arivimardanam Nityanartanam
Hariharaatmajam Devamaashraye ||

Sharanakeertanam Shakthamaanasam
Bharanalolupam Nartanallasam
Arunabhaasuram Bhoothanaayakam
Hariharaatmajam Devamaashraye ||

Pranayasatyakam Praananaayakam
Pranathakalpakam Suprabhaanchitam
Pranavavmandiram Keertanapriyam
Hariharaatmajam Devamaashraye ||

Turagavaahanam Sundaraananam
Varagadaayudham Vedavarnitam
Gurukrupaakaram Keertanapriyam
Hariharaatmajam Devamaashraye ||

Saranam Ayyappa Swami Saranam Ayyappa
Saranam Ayyappa Swami Saranam Ayyappa ||`,
    meaning_english: `1. "Harivarasanam Viswamohanam..."
I surrender unto Lord Ayyappa, the beloved son of Hari (Vishnu) and Hara (Shiva). He sits upon the sacred throne of boons, enchanting the entire universe, with adorable sacred lotus feet, destroying inner enemies (anger, lust, ego) through cosmic celestial dance.

2. "Sharanakeertanam Shakthamaanasam..."
Chanting His divine refuge (Swamiye Saranam Ayyappa) empowers the sincere seeker's heart. He loves upholding the universe, radiant like the rising dawn, commander of all spiritual entities.

3. "Pranayasatyakam Praananaayakam..."
Embodiment of truth, the lord of our very life breath, fulfilling all prayers like the wish-fulfilling Kalpavriksha tree, shining with divine brilliance, temple of the sacred sound OM (Pranava).`,
  },
  {
    id: 'song-madhurashtakam',
    category_id: 'cat-krishna',
    title_telugu: 'మధురాష్టకం (అధరం మధురం)',
    title_roman: 'Madhurashtakam (Adharam Madhuram)',
    title_english: 'Madhurashtakam - Everything of Lord Krishna is Sweetness',
    slug: 'madhurashtakam-adharam-madhuram',
    tags: 'krishna, madhurashtakam, vallabhacharya, adharam madhuram, vrindavan, flute, english meaning',
    view_count: 2890,
    download_count: 1210,
    lyrics_telugu: `అధరం మధురం వదనం మధురం
నయనం మధురం హసితం మధురమ్ ।
హృదయం మధురం గమనం మధురం
మధురాధిపతేరఖిలం మధురమ్ ॥ 1 ॥

వచనం మధురం చరితం మధురం
వసనం మధురం వలితం మధురమ్ ।
చలితం మధురం భ్రమితం మధురం
మధురాధిపతేరఖిలం మధురమ్ ॥ 2 ॥

వేణుర్మధురో రేణుర్మధురః
పాణిర్మధురః పాదౌ మధురౌ ।
నృత్యం మధురం సఖ్యం మధురం
మధురాధిపతేరఖిలం మధురమ్ ॥ 3 ॥

గీతం మధురం పీతం మధురం
భుక్తం మధురం సుప్తం మధురమ్ ।
రూపం మధురం తిలకం మధురం
మధురాధిపతేరఖిలం మధురమ్ ॥ 4 ॥`,
    lyrics_roman: `Adharam Madhuram Vadanam Madhuram
Nayanam Madhuram Hasitam Madhuram |
Hrudayam Madhuram Gamanam Madhuram
Madhuraadhipater Akhilam Madhuram || 1 ||

Vachanam Madhuram Charitam Madhuram
Vasanam Madhuram Valitam Madhuram |
Chalitam Madhuram Bhramitam Madhuram
Madhuraadhipater Akhilam Madhuram || 2 ||

Venur Madhuro Renur Madhurah
Paanir Madhurah Paadau Madhurau |
Nrutyam Madhuram Sakhyam Madhuram
Madhuraadhipater Akhilam Madhuram || 3 ||

Geetam Madhuram Peetam Madhuram
Bhuktam Madhuram Suptam Madhuram |
Roopam Madhuram Tilakam Madhuram
Madhuraadhipater Akhilam Madhuram || 4 ||`,
    meaning_english: `Composed by Sri Vallabhacharya:
1. Sweet are His lips, sweet is His lotus face, sweet are His eyes, sweet is His divine smile, sweet is His loving heart, sweet is His walk—everything about the Lord of Sweetness is utterly sweet!

2. Sweet are His words, sweet is His divine character, sweet are His yellow silk garments, sweet is His posture, sweet are His movements, sweet is His wanderings—everything about the Lord of Sweetness is utterly sweet!

3. Sweet is His flute, sweet is the holy dust of His feet, sweet are His hands, sweet are His lotus feet, sweet is His dance, sweet is His loving friendship—everything about the Lord of Sweetness is utterly sweet!`,
  },
  {
    id: 'song-lingashtakam',
    category_id: 'cat-shiva',
    title_telugu: 'లింగాష్టకం (బ్రహ్మమురారి సురార్చిత లింగం)',
    title_roman: 'Lingashtakam (Brahma Murari Surarchita Lingam)',
    title_english: 'Lingashtakam - Eight Verses in Praise of Shiva Lingam',
    slug: 'lingashtakam-stotram',
    tags: 'shiva, lingashtakam, stotram, mahadev, shivaratri, bholenath, english meaning',
    view_count: 2310,
    download_count: 890,
    lyrics_telugu: `బ్రహ్మమురారి సురార్చిత లింగం
నిర్మలభాసిత శోభిత లింగం ।
జన్మజదుఃఖ వినాశక లింగం
తత్ప్రణమామి సదాశివ లింగం ॥ 1 ॥

దేవమునిప్రవరార్చిత లింగం
కామదహన కరుణాకర లింగం ।
రావణదర్ప వినాశక లింగం
తత్ప్రణమామి సదాశివ లింగం ॥ 2 ॥

సర్వసుగంధ సులేపిత లింగం
బుద్ధివివర్ధన కారణ లింగం ।
సిద్ధసురాసుర వందిత లింగం
తత్ప్రణమామి సదాశివ లింగం ॥ 3 ॥`,
    lyrics_roman: `Brahma Murari Suraarchita Lingam
Nirmala Bhasita Shobhita Lingam |
Janmaja Dukha Vinashaka Lingam
Tatpranamaami Sadashiva Lingam || 1 ||

Devamuni Pravaraarchita Lingam
Kaamadahana Karunaakara Lingam |
Raavana Darpa Vinaashaka Lingam
Tatpranamaami Sadashiva Lingam || 2 ||

Sarva Sugandha Sulepita Lingam
Buddhi Vivardhana Kaarana Lingam |
Siddha Suraasura Vandita Lingam
Tatpranamaami Sadashiva Lingam || 3 ||`,
    meaning_english: `1. "Brahma Murari Suraarchita Lingam..."
I bow before the sacred Shiva Lingam, worshiped by Brahma and Vishnu, brilliantly pure, radiant with spiritual light, which eradicates all sorrows of the cycle of rebirth.

2. "Devamuni Pravaraarchita Lingam..."
I bow to the eternal Shiva Lingam, revered by gods and sages, who burned worldly desires with His third eye, full of compassion, who crushed the pride of King Ravana.`,
  },
  {
    id: 'song-shiva-tandava',
    category_id: 'cat-shiva',
    title_telugu: 'శివ తాండవ స్తోత్రం (జటాటవీగలజ్జల)',
    title_roman: 'Shiva Tandava Stotram (Jatataveegalajjala)',
    title_english: 'Shiva Tandava Stotram - The Cosmic Dance of Lord Shiva',
    slug: 'shiva-tandava-stotram',
    tags: 'shiva, tandava, ravana, rudra, stotram, mahakal, english meaning',
    view_count: 3100,
    download_count: 1250,
    lyrics_telugu: `జటాటవీగలజ్జలప్రవాహపావితస్థలే
గలేవలంబ్య లంబితాం భుజంగతుంగమాలికామ్ ।
డమడ్డమడ్డమడ్డమన్నినాదవడ్డమర్వయం
చకార చండతాండవం తనోతు నః శివః శివమ్ ॥ 1 ॥

జటాకటాహసంభ్రమభ్రమన్నిలింపనిర్ఝరీ-
-విలోలవీచివల్లరీవిరాజమానమూర్ధని ।
ధగద్ధగద్ధగజ్జ్వలల్లలాటపట్టపావకే
కిశోరచంద్రశేఖరే రతిః ప్రతిక్షణం మమ ॥ 2 ॥`,
    lyrics_roman: `Jataataveegalajjala Pravaha Paavitasthale
Galevalambya Lambitaam Bhujangatungamaalikaam |
Damaddamad Damaddaman Ninaadavaddamarvayam
Chakaara Chandataandavam Tanotu Nah Shivah Shivam || 1 ||

Jataakataahasambhrama Bhramannilimpanirjharee-
-Vilolaveechivallaree Viraajamaanamoordhani |
Dhagaddhagaddhagajjvalal Lalaatapattapaavake
Kishorachandrashekhare Ratih Pratikshanam Mama || 2 ||`,
    meaning_english: `1. "Jataataveegalajjala..."
With His neck sanctified by the holy waters of Ganga flowing from His thick matted locks like a forest, wearing a great serpent coiled around His throat, as His Damaru sounds rhythmically 'Damad Damad', may Lord Shiva who performs the intense cosmic dance shower auspiciousness upon us!`,
  },
  {
    id: 'song-hanuman-chalisa',
    category_id: 'cat-hanuman',
    title_telugu: 'శ్రీ హనుమాన్ చాలీసా',
    title_roman: 'Sri Hanuman Chalisa',
    title_english: 'Sri Hanuman Chalisa - 40 Sacred Hymns of Strength & Devotion',
    slug: 'sri-hanuman-chalisa',
    tags: 'hanuman, chalisa, anjaneya, bajrangbali, sankat mochan, english meaning',
    view_count: 4500,
    download_count: 2100,
    lyrics_telugu: `దోహా:
శ్రీగురు చరణ సరోజ రజ నిజమను ముకురు సుధారి ।
వరణౌ రఘువర విమల యశ జో దాయకు ఫల చారి ॥
బుద్ధిహీన తను జానికే సుమిరౌ పవనకుమార ।
బల బుద్ధి విద్యా దేహు మోహి హరహు కలేశ వికార ॥

చౌపాయీ:
జయ హనుమాన జ్ఞాన గుణ సాగర ।
జయ కపీశ తిహు లోక ఉజాగర ॥ 1 ॥

రామదూత అతులిత బలధామా ।
అంజనిపుత్ర పవనసుత నామా ॥ 2 ॥`,
    lyrics_roman: `Doha:
Shree Guru Charana Saroja Raja Nija Manu Mukuru Sudhaari |
Baranau Raghuvara Bimala Yasha Jo Daayaku Phala Chaari ||
Buddhiheena Tanu Jaanike Sumirau Pavanakumaara |
Bala Buddhi Vidyaa Dehu Mohi Harahu Kalesha Vikaara ||

Chaupayee:
Jaya Hanumaana Gnaana Guna Saagara |
Jaya Kapeesha Tihu Loka Ujaagara || 1 ||

Raamadoota Atulita Baladhaamaa |
Anjaniputra Pavanasuta Naamaa || 2 ||`,
    meaning_english: `Doha:
Cleansing the mirror of my mind with the dust from my sacred Guru's lotus feet, I sing the spotless glory of Lord Rama, which bestows the four fruits of life. O Son of the Wind, bless me with strength, wisdom, and remove all afflictions!

Chaupayee:
Victory to Lord Hanuman, ocean of wisdom and virtues! Victory to the king of Vanaras, who illuminates all three worlds!`,
  },
  {
    id: 'song-suprabhatam',
    category_id: 'cat-venkateswara',
    title_telugu: 'శ్రీ వేంకటేశ్వర సుప్రభాతం',
    title_roman: 'Sri Venkateswara Suprabhatam',
    title_english: 'Sri Venkateswara Suprabhatam - The Divine Dawn Awakening',
    slug: 'sri-venkateswara-suprabhatam',
    tags: 'venkateswara, tirupati, suprabhatam, balaji, govindha, stotram, english meaning',
    view_count: 3890,
    download_count: 1670,
    lyrics_telugu: `కౌసల్యా సుప్రజా రామ పూర్వా సంధ్యా ప్రవర్తతే ।
ఉత్తిష్ఠ నరశార్దూల కర్తవ్యం దైవమాహ్నికమ్ ॥ 1 ॥

ఉత్తిష్ఠోత్తిష్ఠ గోవింద ఉత్తిష్ఠ గరుడధ్వజ ।
ఉత్తిష్ఠ కమలాకాంత త్రైలోక్యం మంగళం కురు ॥ 2 ॥`,
    lyrics_roman: `Kausalya Supraja Rama Poorva Sandhya Pravartate |
Uttishtha Narasardoola Kartavyam Daivamaahnikam || 1 ||

Uttishthottishtha Govinda Uttishtha Garudadhwaja |
Uttishtha Kamalaakaanta Trailokyam Mangalam Kuru || 2 ||`,
    meaning_english: `1. "Kausalya Supraja Rama..."
O Rama, noble son of Mother Kausalya! The morning dawn is breaking in the east. Awaken, O lion among men, the daily divine duties must be performed!

2. "Uttishthottishtha Govinda..."
Awaken, O Govinda! Awaken, O Lord whose flag bears Garuda! Awaken, beloved of Goddess Lakshmi, and bless the entire universe with auspiciousness!`,
  },
  {
    id: 'song-rama-raksha',
    category_id: 'cat-rama',
    title_telugu: 'శ్రీరామరక్షా స్తోత్రం',
    title_roman: 'Sri Rama Raksha Stotram',
    title_english: 'Sri Rama Raksha Stotram - Divine Armor of Lord Rama',
    slug: 'sri-rama-raksha-stotram',
    tags: 'rama, ramaraksha, stotram, ayodhya, sita rama, english meaning',
    view_count: 3410,
    download_count: 1450,
    lyrics_telugu: `చరితం రఘునాథస్య శతకోటి ప్రవిస్తరమ్ ।
ఏకైకమక్షరం పుంసాం మహాపాతకనాశనమ్ ॥ 1 ॥

ధ్యాత్వా నీలోత్పలశ్యామం రామం రాజీవలోచనమ్ ।
జానకీలక్ష్మణోపేతం జటాముకుటమండితమ్ ॥ 2 ॥`,
    lyrics_roman: `Charitam Raghunaathasya Shatakoti Pravistaram |
Ekaikam Aksharam Pumsaam Mahaapaatakanaashanam || 1 ||

Dhyaatvaa Neelotpalashyaamam Raamam Raajeevalochanam |
Jaanakee Lakshmanopetam Jataamukutamanditam || 2 ||`,
    meaning_english: `1. The sacred glory of Lord Rama extends across a hundred crore verses; every single syllable destroys the greatest of sins!
2. Meditating on Lord Rama, dark blue like a lotus, lotus-eyed, accompanied by Mother Sita and Lakshmana!`,
  },
  {
    id: 'song-mahishasura',
    category_id: 'cat-durga',
    title_telugu: 'శ్రీ మహిషాసురమర్దినీ స్తోత్రం',
    title_roman: 'Sri Mahishasura Mardini Stotram',
    title_english: 'Mahishasura Mardini Stotram - Cosmic Victory of Devi Durga',
    slug: 'sri-mahishasura-mardini-stotram',
    tags: 'durga, devi, mahishasura mardini, ammavaru, navaratri, shakthi, english meaning',
    view_count: 3650,
    download_count: 1540,
    lyrics_telugu: `అయి గిరినందిని నందితమేదిని విశ్వవినోదిని నందినుతే
గిరివరవింధ్యశిరోధినివాసిని విష్ణువిలాసిని జిష్ణునుతే ।
భగవతి హే శితికంఠకుటుంబిని భూరికుటుంబిని భూరికృతే
జయ జయ హే మహిషాసురమర్దిని రమ్యకపర్దిని శైలసుతే ॥ 1 ॥`,
    lyrics_roman: `Ayi Girinandini Nanditamedini Vishvavinodini Nandinute
Girivaravindhyashirodhinivaasini Vishnuvilaasini Jishnunute |
Bhagavati He Shitikanthakutumbini Bhoorikutumbini Bhoorikrude
Jaya Jaya He Mahishaasuramardini Ramyakapardini Shailasute || 1 ||`,
    meaning_english: `O daughter of the mountain Himalaya, who brings joy to the earth, who gladdens the universe! Victory to You, slayer of Mahishasura, with braided locks!`,
  },
  {
    id: 'song-ganesha-pancharatnam',
    category_id: 'cat-ganesha',
    title_telugu: 'శ్రీ గణేశ పంచరత్నం',
    title_roman: 'Sri Ganesha Pancharatnam',
    title_english: 'Sri Ganesha Pancharatnam - Five Jewels in Praise of Vinayaka',
    slug: 'sri-ganesha-pancharatnam',
    tags: 'ganesha, vinayaka, pancharatnam, shankara, modakam, english meaning',
    view_count: 2980,
    download_count: 1050,
    lyrics_telugu: `ముదాకరాత్త మోదకం సదా విముక్తి సాధకం
కళాధరావతంసకం విలాసిలోకరక్షకమ్ ।
అనాయకైక నాయకం వినాశితేభ దైత్యకం
నతాశుభాశు నాశకం నమామి తం వినాయకమ్ ॥ 1 ॥`,
    lyrics_roman: `Mudaakaraatta Modakam Sadaa Vimukti Saadhakam
Kalaadharaavatamsakam Vilaasilokarakshakam |
Anaayakaika Naayakam Vinaashitebha Daityakam
Nataashubhaashu Naashakam Namaami Tam Vinaayakam || 1 ||`,
    meaning_english: `Holding sweet modaka with joy, bestower of ultimate liberation, wearing the crescent moon, protector of all worlds! I bow down to Lord Vinayaka!`,
  },
];
