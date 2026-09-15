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
const missLabels={
  reasoning:'Reasoning',
  reading:'Reading',
  attention:'Attention',
  timing:'Timing',
  'question-job':'Question-job identification'
};
const $=id=>document.getElementById(id);
const fields=['job','given','conclusion','gap','target','credited','autopsyRule','mainPoint','viewAuthor','viewA','viewB','viewAgrees','viewDisagrees','viewWhy','viewAuthorMove','fooled','attractive','overlooked','nextRule','missType'];
const autopsyFields=['job','given','conclusion','gap','target','choiceA','choiceB','choiceC','choiceD','choiceE','credited','autopsyRule'];
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
  const d={paragraphCount:pCount};
  fields.forEach(id=>{if($(id))d[id]=$(id).value});
  document.querySelectorAll('[data-write]').forEach(x=>d[x.dataset.write]=x.value);
  localStorage.setItem('lsat-draft',JSON.stringify(d));
  clearTimeout(saveTimer);
  saveTimer=setTimeout(()=>setSaveState('saved'),180);
}
function restoreDraft(){
  const d=JSON.parse(localStorage.getItem('lsat-draft')||'{}');
  if(Number.isInteger(d.paragraphCount)&&d.paragraphCount>=1&&d.paragraphCount<=8){
    pCount=d.paragraphCount;
    renderParagraphs();
  }
  Object.entries(d).forEach(([id,v])=>{
    if(id==='paragraphCount')return;
    const el=$(id)||document.querySelector(`[data-write="${id}"]`);
    if(el)el.value=v;
  });
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

['ISSUE','CLAIM','SUPPORT 1','SUPPORT 2','OBJECTION','REPLY'].forEach((name,i)=>{
  const l=document.createElement('label');
  l.textContent=name;
  const t=document.createElement('textarea');
  t.dataset.write='write'+i;
  t.placeholder=i===4?'Strongest opposing argument':i===5?'What does it get right, and why does it not defeat me?':'';
  l.appendChild(t);
  $('writingGrid').appendChild(l);
});

document.addEventListener('input',e=>{if(e.target.matches('textarea,input,[data-write],select'))saveDraft()});
document.addEventListener('change',e=>{if(e.target.matches('select'))saveDraft()});
restoreDraft();

$('clearAutopsy').onclick=()=>{
  autopsyFields.forEach(id=>{const el=$(id);if(el)el.value=''});
  saveDraft();
  toast('Argument worksheet cleared');
};
$('proofButton').onclick=()=>toast('Facts first. Did the stimulus actually say it?');
$('oneQuestion').onclick=()=>{
  document.querySelector('.framework').scrollIntoView({behavior:'smooth'});
  $('job').focus();
  toast('One question. Accuracy first.');
};

function getLog(){return JSON.parse(localStorage.getItem('lsat-errors')||'[]')}
function renderLog(){
  const data=getLog();
  $('errorLog').innerHTML=data.length?data.map(x=>{
    const miss=x.missType&&missLabels[x.missType]?`<span class="miss-tag">${escapeHtml(missLabels[x.missType])}</span>`:'';
    return `<article class="error-item"><time>${escapeHtml(x.date||'')}</time>${miss}<p><strong>Fooled me:</strong> ${escapeHtml(x.fooled)}</p><p><strong>Why it was attractive:</strong> ${escapeHtml(x.attractive)}</p><p><strong>Overlooked:</strong> ${escapeHtml(x.overlooked)}</p><p><strong>Next-time rule:</strong> ${escapeHtml(x.rule)}</p></article>`;
  }).join(''):'<p class="empty">No mistakes logged yet. That is not the goal forever — mistakes become rules here.</p>';
}
$('saveMistake').onclick=()=>{
  if(!$('fooled').value.trim()&&!$('nextRule').value.trim()){toast('Write what fooled you or a next-time rule');return}
  const log=getLog();
  log.unshift({
    date:new Date().toLocaleDateString(),
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
    errors:getLog()
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
      if(typeof data.phase==='string'&&phases[data.phase])setPhase(data.phase);
      restoreDraft();
      renderLog();
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

renderLog();
