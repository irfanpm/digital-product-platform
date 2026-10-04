from render_ads import *
for label,scenes,count in [('A',A,2),('B',B,1)]:
    start=sum(x[1] for x in scenes[:count]);dur=sum(x[1] for x in scenes)
    fil=f'[1:v]setpts=PTS-STARTPTS[a];[0:v]trim={start}:{dur},setpts=PTS-STARTPTS[b];[a][b]concat=n=2:v=1:a=0[cat];[cat]fps=30,trim=duration={dur},setpts=N/(30*TB)[v]'
    dst=OUT/('AI-Creator-Kit-Version-A-30s.mp4' if label=='A' else 'AI-Creator-Kit-Version-B-15s.mp4')
    subprocess.run([FF,'-hide_banner','-loglevel','error','-y','-i',str(CACHE/f'{label}-silent.mp4'),'-i',str(CACHE/f'{label}-hook-fixed.mp4'),'-i',str(CACHE/f'{label}-mix.wav'),'-filter_complex',fil,'-map','[v]','-map','2:a','-c:v','libx264','-preset','fast','-crf','18','-pix_fmt','yuv420p','-r','30','-video_track_timescale','15360','-c:a','aac','-b:a','256k','-movflags','+faststart','-t',str(dur),str(dst)],check=True)
    print('Finalized',label,flush=True)
