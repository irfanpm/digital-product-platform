exec(open(__file__.replace('detail_frames.py','inspect_clips.py')).read().split('for f in files:')[0])
for label,times in {'115634':[74,87,93,98,104,107],'115959':[20,24,28],'120205':[27,30,39,41.8],'121647':[1,13,25],'115127':[7]}.items():
    f=next(f for f in files if label in f.stem)
    for t in times:
        subprocess.run([ff,'-y','-ss',str(t),'-i',str(f),'-frames:v','1','-q:v','2',str(out/f'{label}-{t}.jpg')],capture_output=True)
print('Detail frames ready')
