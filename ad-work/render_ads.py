import sys, math, json, subprocess, wave, re
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps
ROOT=Path(__file__).parent
sys.path.insert(0,str(ROOT/'toolkit'))
import imageio_ffmpeg
FF=imageio_ffmpeg.get_ffmpeg_exe()
OUT=ROOT/'deliverables';OUT.mkdir(exist_ok=True)
CACHE=ROOT/'render-cache';CACHE.mkdir(exist_ok=True)
W,H,FPS=1080,1920,30
CREAM='#f7f3e8';MINT='#b7d4b3';GREEN='#123b30';GOLD='#f4cd83'
FONTS={}
def font(size,bold=False,serif=False):
    key=size,bold,serif
    if key not in FONTS:FONTS[key]=ImageFont.truetype('C:/Windows/Fonts/'+('georgia.ttf' if serif else 'segoeuib.ttf' if bold else 'segoeui.ttf'),size)
    return FONTS[key]
def txt(draw,xy,text,size=48,fill=CREAM,bold=False,serif=False,anchor=None):
    draw.text(xy,text,font=font(size,bold,serif),fill=fill,anchor=anchor,spacing=5)
def centered(draw,y,text,size=46,fill=CREAM,bold=False):
    txt(draw,(510,y),text,size,fill,bold,anchor='mt')
def mark(im,x,y,size):
    d=ImageDraw.Draw(im);d.rounded_rectangle((x,y,x+size,y+size),radius=size*.27,fill=GOLD)
    pts=[(23,10),(27,20),(37,24),(27,28),(23,38),(19,28),(9,24),(19,20)]
    d.polygon([(x+a/48*size,y+b/48*size) for a,b in pts],fill=GREEN)
    d.line((x+36/48*size,y+7/48*size,x+36/48*size,y+15/48*size),fill=GREEN,width=max(2,int(size/24)))
    d.line((x+32/48*size,y+11/48*size,x+40/48*size,y+11/48*size),fill=GREEN,width=max(2,int(size/24)))
def make_bg():
    y,x=np.mgrid[0:H,0:W]
    halo=np.exp(-(((x-730)/950)**2+((y-860)/930)**2))*1.0
    base=np.array([10,29,24]);col=base[None,None,:]+halo[:,:,None]*np.array([11,35,26])
    rng=np.random.default_rng(22);col+=rng.normal(0,.4,(H,W,1))
    return Image.fromarray(np.uint8(np.clip(col,0,255)))
BG=make_bg()
MASK=Image.new('L',(864,768),0);ImageDraw.Draw(MASK).rounded_rectangle((0,-28,863,767),28,fill=255)
WINDOW_SHADOW=Image.new('RGBA',(W,H));ImageDraw.Draw(WINDOW_SHADOW).rounded_rectangle((72,527,948,1336),36,fill=(0,0,0,95));WINDOW_SHADOW=WINDOW_SHADOW.filter(ImageFilter.GaussianBlur(20))
def shadow(im,box):
    lay=Image.new('RGBA',(W,H));d=ImageDraw.Draw(lay);d.rounded_rectangle(box,36,fill=(0,0,0,95));im.paste(lay.filter(ImageFilter.GaussianBlur(20)),(0,0),lay.filter(ImageFilter.GaussianBlur(20)))
def base(step,total):
    im=BG.copy();d=ImageDraw.Draw(im)
    mark(im,84,180,43);txt(d,(143,183),'AI CREATOR KIT',27,MINT,True)
    txt(d,(84,1546),'YOUR IDEA. YOUR NEXT STEP.',22,'#8fae9b')
    for i in range(total):
        a=84+i*(852/total);d.rounded_rectangle((a,1595,a+852/total-8,1600),3,fill=MINT if i<=step else '#29483a')
    return im
def title(im,lines,local=1):
    d=ImageDraw.Draw(im);offset=int(20*(1-min(1,local/.25))**3)
    for j,line in enumerate(lines):txt(d,(84,275+j*96+offset),line,79,CREAM if j==0 else MINT,True)
