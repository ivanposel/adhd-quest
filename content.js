// ADHD Quest — sadržaj

window.CONTENT = {

  station1: {
    title: 'Što je ADHD?',
    icon: '🧠',
    info: {
      heading: '🧠 Što je ADHD?',
      body: 'ADHD (Attention Deficit Hyperactivity Disorder) — poremećaj pažnje s hiperaktivnošću — neurološki je razvojni poremećaj. Mozak djece s ADHD-om razvija se drugačije, što utječe na pažnju, kontrolu impulsa i razinu aktivnosti. ADHD nije "loše ponašanje" niti odraz lošeg odgoja — to je medicinski prepoznato stanje.',
      facts: [
        '📊 Pogađa 5–7% djece',
        '🧬 Postoji genetska osnova',
        '3️⃣ Postoje 3 vrste ADHD-a',
        '✅ Moguće je uspješno živjeti s ADHD-om'
      ]
    },
    questions: [
      {
        text: 'ADHD je neurološki razvojni poremećaj mozga.',
        answer: true,
        explanation: 'Točno! ADHD nastaje zbog razlika u razvoju mozga, posebno sustava dopamina.'
      },
      {
        text: 'ADHD je samo izgovor za loše ponašanje djeteta.',
        answer: false,
        explanation: 'Netočno! ADHD je medicinski dijagnosticirani poremećaj s biološkom osnovom — nije pitanje odgoja ili volje.'
      },
      {
        text: 'Djeca s ADHD-om mogu imati poteškoće s održavanjem pažnje.',
        answer: true,
        explanation: 'Točno! Poteškoće s pažnjom jedan su od ključnih simptoma, posebno za nepažljivi tip.'
      },
      {
        text: 'ADHD pogađa isključivo dječake.',
        answer: false,
        explanation: 'Netočno! ADHD pogađa i djevojčice — kod njih se simptomi često javljaju drugačije (više nepažnje, manje hiperaktivnosti), pa se rjeđe dijagnosticiraju.'
      },
      {
        text: 'Postoje tri podtipa ADHD dijagnoze.',
        answer: true,
        explanation: 'Točno! To su: pretežno nepažljivi tip, pretežno hiperaktivno-impulzivni tip, i kombinirani tip.'
      }
    ]
  },

  station2: {
    title: 'Simptomi ADHD-a',
    icon: '🔍',
    info: 'Simptomi ADHD-a dijele se u tri kategorije. Prevuci svaki simptom u odgovarajuću skupinu!',
    categories: [
      { id: 'inattention', label: 'Nepažnja', emoji: '👀' },
      { id: 'hyperactivity', label: 'Hiperaktivnost', emoji: '⚡' },
      { id: 'impulsivity', label: 'Impulzivnost', emoji: '💥' }
    ],
    items: [
      { text: 'Teško se koncentrira', category: 'inattention' },
      { text: 'Gubi osobne stvari', category: 'inattention' },
      { text: 'Ne sluša upute', category: 'inattention' },
      { text: 'Stalno trči okolo', category: 'hyperactivity' },
      { text: 'Ne može mirno sjediti', category: 'hyperactivity' },
      { text: 'Previše priča', category: 'hyperactivity' },
      { text: 'Prekida razgovor', category: 'impulsivity' },
      { text: 'Odgovara prije pitanja', category: 'impulsivity' },
      { text: 'Teško čeka red', category: 'impulsivity' }
    ]
  },

  station3: {
    title: 'Mitovi vs. Činjenice',
    icon: '💡',
    intro: 'Postoji mnogo zabluda o ADHD-u! Klikni je li svaka tvrdnja TOČNA ili NETOČNA. Pazi — neki mitovi zvuče uvjerljivo!',
    cards: [
      {
        text: 'Djeca s ADHD-om su jednostavno ljenčine koje ne žele raditi.',
        isTrue: false,
        explanation: 'Mit! Djeca s ADHD-om se trude — njihov mozak funkcionira drukčije. Motivacija i kontrola pažnje su neurološki izazov, ne stvar volje.'
      },
      {
        text: 'Previše šećera uzrokuje ADHD.',
        isTrue: false,
        explanation: 'Mit! Višestruke studije nisu pronašle vezu između konzumacije šećera i ADHD-a. Ovo je raširena, ali neistinita predrasuda.'
      },
      {
        text: 'ADHD se može dijagnosticirati i u odrasloj dobi.',
        isTrue: true,
        explanation: 'Točno! Mnogi odrasli tek tada dobivaju dijagnozu ADHD-a jer su simptomi bili maskirani ili neprepoznati u djetinjstvu.'
      },
      {
        text: 'Djeca s ADHD-om ne mogu biti uspješna u školi i životu.',
        isTrue: false,
        explanation: 'Mit! S pravom podrškom, strategijama i razumijevanjem, djeca s ADHD-om mogu ostvariti izvanredne rezultate. Mnogi poznati uspješni ljudi imaju ADHD.'
      },
      {
        text: 'ADHD ima snažnu genetsku komponentu.',
        isTrue: true,
        explanation: 'Točno! Istraživanja pokazuju da je ADHD visoko nasljedan — ako roditelj ima ADHD, dijete ima 50% veću vjerojatnost.'
      },
      {
        text: 'ADHD se može "prerasti" i nestaje u pubertetu.',
        isTrue: false,
        explanation: 'Mit! Simptomi se mogu promijeniti s odrastanjem, ali ADHD često ostaje u odrasloj dobi — procjenjuje se da 60% djece s ADHD-om ima simptome i kao odrasli.'
      }
    ]
  },

  station4: {
    title: 'Fokus Vježba',
    icon: '🌬️',
    intro: 'Tehnika disanja 4-7-8 pomaže djeci s ADHD-om da smanje stres i poboljšaju fokus. Redovita vježba može značajno pomoći u samoregulaciji. Klikni krug ispod i probaj!',
    steps: [
      { phase: 'inhale', label: 'Udahni kroz nos', duration: 4 },
      { phase: 'hold', label: 'Zadrži dah', duration: 7 },
      { phase: 'exhale', label: 'Izdahni na usta', duration: 8 }
    ],
    cycles: 3,
    tip: 'Ovu vježbu možeš raditi uvijek kada se osjećaš uznemireno, ljuto ili kada ti treba bolji fokus. Poučite i dijete s ADHD-om da je koristi!'
  },

  station5: {
    title: 'Kako pomoći?',
    icon: '🤝',
    intro: 'Pravi odgovor okolice može značajno poboljšati život djeteta s ADHD-om. Odaberi najkorisniji pristup u svakoj situaciji!',
    scenarios: [
      {
        context: 'Marko (9) ima ADHD i ne može završiti domaću zadaću. Sjedi za stolom već 40 minuta, ali nije napisao gotovo ništa — distrahira se svakim zvukom.',
        question: 'Koji pristup je najpomogniji?',
        options: [
          {
            text: '😤 Vikati na njega da se skoncentrira i zaprijetiti kaznom ako ne završi',
            correct: false,
            feedback: 'Ovo povećava stres i anksioznost, što dodatno smanjuje sposobnost fokusa kod djece s ADHD-om. Kazne bez podrške ne pomažu.'
          },
          {
            text: '✂️ Podijeliti zadatak na manje korake uz kratke odmore svaka 10-15 minuta',
            correct: true,
            feedback: 'Odlično! Kratki radni intervali s nagradnim pauzama odgovaraju neurološkim potrebama mozga s ADHD-om. Strukturirajte zadatke na male, dostižne cjeline.'
          },
          {
            text: '🚫 Zabraniti mu svu igru dok ne završi sve zadatke odjednom',
            correct: false,
            feedback: 'Dugo "sjedenje bez odmora" iscrpljuje pažnju kod djece s ADHD-om. Kratke nagrade i pauze su učinkovitiji motivator od uskraćivanja.'
          }
        ]
      },
      {
        context: 'Ana (7) stalno prekida razgovor u razredu, ne čeka red i nekad glasno odgovara bez pitanja. Učiteljica se ne zna nositi s tim ponašanjem.',
        question: 'Koji pristup učiteljici preporučuješ?',
        options: [
          {
            text: '🙈 Ignorirati ponašanje i nadati se da će samo proći s vremenom',
            correct: false,
            feedback: 'Bez prepoznavanja potreba i podrške, simptomi se neće sami riješiti. Ignoriranje može dovesti do frustracije i socijalne isključenosti djeteta.'
          },
          {
            text: '😳 Svaki put je javno kazniti pred razredom kao primjer drugima',
            correct: false,
            feedback: 'Javna kazna može ozbiljno narušiti samopouzdanje i socijalnu integraciju djeteta s ADHD-om. Naglasak treba biti na podršci, ne sramoti.'
          },
          {
            text: '✋ Dati vizualne signale, pohvaliti je kada čeka red i unaprijed dogovoriti tihi znak',
            correct: true,
            feedback: 'Točno! Vizualni podsjetnici i dosljedno pozitivno potkrepljivanje ("uhvatio/la sam te kako čekaš red — bravo!") su ključne strategije za djecu s ADHD-om u školi.'
          }
        ]
      },
      {
        context: 'Roditelji Tome (11) primjećuju da svakodnevno gubi stvari, zaboravlja zadaće i ima potpuno kaotičnu sobu unatoč svakodnevnim svađama zbog toga.',
        question: 'Što roditeljima preporučuješ?',
        options: [
          {
            text: '📋 Uvesti dnevnu rutinu, vizualne rasporede i oznake za organizaciju prostora',
            correct: true,
            feedback: 'Točno! Struktura, predvidljive rutine i vizualni alati (lista koraka, oznake na policama, provjera opreme svaki dan u isto vrijeme) ključni su za djecu s ADHD-om.'
          },
          {
            text: '💸 Uvesti novčanu kaznu svaki put kada nešto izgubi ili zaboravi',
            correct: false,
            feedback: 'Financijske kazne bez organizacijske podrške ne uče dijete strategijama upravljanja. Fokus treba biti na izgradnji sustava koji pomažu — ne na kažnjavanju.'
          },
          {
            text: '🧹 Sve sami pospremiti i organizirati umjesto njega da bi imao red',
            correct: false,
            feedback: 'Preuzimanje kontrole umjesto djeteta ne uči ga neophodnim vještinama. Bolje je zajedno izgraditi sustav i postepeno prenositi odgovornost na dijete.'
          }
        ]
      }
    ]
  }
};
