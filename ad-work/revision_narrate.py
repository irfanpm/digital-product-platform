import sys,asyncio
from pathlib import Path
ROOT=Path(__file__).parent
sys.path.insert(0,str(ROOT/'toolkit'))
import edge_tts
lines={
 'hook':'Want a website? Where to start?',
 'reveal':'Meet AI Creator Kit.',
 'details':'Just answer simple business questions.',
 'style':'Pick your pages and style.',
 'ai':'Choose your AI.',
 'instructions':'Get instructions made for your project.',
 'guide':'Copy them. Follow the steps in your chosen AI.',
 'concept':'From an idea to a website.',
 'more':'Create more with AI.',
 'cta':'Get AI Creator Kit. Start creating.',
 'short_hook':'Want a business website?',
 'short_details':'Answer simple questions.',
 'short_usp':'Get your instructions. Follow clear steps.',
 'short_more':'Create more with AI.',
 'short_cta':'Get AI Creator Kit.'
}
async def main():
    out=ROOT/'revision'/'audio';out.mkdir(parents=True,exist_ok=True)
    for name,words in lines.items():
        if (out/f'{name}.mp3').exists():continue
        await edge_tts.Communicate(words,'en-IN-NeerjaNeural',rate='+3%',pitch='-1Hz').save(str(out/f'{name}.mp3'))
        print('Narration',name,flush=True)
if __name__=='__main__':asyncio.run(main())
