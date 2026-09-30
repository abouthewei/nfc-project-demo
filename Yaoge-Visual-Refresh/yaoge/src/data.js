export const dimensions = [
  { id: 'F', name: '火势', english: 'Fire', low: '稳火', high: '烈火', lowMeans: '按自己的节奏推进', highMeans: '想到就先行动' },
  { id: 'C', name: '泥性', english: 'Clay', low: '软口', high: '硬口', lowMeans: '愿意适应变化', highMeans: '守住自己的判断' },
  { id: 'I', name: '手路', english: 'Instinct', low: '规矩', high: '手感', lowMeans: '相信步骤与方法', highMeans: '边做边找感觉' },
  { id: 'S', name: '行会', english: 'Social', low: '独作', high: '成行', lowMeans: '习惯先自己处理', highMeans: '喜欢一起商量推进' },
  { id: 'D', name: '成器', english: 'Detail', low: '快成', high: '精塑', lowMeans: '完成比反复打磨重要', highMeans: '愿意继续把细节做好' },
  { id: 'N', name: '灶法', english: 'Newness', low: '守灶', high: '改灶', lowMeans: '珍惜已经验证的方法', highMeans: '愿意试出更好的方法' }
];

const answerSet = (texts, coordinates) => texts.map((text, index) => ({ id: String.fromCharCode(97 + index), text, scores: coordinates[index] }));

export const questions = [
  { id: 'q1', pair: ['F', 'C'], title: '朋友临出门突然说：“要不换个地方？”', options: answerSet(['行啊，哪里都可以。', '可以换，但你现在马上定。', '为什么换？原计划挺好的。', '不换，已经安排好了，出发。'], [[-2,-2],[2,-2],[-2,2],[2,2]]) },
  { id: 'q2', pair: ['F', 'I'], title: '碰到完全没做过的新东西：', options: answerSet(['先找教程，从头看一遍。', '先看关键步骤，然后做。', '先摸一下，大概感觉一下。', '直接开始，不对再改。'], [[-2,-2],[2,-2],[-2,2],[2,2]]) },
  { id: 'q3', pair: ['F', 'S'], title: '四人小组突然出现紧急问题：', options: answerSet(['自己先处理一部分。', '我先解决，解决不了再叫人。', '把大家叫齐一起判断。', '群里直接：“来，开干。”'], [[-2,-2],[2,-2],[-2,2],[2,2]]) },
  { id: 'q4', pair: ['F', 'D'], title: '距离截止还有一天，东西基本能用：', options: answerSet(['先放一下，明天再确认。', '能用了就先交。', '看看还有没有明显问题。', '还有一天？那还能再改不少。'], [[-2,-2],[2,-2],[-2,2],[2,2]]) },
  { id: 'q5', pair: ['F', 'N'], title: '发现一直使用的老方法有问题：', options: answerSet(['能运行先别动。', '先小范围试试。', '问题都看见了，还等什么。', '先把眼前事情按原办法处理完。'], [[-2,-2],[-2,2],[2,2],[2,-2]]) },
  { id: 'q6', pair: ['C', 'I'], title: '别人给你一套详细方法，但你觉得自己的办法更顺：', options: answerSet(['按他的来。', '先照做一次。', '哪个顺手用哪个。', '我知道他怎么做，但还是按我的来。'], [[-2,-2],[-2,2],[2,2],[2,-2]]) },
  { id: 'q7', pair: ['C', 'S'], title: '大家都想去 A，你特别想去 B：', options: answerSet(['A 也行。', '你们去 A，我去 B。', '我再看看，也许 B 没那么重要。', '我告诉你们为什么 B 更好。'], [[-2,2],[2,-2],[-2,-2],[2,2]]) },
  { id: 'q8', pair: ['C', 'D'], title: '发现一个小瑕疵，别人说：“看不出来，算了。”', options: answerSet(['行，那就这样。', '我觉得不影响使用。', '还是顺手改一下。', '不行，我已经看见了。'], [[-2,-2],[2,-2],[-2,2],[2,2]]) },
  { id: 'q9', pair: ['C', 'N'], title: '一件用了很多年的东西，有人建议彻底重做：', options: answerSet(['老东西有它存在的理由。', '大家觉得好就改。', '可以改，但核心部分别动。', '只要证明更好，就改。'], [[2,-2],[-2,2],[2,2],[-2,-2]]) },
  { id: 'q10', pair: ['I', 'S'], title: '遇到复杂问题：', options: answerSet(['自己列步骤排查。', '大家一起梳理。', '自己先摸一下感觉。', '找几个懂的人碰一碰。'], [[-2,-2],[-2,2],[2,-2],[2,2]]) },
  { id: 'q11', pair: ['I', 'D'], title: '做一件手工东西：', options: answerSet(['按步骤完成就行。', '按标准做，而且尽量漂亮。', '先做出样子，过程中调整。', '边做边感觉，直到“对了”。'], [[-2,-2],[-2,2],[2,-2],[2,2]]) },
  { id: 'q12', pair: ['I', 'N'], title: '大家一直按照同一流程工作，你发现更顺手的方法：', options: answerSet(['流程怎么写就怎么做。', '验证清楚以后修改流程。', '我自己先这么做。', '既然更顺手，就试着改。'], [[-2,-2],[-2,2],[2,-2],[2,2]]) },
  { id: 'q13', pair: ['S', 'D'], title: '团队作品已经合格，但你觉得还能更好：', options: answerSet(['大家觉得可以就可以。', '我自己再调一下。', '到点了，交吧。', '再拉大家一起磨一轮。'], [[2,-2],[-2,2],[-2,-2],[2,2]]) },
  { id: 'q14', pair: ['S', 'N'], title: '大家习惯了现在做法，你想换：', options: answerSet(['不影响别人，我自己换。', '大家习惯了就别折腾。', '大家一起试。', '我还是按原来的做。'], [[-2,2],[2,-2],[2,2],[-2,-2]]) },
  { id: 'q15', pair: ['D', 'N'], title: '如果你接手一件已经存在 500 年的东西：', options: answerSet(['保证它原原本本留下来。', '保留核心，让它更适合今天。', '先让更多人看见和使用。', '先研究透，再决定改不改。'], [[-2,-2],[2,2],[-2,2],[2,-2]]) }
];

