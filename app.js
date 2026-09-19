const phases={
  crawl:{title:'CRAWL: Learn the reasoning',text:'No speed pressure. Do one question carefully and explain why every answer is right or wrong.'},
  walk:{title:'WALK: Make it repeatable',text:'Use small timed sets. Separate reasoning mistakes from attention and timing mistakes.'},
  run:{title:'RUN: Perform under pressure',text:'Use realistic timing. Flag time sinks, reset between sections, then blind-review uncertainty.'}
};
const jobs=[
  {name:'Main conclusion',stem:'Which one of the following most accurately expresses the main conclusion / main point?',job:'Find what the author is trying to prove.',check:'Which claim are the other claims trying to support?'},
  {name:'Strengthen',stem:'Which one of the following, if true, most strengthens / most supports the argument?',job:'Make the conclusion more likely.',check:'Does this move probability in the required direction without needing to prove the conclusion?'},
  {name:'Weaken',stem:'Which one of the following, if true, most weakens / most calls into question the argument?',job:'Make the conclusion less likely.',check:'Does this attack the evidence → conclusion link, not merely the topic?'},
  {name:'Necessary assumption',stem:'The argument assumes which one of the following? / Which one is an assumption required by the argument?',job:'Find something the argument needs.',check:'Negate the choice. If the reasoning collapses, it was necessary.'},
  {name:'Sufficient assumption',stem:'Which one of the following, if assumed, allows the conclusion to be properly drawn?',job:'Find something strong enough to make the conclusion follow.',check:'Does this fully bridge the premises to the conclusion?'},
  {name:'Flaw',stem:'The reasoning in the argument is most vulnerable to criticism on the grounds that it…',job:'Describe what went wrong in the reasoning.',check:'Did I name the reasoning mistake instead of merely disagreeing?'},
  {name:'Inference / Must Be True',stem:'Which one of the following must be true / can be properly inferred from the statements above?',job:'Prove the answer from the given information.',check:'Did I stay inside the text without improving the argument?'},
  {name:'Resolve / Explain',stem:'Which one of the following, if true, most helps to resolve / explain the apparent discrepancy?',job:'Make apparently conflicting facts fit together.',check:'Does this allow both sides to be true at once?'},
  {name:'Principle',stem:'Which one of the following principles most helps to justify / is illustrated by the argument?',job:'Identify or apply the governing rule.',check:'Does the rule match the reasoning job, not just the topic?'},
  {name:'Parallel reasoning',stem:'Which one of the following is most closely parallel in its reasoning to the argument above?',job:'Match the structure of the reasoning.',check:'Did I abstract the form first and ignore subject-matter distractions?'}
];
const traps=[
  {name:'True but irrelevant',looks:'Factually plausible, maybe even true, but it never does the JOB.',tempting:'Your brain rewards recognizing something that feels correct.',ask:'Does this change what I was asked about?',example:'Stimulus concludes a policy will cut traffic. Choice says the policy is popular with voters.'},
  {name:'Too strong',looks:'Uses ALL, NEVER, MUST, ONLY, or PROVES when the stimulus supports less.',tempting:'Extreme wording feels decisive and “answer-like.”',ask:'Did the answer outrun the evidence?',example:'Stimulus: some parks reduce stress. Choice: Parks always eliminate anxiety.'},
  {name:'Outside scope',looks:'Needs a fact, group, or issue the stimulus never introduced.',tempting:'It sounds smart because it imports “real world” knowledge.',ask:'Where does it say that?',example:'Stimulus discusses local recycling rates. Choice debates global oil markets.'},
  {name:'Wrong target',looks:'Affects a nearby claim, definition, or side issue — not the actual conclusion.',tempting:'It engages the topic, so it feels relevant.',ask:'What exactly is the conclusion?',example:'Conclusion: the mayor’s plan will lower rents. Choice attacks the mayor’s speaking style.'},
  {name:'Reversal',looks:'Flips a conditional, comparison, causal direction, or order of ideas.',tempting:'The same words appear, so the structure feels familiar.',ask:'Did the arrow get turned around?',example:'Stimulus: If licensed, then trained. Choice treats training as proof of licensing.'},
  {name:'Premise restatement',looks:'Repeats evidence without repairing or attacking the gap.',tempting:'Familiar wording feels safe and “supported.”',ask:'Does this change the evidence → conclusion link?',example:'Premise: sales rose after ads. Choice: “Sales increased following the ad campaign.”'},
  {name:'Interesting ≠ relevant',looks:'A fascinating implication that is still off-JOB.',tempting:'Curiosity feels like insight.',ask:'What is my job RIGHT NOW?',example:'Weaken question. Choice offers a clever historical analogy that never touches the gap.'},
  {name:'Correlation ≠ causation',looks:'Treats “happened together” as “one caused the other.”',tempting:'Temporal order feels like a causal story.',ask:'Could something else explain both?',example:'Stimulus: ice cream sales and drownings rise together. Choice assumes ice cream causes drowning.'},
  {name:'Necessary / sufficient mix-up',looks:'Treats a required condition as enough, or a enough condition as required.',tempting:'Logic words feel precise even when reversed.',ask:'Is this required, or is it enough?',example:'“You must be registered to vote” becomes “If registered, you definitely vote.”'},
  {name:'Unsupported comparison',looks:'Ranks, prefers, or equates things the stimulus never compared.',tempting:'Comparatives sound evaluative and conclusive.',ask:'Did the stimulus actually compare these?',example:'Stimulus: Method A works. Choice: Method A works better than Method B.'}
];
const translations=[
  {term:'if',plain:'This introduces a sufficient condition — enough to guarantee the other side.',symbol:'If A → B',watch:'Do not reverse it. Knowing B does not prove A.'},
  {term:'only if',plain:'This introduces a necessary condition — required, but not by itself enough.',symbol:'A only if B  ⇒  A → B',watch:'“Only if” points to the required piece, not the trigger.'},
  {term:'unless',plain:'Treat “unless” as “if not.” It names the exception that blocks the result.',symbol:'A unless B  ⇒  If not B → A',watch:'Translate before diagramming. Do not invent extras.'},
  {term:'except',plain:'Names the case left out of a rule or claim.',symbol:'All X except Y',watch:'The exception is not automatically the opposite rule for everything else.'},
  {term:'some',plain:'At least one. Maybe more. Maybe almost all. No upper limit is promised.',symbol:'Some A are B',watch:'“Some” does not mean “most,” and it does not block “all.”'},
  {term:'most',plain:'More than half. Could be 51% or 99%.',symbol:'Most A are B',watch:'Most is stronger than some, weaker than all.'},
  {term:'all',plain:'Every member of the group. No exceptions unless stated.',symbol:'All A are B  ⇒  A → B',watch:'All is strong. Look for overclaim traps.'},
  {term:'not all',plain:'At least one is left out. Equivalent to “some are not.”',symbol:'Not all A are B  ⇒  Some A are not B',watch:'“Not all” does not mean “none.”'},
  {term:'required / necessary',plain:'Needed for the result. Without it, the result fails. It may not be enough alone.',symbol:'B is required for A  ⇒  A → B',watch:'Necessary ≠ sufficient.'},
  {term:'sufficient',plain:'Enough to guarantee the result. Other routes may also work.',symbol:'A is sufficient for B  ⇒  A → B',watch:'Sufficient ≠ necessary.'},
  {term:'presupposes / assumes',plain:'The argument needs this to be true, even if it never says it out loud.',symbol:'Argument → needed assumption',watch:'Ask: if this were false, would the reasoning collapse?'},
  {term:'depends on / relies on',plain:'The conclusion’s support hangs on this link or claim.',symbol:'Support depends on X',watch:'Find the load-bearing piece, not a decorative detail.'}
];
const logicTiles=[
  {id:'if',label:'IF',plain:'Enough to trigger the result.',hint:'Sufficient condition'},
  {id:'then',label:'THEN',plain:'What follows when the trigger is met.',hint:'Result / consequent'},
  {id:'not',label:'NOT',plain:'Negates the next piece.',hint:'Flip true/false'},
  {id:'only-if',label:'ONLY IF',plain:'Names what is required.',hint:'Necessary condition'},
  {id:'unless',label:'UNLESS',plain:'Treat as “if not.”',hint:'Exception framing'},
  {id:'some',label:'SOME',plain:'At least one. No upper limit promised.',hint:'Existential'},
  {id:'most',label:'MOST',plain:'More than half.',hint:'Majority'},
  {id:'all',label:'ALL',plain:'Every member. No leftover cases.',hint:'Universal'},
  {id:'a',label:'A',plain:'First claim or group.',hint:'Variable'},
  {id:'b',label:'B',plain:'Second claim or group.',hint:'Variable'}
];
let logicChain=[];
const missLabels={
  reasoning:'Reasoning',
  reading:'Reading',
  attention:'Attention',
  timing:'Timing',
  'question-job':'Question-job identification'
};
const missCoaching={
  reasoning:{
    ask:'Did I attack the GAP, or just the topic?',
    next:'Re-work one miss with Argument Autopsy before looking at choices.',
    href:'#framework',
    cta:'Open Argument Autopsy'
  },
  reading:{
    ask:'Where does it say that?',
    next:'Map one passage with paragraph roles — stay inside the text.',
    href:'#rcMap',
    cta:'Open Verbal Passage Map'
  },
  attention:{
    ask:'What is my job RIGHT NOW?',
    next:'Do one crawl question with no speed pressure.',
    href:'#practiceSession',
    cta:'Start a crawl practice'
  },
  timing:{
    ask:'Did the clock change my process?',
    next:'Run Compare: untimed → timed on the same questions.',
    href:'#practiceSession',
    cta:'Open Practice Session'
  },
  'question-job':{
    ask:'What does the stem ask me to do?',
    next:'Name the JOB on the Decision Mat before opening A–E.',
    href:'#decisionMat',
    cta:'Open Decision Mat'
  }
};

