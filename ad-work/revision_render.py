"""Performance revision of the original ad. Reuses its design, real footage, music and concept."""
import render_ads as old
from render_ads import Image,ImageDraw,ImageOps,np,Path,subprocess,math,json,wave
from revision_narrate import lines as VO
ROOT=old.ROOT;REV=ROOT/'revision';OUT=REV/'deliverables';CACHE=REV/'cache'
OUT.mkdir(parents=True,exist_ok=True);CACHE.mkdir(parents=True,exist_ok=True)
FF=old.FF;FPS=30;SR=48000
SHOTS={
 'dashboard':('115634',6.0,.35,(294,165,810,720)),
 'entry':('115634',6.22,1.1,(315,450,540,480)),
 'business_click':('115634',19.1,1.6,(313,420,540,480)),
 'industry':('115634',72,1.3,(1080,81,630,560)),
 'goal':('115634',72,1.4,(1080,425,450,400)),
 'ai_selection':('120205',29.7,1.35,(320,312,504,448)),
}
def prepare():
    for name,(label,start,duration,r) in SHOTS.items():
        dest=CACHE/name;dest.mkdir(exist_ok=True)
        if list(dest.glob('*.jpg')):continue
        x,y,w,h=r
        vf=f'pad=iw:max(ih\\,{y+h}):0:0:color=0xf7f3e8,crop={w}:{h}:{x}:{y},scale=864:768:flags=lanczos,fps=30'
        subprocess.run([FF,'-hide_banner','-loglevel','error','-y','-ss',str(start),'-i',old.source(label),'-t',str(duration),'-vf',vf,'-q:v','2',str(dest/'%04d.jpg')],check=True)
        print('Prepared',name,flush=True)
    dest=CACHE/'copy-source';dest.mkdir(exist_ok=True)
    if not list(dest.glob('*.jpg')):
        subprocess.run([FF,'-hide_banner','-loglevel','error','-y','-ss','11.9','-i',old.source('121647'),'-t','1.5','-vf','fps=30','-q:v','2',str(dest/'%04d.jpg')],check=True)
    load_assets()
PATHS={}
def frame(name,t):
    if name in SHOTS or name=='copy-source':folder=CACHE/name
    else:folder=old.CACHE/name
    if name not in PATHS:PATHS[name]=sorted(folder.glob('*.jpg'))
    fs=PATHS[name]
    if name=='home':t=min(.9,t)
    return Image.open(fs[min(len(fs)-1,max(0,round(t*30)))]).convert('RGB')
TOOL_CARDS={}
def load_assets():
    im=Image.open(ROOT/'revision-inspection'/'tools-full.png').convert('RGB')
    rects={'Posters':(624,414,927,540),'Meta ads':(941,414,1244,540),'Resumes':(1257,414,1561,540),
           'Interviews':(307,554,610,680),'Images':(624,554,927,680),'Business':(1257,554,1561,680)}
    for name,r in rects.items():TOOL_CARDS[name]=im.crop(r).resize((824,342),Image.Resampling.LANCZOS)
def text(im,xy,s,size=48,color=None,bold=False):old.txt(ImageDraw.Draw(im),xy,s,size,color or old.CREAM,bold)
def title(im,lines,t):
    d=ImageDraw.Draw(im);offset=int(18*(1-min(1,t/.24))**3)
    for i,line in enumerate(lines):
        size=79
        while d.textlength(line,font=old.font(size,True))>850:size-=1
        old.txt(d,(84,275+i*96+offset),line,size,old.CREAM if i==0 else old.MINT,True)
def label(im,s,y=1334):old.pill(im,s,y)
def window(im,shot,t,motion=1):
    old.window(im,frame(shot,t),motion,'REAL AI CREATOR KIT WORKFLOW')
def emphasis(im,x,y,t,start,end):
    if start<t<end:
        radius=25+32*(t-start)/(end-start)
        ImageDraw.Draw(im).ellipse((x-radius,y-radius,x+radius,y+radius),outline=old.GOLD,width=4)