export const clans = {
  fire: { id: 'fire', name: '火系', mark: '焰', theme: '行动、火、烧制与结果。' },
  craft: { id: 'craft', name: '匠系', mark: '眼', theme: '经验、技艺、手感与细节。' },
  guild: { id: 'guild', name: '行系', mark: '行', theme: '行业、协作、人、商业与生活。' },
  kiln: { id: 'kiln', name: '灶系', mark: '灶', theme: '系统、历史、传承与改良。' }
};

export const personas = [
  { id:'fireWatcher', name:'睇火师傅', clanId:'craft', historicalType:'historical_term', kind:'历史称谓', slogan:'别人看时间，你看火候。', keywords:['冷静观察','延迟判断','精准出手'], center:{F:20,C:50,I:80,S:80,D:50,N:20}, culture:'真实柴烧过程中的睇火师傅，会观察火焰与制品状态，判断火候和投柴时机。', descriptions:['你不急着抢第一步，通常先把现场看明白。线索凑齐后，你出手稳，也会给别人留下空间。','你适合在变化很多的时刻判断节奏：什么时候继续，什么时候收住。'], home:'南风古灶 · 柴烧工艺展示区', companionId:'fireStarter', companionLine:'他负责加火，你负责看火候。', mark:'eye' },
  { id:'master', name:'大师傅', clanId:'guild', historicalType:'historical_term', kind:'历史称谓', slogan:'场面可以乱，你不能乱。', keywords:['稳住全场','愿意担责','一起成事'], center:{F:40,C:80,I:70,S:90,D:70,N:30}, culture:'石湾陶业行话中的“大师傅”指操作工。这里借它描绘能把人和事安顿好的组织者。', descriptions:['事情一多，你会自然开始整理先后顺序，也愿意接住别人暂时顾不上的部分。','你重视大家的配合，交付之前仍会留意成品是否达到该有的水准。'], home:'林家厅 · 岭南民居', companionId:'merchant', companionLine:'他盯着实用，你让整件事顺起来。', mark:'tool' },
  { id:'apprentice', name:'学徒仔', clanId:'fire', historicalType:'historical_term', kind:'历史称谓', slogan:'不会没关系，我已经开始了。', keywords:['好奇上手','边做边学','先迈一步'], center:{F:80,C:20,I:80,S:80,D:20,N:80}, culture:'石湾传统陶业用语中，“鬼催”指学徒仔，并不是骂人的话。', descriptions:['你遇到陌生事物时，常常先动手试试。真正开始以后，理解也跟着长出来。','你不太怕从新手做起，变化和合作都能给你带来新的线索。'], home:'玩陶艺术中心 · 拉坯体验', companionId:'master', companionLine:'你负责先开工，他负责把队伍带稳。', mark:'hand' },
  { id:'fireStarter', name:'上火师', clanId:'fire', historicalType:'product_persona', kind:'产品人格', slogan:'能今天烧，绝不留到明天。', keywords:['立即行动','推动进度','快速试验'], center:{F:80,C:80,I:50,S:50,D:20,N:80}, culture:'“上火”是龙窑烧制工序中的环节：窑头停止投柴后，转到窑背火眼继续加柴升温。这里以这一工序为灵感，创作“上火师”行当原型。', descriptions:['你看见可推进的机会，很难一直等下去。先让事情动起来，再根据反馈调整。','当方法过时或目标模糊时，你愿意试出一条新路，也能带动同行的人。'], home:'南风古灶 · 窑背火眼', companionId:'fireWatcher', companionLine:'你把火烧起来，他帮你盯住火候。', mark:'flame' },
  { id:'wheelMaker', name:'拉坯手', clanId:'craft', historicalType:'craft_based_persona', kind:'工艺人格', slogan:'歪了没事，我能扶回来。', keywords:['临场调整','手上有数','柔韧适应'], center:{F:50,C:20,I:80,S:20,D:80,N:80}, culture:'拉坯是陶艺体验中的成型方式。泥团在转盘上成形，需要手与材料不断配合。', descriptions:['你不一定按预想一次成功，但很会根据眼前的变化微调。','你相信实际接触带来的感觉，愿意反复试到形状顺眼、手感也对。'], home:'玩陶艺术中心 · 拉坯体验', companionId:'miniatureArtist', companionLine:'你把形扶稳，他把细节补到位。', mark:'wheel' },
  { id:'miniatureArtist', name:'微塑匠', clanId:'craft', historicalType:'craft_based_persona', kind:'工艺人格', slogan:'你们看不到，不代表我看不到。', keywords:['专注细节','耐心打磨','看见微小'], center:{F:20,C:80,I:80,S:20,D:80,N:50}, culture:'石湾微塑又称山公微雕，以细小尺寸表现人物神态，重视形、神、意。', descriptions:['你会留意别人略过的小地方，也愿意给细节足够的时间。','把一件东西做完对你来说还不够；你还想让它有表情、有质感，也有自己的气息。'], home:'石湾微塑展示区', companionId:'wheelMaker', companionLine:'你把细节磨好，他让整体保持灵活。', mark:'finger' },
  { id:'kilnLoader', name:'装灶匠', clanId:'kiln', historicalType:'product_persona', kind:'产品人格', slogan:'火还没点，你已经把坯位排稳了。', keywords:['先想结构','安排顺序','控制风险'], center:{F:20,C:80,I:20,S:50,D:20,N:20}, culture:'“装灶”指把陶坯装入窑腔并按烧制需要安排位置，是柴烧循环的准备工序。这里以装灶工序为灵感，创作“装灶匠”行当原型。', descriptions:['你习惯先看整体，再动手安排局部。准备充分会让你心里踏实。','你更愿意沿用经验证的做法，把资源放在合适的位置，避免临时返工。'], home:'南风古灶 · 龙窑烧制展示', companionId:'reformer', companionLine:'你先把结构排好，他再找机会把结构变得更好。', mark:'grid' },
  { id:'kilnOpener', name:'开灶匠', clanId:'fire', historicalType:'product_persona', kind:'产品人格', slogan:'所以，最后到底成没成？', keywords:['盯住结果','目标清楚','及时验收'], center:{F:80,C:80,I:20,S:20,D:20,N:50}, culture:'“开灶”是窑内降温后拆开窑门、取出烧成陶器的工序。这里以开灶工序为灵感，创作“开灶匠”行当原型。', descriptions:['你喜欢把事情推到可交付的终点。没有结果，再周密的计划都还不算结束。','你会主动核对目标有没有达成，也愿意在收尾时做出明确判断。'], home:'南风古灶 · 开灶工序', companionId:'kilnLoader', companionLine:'他负责把东西装稳，你负责确认最后的成色。', mark:'door' },
  { id:'merchant', name:'缸行掌柜', clanId:'guild', historicalType:'product_persona', kind:'产品人格', slogan:'好看很好，能用更重要。', keywords:['务实判断','善用资源','看重用途'], center:{F:60,C:80,I:20,S:90,D:20,N:50}, culture:'缸行是石湾陶业二十四行之一。二十四行按产品、工种或地域分工，生产日用陶器、美术陶器等。', descriptions:['你会先问一件东西能不能解决真实问题，而不只看它好不好看。','你擅长比较成本、用途和资源，也知道什么时候合作能让事情更有效。'], home:'大缸瀑布 · 日用陶器', companionId:'master', companionLine:'你看清实际需求，他把人和步骤组织起来。', mark:'jar' },
  { id:'figurine', name:'人物塑匠', clanId:'guild', historicalType:'craft_based_persona', kind:'工艺人格', slogan:'你不一定最懂流程，但你特别懂人。', keywords:['读懂情绪','看见人物','共情表达'], center:{F:50,C:20,I:80,S:80,D:80,N:50}, culture:'“石湾公仔”是石湾美术陶瓷的俗称，作品常以人物形象表现神态与性情。这里以塑造人物神态的创作为灵感，构想“人物塑匠”这一性格原型。', descriptions:['你容易从语气、表情和小动作里读出情绪，知道什么时候该听、什么时候该说。','你对人的故事有兴趣，也能把复杂感受整理成别人听得懂的表达。'], home:'石湾微塑展示区 · 人物神态', companionId:'miniatureArtist', companionLine:'你读出人物的情绪，他替这份观察留下细节。', mark:'face' },
  { id:'guardian', name:'守灶人', clanId:'kiln', historicalType:'product_persona', kind:'产品人格', slogan:'热闹会过去，火不能灭。', keywords:['长期投入','稳定陪伴','守住传承'], center:{F:20,C:80,I:20,S:50,D:80,N:20}, culture:'南风古灶与高灶长期持续生产、窑火不断，是传统柴烧技艺延续的实物见证。', descriptions:['你愿意长时间照看一件重要的事，不需要每一步都有即时回报。','遇到变化时，你会先保护真正重要的部分，再考虑该不该调整。'], home:'古灶神榕 · 窑尾', companionId:'reformer', companionLine:'你护住重要的部分，他去改进可以变得更好的部分。', mark:'ember' },
  { id:'reformer', name:'改灶匠', clanId:'kiln', historicalType:'product_persona', kind:'产品人格', slogan:'不是推倒重来，是让它再好一点。', keywords:['发现问题','系统优化','保留核心'], center:{F:80,C:80,I:20,S:50,D:80,N:80}, culture:'南风灶在早期龙窑基础上改良火眼结构，改善窑内温度分布并降低废品率。', descriptions:['你看到问题时，不满足于抱怨，更想找到结构上的原因。','你会保留真正有效的部分，再用验证过的改动，让整个系统更好用。'], home:'南风古灶 · 火眼与窑背', companionId:'kilnLoader', companionLine:'你找出值得改变的地方，他先把现有结构安顿好。', mark:'eyes' }
];

