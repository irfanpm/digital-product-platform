from render_ads import *
out=ROOT/'revision-inspection';out.mkdir(exist_ok=True)
for label,times in {'115634':[0.5,1,2,3,4,5,6,19,20,21,22,23],'115127':[10,11,12,13,14,15,16]}.items():
    ims=[]
    for t in times:
        path=out/f'{label}-{t}.jpg'
        subprocess.run([FF,'-hide_banner','-loglevel','error','-y','-ss',str(t),'-i',source(label),'-frames:v','1','-vf','scale=960:-1',str(path)],check=True)
        ims.append((t,Image.open(path)))
    sheet=Image.new('RGB',(1920,math.ceil(len(ims)/2)*535),'#133b2c');d=ImageDraw.Draw(sheet)
    for i,(t,im) in enumerate(ims):
        x=i%2*960;y=i//2*535;sheet.paste(im,(x,y+35));txt(d,(x+10,y+3),f'{label} · {t}s',22)
    sheet.save(out/f'{label}-contact.jpg',quality=94)