def steps_strip(im,s):
    d=ImageDraw.Draw(im);d.rounded_rectangle((104,1109,916,1304),20,fill=old.GREEN)
    for i,line in enumerate(s.split('\n')):text(im,(136,1137+i*64),line,37 if i==0 else 31,old.CREAM if i==0 else old.MINT,i==0)
def copy_proof(im,t):
    # Two honest crops from the recorded copy interaction. The audit paragraph is excluded.
    raw=frame('copy-source',min(t,1.4));button=raw.crop((326,111,819,168))
    panel=Image.new('RGB',(864,768),old.CREAM)
    button=button.resize((824,95),Image.Resampling.LANCZOS);panel.paste(button,(20,34))
    old.window(im,panel,0,'REAL AI CREATOR KIT · COPY ACTION')
    d=ImageDraw.Draw(im);d.rounded_rectangle((104,735,916,1269),24,fill=old.GREEN)
    text(im,(140,799),'COPY YOUR',58,old.CREAM,True)
    text(im,(140,866),'INSTRUCTIONS.',58,old.CREAM,True)
    text(im,(140,990),'Open your chosen AI.',37,old.MINT)
    text(im,(140,1046),'Follow the kit’s guide.',37,old.MINT)
    if t>.85:
        toast=raw.crop((739,839,1173,892));toast=toast.resize((824,101),Image.Resampling.LANCZOS)
        im.paste(toast,(104,1154))
    emphasis(im,376,625,t,.5,.9)
def step_graphic(im,t,duration=3.25):
    title(im,['Know exactly','what to do next.'],t)
    which=min(2,int(t/(duration/3)));phase=(t%(duration/3))/(duration/3)
    data=[('01','Create / open','your project.','Keep your website folder together.'),
          ('02','Open Antigravity.','Paste instructions.','Use the instructions from your kit.'),
          ('03','Build. Review.','Preview.','Check your website before publishing.')]
    n,a,b,s=data[which];d=ImageDraw.Draw(im)
    text(im,(84,514),'ANTIGRAVITY · GUIDE STEPS',25,old.MINT,True)
    # This is an editorial animation of the confirmed guide, not a fabricated product screen.
    y=607+int(18*(1-min(1,phase/.25))**3)
    d.rounded_rectangle((84,y,936,y+650),30,fill=old.CREAM)
    text(im,(126,y+44),n,49,'#749278',True)
    x=415;iy=y+105
    if which==0:
        d.line([(x-90,iy+55),(x-90,iy+12),(x-15,iy+12),(x+10,iy+48),(x+125,iy+48),(x+125,iy+172),(x-90,iy+172),(x-90,iy+55)],fill=old.GREEN,width=8)
    elif which==1:
        d.rounded_rectangle((x-70,iy+10,x+100,iy+184),16,outline=old.GREEN,width=7)
        for k in range(4):d.line((x-38,iy+55+k*28,x+56,iy+55+k*28),fill='#6c8b6c',width=5)
        d.line((x+115,iy+103,x+190,iy+103),fill=old.GREEN,width=7);d.line((x+165,iy+82,x+190,iy+103,x+165,iy+125),fill=old.GREEN,width=7)
    else:
        d.rounded_rectangle((x-98,iy+19,x+135,iy+171),16,outline=old.GREEN,width=7)
        d.line((x+15,iy+172,x+15,iy+204),fill=old.GREEN,width=6);d.line((x-45,iy+205,x+75,iy+205),fill=old.GREEN,width=6)
        d.line((x-31,iy+100,x+1,iy+129,x+60,iy+67),fill='#719373',width=10)
    text(im,(126,y+347),a,53,old.GREEN,True);text(im,(126,y+413),b,53,old.GREEN,True)
    text(im,(126,y+513),s,29,old.GREEN)
    for i in range(3):d.rounded_rectangle((126+i*60,y+592,162+i*60,y+598),3,fill=old.GREEN if i==which else '#b9c8b4')
    label(im,'STEP BY STEP · NO PROMPT KNOWLEDGE NEEDED')
