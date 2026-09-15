const phases={
  crawl:{title:'CRAWL: Learn the reasoning',text:'No speed pressure. Do one question carefully and explain why every answer is right or wrong.'},
  walk:{title:'WALK: Make it repeatable',text:'Use small timed sets. Separate reasoning mistakes from attention and timing mistakes.'},
  run:{title:'RUN: Perform under pressure',text:'Use realistic timing. Flag time sinks, reset between sections, then blind-review uncertainty.'}
};
const jobs=[
  ['Main conclusion','Find what the author is trying to prove.','Ask: Which claim are the other claims trying to support?'],
  ['Strengthen','Make the conclusion more likely.','Move the probability in the required direction; you do not need to prove it.'],
  ['Weaken','Make the conclusion less likely.','Attack the link between evidence and conclusion, not merely the topic.'],
  ['Necessary assumption','Find something the argument needs.','Negate the choice. If the reasoning collapses, it was necessary.'],
  ['Sufficient assumption','Find something strong enough to make the conclusion follow.','Bridge the premises to the conclusion completely.'],
  ['Flaw','Describe what went wrong in the reasoning.','Name the reasoning mistake; do not merely disagree.'],
  ['Inference / Must Be True','Prove the answer from the given information.','Do not improve the argument. Stay inside the text.'],
  ['Resolve / Explain','Make apparently conflicting facts fit together.','Look for a fact that allows both sides to be true.'],
  ['Principle','Identify or apply the governing rule.','Match the rule to the reasoning job, not just the topic.'],
  ['Parallel reasoning','Match the structure of the reasoning.','Abstract the form first; subject matter is a distraction.']
];
const traps=[
  ['True but irrelevant','The choice may be factually plausible but does not do the JOB.','Does this change what I was asked about?'],
  ['Too strong','The choice says ALL, NEVER, MUST, or PROVES when the stimulus supports less.','Did the answer outrun the evidence?'],
  ['Outside scope','The choice needs a fact or issue the stimulus never gave you.','Where does it say that?'],
  ['Wrong target','The choice affects something nearby but not the actual conclusion.','What exactly is the conclusion?'],
  ['Reversal','The answer flips a relationship, condition, comparison, or cause.','Did the arrow get turned around?'],
  ['Premise restatement','The choice repeats evidence but does not repair or attack the gap.','Does this actually change the evidence → conclusion link?'],
  ['Interesting ≠ relevant','Your brain found a fascinating implication. The LSAT asked a narrower question.','What is my job RIGHT NOW?']
];
const missLabels={
  reasoning:'Reasoning',
  reading:'Reading',
  attention:'Attention',
  timing:'Timing',
  'question-job':'Question-job identification'
};
const $=id=>document.getElementById(id);
const fields=['job','given','conclusion','gap','target','credited','autopsyRule','mainPoint','fooled','attractive','overlooked','nextRule','missType'];
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

jobs.forEach(([name])=>{const o=document.createElement('option');o.textContent=name;$('questionType').appendChild(o)});
function showJob(){
  const [name,job,check]=jobs[$('questionType').selectedIndex];
  $('jobCard').innerHTML=`<h3>${name}</h3><p><strong>JOB:</strong> ${job}</p><p><strong>Checkpoint:</strong> ${check}</p>`;
}
$('questionType').addEventListener('change',showJob);showJob();

let trapIndex=0;
function showTrap(){
  const [name,why,check]=traps[trapIndex];
  $('trapCard').innerHTML=`<p class="eyebrow">Trap ${trapIndex+1} of ${traps.length}</p><h3>${name}</h3><p>${why}</p><p><strong>Ask:</strong> ${check}</p>`;
}
$('nextTrap').onclick=()=>{trapIndex=(trapIndex+1)%traps.length;showTrap()};
$('prevTrap').onclick=()=>{trapIndex=(trapIndex-1+traps.length)%traps.length;showTrap()};
showTrap();

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