function collectMissEvents(source='all'){
  const events=[];
  if(source==='all'||source==='error-log'){
    getLog().forEach((x,i)=>{
      if(!x.missType)return;
      events.push({
        miss:x.missType,
        source:'error-log',
        rule:x.rule||'',
        note:x.fooled||x.overlooked||'',
        label:'',
        at:x.at||x.date||'',
        order:i
      });
    });
  }
  if(source==='all'||source==='practice'){
    const queues=loadPracticeQueues();
    [...queues.misses,...queues.flags].forEach((item,i)=>{
      const miss=item.miss||'';
      if(!miss)return;
      events.push({
        miss,
        source:'practice',
        rule:item.blindNote||'',
        note:item.note||'',
        label:item.label||'',
        at:item.savedAt||'',
        order:i,
        result:item.result||''
      });
    });
  }
  return events;
}

function summarizeMissPatterns(source='all'){
  const events=collectMissEvents(source);
  const counts={};
  const bySource={};
  Object.keys(missLabels).forEach(k=>{counts[k]=0;bySource[k]={errorLog:0,practice:0}});
  events.forEach(e=>{
    if(!counts.hasOwnProperty(e.miss))return;
    counts[e.miss]+=1;
    if(e.source==='error-log')bySource[e.miss].errorLog+=1;
    else bySource[e.miss].practice+=1;
  });
  const ranked=Object.entries(counts).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0]));
  const total=ranked.reduce((n,[,c])=>n+c,0);
  const top=total?ranked.find(([,c])=>c>0)||null:null;
  const rules=top
    ?events.filter(e=>e.miss===top[0]&&(e.rule||e.note)).slice(0,4)
    :[];
  return {events,counts,bySource,ranked,total,top,rules};
}

function updateTodayFocus(){
  const el=$('todayFocus');
  const resetEl=$('resetCardFocus');
  const summary=summarizeMissPatterns('all');
  if(!summary.total||!summary.top){
    if(el)el.innerHTML='Log a few misses to unlock today’s focus from the <a href="#missPatterns">Miss Pattern Board</a>.';
    if(resetEl)resetEl.textContent='Today’s focus: keep externalizing JOB → GAP before answer choices.';
    return;
  }
  const [topId,topCount]=summary.top;
  const coach=missCoaching[topId]||{};
  const label=missLabels[topId]||topId;
  if(el){
    el.innerHTML=`Today’s focus: <strong>${escapeHtml(label)}</strong> (${topCount}/${summary.total}). ${escapeHtml(coach.next||'One careful miss review.')} <a href="#missPatterns">See patterns</a>`;
  }
  if(resetEl){
    resetEl.textContent=`Today’s focus: ${label} — ${coach.ask||'What is my job RIGHT NOW?'}`;
  }
}

function renderMissPatterns(){
  const focusEl=$('missPatternFocus');
  const barsEl=$('missPatternBars');
  const rulesEl=$('missPatternRules');
  if(!focusEl||!barsEl||!rulesEl)return;
  const source=$('missPatternSource')?.value||'all';
  const summary=summarizeMissPatterns(source);
  updateTodayFocus();

  if(!summary.total){
    focusEl.innerHTML=`
      <p class="eyebrow">No pattern yet</p>
      <h3>Log a miss to see your focus</h3>
      <p class="hint">Use Mistake Detective or tag a practice miss. Patterns appear here — one focus at a time.</p>
      <div class="button-row">
        <a class="primary" href="#mistakeDetective" style="text-decoration:none;display:inline-block">Go to Mistake Detective</a>
      </div>`;
    barsEl.innerHTML='';
    rulesEl.innerHTML='';
    renderProMissInsights(summary);
    return;
  }

  const [topId,topCount]=summary.top;
  const coach=missCoaching[topId]||{ask:'What is my job RIGHT NOW?',next:'Re-do one miss slowly.',href:'#framework',cta:'Open Argument Autopsy'};
  const pct=Math.round((topCount/summary.total)*100);
  focusEl.innerHTML=`
    <p class="eyebrow">Primary focus</p>
    <h3>${escapeHtml(missLabels[topId]||topId)} · ${topCount} of ${summary.total} (${pct}%)</h3>
    <p><strong>Ask:</strong> ${escapeHtml(coach.ask)}</p>
    <p><strong>Next drill:</strong> ${escapeHtml(coach.next)}</p>
    <div class="button-row">
      <a class="primary" href="${coach.href}" style="text-decoration:none;display:inline-block">${escapeHtml(coach.cta)}</a>
      <a class="ghost" href="#trapDeck" style="text-decoration:none;display:inline-block;padding:.7rem 1rem;border:2px solid var(--ink);border-radius:9px;font-weight:800">Review traps</a>
    </div>`;

  const max=Math.max(...summary.ranked.map(([,c])=>c),1);
  barsEl.innerHTML=summary.ranked.map(([id,count])=>{
    const width=count?Math.max(8,Math.round((count/max)*100)):0;
    const src=summary.bySource[id]||{errorLog:0,practice:0};
    const meta=count?`${src.errorLog} error log · ${src.practice} practice`:'No tags yet';
    return `<div class="miss-bar-row">
      <p class="miss-bar-label">${escapeHtml(missLabels[id]||id)}</p>
      <div class="miss-bar-track" aria-hidden="true"><div class="miss-bar-fill" style="width:${width}%"></div></div>
      <p class="miss-bar-count">${count}</p>
      <p class="miss-bar-meta">${escapeHtml(meta)}</p>
    </div>`;
  }).join('');

  if(!summary.rules.length){
    rulesEl.innerHTML=`<p class="hint">No next-time rules attached to ${escapeHtml(missLabels[topId]||topId)} yet. Add one in Mistake Detective.</p>`;
  }else{
    rulesEl.innerHTML=`<p class="eyebrow">Recent notes for ${escapeHtml(missLabels[topId]||topId)}</p>`+
      summary.rules.map(r=>{
        const title=r.label?escapeHtml(r.label):(r.source==='error-log'?'Error log':'Practice');
        const body=escapeHtml(r.rule||r.note||'');
        return `<article class="miss-rule-card"><p><strong>${title}</strong></p><p>${body}</p></article>`;
      }).join('');
  }
  renderProMissInsights(summary);
}

function initMissPatterns(){
  renderMissPatterns();
  $('missPatternSource')?.addEventListener('change',renderMissPatterns);
  $('printMissPatterns')?.addEventListener('click',()=>printSection('missPatterns'));
}