def pill(im,text,y=1315):
    d=ImageDraw.Draw(im);f=font(25,True);ww=int(d.textlength(text,font=f))+48
    d.rounded_rectangle((84,y,84+ww,y+53),26,fill='#234b3b',outline='#416654',width=1)
    txt(d,(108,y+9),text,25,MINT,True)
def subtitle(im,text):
    d=ImageDraw.Draw(im);lines=text.split('\n');maxw=max(d.textlength(t,font=font(45,True)) for t in lines)
    if maxw>850:raise ValueError(f'Subtitle too wide: {text}')
    d.rounded_rectangle((510-maxw/2-26,1406,510+maxw/2+26,1406+len(lines)*58+14),18,fill='#0a1b16')
    for i,t in enumerate(lines):centered(d,1412+i*58,t,45,CREAM,True)
def window(im,frame,local,label='AI CREATOR KIT · WEBSITE WORKFLOW'):
    z=1+.025*min(1,local/2)
    size=(int(864*z),int(768*z));fr=frame.resize(size,Image.Resampling.LANCZOS)
    dx=(size[0]-864)//2;dy=(size[1]-768)//2;fr=fr.crop((dx,dy,dx+864,dy+768))
    # Readable, tightly cropped footage; no browser, bookmarks or personal file paths.
    im.paste(WINDOW_SHADOW,(0,0),WINDOW_SHADOW)
    d=ImageDraw.Draw(im);d.rounded_rectangle((78,520,942,1328),28,fill=CREAM)
    for n,c in enumerate(['#bba577','#8aa589','#c3cdbb']):d.ellipse((103+22*n,539,113+22*n,549),fill=c)
    txt(d,(185,531),label,19,GREEN)
    im.paste(fr,(78,560),MASK)
def source(label):return str(Path(r'C:\Users\hp\Downloads')/f'Recording 2026-10-03 {label}.mp4')
SHOTS={
 'home':('115127',6.9,3.4,(295,330,450,400)),
 'choose':('115634',7.1,2.4,(313,469,540,480)),
 'details':('115634',72.0,2.5,(320,81,468,416)),
 'pages':('115814',1.6,1.2,(315,79,648,576)),
 'style':('115634',102.0,1.6,(322,80,504,448)),
 'style_clean':('115959',.6,1.8,(322,455,504,448)),
 'ai':('120205',29.7,2.4,(320,312,504,448)),
 'instructions':('120205',41.3,1.2,(315,470,720,640)),
 'copy':('121647',11.9,1.4,(317,92,540,480)),
 'check':('121647',0.0,1.2,(320,65,630,560)),
 'more':('115127',12.0,3.0,(295,382,900,800)),
}
def prepare_shots():
    for name,(label,start,duration,rect) in SHOTS.items():
        dest=CACHE/name;dest.mkdir(exist_ok=True)
        if list(dest.glob('*.jpg')):continue
        x,y,w,h=rect
        # Padding allows safe crops at the recording boundary without ever stretching UI.
        vf=f'pad=iw:max(ih\\,{y+h}):0:0:color=0xf7f3e8,crop={w}:{h}:{x}:{y},scale=864:768:flags=lanczos,fps=30'
        subprocess.run([FF,'-hide_banner','-loglevel','error','-y','-ss',str(start),'-i',source(label),'-t',str(duration),'-vf',vf,'-q:v','2',str(dest/'%04d.jpg')],check=True)
        print('Prepared',name,flush=True)
def frame(name,t):
    if name=='home':t=min(t,.9)
    fs=sorted((CACHE/name).glob('*.jpg'));i=min(len(fs)-1,max(0,int(t*FPS)))
    return Image.open(fs[i]).convert('RGB')
