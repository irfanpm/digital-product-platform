import re, json, hashlib, math
import revision_render as r
checks=[]
for label,dur,suffix in [('Main',31,''),('Short',15,'-15s')]:
    f=r.OUT/f'AI-Creator-Kit-Version-B-Performance-Ad{suffix}.mp4'
    decoded=r.subprocess.run([r.FF,'-hide_banner','-i',str(f),'-af','ebur128=peak=true:framelog=verbose','-f','null','NUL'],capture_output=True,text=True)
    if decoded.returncode:raise RuntimeError(decoded.stderr)
    head=decoded.stderr.split('Stream mapping:')[0]
    if '1080x1920' not in head or '30 fps' not in head or f'00:00:{dur:02d}.00' not in head:raise RuntimeError(head)
    counts=re.findall(r'frame=\s*(\d+)',decoded.stderr)
    if not counts or int(counts[-1])!=dur*30:raise RuntimeError('Unexpected frame count: '+str(counts))
    summary=decoded.stderr.split('Summary:')[-1].split('[out#')[0].strip()
    if 'clipping' in summary.lower():raise RuntimeError(summary)
    print(label,head,summary,flush=True)
    dest=r.CACHE/f'final-{label}';dest.mkdir(exist_ok=True)
    r.subprocess.run([r.FF,'-hide_banner','-loglevel','error','-y','-i',str(f),'-vf','fps=1,scale=270:480',str(dest/'%03d.jpg')],check=True)
    frames=sorted(dest.glob('*.jpg'))
    if len(frames)!=dur:raise RuntimeError('Missing review frames')
    sheet=r.Image.new('RGB',(6*270,math.ceil(len(frames)/6)*510),r.old.GREEN)
    for i,p in enumerate(frames):
        x=i%6*270;y=i//6*510
        sheet.paste(r.Image.open(p),(x,y+28))
        r.old.txt(r.ImageDraw.Draw(sheet),(x+8,y+2),f'{i+.5:.1f}s',21)
    sheet.save(r.OUT/f'{label}-full-filmstrip.jpg',quality=96)
    checks.append({'cut':label,'duration_seconds':dur,'dimensions':[1080,1920],'fps':30,'frames_decoded':int(counts[-1]),'full_decode':'passed','audio_summary':summary,'bytes':f.stat().st_size,'sha256':hashlib.sha256(f.read_bytes()).hexdigest()})
(r.OUT/'Export-verification.json').write_text(json.dumps(checks,indent=2))
print('Both exports fully decoded and verified.',flush=True)