export const hiddenPersonas = [
  { id:'dragonWomb', name:'投龙胎', clanId:'kiln', slogan:'你不是来测人格的。你是来走大运的。', culture:'高灶相关传统民俗记述中，年末烧完最后一窑并谢灶后，陶工进入温暖的窑肚，寓意来年走大运。', source:'景区讲解词（2023.9.15）', criteria:'火势 100、灶法至少 80、泥性不高于 40，并在 Q15 选择 B。', specialAnswer:{questionId:'q15',answerId:'b'}, mark:'dragon' },
  { id:'fireGod', name:'火神', clanId:'fire', slogan:'你的问题不是有没有火，是附近有没有灭火器。', culture:'龙窑柴烧会受到多种不可控因素影响，陶工会在烧窑前向火神祈愿。', source:'景区讲解词（2023.9.15）', criteria:'火势与泥性都达到 100。', mark:'flame' },
  { id:'southwindKiln', name:'南风灶', clanId:'kiln', slogan:'你不属于某一种固定行当，你更像一座窑。', culture:'有人擅长冲，有人擅长守，有人相信经验，有人相信改变。而你很少把任何一种方法当成唯一答案。该守的时候守，该改的时候改，该上火的时候上火，该收火的时候收火。', source:'产品创作人格', criteria:'六个维度都在 40 到 60 之间。', mark:'kiln' }
];