const preflightFields=[
  ['preIssue','ISSUE','What conflict or question must the essay address?'],
  ['prePosition','MY POSITION','What do I conclude?'],
  ['preReason1','REASON 1','Strongest support for my position'],
  ['preReason2','REASON 2','Second support'],
  ['preOpposition','STRONGEST OPPOSITION','Best opposing argument'],
  ['preWhatRight','WHAT THEY GET RIGHT','Grant the fair point'],
  ['preWhyWin','WHY I STILL WIN','Why the opposition does not defeat me'],
  ['preOrder','ESSAY ORDER','How will I sequence the paragraphs?']
];
const progressSkills=[
  ['jobID','Identify JOB from the stem'],
  ['autopsy','JOB → GIVEN → CONCLUSION → GAP → TARGET'],
  ['traps','Wrong-answer trap recognition'],
  ['translation','Conditional / quantifier translation'],
  ['rcMap','RC paragraph-role mapping'],
  ['rcView','RC viewpoint tracking'],
  ['writing','Writing preflight under time'],
  ['timedLR','Timed LR accuracy']
];
const progressStages=['learning','untimed','timed','automatic'];
const progressStageLabels={learning:'Learning',untimed:'Untimed',timed:'Timed',automatic:'Automatic'};

const $=id=>document.getElementById(id);
const fields=['job','given','conclusion','gap','target','credited','autopsyRule','mainPoint','viewAuthor','viewA','viewB','viewAgrees','viewDisagrees','viewWhy','viewAuthorMove','logicSentence','preIssue','prePosition','preReason1','preReason2','preOpposition','preWhatRight','preWhyWin','preOrder','fooled','attractive','overlooked','nextRule','missType','sheetLabel','sheetDate','sheetJob','sheetGiven','sheetConclusion','sheetGap','sheetTarget','sheetA','sheetB','sheetC','sheetD','sheetE','sheetCredited','sheetRule','sheetResult','sheetMiss'];
const autopsyFields=['job','given','conclusion','gap','target','choiceA','choiceB','choiceC','choiceD','choiceE','credited','autopsyRule'];
const sessionSheetFields=['sheetLabel','sheetDate','sheetJob','sheetGiven','sheetConclusion','sheetGap','sheetTarget','sheetA','sheetB','sheetC','sheetD','sheetE','sheetCredited','sheetRule','sheetResult','sheetMiss'];
const sheetFromAutopsy={
  sheetJob:'job',sheetGiven:'given',sheetConclusion:'conclusion',sheetGap:'gap',sheetTarget:'target',
  sheetA:'choiceA',sheetB:'choiceB',sheetC:'choiceC',sheetD:'choiceD',sheetE:'choiceE',
  sheetCredited:'credited',sheetRule:'autopsyRule'
};
let saveTimer=null;