def value_montage(im,t,duration):
    title(im,['And that’s just','the beginning.'],t)
    pair=min(2,int(t/(duration/3)))
    names=[('Posters','Meta ads'),('Resumes','Interviews'),('Images','Business')][pair]
    for j,name in enumerate(names):
        y=558+j*366;im.paste(TOOL_CARDS[name],(98,y))
    d=ImageDraw.Draw(im);d.rounded_rectangle((84,530,936,1305),27,outline='#557862',width=2)
    label(im,'ACTUAL TOOLS INSIDE YOUR KIT',1334)
def cta(im,t):
    old.mark(im,84,342,92)
    text(im,(84,487),'AI CREATOR KIT',56,old.CREAM,True)
    for i,line in enumerate(['Turn your ideas','into real results.','With AI.']):
        text(im,(84,620+i*87),line,73,old.MINT if i==2 else old.CREAM,True)
    text(im,(84,965),'Websites • Marketing',36,old.CREAM)
    text(im,(84,1015),'Career • Business',36,old.CREAM)
    text(im,(84,1137),'Instant Digital Access',34,old.MINT)
    d=ImageDraw.Draw(im);d.rounded_rectangle((84,1230,936,1347),23,fill=old.GOLD)
    text(im,(127,1265),'GET AI CREATOR KIT',42,old.GREEN,True);text(im,(838,1259),'→',52,old.GREEN,True)
MAIN=[('hook',3),('reveal',3),('details',3.3),('style',2.7),('ai',2.8),('instructions',3.8),('guide',4.1),('concept',2.3),('more',2.5),('cta',3.5)]
SHORT=[('short_hook',2.3),('reveal',1.7),('short_details',2),('short_usp',3.9),('short_more',2.1),('short_cta',3)]
CAPTIONS={
 'hook':[('Want a website?',1.5),('But where do you start?',3)],
 'reveal':[('Meet AI Creator Kit.',99)],
 'details':[('Just answer simple\nbusiness questions.',99)],
 'style':[('Pick your pages and style.',99)],
 'ai':[('Choose your AI.',1.25),('We’ll guide you from there.',99)],
 'instructions':[('Get instructions\nmade for your project.',99)],
 'guide':[('Copy. Follow the steps\nin your chosen AI.',2.5),('No prompt knowledge needed.',99)],
 'concept':[('From an idea to a website.',99)],
 'more':[('Posters. Ads. Careers.\nImages. Business.',99)],
 'cta':[('Get AI Creator Kit.\nStart creating.',99)],
 'short_hook':[('Want a business website?',99)],
 'short_details':[('Answer simple questions.',99)],
 'short_usp':[('Get your instructions.\nFollow clear steps.',99)],
 'short_more':[('Create more with AI.',99)],
 'short_cta':[('Get AI Creator Kit.',99)]
}
def visual(name,t,index,total,duration):
    im=old.base(index,total)
    if name in ['hook','short_hook']:
        # First frame leads with the desire, without the brand-mark intro.
        im.paste(old.BG.crop((70,170,600,242)),(70,170));text(im,(84,185),'FOR YOUR BUSINESS',25,old.MINT,True)
        msg=['Want a website','for your business?'] if name=='short_hook' or t<1.5 else ['But don’t know','where to start?']
        title(im,msg,t if t<1.5 else t-1.5);window(im,'home',t,motion=min(t,.8));label(im,'START WITH YOUR GOAL')
    elif name=='reveal':
        title(im,['Meet','AI Creator Kit.'],t)
        if duration<2:
            window(im,'entry',t*.7,motion=0)
        elif t<.75:window(im,'dashboard',min(t,.3),motion=0)
        elif t<1.85:
            st=t-.75;window(im,'entry',st,motion=min(.6,st));emphasis(im,623,948,st,.12,.4)
        else:
            st=t-1.85;window(im,'business_click',st,motion=.5);emphasis(im,325,926,st,.2,.6)
        label(im,'SIMPLE QUESTIONS → INSTRUCTIONS → GUIDE')
    elif name in ['details','short_details']:
        title(im,['Tell us about','your business.'],t)
        if name=='short_details':shot='details' if t<.85 else 'goal';st=t if t<.85 else t-.85
        elif t<1:shot,st='details',t
        elif t<2:shot,st='industry',t-1
        else:shot,st='goal',t-2
        window(im,shot,st,motion=.5);label(im,'YOUR BUSINESS · YOUR GOAL')
    elif name=='style':
        title(im,['Pick your pages','and your style.'],t)
        shot='pages' if t<1.15 else 'style_clean';window(im,shot,t if t<1.15 else t-1.15,motion=.7)
        label(im,'PAGES · FEATURES · DESIGN')
    elif name=='ai':
        title(im,['Choose the AI','you want to use.'],t)
        window(im,'ai_selection',min(t,1.3),motion=.5);emphasis(im,244,1240,t,.35,.8);label(im,'ANTIGRAVITY · WE’LL GUIDE YOU')
    elif name in ['instructions','short_usp']:
        title(im,['Your project.','Your instructions.'],t)
        if name=='short_usp' and t>2.45:
            im.paste(old.BG.crop((60,255,1000,500)),(60,255))
            step_graphic(im,(t-2.45)*1.8,2.6)
        elif t<1.8:
            window(im,'instructions',min(t*.4,.7),motion=.6)
            steps_strip(im,'MADE FOR YOUR PROJECT.\nFor your selected AI.');label(im,'CUSTOM INSTRUCTIONS + NEXT STEPS')
        else:
            copy_proof(im,t-1.8);label(im,'COPY → OPEN YOUR AI → FOLLOW THE GUIDE')
    elif name=='guide':
        if t<3.3:step_graphic(im,t,3.3)
        else:
            title(im,['Build. Preview.','Then check.'],t-3.3);window(im,'check',t-3.3,motion=0)
            label(im,'REAL KIT · REVIEW CHECKLIST')
    elif name=='concept':
        old.concept(im,t)
        im.paste(old.BG.crop((60,255,1000,495)),(60,255))
        title(im,['Your idea.','Your website direction.'],t)
        im.paste(old.BG.crop((60,1310,1000,1398)),(60,1310));label(im,'EXAMPLE WEBSITE CONCEPT',1320)
    elif name in ['more','short_more']:value_montage(im,t,duration)
    elif name in ['cta','short_cta']:cta(im,t)
    cap=next(s for s,end in CAPTIONS[name] if t<end);old.subtitle(im,cap)
    return im