export const tieBreakers = [
  { ids:['fireWatcher','miniatureArtist'], conditions:[{dimension:'S',operator:'>=',value:55}], winner:'fireWatcher', note:'成行倾向更高，偏睇火师傅。' },
  { ids:['master','merchant'], conditions:[{dimension:'D',operator:'>=',value:55}], winner:'master', note:'精塑倾向更高，偏大师傅；快成倾向偏缸行掌柜。' },
  { ids:['fireStarter','kilnOpener'], conditions:[{dimension:'N',operator:'>=',value:55}], winner:'fireStarter', note:'改灶倾向偏上火派；规矩且快成时偏开灶型。', alternate:{conditions:[{dimension:'I',operator:'<=',value:45},{dimension:'D',operator:'<=',value:45}],winner:'kilnOpener'} },
  { ids:['kilnLoader','guardian'], conditions:[{dimension:'D',operator:'<=',value:50}], winner:'kilnLoader', note:'快成倾向偏装灶型；精塑倾向偏守灶人。' },
  { ids:['wheelMaker','figurine'], conditions:[{dimension:'S',operator:'>=',value:55}], winner:'figurine', note:'成行倾向偏石湾公仔；独作倾向偏拉坯手。' },
  { ids:['apprentice','fireStarter'], conditions:[{dimension:'C',operator:'<=',value:45},{dimension:'I',operator:'>=',value:55}], winner:'apprentice', note:'软口且手感倾向偏鬼催；泥性更硬时偏上火派。' }
];

