import sys, os, re, json, subprocess
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent/'toolkit'))
import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageFont
root=Path(__file__).parent
out=root/'inspection'; out.mkdir(exist_ok=True)
ff=imageio_ffmpeg.get_ffmpeg_exe()
files=sorted(Path(r'C:\Users\hp\Downloads').glob('Recording 2026-10-03*.mp4'))
font=ImageFont.truetype(r'C:\Windows\Fonts\segoeui.ttf',20)
meta=[]
for f in files:
    p=subprocess.run([ff,'-i',str(f)],capture_output=True,text=True)
    dur=re.search(r'Duration: (\d+):(\d+):(\d+\.\d+)',p.stderr)
    duration=int(dur[1])*3600+int(dur[2])*60+float(dur[3])
    dim=re.search(r'Video:.*?, (\d{3,5})x(\d{3,5})',p.stderr)
    label=f.stem.split()[-1]
    print(label,duration,dim.groups() if dim else None,flush=True)
    folder=out/label;folder.mkdir(exist_ok=True)
    step=5
    subprocess.run([ff,'-y','-i',str(f),'-vf',f'fps=1/{step},scale=640:-1','-q:v','3',str(folder/'%04d.jpg')],capture_output=True)
    frames=sorted(folder.glob('*.jpg'))
    for page in range(0,len(frames),24):
        sheet=Image.new('RGB',(1920,6*390),'#162a24');d=ImageDraw.Draw(sheet)
        for j,fr in enumerate(frames[page:page+24]):
            im=Image.open(fr);im.thumbnail((640,352))
            x=(j%3)*640;y=(j//3)*390
            sheet.paste(im,(x,y+32))
            d.text((x+8,y+4),f'{label} | {(page+j)*step+step/2:.1f}s',font=font,fill='white')
        sheet.save(out/f'{label}-sheet-{page//24+1}.jpg',quality=92)
    meta.append({'file':str(f),'label':label,'duration':duration,'dimensions':dim.groups() if dim else None,'audio':'Audio:' in p.stderr})
(out/'metadata.json').write_text(json.dumps(meta,indent=2))
print(ff,flush=True)