INTERIOR=Image.open(r'D:\prompt soft\AI-CREATOR-KIT\assets\website-interior.png').convert('RGB').crop((375,280,1000,727))
def concept(im,t):
    d=ImageDraw.Draw(im)
    title(im,['Your idea.','A website direction.'],t)
    # Explicitly editorial concept artwork. This is not a product-generated website.
    d.rounded_rectangle((78,530,942,1255),32,fill=CREAM)
    txt(d,(114,568),'urban nest interior',29,GREEN,True)
    txt(d,(114,622),'Beautiful Spaces.',54,GREEN,False,True)
    txt(d,(114,687),'Designed Around You.',47,GREEN,False,True)
    photo=ImageOps.fit(INTERIOR,(792,352),Image.Resampling.LANCZOS);im.paste(photo,(114,775))
    d=ImageDraw.Draw(im);d.rounded_rectangle((114,1160,511,1217),12,fill=GREEN)
    txt(d,(137,1170),'Get a Free Consultation',25,CREAM,True)
    # Mobile interpretation of the same concept, also covered by the concept label.
    d.rounded_rectangle((688,952,905,1290),29,fill='#183a2d',outline='#7c927f',width=2)
    d.rounded_rectangle((701,968,892,1276),19,fill=CREAM)
    txt(d,(714,999),'urban nest',19,GREEN,True)
    txt(d,(714,1036),'Beautiful\nSpaces.',27,GREEN,False,True)
    ph=ImageOps.fit(INTERIOR,(166,106),Image.Resampling.LANCZOS);im.paste(ph,(714,1118))
    d=ImageDraw.Draw(im);d.rounded_rectangle((714,1240,879,1258),5,fill=GREEN)
    pill(im,'CONCEPT PREVIEW · NOT AN ACTUAL RESULT',1320)
def guidance(im,t):
    title(im,['Know exactly','what to do next.'],t)
    d=ImageDraw.Draw(im)
    txt(d,(84,506),'ANTIGRAVITY · YOUR NEXT STEPS',24,MINT,True)
    cards=[('01','Create your project','Keep your website files together.'),('02','Use your instructions','Paste into your selected AI.'),('03','Build, review & preview','Check the result before publishing.')]
    for i,(n,a,b) in enumerate(cards):
        y=586+i*216;active=t>=i*.52
        d.rounded_rectangle((84,y,936,y+183),25,fill=CREAM if active else '#214333')
        txt(d,(115,y+37),n,35,'#65836c' if active else MINT,True)
        txt(d,(201,y+30),a,39,GREEN if active else MINT,True)
        txt(d,(201,y+91),b,27,GREEN if active else '#8aab95')
    pill(im,'STEP BY STEP',1285)
def more(im,t):
    title(im,['And that’s just','the beginning.'],t)
    d=ImageDraw.Draw(im)
    labels=['Poster Maker','Meta Ad Creator','Resume Builder','Interview Prep','Business Tools','Image Editing / Lightroom']
    for i,label in enumerate(labels):
        y=570+i*116;shift=int(35*max(0,1-(t-i*.13)/.25))
        d.rounded_rectangle((84+shift,y,936+shift,y+94),20,fill=CREAM if i<3 else '#254a38')
        txt(d,(114+shift,y+19),label,38,GREEN if i<3 else MINT,True)
        txt(d,(874+shift,y+16),'↗',41,GREEN if i<3 else MINT)
def cta(im,t):
    d=ImageDraw.Draw(im);mark(im,84,355,103)
    txt(d,(84,512),'AI CREATOR KIT',58,CREAM,True)
    txt(d,(84,655),'Create with AI.',86,CREAM,True)
    txt(d,(84,757),'Step by step.',86,MINT,True)
    txt(d,(84,949),'From “where do I start?”',39,CREAM)
    txt(d,(84,1005),'to your next clear step.',39,CREAM)
    txt(d,(84,1117),'Instant Digital Access',34,MINT)
    d.rounded_rectangle((84,1230,936,1347),23,fill=GOLD)
    txt(d,(127,1265),'GET AI CREATOR KIT',42,GREEN,True)
    txt(d,(838,1259),'→',52,GREEN,True)