export const firePoints = [
  {id:'kiln',title:'南风古灶',subtitle:'五百年柴烧',description:'沿着龙窑看火眼、窑背与烧制过程。',locationHint:'按现场“南风古灶”标识前往',culturalTopics:['明代正德年间','柴烧','三日火','睇火','火眼','改灶'],personaAffinity:['fireWatcher','fireStarter','kilnLoader','kilnOpener','reformer'],clanAffinity:['craft','fire','kiln'],missions:['find-fire-eye','observe-process']},
  {id:'high-kiln',title:'高灶',subtitle:'龙窑与民俗',description:'了解高灶的历史，以及石湾“投龙胎，走大运”的民俗讲述。',locationHint:'按现场“高灶”标识前往',culturalTopics:['龙窑','明代万历年间','投龙胎'],personaAffinity:['apprentice','fireStarter','guardian'],clanAffinity:['fire','kiln'],missions:['story-dragon-womb','observe-high-kiln']},
  {id:'fire-god',title:'火神',subtitle:'敬畏火候',description:'看看陶工如何面对柴烧中的不确定性。',locationHint:'按现场“火神”景点标识前往',culturalTopics:['火','柴烧','敬畏','南风三气火德星君'],personaAffinity:['fireStarter','master','guardian'],clanAffinity:['fire','guild'],missions:['observe-fire-god','story-fire-prayer']},
  {id:'banyan',title:'古灶神榕',subtitle:'树与窑相伴',description:'在窑尾榕荫下留意一座古窑周边的时间痕迹。',locationHint:'按现场“古灶神榕”标识前往',culturalTopics:['时间','陪伴','窑尾','民间表达'],personaAffinity:['guardian','figurine','master'],clanAffinity:['guild','kiln'],missions:['story-banyan','companion-banyan']},
  {id:'linjia',title:'林家厅 / 明清古建筑',subtitle:'岭南生活空间',description:'观察青砖、石脚、趟栊门与院落如何组织一座民居。',locationHint:'按现场“林家厅”标识前往',culturalTopics:['岭南建筑','祠堂民居','天井','趟栊门'],personaAffinity:['master','merchant','reformer','figurine'],clanAffinity:['guild','kiln'],missions:['observe-linjia','choice-community-space']},
  {id:'big-jar',title:'大缸瀑布',subtitle:'陶业与日用器',description:'从景区的大缸景观，认识陶器与日常生活的联系。',locationHint:'按现场“大缸瀑布”标识前往',culturalTopics:['缸','日用陶器','石湾二十四行'],personaAffinity:['merchant','kilnOpener','kilnLoader'],clanAffinity:['guild','fire'],missions:['find-bigjar','story-trades']},
  {id:'wheel',title:'拉坯体验',subtitle:'手上有陶',description:'体验手、泥与转盘之间的配合；项目开放情况以现场为准。',locationHint:'按现场玩陶艺术中心标识前往',culturalTopics:['拉坯','泥性','手感','成型'],personaAffinity:['wheelMaker','apprentice','fireStarter'],clanAffinity:['craft','fire'],missions:['experience-wheel','photo-wheel']},
  {id:'micro',title:'石湾微塑',subtitle:'一个表情的距离',description:'找一件微小作品，观察它怎样表现人物神态。',locationHint:'按现场石湾微塑展示标识前往',culturalTopics:['微塑','山公微雕','喜怒哀乐','形神意'],personaAffinity:['miniatureArtist','figurine','wheelMaker'],clanAffinity:['craft','guild'],missions:['observe-micro','photo-micro']}
];

