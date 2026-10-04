from pathlib import Path
from zipfile import ZipFile,ZIP_DEFLATED
root=Path(__file__).parent/'revision'
out=root/'deliverables'
package=root/'AI-Creator-Kit-Version-B-Performance-Package.zip'
with ZipFile(package,'w',ZIP_DEFLATED,compresslevel=6) as z:
    for path in sorted(out.iterdir()):
        if path.is_file():z.write(path,path.name)
print(str(package),package.stat().st_size,flush=True)