A=[
 ('hook',3.2,['Need a business','website?'],'Want a website?\nNo coding or prompting?','home'),
 ('reveal',2.1,['Meet','AI Creator Kit.'],'Meet AI Creator Kit.','home'),
 ('choose',2.2,['Choose what','you want to build.'],'Choose a\nbusiness website.','choose'),
 ('details',2.2,['A few details.','Your business.'],'Add your\nbusiness details.','details'),
 ('style',2.5,['Your pages.','Your style.'],'Pick your pages and style.','style'),
 ('ai',2.2,['Choose the AI','you want to use.'],'Choose your AI.','ai'),
 ('instructions',3.0,['Your project.','Your instructions.'],'Get instructions\nmade for your project.','instructions'),
 ('guide',3.0,[], 'Follow the steps.\nKnow what to do next.',None),
 ('result',3.2,[], 'Build with AI.\nPreview your website.',None),
 ('more',2.9,[], 'Posters, ads,\nresumes, and more.',None),
 ('cta',3.5,[], 'Start creating\nwith AI Creator Kit.',None),
]
B=[
 ('short_hook',2.2,['Need a business','website?'],'Need a business website?','home'),
 ('reveal',1.7,['Meet','AI Creator Kit.'],'Meet AI Creator Kit.','choose'),
 ('short_steps',3.4,['Your details.','Your style & AI.'],'Add details.\nPick your style and AI.','details'),
 ('short_guide',3.2,['Your project.','Your instructions.'],'Get instructions.\nFollow step by step.','instructions'),
 ('result',1.5,[], 'Build with AI.',None),
 ('short_cta',3.0,[], 'Create with\nAI Creator Kit.',None),
]
def visual(scene,local,index,total,short=False):
    name,dur,lines,sub,shot=scene;im=base(index,total)
    if name in ['cta','short_cta']:cta(im,local)
    elif name=='result':concept(im,local)
    elif name=='guide':
        if local<2.2:guidance(im,local)
        else:
            title(im,['Review. Check.','Then launch.'],local)
            window(im,frame('check',local-2.2),local,'AI CREATOR KIT · TEST & FIX')
    elif name=='more':more(im,local)
    else:
        if name=='hook' and local>1.45:lines=['No coding?','No prompting?']
        title(im,lines,local)
        if name=='style':shot='pages' if local<1.05 else 'style_clean';stime=local if local<1.05 else local-1.05
        elif name=='short_steps':
            shot='details' if local<1.05 else 'style_clean' if local<2.15 else 'ai';stime=local if local<1.05 else local-1.05 if local<2.15 else local-2.15
        elif name in ['instructions','short_guide']:
            shot='instructions' if local<1.75 else 'copy';stime=min(.7,local*.4) if local<1.75 else local-1.75
        else:stime=local
        window(im,frame(shot,stime),local)
        if name in ['instructions','short_guide']:
            d=ImageDraw.Draw(im)
            d.rounded_rectangle((104,1115,916,1299),20,fill=GREEN)
            txt(d,(137,1148),'COPY → OPEN YOUR AI',37,CREAM,True)
            txt(d,(137,1210),'Instructions for your project.',29,MINT)
        if name=='reveal':pill(im,'START WITH WHAT YOU WANT TO CREATE',1334)
        if name=='ai':pill(im,'ANTIGRAVITY · SELECTED WORKFLOW',1334)
        if name in ['instructions','short_guide']:pill(im,'GET YOUR INSTRUCTIONS',1334)
        if name in ['hook','short_hook']:pill(im,'START WITH AN IDEA',1334)
        # A brief emphasis ring follows the actual selection / copy action in the recordings.
        if (shot=='ai' and .35<stime<.95) or (shot=='copy' and .55<stime<1.1):
            d=ImageDraw.Draw(im);p=(stime-.35)/.6;rad=30+40*p
            cx,cy=(244,1244) if shot=='ai' else (268,640)
            d.ellipse((cx-rad,cy-rad,cx+rad,cy+rad),outline=GOLD,width=4)
    subtitle(im,sub)
    return im
def render_video(scenes,label):
    path=CACHE/f'{label}-silent.mp4'
    log=open(CACHE/f'{label}-encode.log','w')
    p=subprocess.Popen([FF,'-hide_banner','-loglevel','warning','-y','-f','rawvideo','-pixel_format','rgb24','-video_size','1080x1920','-framerate','30','-i','-','-an','-c:v','libx264','-preset','fast','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart',str(path)],stdin=subprocess.PIPE,stderr=log)
    elapsed=0
    for i,sc in enumerate(scenes):
        print('Rendering',label,sc[0],flush=True)
        for j in range(round(sc[1]*FPS)):
            im=visual(sc,j/FPS,i,len(scenes),label=='B')
            p.stdin.write(im.tobytes())
            if j==round(sc[1]*FPS)//2:im.resize((540,960)).save(CACHE/f'{label}-{i:02d}-qa.jpg',quality=95)
        elapsed+=sc[1]
    p.stdin.close();p.wait();log.close()
    if p.returncode:raise RuntimeError((CACHE/f'{label}-encode.log').read_text())
    return path