export const missions = [
  {id:'find-fire-eye',firePointId:'kiln',type:'find',title:'找一只火眼',instruction:'窑背上的小孔叫火眼。到南风古灶附近，找到一只火眼，想想师傅为什么要从那里观察火势。',prompt:'你找到了什么细节？',completeLabel:'我找到火眼了',reveal:'火眼用于观察窑内火势，也用于向窑内添加木柴。讲解资料记载，睇火师傅会据火焰和制品状态判断投柴速度与收火时机。',storyId:'watch-fire',personaAffinity:['fireWatcher','fireStarter','reformer'],clanAffinity:['craft','fire','kiln']},
  {id:'observe-process',firePointId:'kiln',type:'observe',title:'看一遍三日火',instruction:'沿着柴烧工序想一想：装灶、挤火、上火、降温、开灶，各自解决什么问题？',prompt:'我最想亲眼看见的工序是……',completeLabel:'我看过工序介绍',reveal:'景区讲解词把装灶、烧火、自然降温到开灶概括为“三日火”。窑内最高温度可达约 1300℃。',storyId:'three-day-fire',personaAffinity:['fireWatcher','kilnLoader','kilnOpener','guardian'],clanAffinity:['craft','fire','kiln']},
  {id:'story-dragon-womb',firePointId:'high-kiln',type:'story',title:'听一个投龙胎的故事',instruction:'读读石湾“投龙胎，走大运”的民俗讲述。它描述的是人们如何把对来年的愿望放进一座窑里。',prompt:'如果给这一段民俗留一个词，你会选……',completeLabel:'我读完了这个故事',reveal:'讲解词记载：年末最后一窑烧完并进行谢灶祈福后，陶工走进温暖的窑肚，寓意来年走大运。这是传统民俗说法。',storyId:'dragon-womb',personaAffinity:['apprentice','guardian','figurine'],clanAffinity:['fire','guild','kiln']},
  {id:'observe-high-kiln',firePointId:'high-kiln',type:'observe',title:'比较两座龙窑',instruction:'在高灶附近观察建筑形态与周边环境，再想想为什么窑会被称作“龙窑”。',prompt:'我看到的一个不同之处是……',completeLabel:'我观察过高灶',reveal:'高灶建于明代万历年间，全长约 32 米，结构和烧窑过程与南风灶相似。',storyId:'high-kiln',personaAffinity:['master','apprentice','fireStarter'],clanAffinity:['fire','guild','kiln']},
  {id:'observe-fire-god',firePointId:'fire-god',type:'observe',title:'看看火神塑像',instruction:'观察火神塑像的姿态与神情。想想柴烧过程中，陶工为什么会敬畏火。',prompt:'这尊塑像给我的感觉是……',completeLabel:'我观察过火神',reveal:'这尊塑像为南风三气火德星君，又称火神，由中国工艺美术大师梅文鼎于 1999 年创作。景区讲解词提到，陶工烧窑前会向火神祈愿。',storyId:'fire-god',personaAffinity:['fireStarter','master','figurine'],clanAffinity:['fire','guild'],
    },
  {id:'story-fire-prayer',firePointId:'fire-god',type:'story',title:'给火候留一点敬意',instruction:'柴烧会受到多种不可控因素影响。想一想，在没有温度计替代经验的时候，陶工靠什么作出判断？',prompt:'我愿意交给经验的事情是……',completeLabel:'我读完了这段故事',reveal:'窑师傅会从火焰颜色和制品状态观察窑温，再判断投柴速度与停止时机。',storyId:'watch-fire',personaAffinity:['fireWatcher','guardian','reformer'],clanAffinity:['craft','kiln'],
    },
  {id:'story-banyan',firePointId:'banyan',type:'story',title:'听古榕与古灶的故事',instruction:'古灶神榕与窑尾相伴。读读景区流传的榕树讲述，再看看树影落在窑顶的样子。',prompt:'我想在这片树荫里记住……',completeLabel:'我读完了榕树故事',reveal:'讲解词说，这棵大榕树生长于南风古灶窑尾，与窑灶相伴四百余年；民间也流传“摸摸榕树头，一世无忧愁”的说法。',storyId:'banyan',personaAffinity:['guardian','figurine','master'],clanAffinity:['guild','kiln'],
    },
  {id:'companion-banyan',firePointId:'banyan',type:'companion',title:'和同行的人一起乘凉',instruction:'找一位同行窑友，彼此说一句今天最想记住的事。没有同行伙伴时，也可以给未来的自己留一句话。',prompt:'我们今天想记住……',completeLabel:'我留下一句话',reveal:'这项同行任务是产品设计，不是景区历史习俗。',storyId:'banyan',personaAffinity:['master','figurine','guardian'],clanAffinity:['guild'],
    },
  {id:'observe-linjia',firePointId:'linjia',type:'observe',title:'读一读一座岭南民居',instruction:'在林家厅留意青砖、麻石地基、天井和趟栊门。挑一个最能体现生活安排的细节。',prompt:'我注意到……',completeLabel:'我观察过林家厅',reveal:'林家厅原为林家家庙，清代嘉庆年间改建为居室。建筑有三进结构、天井、厢房与阁楼。',storyId:'linjia',personaAffinity:['master','merchant','reformer'],clanAffinity:['guild','kiln'],
    },
  {id:'choice-community-space',firePointId:'linjia',type:'choice',title:'挑一处生活空间',instruction:'如果只能用一个空间讲岭南民居的日常，你会选哪里？先选，再看看讲解资料怎样描述。',prompt:'你会选：',choices:['天井','中门','客厅','厢房'],completeLabel:'我选好了',reveal:'林家厅的天井、风水中门、客厅与厢房承担不同的生活功能。你的选择没有对错。',storyId:'linjia',personaAffinity:['master','figurine','guardian'],clanAffinity:['guild'],
    },
  {id:'find-bigjar',firePointId:'big-jar',type:'find',title:'找一只大缸',instruction:'在大缸瀑布附近找一只陶缸，看看它的尺寸、形状和表面。想想这类器物如何进入日常生活。',prompt:'这只缸让我想到……',completeLabel:'我找到一只大缸',reveal:'缸是石湾陶业产品之一。石湾二十四行中设有缸行，行会按产品和工种分工。',storyId:'trades',personaAffinity:['merchant','kilnLoader','kilnOpener'],clanAffinity:['guild','fire'],
    },
  {id:'story-trades',firePointId:'big-jar',type:'story',title:'认识石湾二十四行',instruction:'石湾陶业曾按产品、工种与地域组织行会。读读缸行和其他行会的分工，想想一件陶器背后需要多少种手艺。',prompt:'我今天才知道……',completeLabel:'我读完了二十四行',reveal:'石湾陶业二十四行以产品类别为主，包括日用陶瓷、美术陶瓷、园林陶瓷和丧葬器具等。',storyId:'trades',personaAffinity:['merchant','master','figurine'],clanAffinity:['guild'],
    },
  {id:'experience-wheel',firePointId:'wheel',type:'experience',title:'试着扶住一团泥',instruction:'如拉坯体验开放，可在工作人员指导下感受手与泥的配合；若暂未开放，观察现场陶艺演示也可以。',prompt:'我感受到的手感是……',completeLabel:'我体验或观察过拉坯',reveal:'拉坯体验属于现场项目，开放安排请以景区当天信息为准。',storyId:'wheel',personaAffinity:['wheelMaker','apprentice','fireStarter'],clanAffinity:['craft','fire'],
    },
  {id:'photo-wheel',firePointId:'wheel',type:'photo',title:'拍下手上有陶的一刻',instruction:'拍一张陶艺过程或作品的照片，把今天的手感留在旅程里。请先确认现场允许拍摄。',prompt:'给这张照片留一句话',completeLabel:'保存这张旅程照片',reveal:'照片只在当前页面保留，重新打开后会清除。',storyId:'wheel',personaAffinity:['wheelMaker','miniatureArtist','figurine'],clanAffinity:['craft','guild'],
    },
  {id:'observe-micro',firePointId:'micro',type:'observe',title:'找到一个表情',instruction:'找一件你喜欢的石湾微塑，观察它如何用很小的形体表现喜怒哀乐。',prompt:'我最先看到的是……',completeLabel:'我找到一个表情',reveal:'石湾微塑强调形、神、意的统一，作品尺寸虽小，也会努力表现人物神态。',storyId:'micro',personaAffinity:['miniatureArtist','figurine','wheelMaker'],clanAffinity:['craft','guild'],
    },
  {id:'photo-micro',firePointId:'micro',type:'photo',title:'留下一个微小细节',instruction:'拍下你最喜欢的一件微塑或它的一个细节。拍摄前请留意现场提示。',prompt:'这个细节让我停下来看，因为……',completeLabel:'保存这张旅程照片',reveal:'照片只在当前页面保留，重新打开后会清除。',storyId:'micro',personaAffinity:['miniatureArtist','figurine'],clanAffinity:['craft','guild'],
    }
];

