
const badugiRanks = {"5432":4,"6432":8,"6532":11,"6542":13,"6543":14,"7432":18,"7532":21,"7542":23,"7543":24,"7632":27,"7642":29,"7643":30,"7652":32,"7653":33,"7654":34,"8432":38,"8532":41,"8542":43,"8543":44,"8632":47,"8642":49,"8643":50,"8652":52,"8653":53,"8654":54,"8732":57,"8742":59,"8743":60,"8752":62,"8753":63,"8754":64,"8762":66,"8763":67,"8764":68,"8765":69,"9432":73,"9532":76,"9542":78,"9543":79,"9632":82,"9642":84,"9643":85,"9652":87,"9653":88,"9654":89,"9732":92,"9742":94,"9743":95,"9752":97,"9753":98,"9754":99,"9762":101,"9763":102,"9764":103,"9765":104,"9832":107,"9842":109,"9843":110,"9852":112,"9853":113,"9854":114,"9862":116,"9863":117,"9864":118,"9865":119,"9872":121,"9873":122,"9874":123,"9875":124,"9876":125,"432A":0,"532A":1,"542A":2,"543A":3,"632A":5,"642A":6,"643A":7,"652A":9,"653A":10,"654A":12,"732A":15,"742A":16,"743A":17,"752A":19,"753A":20,"754A":22,"762A":25,"763A":26,"764A":28,"765A":31,"832A":35,"842A":36,"843A":37,"852A":39,"853A":40,"854A":42,"862A":45,"863A":46,"864A":48,"865A":51,"872A":55,"873A":56,"874A":58,"875A":61,"876A":65,"932A":70,"942A":71,"943A":72,"952A":74,"953A":75,"954A":77,"962A":80,"963A":81,"964A":83,"965A":86,"972A":90,"973A":91,"974A":93,"975A":96,"976A":100,"982A":105,"983A":106,"984A":108,"985A":111,"986A":115,"987A":120,"T32A":126,"T42A":127,"T43A":128,"T432":129,"T52A":130,"T53A":131,"T532":132,"T54A":133,"T542":134,"T543":135,"T62A":136,"T63A":137,"T632":138,"T64A":139,"T642":140,"T643":141,"T65A":142,"T652":143,"T653":144,"T654":145,"T72A":146,"T73A":147,"T732":148,"T74A":149,"T742":150,"T743":151,"T75A":152,"T752":153,"T753":154,"T754":155,"T76A":156,"T762":157,"T763":158,"T764":159,"T765":160,"T82A":161,"T83A":162,"T832":163,"T84A":164,"T842":165,"T843":166,"T85A":167,"T852":168,"T853":169,"T854":170,"T86A":171,"T862":172,"T863":173,"T864":174,"T865":175,"T87A":176,"T872":177,"T873":178,"T874":179,"T875":180,"T876":181,"T92A":182,"T93A":183,"T932":184,"T94A":185,"T942":186,"T943":187,"T95A":188,"T952":189,"T953":190,"T954":191,"T96A":192,"T962":193,"T963":194,"T964":195,"T965":196,"T97A":197,"T972":198,"T973":199,"T974":200,"T975":201,"T976":202,"T98A":203,"T982":204,"T983":205,"T984":206,"T985":207,"T986":208,"T987":209,"J32A":210,"J42A":211,"J43A":212,"J432":213,"J52A":214,"J53A":215,"J532":216,"J54A":217,"J542":218,"J543":219,"J62A":220,"J63A":221,"J632":222,"J64A":223,"J642":224,"J643":225,"J65A":226,"J652":227,"J653":228,"J654":229,"J72A":230,"J73A":231,"J732":232,"J74A":233,"J742":234,"J743":235,"J75A":236,"J752":237,"J753":238,"J754":239,"J76A":240,"J762":241,"J763":242,"J764":243,"J765":244,"J82A":245,"J83A":246,"J832":247,"J84A":248,"J842":249,"J843":250,"J85A":251,"J852":252,"J853":253,"J854":254,"J86A":255,"J862":256,"J863":257,"J864":258,"J865":259,"J87A":260,"J872":261,"J873":262,"J874":263,"J875":264,"J876":265,"J92A":266,"J93A":267,"J932":268,"J94A":269,"J942":270,"J943":271,"J95A":272,"J952":273,"J953":274,"J954":275,"J96A":276,"J962":277,"J963":278,"J964":279,"J965":280,"J97A":281,"J972":282,"J973":283,"J974":284,"J975":285,"J976":286,"J98A":287,"J982":288,"J983":289,"J984":290,"J985":291,"J986":292,"J987":293,"JT2A":294,"JT3A":295,"JT32":296,"JT4A":297,"JT42":298,"JT43":299,"JT5A":300,"JT52":301,"JT53":302,"JT54":303,"JT6A":304,"JT62":305,"JT63":306,"JT64":307,"JT65":308,"JT7A":309,"JT72":310,"JT73":311,"JT74":312,"JT75":313,"JT76":314,"JT8A":315,"JT82":316,"JT83":317,"JT84":318,"JT85":319,"JT86":320,"JT87":321,"JT9A":322,"JT92":323,"JT93":324,"JT94":325,"JT95":326,"JT96":327,"JT97":328,"JT98":329,"Q32A":330,"Q42A":331,"Q43A":332,"Q432":333,"Q52A":334,"Q53A":335,"Q532":336,"Q54A":337,"Q542":338,"Q543":339,"Q62A":340,"Q63A":341,"Q632":342,"Q64A":343,"Q642":344,"Q643":345,"Q65A":346,"Q652":347,"Q653":348,"Q654":349,"Q72A":350,"Q73A":351,"Q732":352,"Q74A":353,"Q742":354,"Q743":355,"Q75A":356,"Q752":357,"Q753":358,"Q754":359,"Q76A":360,"Q762":361,"Q763":362,"Q764":363,"Q765":364,"Q82A":365,"Q83A":366,"Q832":367,"Q84A":368,"Q842":369,"Q843":370,"Q85A":371,"Q852":372,"Q853":373,"Q854":374,"Q86A":375,"Q862":376,"Q863":377,"Q864":378,"Q865":379,"Q87A":380,"Q872":381,"Q873":382,"Q874":383,"Q875":384,"Q876":385,"Q92A":386,"Q93A":387,"Q932":388,"Q94A":389,"Q942":390,"Q943":391,"Q95A":392,"Q952":393,"Q953":394,"Q954":395,"Q96A":396,"Q962":397,"Q963":398,"Q964":399,"Q965":400,"Q97A":401,"Q972":402,"Q973":403,"Q974":404,"Q975":405,"Q976":406,"Q98A":407,"Q982":408,"Q983":409,"Q984":410,"Q985":411,"Q986":412,"Q987":413,"QT2A":414,"QT3A":415,"QT32":416,"QT4A":417,"QT42":418,"QT43":419,"QT5A":420,"QT52":421,"QT53":422,"QT54":423,"QT6A":424,"QT62":425,"QT63":426,"QT64":427,"QT65":428,"QT7A":429,"QT72":430,"QT73":431,"QT74":432,"QT75":433,"QT76":434,"QT8A":435,"QT82":436,"QT83":437,"QT84":438,"QT85":439,"QT86":440,"QT87":441,"QT9A":442,"QT92":443,"QT93":444,"QT94":445,"QT95":446,"QT96":447,"QT97":448,"QT98":449,"QJ2A":450,"QJ3A":451,"QJ32":452,"QJ4A":453,"QJ42":454,"QJ43":455,"QJ5A":456,"QJ52":457,"QJ53":458,"QJ54":459,"QJ6A":460,"QJ62":461,"QJ63":462,"QJ64":463,"QJ65":464,"QJ7A":465,"QJ72":466,"QJ73":467,"QJ74":468,"QJ75":469,"QJ76":470,"QJ8A":471,"QJ82":472,"QJ83":473,"QJ84":474,"QJ85":475,"QJ86":476,"QJ87":477,"QJ9A":478,"QJ92":479,"QJ93":480,"QJ94":481,"QJ95":482,"QJ96":483,"QJ97":484,"QJ98":485,"QJTA":486,"QJT2":487,"QJT3":488,"QJT4":489,"QJT5":490,"QJT6":491,"QJT7":492,"QJT8":493,"QJT9":494,"K32A":495,"K42A":496,"K43A":497,"K432":498,"K52A":499,"K53A":500,"K532":501,"K54A":502,"K542":503,"K543":504,"K62A":505,"K63A":506,"K632":507,"K64A":508,"K642":509,"K643":510,"K65A":511,"K652":512,"K653":513,"K654":514,"K72A":515,"K73A":516,"K732":517,"K74A":518,"K742":519,"K743":520,"K75A":521,"K752":522,"K753":523,"K754":524,"K76A":525,"K762":526,"K763":527,"K764":528,"K765":529,"K82A":530,"K83A":531,"K832":532,"K84A":533,"K842":534,"K843":535,"K85A":536,"K852":537,"K853":538,"K854":539,"K86A":540,"K862":541,"K863":542,"K864":543,"K865":544,"K87A":545,"K872":546,"K873":547,"K874":548,"K875":549,"K876":550,"K92A":551,"K93A":552,"K932":553,"K94A":554,"K942":555,"K943":556,"K95A":557,"K952":558,"K953":559,"K954":560,"K96A":561,"K962":562,"K963":563,"K964":564,"K965":565,"K97A":566,"K972":567,"K973":568,"K974":569,"K975":570,"K976":571,"K98A":572,"K982":573,"K983":574,"K984":575,"K985":576,"K986":577,"K987":578,"KT2A":579,"KT3A":580,"KT32":581,"KT4A":582,"KT42":583,"KT43":584,"KT5A":585,"KT52":586,"KT53":587,"KT54":588,"KT6A":589,"KT62":590,"KT63":591,"KT64":592,"KT65":593,"KT7A":594,"KT72":595,"KT73":596,"KT74":597,"KT75":598,"KT76":599,"KT8A":600,"KT82":601,"KT83":602,"KT84":603,"KT85":604,"KT86":605,"KT87":606,"KT9A":607,"KT92":608,"KT93":609,"KT94":610,"KT95":611,"KT96":612,"KT97":613,"KT98":614,"KJ2A":615,"KJ3A":616,"KJ32":617,"KJ4A":618,"KJ42":619,"KJ43":620,"KJ5A":621,"KJ52":622,"KJ53":623,"KJ54":624,"KJ6A":625,"KJ62":626,"KJ63":627,"KJ64":628,"KJ65":629,"KJ7A":630,"KJ72":631,"KJ73":632,"KJ74":633,"KJ75":634,"KJ76":635,"KJ8A":636,"KJ82":637,"KJ83":638,"KJ84":639,"KJ85":640,"KJ86":641,"KJ87":642,"KJ9A":643,"KJ92":644,"KJ93":645,"KJ94":646,"KJ95":647,"KJ96":648,"KJ97":649,"KJ98":650,"KJTA":651,"KJT2":652,"KJT3":653,"KJT4":654,"KJT5":655,"KJT6":656,"KJT7":657,"KJT8":658,"KJT9":659,"KQ2A":660,"KQ3A":661,"KQ32":662,"KQ4A":663,"KQ42":664,"KQ43":665,"KQ5A":666,"KQ52":667,"KQ53":668,"KQ54":669,"KQ6A":670,"KQ62":671,"KQ63":672,"KQ64":673,"KQ65":674,"KQ7A":675,"KQ72":676,"KQ73":677,"KQ74":678,"KQ75":679,"KQ76":680,"KQ8A":681,"KQ82":682,"KQ83":683,"KQ84":684,"KQ85":685,"KQ86":686,"KQ87":687,"KQ9A":688,"KQ92":689,"KQ93":690,"KQ94":691,"KQ95":692,"KQ96":693,"KQ97":694,"KQ98":695,"KQTA":696,"KQT2":697,"KQT3":698,"KQT4":699,"KQT5":700,"KQT6":701,"KQT7":702,"KQT8":703,"KQT9":704,"KQJA":705,"KQJ2":706,"KQJ3":707,"KQJ4":708,"KQJ5":709,"KQJ6":710,"KQJ7":711,"KQJ8":712,"KQJ9":713,"KQJT":714}
const threeCardBadugiRanks = {"432":3,"532":6,"542":8,"543":9,"632":12,"642":14,"643":15,"652":17,"653":18,"654":19,"732":22,"742":24,"743":25,"752":27,"753":28,"754":29,"762":31,"763":32,"764":33,"765":34,"832":37,"842":39,"843":40,"852":42,"853":43,"854":44,"862":46,"863":47,"864":48,"865":49,"872":51,"873":52,"874":53,"875":54,"876":55,"932":58,"942":60,"943":61,"952":63,"953":64,"954":65,"962":67,"963":68,"964":69,"965":70,"972":72,"973":73,"974":74,"975":75,"976":76,"982":78,"983":79,"984":80,"985":81,"986":82,"987":83,"32A":0,"42A":1,"43A":2,"52A":4,"53A":5,"54A":7,"62A":10,"63A":11,"64A":13,"65A":16,"72A":20,"73A":21,"74A":23,"75A":26,"76A":30,"82A":35,"83A":36,"84A":38,"85A":41,"86A":45,"87A":50,"92A":56,"93A":57,"94A":59,"95A":62,"96A":66,"97A":71,"98A":77,"T2A":84,"T3A":85,"T32":86,"T4A":87,"T42":88,"T43":89,"T5A":90,"T52":91,"T53":92,"T54":93,"T6A":94,"T62":95,"T63":96,"T64":97,"T65":98,"T7A":99,"T72":100,"T73":101,"T74":102,"T75":103,"T76":104,"T8A":105,"T82":106,"T83":107,"T84":108,"T85":109,"T86":110,"T87":111,"T9A":112,"T92":113,"T93":114,"T94":115,"T95":116,"T96":117,"T97":118,"T98":119,"J2A":120,"J3A":121,"J32":122,"J4A":123,"J42":124,"J43":125,"J5A":126,"J52":127,"J53":128,"J54":129,"J6A":130,"J62":131,"J63":132,"J64":133,"J65":134,"J7A":135,"J72":136,"J73":137,"J74":138,"J75":139,"J76":140,"J8A":141,"J82":142,"J83":143,"J84":144,"J85":145,"J86":146,"J87":147,"J9A":148,"J92":149,"J93":150,"J94":151,"J95":152,"J96":153,"J97":154,"J98":155,"JTA":156,"JT2":157,"JT3":158,"JT4":159,"JT5":160,"JT6":161,"JT7":162,"JT8":163,"JT9":164,"Q2A":165,"Q3A":166,"Q32":167,"Q4A":168,"Q42":169,"Q43":170,"Q5A":171,"Q52":172,"Q53":173,"Q54":174,"Q6A":175,"Q62":176,"Q63":177,"Q64":178,"Q65":179,"Q7A":180,"Q72":181,"Q73":182,"Q74":183,"Q75":184,"Q76":185,"Q8A":186,"Q82":187,"Q83":188,"Q84":189,"Q85":190,"Q86":191,"Q87":192,"Q9A":193,"Q92":194,"Q93":195,"Q94":196,"Q95":197,"Q96":198,"Q97":199,"Q98":200,"QTA":201,"QT2":202,"QT3":203,"QT4":204,"QT5":205,"QT6":206,"QT7":207,"QT8":208,"QT9":209,"QJA":210,"QJ2":211,"QJ3":212,"QJ4":213,"QJ5":214,"QJ6":215,"QJ7":216,"QJ8":217,"QJ9":218,"QJT":219,"K2A":220,"K3A":221,"K32":222,"K4A":223,"K42":224,"K43":225,"K5A":226,"K52":227,"K53":228,"K54":229,"K6A":230,"K62":231,"K63":232,"K64":233,"K65":234,"K7A":235,"K72":236,"K73":237,"K74":238,"K75":239,"K76":240,"K8A":241,"K82":242,"K83":243,"K84":244,"K85":245,"K86":246,"K87":247,"K9A":248,"K92":249,"K93":250,"K94":251,"K95":252,"K96":253,"K97":254,"K98":255,"KTA":256,"KT2":257,"KT3":258,"KT4":259,"KT5":260,"KT6":261,"KT7":262,"KT8":263,"KT9":264,"KJA":265,"KJ2":266,"KJ3":267,"KJ4":268,"KJ5":269,"KJ6":270,"KJ7":271,"KJ8":272,"KJ9":273,"KJT":274,"KQA":275,"KQ2":276,"KQ3":277,"KQ4":278,"KQ5":279,"KQ6":280,"KQ7":281,"KQ8":282,"KQ9":283,"KQT":284,"KQJ":285};
const twoCardBadugiRanks = {"32":2,"42":4,"43":5,"52":7,"53":8,"54":9,"62":11,"63":12,"64":13,"65":14,"72":16,"73":17,"74":18,"75":19,"76":20,"82":22,"83":23,"84":24,"85":25,"86":26,"87":27,"92":29,"93":30,"94":31,"95":32,"96":33,"97":34,"98":35,"2A":0,"3A":1,"4A":3,"5A":6,"6A":10,"7A":15,"8A":21,"9A":28,"TA":36,"T2":37,"T3":38,"T4":39,"T5":40,"T6":41,"T7":42,"T8":43,"T9":44,"JA":45,"J2":46,"J3":47,"J4":48,"J5":49,"J6":50,"J7":51,"J8":52,"J9":53,"JT":54,"QA":55,"Q2":56,"Q3":57,"Q4":58,"Q5":59,"Q6":60,"Q7":61,"Q8":62,"Q9":63,"QT":64,"KA":65,"QJ":66,"K2":67,"K3":68,"K4":69,"K5":70,"K6":71,"K7":72,"K8":73,"K9":74,"KT":75,"KJ":76,"KQ":77};
const rankToValue = {
  'A': 0,
  '2': 1,
  '3': 2, 
  '4': 3, 
  '5': 4, 
  '6': 5, 
  '7': 6, 
  '8': 7, 
  '9': 8,
  'T': 9,
  'J': 10,
  'Q': 11, 
  'K': 12,
}
let totalNodes = 0;

