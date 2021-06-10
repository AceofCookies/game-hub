
import os
import glob
import subprocess

import jinja2

print("Building website...")

env = jinja2.Environment(
    loader=jinja2.FileSystemLoader("src")
)

pages = glob.glob("src/pages/*")

for page in pages:
    template_name = page[4:]

    template = env.get_template(template_name)
    rendered_html = template.render()

    final_path = f"public/{os.path.basename(template_name)}"

    with open(final_path, "w") as f:
        f.write(rendered_html)

subprocess.check_call(["./node_modules/.bin/prettier", "-w", "public/*.html"])

print("Done")