export const routePreferences = {
  fireWatcher:['kiln','banyan','micro','high-kiln','fire-god','linjia','wheel','big-jar'],
  master:['linjia','kiln','banyan','big-jar','high-kiln','micro','fire-god','wheel'],
  apprentice:['wheel','kiln','high-kiln','banyan','micro','big-jar','fire-god','linjia'],
  fireStarter:['kiln','fire-god','wheel','high-kiln','big-jar','banyan','linjia','micro'],
  wheelMaker:['wheel','micro','banyan','kiln','big-jar','linjia','high-kiln','fire-god'],
  miniatureArtist:['micro','wheel','kiln','linjia','banyan','big-jar','high-kiln','fire-god'],
  kilnLoader:['kiln','linjia','big-jar','high-kiln','fire-god','banyan','wheel','micro'],
  kilnOpener:['big-jar','kiln','wheel','linjia','high-kiln','micro','banyan','fire-god'],
  merchant:['big-jar','linjia','banyan','high-kiln','kiln','wheel','micro','fire-god'],
  figurine:['micro','banyan','linjia','fire-god','kiln','wheel','high-kiln','big-jar'],
  guardian:['banyan','kiln','high-kiln','linjia','big-jar','fire-god','micro','wheel'],
  reformer:['kiln','high-kiln','fire-god','linjia','wheel','big-jar','banyan','micro']
};