function init() {
  const hand = ['Ac', '2h', 'Js', 'Qs'];
  const villain = ['Ac', '2h', 'Td', '7s'];
  console.log('hero:', hand, rankBadugiHand(hand));
  console.log('villain target:', villain, rankBadugiHand(villain))
  console.log('Building tree...')
  const tree = createTree(hand, [], 2, 2);
  console.log(`${totalNodes} nodes created`);
  console.log('Evaluating strategies...')
  scoreNodes(tree, rankBadugiHand(villain));
  //console.log(tree)
  scoreNodes(tree, null);
}

class Deck {
  constructor() {
    const suits = 'chds';
    const ranks = 'A23456789TJQK';
    this.cards = []
    for (const suit of suits) {
      for (const rank of ranks) {
        this.cards.push(`${rank}${suit}`)
      }
    }
  }

  remove(card) {
    const index = this.cards.indexOf(card);
    this.cards.splice(index, 1);
  }

  // subsetSize is 1
  drawSubsets(subsetSize) {
    const result = [];
    if (subsetSize === 1) {
      for (const card of this.cards) {
        result.push([card])
      }
      return result;
    }
    if (subsetSize === 2) {
      for (let i = 0; i < this.cards.length; i++) {
        for (let k = i + 1; k < this.cards.length; k++) {
          result.push([this.cards[i], this.cards[k]]);
        }
      }
      return result;
    }
    throw 'Subset size too big';
  }
}