SR=48000
def load_voice(name,duration):
    path=ROOT/'audio'/f'{name}.mp3';raw=CACHE/f'{name}-trim.wav'
    subprocess.run([FF,'-hide_banner','-loglevel','error','-y','-i',str(path),'-af','silenceremove=start_periods=1:start_threshold=-42dB:start_silence=0.04:stop_periods=-1:stop_threshold=-42dB:stop_silence=0.13','-ar',str(SR),'-ac','1',str(raw)],check=True)
    with wave.open(str(raw),'rb') as w:data=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16).astype(float)/32768
    length=len(data)/SR;target=duration-.15
    if length>target:
        new=CACHE/f'{name}-{duration}-fit.wav'
        subprocess.run([FF,'-hide_banner','-loglevel','error','-y','-i',str(raw),'-af',f'atempo={length/target}',str(new)],check=True)
        with wave.open(str(new),'rb') as w:data=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16).astype(float)/32768
    return data
def write_wav(path,samples):
    with wave.open(str(path),'wb') as w:w.setnchannels(samples.shape[1] if samples.ndim>1 else 1);w.setsampwidth(2);w.setframerate(SR);w.writeframes(np.int16(np.clip(samples,-.99,.99)*32767).tobytes())
def music(duration):
    # Original synthesized soundtrack: warm chords, muted plucks, soft kick and hats.
    count=round(duration*SR);t=np.arange(count)/SR;st=np.zeros((count,2));beat=60/112
    chords=[[146.83,185,220,293.66],[130.81,164.81,196,261.63],[164.81,196,246.94,329.63],[110,146.83,185,220]]
    for start in np.arange(0,duration,beat*8):
        notes=chords[int(start/(beat*8))%4];n=min(count-round(start*SR),round(beat*8*SR));tt=np.arange(n)/SR
        env=np.minimum(tt/.6,1)*np.minimum((beat*8-tt)/.7,1)
        sig=sum(np.sin(2*np.pi*f*tt+.004*np.sin(2*np.pi*.4*tt))+.2*np.sin(2*np.pi*2*f*tt) for f in notes)*env*.025
        k=round(start*SR);st[k:k+n,0]+=sig;st[k:k+n,1]+=sig*.95
    rng=np.random.default_rng(40)
    for i,start in enumerate(np.arange(0,duration,beat/2)):
        k=round(start*SR);n=min(count-k,round(.33*SR));tt=np.arange(n)/SR
        if i%2==0:
            kick=np.sin(2*np.pi*(47*tt+38*(1-np.exp(-tt*22))/22))*np.exp(-tt*20)*.17;st[k:k+n]+=kick[:,None]
        hat=rng.normal(0,1,n)*np.exp(-tt*90)*.018;st[k:k+n]+=hat[:,None]
        if i%2==1:
            chord=chords[int(start/(beat*8))%4];f=chord[(i//2)%4]*2
            pluck=(np.sin(2*np.pi*f*tt)+.3*np.sin(2*np.pi*f*2*tt))*np.exp(-tt*11)*.07
            pan=.3 if i%4==1 else .7;st[k:k+n,0]+=pluck*pan;st[k:k+n,1]+=pluck*(1-pan)
    st*=np.minimum(t/.7,1)[:,None]*np.minimum((duration-t)/1.1,1)[:,None]
    return st
def audio_mix(scenes,label):
    duration=sum(x[1] for x in scenes);v=np.zeros(round(duration*SR));starts=[];start=0
    for sc in scenes:
        name=sc[0]
        # B uses its own compact narration; the concept is deliberately a silent beat.
        if not(label=='B' and name=='result'):
            data=load_voice(name,sc[1]);k=round((start+.055)*SR);n=min(len(data),len(v)-k);v[k:k+n]+=data[:n]
        starts.append(start);start+=sc[1]
    v*=.74/max(.01,np.max(np.abs(v)))
    bg=music(duration)
    env=np.convolve((np.abs(v[::480])>.014).astype(float),np.ones(18)/18,mode='same')
    duck=np.interp(np.arange(len(v)),np.arange(len(env))*480,env)
    bg*= (.62-.36*duck)[:,None]
    # Restrained editorial transition clicks; no sound recorded from the desktop is used.
    for start in starts[1:]:
        k=round(start*SR);n=min(2400,len(v)-k);tt=np.arange(n)/SR
        tick=np.sin(2*np.pi*1100*tt)*np.exp(-tt*110)*.04;bg[k:k+n]+=tick[:,None]
    mix=bg+v[:,None]
    write_wav(CACHE/f'{label}-mix.wav',mix)
    write_wav(OUT/f'AI-Creator-Kit-{label}-voiceover.wav',v)
    return CACHE/f'{label}-mix.wav'
def export(scenes,label):
    video=render_video(scenes,label);audio=audio_mix(scenes,label)
    name='AI-Creator-Kit-Version-A-30s.mp4' if label=='A' else 'AI-Creator-Kit-Version-B-15s.mp4'
    subprocess.run([FF,'-hide_banner','-loglevel','error','-y','-i',str(video),'-i',str(audio),'-map','0:v','-map','1:a','-c:v','copy','-c:a','aac','-b:a','256k','-ar','48000','-movflags','+faststart','-shortest',str(OUT/name)],check=True)
    timing=[];t=0
    for sc in scenes:timing.append({'start':round(t,2),'end':round(t+sc[1],2),'scene':sc[0],'caption':sc[3],'source_shot':sc[4]});t+=sc[1]
    (OUT/f'Version-{label}-edit-map.json').write_text(json.dumps(timing,indent=2))
    print('Exported',name,flush=True)
def cover():
    im=BG.copy();d=ImageDraw.Draw(im)
    mark(im,84,238,70);txt(d,(177,253),'AI CREATOR KIT',36,MINT,True)
    txt(d,(84,439),'Build With AI.',104,CREAM,True)
    for i,line in enumerate(["Even If You Don’t",'Know Where to Start.']):txt(d,(84,578+i*71),line,56,MINT,True)
    window(im,frame('home',.3),1,'AI CREATOR KIT · START WITH YOUR IDEA')
    # Cover window is moved down to keep the full headline unobstructed.
    clean=BG.copy();dc=ImageDraw.Draw(clean);mark(clean,84,200,63);txt(dc,(172,214),'AI CREATOR KIT',34,MINT,True)
    txt(dc,(84,365),'Build With AI.',104,CREAM,True)
    for i,line in enumerate(["Even If You Don’t",'Know Where to Start.']):txt(dc,(84,508+i*74),line,56,MINT,True)
    win_canvas=BG.copy();window(win_canvas,frame('home',.3),1,'AI CREATOR KIT · START WITH YOUR IDEA')
    win=win_canvas.crop((65,516,960,1340));clean.paste(win,(65,719))
    dc=ImageDraw.Draw(clean);dc.rounded_rectangle((84,1562,936,1660),20,fill=GOLD);txt(dc,(119,1588),'YOUR IDEA → YOUR NEXT STEP',35,GREEN,True)
    clean.save(OUT/'AI-Creator-Kit-Cover.png')
def qa_sheet(label,scenes):
    sheet=Image.new('RGB',(4*270,math.ceil(len(scenes)/4)*510),'#152b22');d=ImageDraw.Draw(sheet)
    for i in range(len(scenes)):
        im=Image.open(CACHE/f'{label}-{i:02d}-qa.jpg').resize((270,480));x=i%4*270;y=i//4*510;sheet.paste(im,(x,y+30));txt(d,(x+8,y+4),f'{i+1} · {scenes[i][0]}',17,CREAM)
    sheet.save(OUT/f'Version-{label}-visual-QA.jpg',quality=95)
if __name__=='__main__':
    prepare_shots();cover()
    if '--repair-hook' in sys.argv:
        for label,scenes,count in [('A',A,2),('B',B,1)]:
            segment=CACHE/f'{label}-hook-fixed.mp4'
            p=subprocess.Popen([FF,'-hide_banner','-loglevel','error','-y','-f','rawvideo','-pixel_format','rgb24','-video_size','1080x1920','-framerate','30','-i','-','-an','-c:v','libx264','-preset','fast','-crf','18','-pix_fmt','yuv420p',str(segment)],stdin=subprocess.PIPE)
            for idx,sc in enumerate(scenes[:count]):
                for j in range(round(sc[1]*FPS)):
                    im=visual(sc,j/FPS,idx,len(scenes),label=='B');p.stdin.write(im.tobytes())
                    if j==round(sc[1]*FPS)//2:im.resize((540,960)).save(CACHE/f'{label}-{idx:02d}-qa.jpg',quality=95)
            p.stdin.close();p.wait()
            start=sum(x[1] for x in scenes[:count]);dur=sum(x[1] for x in scenes)
            dst=OUT/('AI-Creator-Kit-Version-A-30s.mp4' if label=='A' else 'AI-Creator-Kit-Version-B-15s.mp4')
            fil=f'[1:v]setpts=PTS-STARTPTS[a];[0:v]trim={start}:{dur},setpts=PTS-STARTPTS[b];[a][b]concat=n=2:v=1:a=0[cat];[cat]fps=30,trim=duration={dur},setpts=N/(30*TB)[v]'
            subprocess.run([FF,'-hide_banner','-loglevel','error','-y','-i',str(CACHE/f'{label}-silent.mp4'),'-i',str(segment),'-i',str(CACHE/f'{label}-mix.wav'),'-filter_complex',fil,'-map','[v]','-map','2:a','-c:v','libx264','-preset','fast','-crf','18','-pix_fmt','yuv420p','-r','30','-video_track_timescale','15360','-c:a','aac','-b:a','256k','-movflags','+faststart','-t',str(dur),str(dst)],check=True)
            qa_sheet(label,scenes);print('Refined hook',label,flush=True)
    elif '--repair-concept' in sys.argv:
        for label,scenes in [('A',A),('B',B)]:
            sc=next(x for x in scenes if x[0]=='result');idx=scenes.index(sc)
            segment=CACHE/f'{label}-concept-fixed.mp4'
            p=subprocess.Popen([FF,'-hide_banner','-loglevel','error','-y','-f','rawvideo','-pixel_format','rgb24','-video_size','1080x1920','-framerate','30','-i','-','-an','-c:v','libx264','-preset','fast','-crf','18','-pix_fmt','yuv420p',str(segment)],stdin=subprocess.PIPE)
            for j in range(round(sc[1]*FPS)):
                im=visual(sc,j/FPS,idx,len(scenes),label=='B');p.stdin.write(im.tobytes())
                if j==round(sc[1]*FPS)//2:im.resize((540,960)).save(CACHE/f'{label}-{idx:02d}-qa.jpg',quality=95)
            p.stdin.close();p.wait()
            start=sum(x[1] for x in scenes[:idx]);end=start+sc[1];dur=sum(x[1] for x in scenes)
            dst=OUT/('AI-Creator-Kit-Version-A-30s.mp4' if label=='A' else 'AI-Creator-Kit-Version-B-15s.mp4')
            fil=f'[0:v]trim=0:{start},setpts=PTS-STARTPTS[a];[1:v]setpts=PTS-STARTPTS[b];[0:v]trim={end}:{dur},setpts=PTS-STARTPTS[c];[a][b][c]concat=n=3:v=1:a=0[v]'
            subprocess.run([FF,'-hide_banner','-loglevel','error','-y','-i',str(CACHE/f'{label}-silent.mp4'),'-i',str(segment),'-i',str(CACHE/f'{label}-mix.wav'),'-filter_complex',fil,'-map','[v]','-map','2:a','-c:v','libx264','-preset','fast','-crf','18','-pix_fmt','yuv420p','-c:a','aac','-b:a','256k','-movflags','+faststart','-t',str(dur),str(dst)],check=True)
            qa_sheet(label,scenes);print('Repaired concept',label,flush=True)
    elif '--cover-only' not in sys.argv:
        export(A,'A');qa_sheet('A',A);export(B,'B');qa_sheet('B',B)