def trim_voice(name,duration):
    raw=CACHE/f'{name}-decoded.wav'
    subprocess.run([FF,'-hide_banner','-loglevel','error','-y','-i',str(REV/'audio'/f'{name}.mp3'),'-ar',str(SR),'-ac','1',str(raw)],check=True)
    with wave.open(str(raw),'rb') as w:data=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16).astype(float)/32768
    # Preserve phrasing and pauses. Trim only the leading and trailing quiet portions.
    active=np.where(np.abs(data)>.009)[0]
    data=data[max(0,active[0]-int(.04*SR)):min(len(data),active[-1]+int(.11*SR))]
    length=len(data)/SR;target=duration-.15;tempo=max(1,length/target)
    if tempo>1.15:raise RuntimeError(f'Narration too fast: {name} {length:.2f}s into {target:.2f}s. Rewrite before export.')
    if tempo>1:
        old.write_wav(CACHE/f'{name}-trim.wav',data)
        fitted=CACHE/f'{name}-fit.wav'
        subprocess.run([FF,'-hide_banner','-loglevel','error','-y','-i',str(CACHE/f'{name}-trim.wav'),'-af',f'atempo={tempo:.5f}',str(fitted)],check=True)
        with wave.open(str(fitted),'rb') as w:data=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16).astype(float)/32768
    return data,tempo