class BadugiNode {
  constructor(hand, deadCards, lastAction) {
    this.hand = hand;
    this.deadCards = deadCards;
    this.children = [];
    this.lastAction = lastAction;
    this.score = null;
    this.comment = '';
    totalNodes += 1;
  }
}

// Draws remaining is including this one, so at lowest 1
function createTree(hand, deadCards, drawsRemaining, maxDraw) {
  const root = new BadugiNode(hand, deadCards, '')
  const deck = new Deck();
  for (const card of hand) {
    deck.remove(card);
  }
  for (const card of deadCards) {
    deck.remove(card);
  }

  const discard1Subsets = generateDiscardSubsets(hand, 1, true);
  const discard2Subsets = generateDiscardSubsets(hand, 2, true);
  if (discard1Subsets.length === 0 && discard2Subsets.length === 0) {
    console.log('Hand is too bad lol.')
    return;
  }
  root.children.push(
    new BadugiNode(
      hand, 
      deadCards,
      'draw0',
    )
  )
  const draw1Options = deck.drawSubsets(1);
  for (const subset of discard1Subsets) {
    const newDeadCards = hand.filter((x) => x !== subset[0] && x !== subset[1] && x !== subset[2]);
    for (const draw of draw1Options) {
      const newHand = subset.concat(draw);
      root.children.push(new BadugiNode(
        newHand, 
        newDeadCards.concat(deadCards),
        'draw1'
      ))
    } 
  }
  if (maxDraw == 2) {
    const draw2Options = deck.drawSubsets(2);
    for (const subset of discard2Subsets) {
      const newDeadCards = hand.filter((x) => x !== subset[0] && x !== subset[1]);

      for (const draw of draw2Options) {
        const newHand = subset.concat(draw);
        root.children.push(new BadugiNode(
          newHand, 
          newDeadCards.concat(deadCards),
          'draw2'
        ))
      } 
    }
  }
  if (drawsRemaining > 1) {
    for (const node of root.children) {
      // Number of max draws is capped by the previous draw number
      const newMaxDraws = node.deadCards.length - deadCards.length;
      node.children = createTree(node.hand, node.deadCards, drawsRemaining - 1, newMaxDraws).children;
      // Maybe can remove isomorphic nodes
    }
  }
  return root;
} 

