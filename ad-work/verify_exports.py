import sys,re,json,subprocess,hashlib,math
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
ROOT=Path(__file__).parent;sys.path.insert(0,str(ROOT/'toolkit'))
import imageio_ffmpeg
FF=imageio_ffmpeg.get_ffmpeg_exe();OUT=ROOT/'deliverables'
checks=[]
for label,dur in [('A',30),('B',15)]:
    f=OUT/f'AI-Creator-Kit-Version-{label}-{dur}s.mp4'
    log=subprocess.run([FF,'-hide_banner','-i',str(f),'-af','ebur128=peak=true:framelog=verbose','-f','null','NUL'],capture_output=True,text=True)
    if log.returncode:raise RuntimeError(log.stderr)
    head=log.stderr.split('Stream mapping:')[0]
    if '1080x1920' not in head or '30 fps' not in head or f'00:00:{dur:02d}.00' not in head:raise RuntimeError(head)
    summary=log.stderr.split('Summary:')[-1].split('[out#')[0].strip()
    print(label,head,summary,flush=True)
    dest=ROOT/'inspection'/f'final-{label}';dest.mkdir(exist_ok=True)
    subprocess.run([FF,'-hide_banner','-loglevel','error','-y','-i',str(f),'-vf','fps=1,scale=216:384',str(dest/'%03d.jpg')],check=True)
    frames=sorted(dest.glob('*.jpg'));sheet=Image.new('RGB',(6*216,math.ceil(len(frames)/6)*410),'#11281e');d=ImageDraw.Draw(sheet);font=ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf',17)
    for i,p in enumerate(frames):
        x=i%6*216;y=i//6*410;sheet.paste(Image.open(p),(x,y+24));d.text((x+8,y+2),f'{i+.5:.1f}s',font=font,fill='white')
    sheet.save(OUT/f'Version-{label}-full-filmstrip.jpg',quality=95)
    checks.append({'version':label,'duration_seconds':dur,'size':[1080,1920],'fps':30,'full_decode':'passed','audio_summary':summary,'bytes':f.stat().st_size,'sha256':hashlib.sha256(f.read_bytes()).hexdigest()})
    edit=json.loads((OUT/f'Version-{label}-edit-map.json').read_text())
    def timestamp(t):
        ms=round(t*1000);return f'{ms//3600000:02d}:{ms//60000%60:02d}:{ms//1000%60:02d},{ms%1000:03d}'
    srt='\n\n'.join(f"{i+1}\n{timestamp(s['start'])} --> {timestamp(s['end'])}\n{s['caption']}" for i,s in enumerate(edit))
    (OUT/f'AI-Creator-Kit-Version-{label}-captions.srt').write_text(srt,encoding='utf-8')
(OUT/'Export-verification.json').write_text(json.dumps(checks,indent=2))
print('Final verification passed for both videos',flush=True)
