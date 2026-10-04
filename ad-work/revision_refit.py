import asyncio
from revision_narrate import edge_tts, ROOT, lines
async def main():
    for name in ['ai','more','short_more']:
        await edge_tts.Communicate(lines[name],'en-IN-NeerjaNeural',rate='+3%',pitch='-1Hz').save(str(ROOT/'revision'/'audio'/f'{name}.mp3'))
        print('Updated narration',name,flush=True)
if __name__=='__main__':asyncio.run(main())