function scoreNodes(node, targetHandRank) {
  if (node.children.length === 0) {
    if (targetHandRank === null) {
      node.score = rankBadugiHand(node.hand);
    } else {
      node.score = targetHandRank < rankBadugiHand(node.hand) ? 100 : 0;
    }
    return;
  }
  for (const child of node.children) {
    scoreNodes(child, targetHandRank);
  }
  const actionToChildScores = {}
  for (const child of node.children) {
    const actionIdentifier = JSON.stringify(child.deadCards)
    if (actionToChildScores[actionIdentifier] === undefined) {
      actionToChildScores[actionIdentifier] = [];
    }
    actionToChildScores[actionIdentifier].push(child.score);
  }
  let bestScore = 100000000;
  let bestActionIdentifier = undefined;
  for (const action of Object.keys(actionToChildScores)) {
    // If we want to evaluate decisions differently, we can change the 
    // scoring function here to be min, top 80th perentile etc.
    const averageScore = average(actionToChildScores[action])
    if (node.lastAction === '') {
      if (targetHandRank === null) {
        console.log(`if discard ${action}, avg hand rank is`, averageScore)
      } else {
        console.log(`if discard ${action}, probability to beat villain(${targetHandRank}) is`, 100 - averageScore)
      }
    }
    if (averageScore < bestScore) {
      bestScore = averageScore;
      bestActionIdentifier = action;
    }
  }
  node.score = bestScore;
}