def mix(scenes,label):
    dur=sum(s[1] for s in scenes);voice=np.zeros(round(dur*SR));start=0;metrics=[];starts=[]
    for name,length in scenes:
        data,tempo=trim_voice(name,length);k=round((start+.055)*SR);n=min(len(data),len(voice)-k)
        if len(data)>length*SR:raise RuntimeError(f'Voice overflow: {name}')
        voice[k:k+n]=data[:n];metrics.append({'scene':name,'start':round(start,3),'words':VO[name],'tempo':tempo,'spoken_seconds':round(len(data)/SR,3)})
        starts.append(start);start+=length
    voice*=.74/max(.01,np.max(np.abs(voice)))
    bg=old.music(dur);env=np.convolve((np.abs(voice[::480])>.014).astype(float),np.ones(18)/18,mode='same')
    duck=np.interp(np.arange(len(voice)),np.arange(len(env))*480,env);bg*= (.58-.34*duck)[:,None]
    for t in starts[1:]:
        k=round(t*SR);n=min(2400,len(voice)-k);tt=np.arange(n)/SR;tick=np.sin(2*np.pi*1100*tt)*np.exp(-tt*110)*.035;bg[k:k+n]+=tick[:,None]
    old.write_wav(CACHE/f'{label}-mix.wav',bg+voice[:,None]);old.write_wav(OUT/f'{label}-voiceover.wav',voice)
    (OUT/f'{label}-narration.json').write_text(json.dumps(metrics,indent=2))
    return CACHE/f'{label}-mix.wav'
def render(scenes,label):
    dest=CACHE/f'{label}-silent.mp4';log=open(CACHE/f'{label}-encode.log','w')
    p=subprocess.Popen([FF,'-hide_banner','-loglevel','warning','-y','-f','rawvideo','-pixel_format','rgb24','-video_size','1080x1920','-framerate','30','-i','-','-an','-c:v','libx264','-preset','fast','-crf','17','-pix_fmt','yuv420p','-r','30','-video_track_timescale','15360',str(dest)],stdin=subprocess.PIPE,stderr=log)
    for i,(name,duration) in enumerate(scenes):
        print('Rendering',label,name,flush=True)
        for j in range(round(duration*30)):
            im=visual(name,j/30,i,len(scenes),duration);p.stdin.write(im.tobytes())
            if j==round(duration*30)//2:im.save(CACHE/f'{label}-{i:02d}-qa.png')
    p.stdin.close();p.wait();log.close()
    if p.returncode:raise RuntimeError((CACHE/f'{label}-encode.log').read_text())
    audio=mix(scenes,label)
    filename='AI-Creator-Kit-Version-B-Performance-Ad.mp4' if label=='Main' else 'AI-Creator-Kit-Version-B-Performance-Ad-15s.mp4'
    subprocess.run([FF,'-hide_banner','-loglevel','error','-y','-i',str(dest),'-i',str(audio),'-map','0:v','-map','1:a','-c:v','copy','-c:a','aac','-b:a','256k','-ar','48000','-movflags','+faststart','-t',str(sum(x[1] for x in scenes)),str(OUT/filename)],check=True)
    print('Exported',filename,flush=True)
def storyboard(scenes,label):
    start=0;items=[]
    def ts(t):ms=round(t*1000);return f'{ms//3600000:02d}:{ms//60000%60:02d}:{ms//1000%60:02d},{ms%1000:03d}'
    for name,duration in scenes:
        a=0
        for text,end in CAPTIONS[name]:
            b=min(duration,end)
            if b>a:items.append({'start':round(start+a,3),'end':round(start+b,3),'scene':name,'caption':text})
            a=b
            if a>=duration:break
        start+=duration
    (OUT/f'{label}-timing.json').write_text(json.dumps(items,indent=2))
    (OUT/f'{label}-captions.srt').write_text('\n\n'.join(f"{i+1}\n{ts(s['start'])} --> {ts(s['end'])}\n{s['caption']}" for i,s in enumerate(items)),encoding='utf-8')
if __name__=='__main__':
    prepare()
    if '--layout-only' in __import__('sys').argv:
        for cut_label,scenes in [('Main',MAIN),('Short',SHORT)]:
            for i,(name,duration) in enumerate(scenes):visual(name,duration/2,i,len(scenes),duration).save(CACHE/f'{cut_label}-{i:02d}-qa.png')
    else:
        # Check narration fit before spending time on the final exports.
        mix(MAIN,'Main');mix(SHORT,'Short')
        render(MAIN,'Main');storyboard(MAIN,'Main');render(SHORT,'Short');storyboard(SHORT,'Short')
