from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
import subprocess, zipfile, hashlib, json, shutil

root=Path(__file__).resolve().parents[1]
out=root/'public/images/creator';out.mkdir(parents=True,exist_ok=True)
generated=Path(r'C:\Users\hp\.codex\generated_images\01a106f0-a2bc-7971-bdd9-82eeccc27312\exec-1d112f5b-b014-49c2-b88e-ecfa5e81d249.png')
Image.open(generated).convert('RGB').save(out/'hero.webp',quality=88)
ffmpeg=root/'ad-work/toolkit/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe'
subprocess.run([str(ffmpeg),'-y','-ss','6','-i',r'C:\Users\hp\Downloads\Recording 2026-10-03 115634.mp4','-frames:v','1',str(out/'dashboard-raw.png')],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
im=Image.open(out/'dashboard-raw.png');im.crop((0,80,im.width,im.height)).resize((1440,684)).save(out/'dashboard.webp',quality=90)
(out/'dashboard-raw.png').unlink()
for name,source in [('tools','ad-work/revision-inspection/tools-full.png'),('instructions','ad-work/inspection/120205-41.8.jpg'),('ai-selection','ad-work/inspection/120205-27.jpg')]:
    im=Image.open(root/source).convert('RGB');im.crop((0,76,im.width,im.height-24)).thumbnail((1440,900))
    im=Image.open(root/source).convert('RGB').crop((0,76,im.width,im.height-24));im.thumbnail((1440,900));im.save(out/f'{name}.webp',quality=89)
src=Path(r'D:\prompt soft\AI-CREATOR-KIT')
Image.open(src/'assets/website-interior.png').convert('RGB').resize((1050,700)).save(out/'website-example.webp',quality=87)
social=Image.new('RGB',(1200,630),'#08291f');draw=ImageDraw.Draw(social)
font_path=r'C:\Windows\Fonts\arialbd.ttf'
from PIL import ImageFont
draw.text((52,46),'AI Creator Kit',font=ImageFont.truetype(font_path,52),fill='#acfa98')
draw.text((52,118),'Create With AI. Step by Step.',font=ImageFont.truetype(font_path,29),fill='#f7f3e8')
dash=Image.open(out/'dashboard.webp');dash.thumbnail((1096,430));social.paste(dash,(52,185));social.save(out/'social.webp',quality=88)
video=root/'public/video';video.mkdir(exist_ok=True)
shutil.copyfile(root/'ad-work/revision/deliverables/AI-Creator-Kit-Version-B-Performance-Ad.mp4',video/'creator-demo.mp4')
private=root/'private';private.mkdir(exist_ok=True)
zip_path=private/'AI-Creator-Kit-v2.zip'
with zipfile.ZipFile(zip_path,'w',zipfile.ZIP_DEFLATED) as z:
    for file in sorted(src.rglob('*')):
        if file.is_file():z.write(file,'AI-CREATOR-KIT/'+file.relative_to(src).as_posix())
manifest={'source':str(src),'archive':zip_path.name,'sha256':hashlib.sha256(zip_path.read_bytes()).hexdigest(),'files':33,'version':'Local edition 2.0','delivery':'Paid archive outside public; signed verified-order route only','visuals':{'hero':'AI-generated illustration; imagegen prompt documented in qa/AI_CREATOR_MIGRATION.md','screenshots':'Existing seller recordings, cropped browser chrome only','website-example':'Existing kit concept artwork, labelled on page','demo':'Existing seller marketing demonstration; not a paid product file'}}
(private/'manifest.json').write_text(json.dumps(manifest,indent=2))
print('Prepared private archive and public marketing assets.',zip_path.stat().st_size)