// returns subsets of cards to keep.
function generateDiscardSubsets(hand, discardNumber, badugiOnly) {
  // const suitSet = new Set(hand.map(h=> h[1]));
  // if (suitSet.size === 4 && discardNumber === 1) {
  //   // If the suit set is 4, the only 1 subset to choose is discarding 
  //   // the worst card.
  //   // or breaking up a pair
  //   // Sorts such that worst card is first
  //   hand.sort((a, b) => {
  //       return rankToValue[b[0]] - rankToValue[a[0]];
  //   })
  //   if (discardNumber === 1) {
  //     return [
  //       [hand[1], hand[2], hand[3]]
  //     ]
  //   }
  //   if (discardNumber === 2) {
  //     return [
  //       [hand[2], hand[3]]
  //     ]
  //   }
  // }

  const subsetSize = 4 - discardNumber;
  const result = hand.reduce(
    (subsets, value) => subsets.concat(
      subsets.map(set => [value,...set])
    ),
    [[]]
  ).filter((x) => x.length === subsetSize);
  if (!badugiOnly) {
    return result;
  }
  return result.filter((x) => {
    return (new Set(x.map((card) => card[1]))).size === x.length;
  });
}

function rankBadugiHand(hand) {
  
  const suits = new Set([hand[0][1], hand[1][1], hand[2][1], hand[3][1]]);
  if (suits.size === 4) {
    const ranks = [hand[0][0], hand[1][0], hand[2][0], hand[3][0]];
    ranks.sort((a, b) => {
      return rankToValue[b] - rankToValue[a];
    })
    const handScore = badugiRanks[`${ranks[0]}${ranks[1]}${ranks[2]}${ranks[3]}`];
    if (handScore !== undefined) {
      return handScore;
    }
  }

  // Try 3 card badugis
  const options = [
    [hand[0], hand[1], hand[2]],
    [hand[0], hand[1], hand[3]],
    [hand[0], hand[2], hand[3]],
    [hand[1], hand[2], hand[3]],
  ]
  let bestScore = undefined;
  for (const option of options) {
    if (option[0][1] !== option[1][1] && option[0][1] !== option[2][1] && option[1][1] !== option[2][1]) {
      // Three card badugi found
      // Can also check for pairs here TODO
      const ranks = [option[0][0], option[1][0], option[2][0]];
      ranks.sort((a, b) => {
        return rankToValue[b] - rankToValue[a];
      })
      const handScore = threeCardBadugiRanks[`${ranks[0]}${ranks[1]}${ranks[2]}`];
      if (handScore !== undefined && (bestScore == undefined || bestScore > handScore)) {
        bestScore = handScore;
      }
    }
  }
  if (bestScore !== undefined) {
    return 715 + bestScore;
  }
  return 1080;
  // TODO: Implement the rest of the scoring stuff here
}

function average(values) {
  let sum = 0;
  for (const v of values) {
    sum += v;
  }
  return sum / values.length;
}

function interactiveTreeExplore(root) {
  while(true) {

  }
}



init()
