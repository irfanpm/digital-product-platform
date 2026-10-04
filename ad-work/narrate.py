import sys,asyncio,json
from pathlib import Path
root=Path(__file__).parent
sys.path.insert(0,str(root/'toolkit'))
import edge_tts
segments=[
('hook',"Want a website? Don't know coding or prompting?"),
('reveal','Meet AI Creator Kit.'),
('choose','Choose a business website.'),
('details','Add your business details.'),
('style','Pick your pages and style.'),
('ai','Choose your AI.'),
('instructions','Get instructions made for your project.'),
('guide','Follow the steps. Know what to do next.'),
('result','Build with AI. Preview your website.'),
('more','Posters, ads, resumes, and more.'),
('cta','Start creating with AI Creator Kit.'),
('short_hook','Need a business website?'),
('short_steps','Add details. Pick your style and AI.'),
('short_guide','Get instructions and step-by-step guidance.'),
('short_cta','Create with AI Creator Kit.')]
async def main():
    out=root/'audio';out.mkdir(exist_ok=True)
    for name,txt in segments:
        if (out/f'{name}.mp3').exists():continue
        await edge_tts.Communicate(txt,'en-IN-NeerjaNeural',rate='+12%',pitch='-1Hz').save(str(out/f'{name}.mp3'))
        print(name,flush=True)
asyncio.run(main())
