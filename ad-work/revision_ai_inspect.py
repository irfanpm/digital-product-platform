import render_ads as r
out=r.ROOT/'revision-inspection'
sheet=r.Image.new('RGB',(1920,3*525),r.GREEN)
for i,t in enumerate([29.7,30.3,30.6,31,31.5,32]):
    p=out/f'ai-{t}.png'
    r.subprocess.run([r.FF,'-hide_banner','-loglevel','error','-y','-ss',str(t),'-i',r.source('120205'),'-frames:v','1',str(p)],check=True)
    im=r.Image.open(p).resize((960,493))
    x=i%2*960;y=i//2*525
    sheet.paste(im,(x,y+32));r.txt(r.ImageDraw.Draw(sheet),(x,y),str(t),24)
sheet.save(out/'ai-contact.jpg')