function escapeHtml(s=''){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function toast(msg){$('toast').textContent=msg;$('toast').classList.add('show');setTimeout(()=>$('toast').classList.remove('show'),1400)}
function setSaveState(mode,detail){
  const el=$('saveState');
  if(!el)return;
  el.classList.remove('saved','saving');
  if(mode==='saving'){el.classList.add('saving');el.textContent='Saving…'}
  else if(mode==='saved'){el.classList.add('saved');el.textContent=detail||`Saved ${new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}`}
  else{el.textContent=detail||'Draft ready'}
}

function saveDraft(){
  setSaveState('saving');
  const d={paragraphCount:pCount,logicChain:logicChain.slice(),progress:getProgress()};
  fields.forEach(id=>{if($(id))d[id]=$(id).value});
  document.querySelectorAll('[data-write]').forEach(x=>d[x.dataset.write]=x.value);
  localStorage.setItem('lsat-draft',JSON.stringify(d));
  clearTimeout(saveTimer);
  saveTimer=setTimeout(()=>setSaveState('saved'),180);
}
function getProgress(){
  const out={};
  progressSkills.forEach(([id])=>{
    const el=document.querySelector(`input[name="progress-${id}"]:checked`);
    out[id]=el?el.value:'learning';
  });
  return out;
}
function setProgress(data={}){
  progressSkills.forEach(([id])=>{
    const stage=progressStages.includes(data[id])?data[id]:'learning';
    const el=document.querySelector(`input[name="progress-${id}"][value="${stage}"]`);
    if(el)el.checked=true;
  });
}
function restoreDraft(){
  const d=JSON.parse(localStorage.getItem('lsat-draft')||'{}');
  if(Number.isInteger(d.paragraphCount)&&d.paragraphCount>=1&&d.paragraphCount<=8){
    pCount=d.paragraphCount;
    renderParagraphs();
  }
  if(Array.isArray(d.logicChain)){
    logicChain=d.logicChain.filter(id=>logicTiles.some(t=>t.id===id)).slice(0,12);
    if(typeof renderLogicChain==='function')renderLogicChain();
  }
  Object.entries(d).forEach(([id,v])=>{
    if(id==='paragraphCount'||id==='logicChain'||id==='progress')return;
    const el=$(id)||document.querySelector(`[data-write="${id}"]`);
    if(el)el.value=v;
  });
  if(d.progress&&typeof d.progress==='object')setProgress(d.progress);
  if(Object.keys(d).length)setSaveState('saved','Draft restored');
}

function setPhase(phaseName){
  const key=phases[phaseName]?phaseName:'crawl';
  document.querySelectorAll('.phase').forEach(btn=>{
    const active=btn.dataset.phase===key;
    btn.classList.toggle('active',active);
    btn.setAttribute('aria-pressed',active);
  });
  const p=phases[key];
  $('phaseTitle').textContent=p.title;
  $('phaseText').textContent=p.text;
  localStorage.setItem('lsat-phase',key);
}
document.querySelectorAll('.phase').forEach(btn=>btn.addEventListener('click',()=>setPhase(btn.dataset.phase)));
setPhase(localStorage.getItem('lsat-phase')||'crawl');

jobs.forEach(j=>{const o=document.createElement('option');o.textContent=j.name;$('questionType').appendChild(o)});
function showJob(){
  const j=jobs[$('questionType').selectedIndex];
  $('jobCard').innerHTML=`<h3>${escapeHtml(j.name)}</h3><p><strong>Stem cue:</strong> ${escapeHtml(j.stem)}</p><p><strong>JOB:</strong> ${escapeHtml(j.job)}</p><p><strong>Checkpoint:</strong> ${escapeHtml(j.check)}</p>`;
}
$('questionType').addEventListener('change',showJob);showJob();

let trapIndex=0;
function showTrap(){
  const t=traps[trapIndex];
  $('trapCard').innerHTML=`<p class="eyebrow">Trap ${trapIndex+1} of ${traps.length}</p><h3>${escapeHtml(t.name)}</h3><p>${escapeHtml(t.looks)}</p><p><strong>Why tempting:</strong> ${escapeHtml(t.tempting)}</p><p><strong>Ask:</strong> ${escapeHtml(t.ask)}</p>`;
}
$('nextTrap').onclick=()=>{trapIndex=(trapIndex+1)%traps.length;showTrap()};
$('prevTrap').onclick=()=>{trapIndex=(trapIndex-1+traps.length)%traps.length;showTrap()};
showTrap();

function renderDecisionMat(){
  const body=$('decisionMatTable').querySelector('tbody');
  body.innerHTML=jobs.map(j=>`<tr><td>${escapeHtml(j.stem)}</td><td><strong>${escapeHtml(j.name)}</strong><div class="mat-job">${escapeHtml(j.job)}</div></td><td>${escapeHtml(j.check)}</td></tr>`).join('');
}
function renderTrapDeck(){
  $('trapDeckGrid').innerHTML=traps.map((t,i)=>`<article class="trap-print-card"><p class="eyebrow">Trap ${i+1}</p><h3>${escapeHtml(t.name)}</h3><p><strong>Looks like:</strong> ${escapeHtml(t.looks)}</p><p><strong>Why tempting:</strong> ${escapeHtml(t.tempting)}</p><p><strong>Ask:</strong> ${escapeHtml(t.ask)}</p><p><strong>Example:</strong> ${escapeHtml(t.example)}</p></article>`).join('');
}
function renderTranslations(filter=''){
  const q=filter.trim().toLowerCase();
  const list=translations.filter(t=>!q||[t.term,t.plain,t.symbol,t.watch].join(' ').toLowerCase().includes(q));
  $('translationGrid').innerHTML=list.length?list.map(t=>`<article class="translation-card"><h3>${escapeHtml(t.term)}</h3><p><strong>Plain meaning:</strong> ${escapeHtml(t.plain)}</p><p><strong>Compact form:</strong> ${escapeHtml(t.symbol)}</p><p><strong>Watch for:</strong> ${escapeHtml(t.watch)}</p></article>`).join(''):'<p class="empty">No terms match that filter.</p>';
}
function printSection(sectionId){
  document.body.dataset.print=sectionId;
  const cleanup=()=>{delete document.body.dataset.print;window.removeEventListener('afterprint',cleanup)};
  window.addEventListener('afterprint',cleanup);
  window.print();
  setTimeout(cleanup,1000);
}
$('printAutopsy')?.addEventListener('click',()=>printSection('framework'));
$('printDecisionMat').onclick=()=>printSection('decisionMat');
$('printTrapDeck').onclick=()=>printSection('trapDeck');
$('printTranslationDict').onclick=()=>printSection('translationDict');
$('translationFilter').addEventListener('input',e=>renderTranslations(e.target.value));
renderDecisionMat();
renderTrapDeck();
renderTranslations();
$('printViewpointTracker').onclick=()=>printSection('viewpointTracker');
const viewpointFields=['viewAuthor','viewA','viewB','viewAgrees','viewDisagrees','viewWhy','viewAuthorMove'];
$('clearViewpoints').onclick=()=>{viewpointFields.forEach(id=>{const el=$(id);if(el)el.value=''});saveDraft();toast('Viewpoint tracker cleared')};

function logicMeaning(ids){
  const labels=ids.map(id=>logicTiles.find(t=>t.id===id)?.label||id);
  if(!labels.length)return 'Click tiles to build a relationship.';
  const s=labels.join(' → ');
  // lightweight plain readings for common patterns
  const joined=labels.join(' ');
  if(joined==='IF A THEN B')return 'Plain reading: A is enough to get B.';
  if(joined==='A ONLY IF B')return 'Plain reading: A requires B. A → B.';
  if(joined==='A UNLESS B')return 'Plain reading: If not B, then A.';
  if(joined==='IF NOT A THEN NOT B')return 'Plain reading: Without A, B does not follow from this rule alone — check the original conditional carefully.';
  if(joined==='ALL A B'||joined==='ALL A THEN B')return 'Plain reading: Every A is B.';
  if(joined==='SOME A B')return 'Plain reading: At least one A is B.';
  if(joined==='MOST A B')return 'Plain reading: More than half of A are B.';
  return `Arrangement: ${s}`;
}
function saveLogicChain(){
  const d=JSON.parse(localStorage.getItem('lsat-draft')||'{}');
  d.logicChain=logicChain.slice();
  localStorage.setItem('lsat-draft',JSON.stringify(d));
  setSaveState('saved');
}
function restoreLogicChain(){
  const d=JSON.parse(localStorage.getItem('lsat-draft')||'{}');
  if(Array.isArray(d.logicChain))logicChain=d.logicChain.filter(id=>logicTiles.some(t=>t.id===id)).slice(0,12);
}
function renderLogicBank(){
  $('logicBank').innerHTML=logicTiles.map(t=>`<button type="button" class="logic-tile" data-tile="${t.id}" role="listitem" aria-label="Add ${t.label} tile"><strong>${escapeHtml(t.label)}</strong><small>${escapeHtml(t.hint)}</small></button>`).join('');
}
function renderLogicChain(){
  const box=$('logicChain');
  if(!logicChain.length){
    box.innerHTML='<p class="empty">Empty chain — start with IF, ONLY IF, UNLESS, SOME, MOST, or ALL.</p>';
  }else{
    box.innerHTML=logicChain.map((id,i)=>{
      const t=logicTiles.find(x=>x.id===id);
      return `<button type="button" class="logic-tile on-chain" data-index="${i}" aria-label="Remove ${t.label}"><strong>${escapeHtml(t.label)}</strong><small>tap to remove</small></button>`;
    }).join('<span class="logic-arrow" aria-hidden="true">→</span>');
  }
  $('logicPlain').textContent=logicMeaning(logicChain);
}
function renderLogicPrint(){
  $('logicPrintGrid').innerHTML=logicTiles.map(t=>`<article class="logic-print-tile"><strong>${escapeHtml(t.label)}</strong><span>${escapeHtml(t.plain)}</span><small>${escapeHtml(t.hint)}</small></article>`).join('');
}
$('logicBank').addEventListener('click',e=>{
  const btn=e.target.closest('[data-tile]');
  if(!btn)return;
  if(logicChain.length>=12){toast('Chain is full — remove a tile first');return}
  logicChain.push(btn.dataset.tile);
  renderLogicChain();
  saveLogicChain();
});
$('logicChain').addEventListener('click',e=>{
  const btn=e.target.closest('[data-index]');
  if(!btn)return;
  logicChain.splice(+btn.dataset.index,1);
  renderLogicChain();
  saveLogicChain();
});
$('clearLogicChain').onclick=()=>{logicChain=[];renderLogicChain();saveLogicChain();toast('Logic chain cleared')};
$('printLogicTiles').onclick=()=>printSection('logicTiles');
restoreLogicChain();
renderLogicBank();
renderLogicChain();
renderLogicPrint();


let pCount=4;
function renderParagraphs(){
  const box=$('paragraphs');
  const existing=[...box.querySelectorAll('input')].map(x=>x.value);
  box.innerHTML='';
  for(let i=0;i<pCount;i++){
    const d=document.createElement('div');
    d.className='paragraph-card';
    const label=document.createElement('label');
    label.textContent='What job does this paragraph perform?';
    const strong=document.createElement('strong');
    strong.textContent=`P${i+1}`;
    const input=document.createElement('input');
    input.placeholder='e.g., OLD VIEW → PROBLEM';
    input.setAttribute('aria-label',`Paragraph ${i+1} role`);
    input.dataset.write=`paragraphRole${i}`;
    input.value=existing[i]||'';
    label.appendChild(input);
    d.append(strong,label);
    box.appendChild(d);
  }
}
$('addParagraph').onclick=()=>{if(pCount<8){pCount++;renderParagraphs();saveDraft()}};
$('removeParagraph').onclick=()=>{if(pCount>1){pCount--;renderParagraphs();saveDraft()}};
renderParagraphs();

preflightFields.forEach(([id,name,hint])=>{
  const l=document.createElement('label');
  l.innerHTML=`<b>${name}</b><span>${hint}</span>`;
  const t=document.createElement('textarea');
  t.id=id;
  t.placeholder=hint;
  l.appendChild(t);
  $('writingPreflightGrid').appendChild(l);
});
function renderProgressBoard(){
  $('progressBoardGrid').innerHTML=progressSkills.map(([id,label])=>{
    const options=progressStages.map(stage=>`<label class="stage-option"><input type="radio" name="progress-${id}" value="${stage}" ${stage==='learning'?'checked':''}/><span>${progressStageLabels[stage]}</span></label>`).join('');
    return `<div class="progress-row"><p class="progress-skill">${escapeHtml(label)}</p><div class="stage-options" role="radiogroup" aria-label="${escapeHtml(label)} stage">${options}</div></div>`;
  }).join('');
}
renderProgressBoard();
$('progressBoardGrid').addEventListener('change',e=>{if(e.target.matches('input[type=radio]'))saveDraft()});
$('clearWritingPreflight').onclick=()=>{
  preflightFields.forEach(([id])=>{const el=$(id);if(el)el.value=''});
  saveDraft();
  toast('Writing preflight cleared');
};
$('printWritingPreflight').onclick=()=>printSection('writingPreflight');
$('printProgressBoard').onclick=()=>printSection('progressBoard');

document.addEventListener('input',e=>{if(e.target.matches('textarea,input,[data-write],select'))saveDraft()});
document.addEventListener('change',e=>{if(e.target.matches('select'))saveDraft()});
restoreDraft();

$('clearAutopsy').onclick=()=>{
  autopsyFields.forEach(id=>{const el=$(id);if(el)el.value=''});
  saveDraft();
  toast('Argument worksheet cleared');
};
$('proofButton').onclick=()=>toast('Facts first. Did the stimulus actually say it?');
const PRACTICE_QUEUES_KEY='lsat-practice-queues';
const practice={
  active:false,total:1,index:0,timing:'untimed',reviewMode:'off',
  comparePass:null,compareBaseline:[],startedAt:0,timerId:null,results:[]
};
let pendingPracticeEntry=null;

function practiceStorageKey(){return 'lsat-practice-session'}
function practicePersistable(){
  return {
    active:practice.active,total:practice.total,index:practice.index,timing:practice.timing,
    reviewMode:practice.reviewMode,comparePass:practice.comparePass,compareBaseline:practice.compareBaseline,
    startedAt:practice.startedAt,results:practice.results
  };
}
function savePractice(){localStorage.setItem(practiceStorageKey(),JSON.stringify(practicePersistable()))}
function loadPractice(){
  try{return JSON.parse(localStorage.getItem(practiceStorageKey())||'null')}catch(e){return null}
}
function loadPracticeQueues(){
  try{
    const data=JSON.parse(localStorage.getItem(PRACTICE_QUEUES_KEY)||'{}');
    return {flags:Array.isArray(data.flags)?data.flags:[],misses:Array.isArray(data.misses)?data.misses:[]};
  }catch(e){return {flags:[],misses:[]}}
}
function savePracticeQueues(queues){localStorage.setItem(PRACTICE_QUEUES_KEY,JSON.stringify(queues))}
function addToPracticeQueue(kind,entry){
  const queues=loadPracticeQueues();
  const list=kind==='flag'?queues.flags:queues.misses;
  list.unshift({...entry,id:`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,savedAt:new Date().toISOString()});
  if(list.length>40)list.length=40;
  savePracticeQueues(queues);
  renderPracticeQueues();
}
function clearPracticeQueue(kind){
  const queues=loadPracticeQueues();
  if(kind==='flag')queues.flags=[]; else queues.misses=[];
  savePracticeQueues(queues);
  renderPracticeQueues();
  toast(kind==='flag'?'Flag queue cleared.':'Miss queue cleared.');
}
function queueItemHTML(item,kind){
  const label=escapeHtml(item.label||'Unlabeled');
  const miss=item.miss?` · ${escapeHtml(missLabels[item.miss]||item.miss)}`:'';
  const note=escapeHtml(item.note||item.blindNote||'No note');
  const when=escapeHtml((item.savedAt||'').slice(0,10));
  const pass=item.pass?` · ${escapeHtml(item.pass)}`:'';
  return `<article class="queue-item"><p><strong>${label}</strong> · Q${item.q} · ${escapeHtml(item.result||'')}${kind==='flag'?' ⚑':''}${miss}${pass}</p><p class="hint">${note} · ${when}</p></article>`;
}
function renderPracticeQueues(){
  const queues=loadPracticeQueues();
  const flagEl=$('flagQueueList');
  const missEl=$('missQueueList');
  if(flagEl)flagEl.innerHTML=queues.flags.length?queues.flags.map(i=>queueItemHTML(i,'flag')).join(''):'<p class="hint">No flagged questions yet.</p>';
  if(missEl)missEl.innerHTML=queues.misses.length?queues.misses.map(i=>queueItemHTML(i,'miss')).join(''):'<p class="hint">No misses logged from practice yet.</p>';
  renderMissPatterns();
}

function clearPracticeTimer(){if(practice.timerId){clearInterval(practice.timerId);practice.timerId=null}}
function formatMMSS(ms){
  const s=Math.max(0,Math.floor(ms/1000));
  const m=Math.floor(s/60); const r=s%60;
  return `${m}:${String(r).padStart(2,'0')}`;
}
function effectiveTimed(){
  return practice.timing==='timed'||(practice.timing==='compare'&&practice.comparePass==='timed');
}
function updatePracticeTimer(){
  const el=$('practiceTimer');
  if(!el)return;
  if(!effectiveTimed()){
    el.textContent=practice.timing==='compare'?(practice.comparePass==='timed'?'Compare · timed':'Compare · untimed'):'Untimed';
    el.classList.remove('over');
    return;
  }
  const elapsed=Date.now()-practice.startedAt;
  const budget=practice.total*90*1000;
  const remaining=budget-elapsed;
  el.textContent=remaining>=0?`Time left ${formatMMSS(remaining)}`:`Over by ${formatMMSS(-remaining)}`;
  el.classList.toggle('over', remaining<0);
}
function showPracticeView(which){
  $('practiceIdle').hidden=which!=='idle';
  $('practiceIdleControls').hidden=which!=='idle';
  $('practiceActive').hidden=which!=='active';
  $('practiceSummary').hidden=which!=='summary';
  if(which!=='active')hideBlindReview();
}
function hideBlindReview(){
  pendingPracticeEntry=null;
  if($('practiceBlindReview'))$('practiceBlindReview').hidden=true;
  if($('practiceActiveForm'))$('practiceActiveForm').hidden=false;
  if($('practiceActiveActions'))$('practiceActiveActions').hidden=false;
}
function showBlindReview(entry){
  pendingPracticeEntry=entry;
  if($('practiceActiveForm'))$('practiceActiveForm').hidden=true;
  if($('practiceActiveActions'))$('practiceActiveActions').hidden=true;
  if($('practiceBlindReview'))$('practiceBlindReview').hidden=false;
  document.querySelectorAll('#practiceBlindChecklist input[type=checkbox]').forEach(c=>c.checked=false);
  $('practiceBlindNote').value='';
  $('practiceBlindPrompt').textContent=entry.result==='unsure'
    ?'Blind review (flagged): justify without looking at the credited answer first.'
    :'Blind review (miss): justify without looking at the credited answer first.';
}
function resetPracticeForm(){
  hideBlindReview();
  document.querySelectorAll('#practiceChecklist input[type=checkbox]').forEach(c=>c.checked=false);
  $('practiceResult').value='';
  $('practiceMiss').value='';
  $('practiceNote').value='';
}
function renderPracticeProgress(){
  const pass=
    practice.timing==='compare'
      ?(practice.comparePass==='timed'?' · compare timed pass':' · compare untimed pass')
      :(practice.timing==='timed'?' · timed':' · untimed');
  $('practiceProgress').textContent=`Question ${practice.index+1} of ${practice.total}${pass}`;
  updatePracticeTimer();
}
function startPracticeTimerIfNeeded(){
  clearPracticeTimer();
  practice.startedAt=Date.now();
  if(effectiveTimed())practice.timerId=setInterval(updatePracticeTimer,1000);
}
function startPracticeSession(){
  clearPracticeTimer();
  const timing=$('practiceTiming').value||'untimed';
  practice.active=true;
  practice.total=Math.max(1, Math.min(5, +$('practiceMode').value||1));
  practice.index=0;
  practice.timing=['untimed','timed','compare'].includes(timing)?timing:'untimed';
  practice.reviewMode=$('practiceReviewMode')?.value==='after'?'after':'off';
  practice.comparePass=practice.timing==='compare'?'untimed':null;
  practice.compareBaseline=[];
  practice.results=[];
  resetPracticeForm();
  startPracticeTimerIfNeeded();
  showPracticeView('active');
  renderPracticeProgress();
  savePractice();
  document.getElementById('practiceSession').scrollIntoView({behavior:'smooth'});
  const hint=practice.timing==='compare'?' (untimed pass first)':'';
  toast(practice.total===1?`One-question session started${hint}`:`Five-question mini-set started${hint}`);
}
function startCompareTimedPass(){
  if(practice.timing!=='compare'||practice.comparePass!=='untimed')return;
  practice.compareBaseline=practice.results.slice();
  practice.comparePass='timed';
  practice.results=[];
  practice.index=0;
  practice.active=true;
  resetPracticeForm();
  startPracticeTimerIfNeeded();
  showPracticeView('active');
  renderPracticeProgress();
  savePractice();
  if($('startComparePass'))$('startComparePass').hidden=true;
  toast('Timed compare pass started — same questions, clock pressure.');
}
function endPracticeSession(showSummary=true){
  clearPracticeTimer();
  practice.active=false;
  hideBlindReview();
  savePractice();
  if(showSummary){
    renderPracticeSummary();
    showPracticeView('summary');
  }else{
    if($('startComparePass'))$('startComparePass').hidden=true;
    showPracticeView('idle');
  }
}
function renderPracticeSummary(){
  const res=practice.results;
  const correct=res.filter(r=>r.result==='correct').length;
  const wrong=res.filter(r=>r.result==='wrong').length;
  const unsure=res.filter(r=>r.result==='unsure').length;
  const missCounts={};
  res.forEach(r=>{if(r.miss)missCounts[r.miss]=(missCounts[r.miss]||0)+1});
  const missHtml=Object.keys(missCounts).length
    ? `<ul>${Object.entries(missCounts).map(([k,v])=>`<li><strong>${escapeHtml(missLabels[k]||k)}</strong>: ${v}</li>`).join('')}</ul>`
    : '<p>No miss-type tags logged.</p>';
  const focus=Object.entries(missCounts).sort((a,b)=>b[1]-a[1])[0];
  const focusText=focus?`Next focus: ${missLabels[focus[0]]||focus[0]}.`:'Next focus: keep externalizing JOB → GAP before answer choices.';
  const passLabel=practice.timing==='compare'
    ?(practice.comparePass==='timed'?'Compare · timed pass':'Compare · untimed pass')
    :practice.timing;
  let compareHtml='';
  const showCompareBtn=practice.timing==='compare'&&practice.comparePass==='untimed';
  if(showCompareBtn){
    compareHtml='<p class="hint">Next: same questions under timed pressure. Compare accuracy, not just speed.</p>';
  }else if(practice.timing==='compare'&&practice.comparePass==='timed'){
    const prior=practice.compareBaseline||[];
    const priorCorrect=prior.filter(r=>r.result==='correct').length;
    compareHtml=`<p><strong>Compare:</strong> untimed ${priorCorrect}/${practice.total} → timed ${correct}/${practice.total}. Where timed dropped, mark for crawl autopsy.</p>`;
  }
  $('practiceSummaryBody').innerHTML=`
    <p><strong>Completed:</strong> ${res.length} / ${practice.total} · ${escapeHtml(passLabel)}</p>
    <p><strong>Correct:</strong> ${correct} · <strong>Wrong:</strong> ${wrong} · <strong>Flagged:</strong> ${unsure}</p>
    <div><p class="eyebrow">Miss patterns</p>${missHtml}</div>
    ${compareHtml}
    <p>${escapeHtml(focusText)}</p>
    <p class="hint">Accuracy first. Speed only after the process is repeatable. Flagged/missed items stay in Review Queues below. See <a href="#missPatterns">Miss Pattern Board</a> for your top focus.</p>`;
  if($('startComparePass'))$('startComparePass').hidden=!showCompareBtn;
  renderMissPatterns();
}
function enqueueFromEntry(entry){
  const pass=practice.timing==='compare'?(practice.comparePass||'untimed'):practice.timing;
  const base={label:entry.label,q:entry.q,result:entry.result,miss:entry.miss,note:entry.note,blindNote:entry.blindNote||'',pass};
  if(entry.result==='unsure')addToPracticeQueue('flag',base);
  if(entry.result==='wrong')addToPracticeQueue('miss',base);
}
function commitPracticeEntry(entry){
  enqueueFromEntry(entry);
  practice.results.push(entry);
  if(practice.index+1>=practice.total){
    endPracticeSession(true);
    toast('Session complete');
    return;
  }
  practice.index+=1;
  resetPracticeForm();
  renderPracticeProgress();
  savePractice();
  toast(`Question ${practice.index+1} of ${practice.total}`);
}
function completeCurrentPracticeQ(flagged=false){
  if(!practice.active||pendingPracticeEntry)return;
  const result=flagged?'unsure':($('practiceResult').value||'');
  if(!result){toast('Choose a result first');return}
  const steps={};
  document.querySelectorAll('#practiceChecklist input[type=checkbox]').forEach(c=>{steps[c.dataset.step]=c.checked});
  const entry={
    q:practice.index+1,
    result,
    miss:$('practiceMiss').value||'',
    label:($('practiceLabel')?.value||'').trim(),
    note:$('practiceNote').value.trim(),
    blindNote:'',
    blindChecks:[],
    steps,
    at:new Date().toISOString()
  };
  const needsBlind=practice.reviewMode==='after'&&(entry.result==='wrong'||entry.result==='unsure');
  if(needsBlind){showBlindReview(entry);return}
  commitPracticeEntry(entry);
}
function confirmBlindReview(){
  if(!pendingPracticeEntry)return;
  pendingPracticeEntry.blindNote=($('practiceBlindNote')?.value||'').trim();
  pendingPracticeEntry.blindChecks=Array.from(document.querySelectorAll('#practiceBlindChecklist input[type=checkbox]'))
    .filter(c=>c.checked).map(c=>c.dataset.blind||'');
  const entry=pendingPracticeEntry;
  hideBlindReview();
  commitPracticeEntry(entry);
}
function cancelBlindReview(){
  hideBlindReview();
  toast('Blind review canceled — adjust result or continue.');
}
function on(id,fn){const el=$(id);if(el)el.addEventListener('click',fn)}
function bindStartPractice(){
  const btn=$('startPractice');
  if(!btn)return;
  btn.addEventListener('click',e=>{e.preventDefault();startPracticeSession()});
}
bindStartPractice();
document.getElementById('practiceSession')?.addEventListener('click',e=>{
  if(e.target.closest('#startPractice')){e.preventDefault();startPracticeSession()}
});
on('endPractice',()=>{if(confirm('End this practice session?'))endPracticeSession(true)});
on('completePracticeQ',()=>completeCurrentPracticeQ(false));
on('flagPractice',()=>completeCurrentPracticeQ(true));
on('confirmBlindReview',confirmBlindReview);
on('cancelBlindReview',cancelBlindReview);
on('startComparePass',startCompareTimedPass);
on('clearFlagQueue',()=>clearPracticeQueue('flag'));
on('clearMissQueue',()=>clearPracticeQueue('miss'));
on('openAutopsy',()=>{document.getElementById('framework').scrollIntoView({behavior:'smooth'});$('job').focus()});
on('restartPractice',()=>{
  practice.active=false;practice.results=[];practice.compareBaseline=[];practice.comparePass=null;
  clearPracticeTimer();hideBlindReview();savePractice();
  if($('startComparePass'))$('startComparePass').hidden=true;
  showPracticeView('idle');
});
on('oneQuestion',()=>{ $('practiceMode').value='1'; startPracticeSession(); });
on('fiveQuestion',()=>{ $('practiceMode').value='5'; startPracticeSession(); });
window.startPracticeSession=startPracticeSession;

(function resumePractice(){
  renderPracticeQueues();
  const saved=loadPractice();
  if(!saved){showPracticeView('idle');return}
  Object.assign(practice,{
    comparePass:null,compareBaseline:[],reviewMode:'off',...saved,timerId:null
  });
  if(saved.active){
    showPracticeView('active');
    renderPracticeProgress();
    if(effectiveTimed()){
      // Keep original startedAt so the clock continues across refresh
      practice.timerId=setInterval(updatePracticeTimer,1000);
      updatePracticeTimer();
    }
    return;
  }
  if(saved.results&&saved.results.length){
    renderPracticeSummary();
    showPracticeView('summary');
  }else showPracticeView('idle');
})();

function studyCardHTML(card){
  return `<article class="study-card"><p class="eyebrow">${escapeHtml(card.kind)}</p><h3>${escapeHtml(card.title)}</h3>${card.body}</article>`;
}
function buildStudyCards(deck){
  if(deck==='jobs')return jobs.map(j=>({kind:'JOB',title:j.name,body:`<p><strong>Stem cue:</strong> ${escapeHtml(j.stem)}</p><p><strong>JOB:</strong> ${escapeHtml(j.job)}</p><p><strong>Ask:</strong> ${escapeHtml(j.check)}</p>`}));
  if(deck==='traps')return traps.map(t=>({kind:'TRAP',title:t.name,body:`<p><strong>Looks like:</strong> ${escapeHtml(t.looks)}</p><p><strong>Why tempting:</strong> ${escapeHtml(t.tempting)}</p><p><strong>Ask:</strong> ${escapeHtml(t.ask)}</p>`}));
  if(deck==='translations')return translations.map(t=>({kind:'TRANSLATION',title:t.term,body:`<p><strong>Plain:</strong> ${escapeHtml(t.plain)}</p><p><strong>Compact:</strong> ${escapeHtml(t.symbol)}</p><p><strong>Watch:</strong> ${escapeHtml(t.watch)}</p>`}));
  if(deck==='logic')return logicTiles.map(t=>({kind:'LOGIC TILE',title:t.label,body:`<p>${escapeHtml(t.plain)}</p><p><strong>Hint:</strong> ${escapeHtml(t.hint)}</p>`}));
  // mix: first 4 of each family truncated for a printable pack
  return [
    ...buildStudyCards('jobs').slice(0,4),
    ...buildStudyCards('traps').slice(0,4),
    ...buildStudyCards('translations').slice(0,4),
    ...buildStudyCards('logic').slice(0,4)
  ];
}
function renderStudyCards(){
  const deck=$('studyCardDeck').value||'jobs';
  const cards=buildStudyCards(deck);
  $('studyCardGrid').innerHTML=cards.map(studyCardHTML).join('');
}
$('studyCardDeck').addEventListener('change',renderStudyCards);
$('printStudyCards').onclick=()=>printSection('studyCards');
renderStudyCards();

function loadSessionFromAutopsy(){
  Object.entries(sheetFromAutopsy).forEach(([sheetId,srcId])=>{
    const src=$(srcId); const dest=$(sheetId);
    if(src&&dest)dest.value=src.value;
  });
  if($('sheetDate')&&!$('sheetDate').value.trim()){
    const phase=localStorage.getItem('lsat-phase')||'crawl';
    $('sheetDate').value=`${new Date().toLocaleDateString()} · ${phase}`;
  }
  saveDraft();
  toast('Session sheet loaded from Autopsy draft');
}
function clearSessionSheet(){
  sessionSheetFields.forEach(id=>{const el=$(id);if(el)el.value=''});
  saveDraft();
  toast('Session sheet cleared');
}
$('loadSessionFromAutopsy')?.addEventListener('click',loadSessionFromAutopsy);
$('clearSessionSheet')?.addEventListener('click',clearSessionSheet);
$('printSessionSheet')?.addEventListener('click',()=>printSection('sessionSheet'));
$('printSessionSheetQuick')?.addEventListener('click',()=>{
  document.getElementById('sessionSheet')?.scrollIntoView({behavior:'smooth'});
  printSection('sessionSheet');
});
$('printTestDayReset')?.addEventListener('click',()=>{
  updateTodayFocus();
  printSection('testDayReset');
});


function getLog(){return JSON.parse(localStorage.getItem('lsat-errors')||'[]')}
function renderLog(){
  const data=getLog();
  $('errorLog').innerHTML=data.length?data.map(x=>{
    const miss=x.missType&&missLabels[x.missType]?`<span class="miss-tag">${escapeHtml(missLabels[x.missType])}</span>`:'';
    return `<article class="error-item"><time>${escapeHtml(x.date||'')}</time>${miss}<p><strong>Fooled me:</strong> ${escapeHtml(x.fooled)}</p><p><strong>Why it was attractive:</strong> ${escapeHtml(x.attractive)}</p><p><strong>Overlooked:</strong> ${escapeHtml(x.overlooked)}</p><p><strong>Next-time rule:</strong> ${escapeHtml(x.rule)}</p></article>`;
  }).join(''):'<p class="empty">No mistakes logged yet. That is not the goal forever — mistakes become rules here.</p>';
  renderMissPatterns();
}
$('saveMistake').onclick=()=>{
  if(!$('fooled').value.trim()&&!$('nextRule').value.trim()){toast('Write what fooled you or a next-time rule');return}
  const log=getLog();
  log.unshift({
    date:new Date().toLocaleDateString(),
    at:new Date().toISOString(),
    fooled:$('fooled').value,
    attractive:$('attractive').value,
    overlooked:$('overlooked').value,
    missType:$('missType').value,
    rule:$('nextRule').value
  });
  localStorage.setItem('lsat-errors',JSON.stringify(log.slice(0,50)));
  ['fooled','attractive','overlooked','nextRule'].forEach(id=>$(id).value='');
  $('missType').value='';
  saveDraft();
  renderLog();
  toast('Mistake converted into a rule');
};
$('clearLog').onclick=()=>{
  if(confirm('Clear your saved error log on this device?')){
    localStorage.removeItem('lsat-errors');
    renderLog();
    toast('Error log cleared');
  }
};

function exportStudyData(){
  const payload={
    version:1,
    exportedAt:new Date().toISOString(),
    phase:localStorage.getItem('lsat-phase')||'crawl',
    draft:JSON.parse(localStorage.getItem('lsat-draft')||'{}'),
    errors:getLog(),
    practice:loadPractice(),
    practiceQueues:loadPracticeQueues()
  };
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download=`lsat-crawl-walk-run-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  toast('Study data exported');
}
function importStudyData(file){
  const reader=new FileReader();
  reader.onload=()=>{
    try{
      const data=JSON.parse(reader.result);
      if(!data||typeof data!=='object')throw new Error('Invalid file');
      if(data.draft&&typeof data.draft==='object')localStorage.setItem('lsat-draft',JSON.stringify(data.draft));
      if(Array.isArray(data.errors))localStorage.setItem('lsat-errors',JSON.stringify(data.errors.slice(0,50)));
      if(data.practice&&typeof data.practice==='object')localStorage.setItem(practiceStorageKey(),JSON.stringify(data.practice));
      if(data.practiceQueues&&typeof data.practiceQueues==='object')savePracticeQueues({
        flags:Array.isArray(data.practiceQueues.flags)?data.practiceQueues.flags.slice(0,40):[],
        misses:Array.isArray(data.practiceQueues.misses)?data.practiceQueues.misses.slice(0,40):[]
      });
      if(typeof data.phase==='string'&&phases[data.phase])setPhase(data.phase);
      restoreDraft();
      renderLog();
      renderPracticeQueues();
      renderMissPatterns();
      toast('Study data imported');
    }catch(err){
      toast('Import failed — use a valid export file');
    }
  };
  reader.readAsText(file);
}
$('exportData').onclick=exportStudyData;
$('importData').onclick=()=>$('importFile').click();
$('importFile').addEventListener('change',e=>{
  const file=e.target.files&&e.target.files[0];
  if(file)importStudyData(file);
  e.target.value='';
});

/* ——— Monetization / Pro ——— */
function monetizeConfig(){
  return Object.assign({
    proPriceLabel:'$39',
    proPriceNote:'one-time · full LSAT cycle',
    proPaymentLink:'',
    unlockQueryParam:'pro',
    unlockQueryValue:'1',
    unlockCodes:['CRAWL-PRO'],
    tutoringUrl:'',
    tutoringLabel:'Book a Crawl → Walk session',
    b2bEmail:'',
    b2bSubject:'Tutor / program license — LSAT Crawl Walk Run',
    affiliates:[]
  }, window.LSAT_MONETIZE||{});
}
function isPro(){return localStorage.getItem("lsat-pro-unlocked")==='1'}
function setPro(on){
  if(on)localStorage.setItem("lsat-pro-unlocked","1");
  else localStorage.removeItem("lsat-pro-unlocked");
  applyProUi();
}
function normalizeCode(s){return String(s||'').trim().toUpperCase().replace(/\s+/g,'')}
function codesList(cfg){
  const raw=cfg.unlockCodes;
  if(Array.isArray(raw))return raw.map(normalizeCode).filter(Boolean);
  return String(raw||'').split(',').map(normalizeCode).filter(Boolean);
}
function unlockProFromCode(code){
  const cfg=monetizeConfig();
  const ok=codesList(cfg).includes(normalizeCode(code));
  if(!ok){toast('That unlock code was not recognized');return false}
  setPro(true);
  toast('Pro unlocked on this device');
  return true;
}
function captureProReturn(){
  const cfg=monetizeConfig();
  const params=new URLSearchParams(location.search);
  if(params.get(cfg.unlockQueryParam)===cfg.unlockQueryValue){
    setPro(true);
    toast('Welcome to Pro — kit + coach tools unlocked');
    params.delete(cfg.unlockQueryParam);
    const next=`${location.pathname}${params.toString()?`?${params}`:''}${location.hash||'#pricing'}`;
    history.replaceState({},'',next);
  }
}
function applyProUi(){
  const pro=isPro();
  const badge=$('proStatusBadge');
  if(badge)badge.hidden=!pro;
  const kit=$('proKit');
  if(kit)kit.hidden=!pro;
  const csv=$('exportMissCsv');
  if(csv)csv.hidden=!pro;
  const share=$('coachShare');
  if(share)share.hidden=!pro;
  const buy=$('buyPro');
  if(buy){
    buy.textContent=pro?'Pro unlocked':'Unlock Pro';
    if(pro){
      buy.href='#pricing';
      buy.setAttribute('aria-disabled','true');
    }
  }
  const hint=$('proCheckoutHint');
  if(hint)hint.hidden=pro||!!monetizeConfig().proPaymentLink;
  updateProKitFocus();
  const insightsHost=$('missPatternBars');
  if(insightsHost)renderProMissInsights(summarizeMissPatterns($('missPatternSource')?.value||'all'));
}
function updateProKitFocus(){
  const el=$('proKitFocus');
  if(!el)return;
  const summary=summarizeMissPatterns('all');
  if(!summary.total||!summary.top){
    el.textContent='Today’s focus: keep externalizing JOB → GAP before answer choices.';
    return;
  }
  const [topId]=summary.top;
  const coach=missCoaching[topId]||{};
  el.textContent=`Today’s focus: ${missLabels[topId]||topId} — ${coach.ask||'What is my job RIGHT NOW?'}`;
}
function renderProMissInsights(summary){
  let box=$('missProInsights');
  if(!isPro()||!summary||!summary.total){
    if(box)box.remove();
    return;
  }
  if(!box){
    box=document.createElement('div');
    box.id='missProInsights';
    box.className='miss-pro-insights';
    const bars=$('missPatternBars');
    if(bars&&bars.parentNode)bars.parentNode.insertBefore(box,bars);
    else return;
  }
  const rows=summary.ranked.map(([id,count])=>{
    const src=summary.bySource[id]||{errorLog:0,practice:0};
    const pct=Math.round((count/summary.total)*100);
    return `<tr><th scope="row">${escapeHtml(missLabels[id]||id)}</th><td>${count}</td><td>${pct}%</td><td>${src.errorLog}</td><td>${src.practice}</td></tr>`;
  }).join('');
  box.innerHTML=`
    <p class="eyebrow">Pro analytics</p>
    <h3>Source breakdown</h3>
    <table>
      <thead><tr><th>Miss type</th><th>Total</th><th>%</th><th>Error log</th><th>Practice</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`;
}
function exportMissCsv(){
  if(!isPro()){toast('Pro unlock required for CSV export');return}
  const summary=summarizeMissPatterns($('missPatternSource')?.value||'all');
  const lines=[['miss_type','label','total','error_log','practice']];
  summary.ranked.forEach(([id,count])=>{
    const src=summary.bySource[id]||{errorLog:0,practice:0};
    lines.push([id,missLabels[id]||id,count,src.errorLog,src.practice]);
  });
  const csv=lines.map(row=>row.map(cell=>{
    const s=String(cell);
    return /[",\n]/.test(s)?`"${s.replace(/"/g,'""')}"`:s;
  }).join(',')).join('\n');
  const blob=new Blob([csv],{type:'text/csv'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download=`lsat-miss-patterns-${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
  toast('Miss pattern CSV downloaded');
}
async function coachShareSnapshot(){
  if(!isPro()){toast('Pro unlock required for coach share');return}
  const payload={
    exportedAt:new Date().toISOString(),
    phase:localStorage.getItem('lsat-phase')||'crawl',
    errors:getLog(),
    practiceQueues:loadPracticeQueues(),
    missSummary:summarizeMissPatterns('all'),
    draft:JSON.parse(localStorage.getItem('lsat-draft')||'{}')
  };
  const text=JSON.stringify(payload,null,2);
  try{
    if(navigator.clipboard?.writeText){
      await navigator.clipboard.writeText(text);
      toast('Coach snapshot copied — paste into email or notes');
      return;
    }
  }catch(e){}
  const blob=new Blob([text],{type:'application/json'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download=`lsat-coach-share-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  toast('Coach snapshot downloaded');
}
function revealUnlockPanel(){
  const panel=document.querySelector('.unlock-panel');
  if(panel){
    panel.open=true;
    panel.scrollIntoView({behavior:'smooth'});
  }
  $('proUnlockInput')?.focus();
}
function wireMonetize(){
  const cfg=monetizeConfig();
  if($('proPriceLabel'))$('proPriceLabel').textContent=cfg.proPriceLabel;
  if($('proPriceNote'))$('proPriceNote').textContent=cfg.proPriceNote;

  const buy=$('buyPro');
  if(buy){
    if(cfg.proPaymentLink){
      buy.href=cfg.proPaymentLink;
      buy.target='_blank';
      buy.rel='noopener noreferrer';
      buy.addEventListener('click',e=>{
        if(isPro()){e.preventDefault();applyProUi();return}
        toast('Opening secure checkout…');
      });
    }else{
      buy.href='#pricing';
      buy.addEventListener('click',e=>{
        e.preventDefault();
        if(isPro())return;
        revealUnlockPanel();
        toast('Add your Stripe Payment Link in monetize-config.js, or enter an unlock code');
      });
    }
  }

  window.addEventListener('storage',e=>{
    if(e.key==='lsat-pro-unlocked')applyProUi();
  });

  $('restorePro')?.addEventListener('click',revealUnlockPanel);
  $('applyProUnlock')?.addEventListener('click',()=>unlockProFromCode($('proUnlockInput')?.value));
  $('proUnlockInput')?.addEventListener('keydown',e=>{
    if(e.key==='Enter'){e.preventDefault();unlockProFromCode($('proUnlockInput').value)}
  });

  const tutoring=$('tutoringCta');
  if(tutoring){
    if(cfg.tutoringUrl){
      tutoring.href=cfg.tutoringUrl;
      tutoring.target='_blank';
      tutoring.rel='noopener noreferrer';
      tutoring.textContent=cfg.tutoringLabel||'Book a session';
    }else{
      tutoring.href='#pricing';
      tutoring.textContent='Add Calendly / booking URL in config';
      tutoring.addEventListener('click',e=>{e.preventDefault();toast('Set tutoringUrl in monetize-config.js')});
    }
  }

  const b2b=$('b2bCta');
  if(b2b){
    if(cfg.b2bEmail){
      b2b.href=`mailto:${encodeURIComponent(cfg.b2bEmail)}?subject=${encodeURIComponent(cfg.b2bSubject||'Tutor license')}`;
      b2b.textContent='Email for license info';
    }else{
      b2b.href='#pricing';
      b2b.textContent='Add b2bEmail in config';
      b2b.addEventListener('click',e=>{e.preventDefault();toast('Set b2bEmail in monetize-config.js')});
    }
  }

  const list=$('affiliateList');
  if(list){
    const items=cfg.affiliates||[];
    list.innerHTML=items.length
      ?items.map(a=>`<li><a href="${escapeHtml(a.url)}" target="_blank" rel="noopener noreferrer sponsored">${escapeHtml(a.name)}</a> — ${escapeHtml(a.note||'')}</li>`).join('')
      :'<li class="hint">Add companion links in monetize-config.js</li>';
  }

  $('printMethodGuide')?.addEventListener('click',()=>printSection('methodGuide'));
  $('printProKit')?.addEventListener('click',()=>{updateProKitFocus();printSection('proKit')});
  $('exportMissCsv')?.addEventListener('click',exportMissCsv);
  $('coachShare')?.addEventListener('click',coachShareSnapshot);

  captureProReturn();
  applyProUi();
}

renderLog();
initMissPatterns();
wireMonetize();