export const routeModes = [
  {id:'light',name:'轻游',minutes:20,count:3,summary:'三个火点，先认识南风古灶的各类行当。'},
  {id:'standard',name:'标准',minutes:40,count:5,summary:'五个火点，把柴烧与石湾生活串起来。'},
  {id:'deep',name:'深游',minutes:60,count:8,summary:'走过八个火点，慢慢把这一窑看完整。'}
];

export const stories = [
  {id:'three-day-fire',title:'三日火',body:'装灶之后，陶工先在灶头以大木柴挤火约 12 小时；随后转到窑背火眼上火约 6 小时。投柴结束后自然降温，再开窑取出陶器。景区讲解词称这个周期为“三日火”，窑温最高可达约 1300℃。',source:'景区讲解词（2023.9.15）'},
  {id:'watch-fire',title:'火眼与睇火',body:'火眼是窑背上的小孔，用来观察火势和添加木柴。睇火师傅从火焰颜色与制品状态判断温度、投柴速度和收火时机。',source:'景区讲解词（2023.9.15）；文字资料（9.25）'},
  {id:'kiln-change',title:'让窑内火候更均匀',body:'资料记载，南风灶在早期文灶基础上改进火眼结构、增加火眼数量并调整间距，以改善窑内温度分布、减少废品。这里的“改灶匠”是产品人格创作，不是传统工种称谓。',source:'文字资料（9.25）；人格为产品创作'},
  {id:'dragon-womb',title:'投龙胎，走大运',body:'讲解词记载，年末龙窑烧完最后一窑并谢灶祈福后，陶工进入温暖的窑肚，寓意来年走大运。这是传统民俗讲述。',source:'景区讲解词（2023.9.15）'},
  {id:'banyan',title:'古灶神榕',body:'大榕树生长在南风古灶窑尾，与窑灶相伴四百余年。讲解词保留了“摸摸榕树头，一世无忧愁”的民间说法。',source:'景区讲解词（2023.9.15）'},
  {id:'linjia',title:'林家厅',body:'林家厅原为林家家庙，清代嘉庆年间改为居室。它以三进结构组织天井、客厅、厢房与阁楼，是岭南祠堂民居结合的建筑。',source:'景区讲解词（2023.9.15）'},
  {id:'trades',title:'石湾二十四行',body:'石湾陶业行会按产品类别、工种类别和地域界限划分。二十四行涉及日用陶瓷、美术陶瓷、园林陶瓷及丧葬器具等产品。',source:'文字资料（9.25）'},
  {id:'micro',title:'石湾微塑',body:'石湾微塑又称山公微雕。作品虽小，仍重视人物喜怒哀乐的神态，以形、神、意的统一见长。',source:'景区讲解词（2023.9.15）'},
  {id:'high-kiln',title:'高灶',body:'高灶建于明代万历年间，全长约 32 米，结构与烧窑过程和南风灶相似。',source:'景区讲解词（2023.9.15）'},
  {id:'fire-god',title:'火神',body:'南风三气火德星君又称火神。景区讲解词记载，梅文鼎于 1999 年创作了这尊陶塑；陶工会在烧窑前向火神祈愿。',source:'景区讲解词（2023.9.15）'},
  {id:'wheel',title:'拉坯',body:'拉坯体验让游客感受泥团、转盘和双手的配合。项目开放安排以景区当天信息为准。',source:'产品体验内容；具体开放情况待现场确认'}
];

export const sourceNotes = [
  {id:'guide-2023',label:'电子导览系统用的景区讲解词（2023.9.15）',filename:'电子导览系统用的景区讲解词2023.9.15(1).docx'},
  {id:'text-925',label:'文字资料（9.25）',filename:'文字资料9.25.docx'}
];
