import revision_render as r
r.prepare()
r.mix(r.MAIN,'Main');r.mix(r.SHORT,'Short')
samples=[('hook',0,0,3),('reveal',.3,1,3),('reveal',2.8,1,3),('details',2.6,2,3.3),('style',2.1,3,2.7),('ai',1.8,4,2.8),('instructions',3,5,3.8),('guide',.5,6,4.1),('guide',2.8,6,4.1),('concept',1,7,2.3),('short_usp',3.7,3,3.9)]
sheet=r.Image.new('RGB',(1620,960),'#eeeeee')
for i,(name,t,idx,dur) in enumerate(samples):
    im=r.visual(name,t,idx,10,dur)
    im.save(r.CACHE/f'sample-{i:02d}.png')
    sheet.paste(im.resize((270,480)),((i%6)*270,(i//6)*480))
sheet.save(r.CACHE/'samples.jpg')
print('All narration fits. Review samples ready.',flush=True)
