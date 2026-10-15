"""Build the downloadable resume from data/content.js.

Install scripts/requirements-resume.txt, then run this script from any directory.
Recent roles retain their bullets; earlier experience is condensed to its summary
and first accomplishment. The website retains the complete history.
"""
import json
import re
import subprocess
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, PageBreak

ROOT = Path(__file__).resolve().parents[1]
data = json.loads(subprocess.check_output(
    ["node", "--input-type=module", "-e",
     "import data from './data/content.js'; process.stdout.write(JSON.stringify(data.content));"],
    cwd=ROOT, text=True,
))
resume = data["resume"]
employers = [entry for entry in resume if entry.get("roles")]
output = ROOT / "public" / "Tyler_Ingersoll_Resume.pdf"
ink = colors.HexColor("#172735")
muted = colors.HexColor("#445563")
styles = {
    "name": ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=24, leading=28, textColor=ink, spaceAfter=5),
    "title": ParagraphStyle("title", fontName="Helvetica-Bold", fontSize=11, leading=15, textColor=muted, spaceAfter=6),
    "contact": ParagraphStyle("contact", fontName="Helvetica", fontSize=9, leading=12, spaceAfter=12, textColor=muted),
    "section": ParagraphStyle("section", fontName="Helvetica-Bold", fontSize=11, leading=14, textColor=ink, spaceBefore=10, spaceAfter=7, keepWithNext=True),
    "company": ParagraphStyle("company", fontName="Helvetica-Bold", fontSize=11, leading=14, textColor=ink, spaceBefore=8, spaceAfter=4, keepWithNext=True),
    "role": ParagraphStyle("role", fontName="Helvetica-Bold", fontSize=9.5, leading=12, textColor=ink, spaceBefore=4, spaceAfter=4, keepWithNext=True),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=9.5, leading=12.8, textColor=ink, spaceAfter=4),
    "bullet": ParagraphStyle("bullet", fontName="Helvetica", fontSize=9.5, leading=12.8, textColor=ink, leftIndent=10, firstLineIndent=-8, spaceAfter=3),
}

def clean(text):
    text = re.sub(r"&(?!#\d+;|#x[0-9a-fA-F]+;|[a-zA-Z]+;)", "&amp;", text)
    text = text.replace("<strong>", "<b>").replace("</strong>", "</b>")
    text = re.sub(r"<br\s*/?>", "<br/>", text)
    text = text.replace("—", " - ").replace("–", "-").replace("’", "'").replace("“", '"').replace("”", '"')
    return text

story = []
def add(text, style="body"):
    story.append(Paragraph(clean(text), styles[style]))

def employer(entry, detailed):
    add(entry["heading"], "company")
    for role_index, role in enumerate(entry["roles"]):
        add(role["subheading"].replace(" · ", " | "), "role")
        content = [p for p in role["content"] if not p.startswith("<strong>Tech:")]
        if detailed and entry is employers[0] and role_index > 0:
            # The earlier role summaries repeat the more specific bullets below.
            content = [p for p in content if p.startswith("•")]
        if not detailed:
            # Keep the original wording, with one supporting accomplishment.
            content = content[:2]
        for paragraph in content:
            if paragraph.startswith("•"):
                add("- " + paragraph.lstrip("• "), "bullet")
            else:
                add(paragraph)

add(data["meta"]["name"], "name")
add("Engineering Director | Frontend Architecture", "title")
add('<a href="mailto:hello@tyleringersoll.com">hello@tyleringersoll.com</a>  |  '
    '<a href="https://www.tyleringersoll.com">tyleringersoll.com</a><br/>'
    '<a href="https://www.linkedin.com/in/tyleringersoll">linkedin.com/in/tyleringersoll</a>  |  '
    '<a href="https://github.com/tyleringersoll">github.com/tyleringersoll</a>', "contact")
add(resume[0]["content"][0])
add("RECENT EXPERIENCE", "section")
for entry in employers[:2]:
    employer(entry, detailed=True)

story.append(PageBreak())
add("EARLIER EXPERIENCE", "section")
for entry in employers[2:]:
    employer(entry, detailed=False)

add("EDUCATION", "section")
education = next(entry for entry in resume if entry["heading"] == "Education")
add(education["content"][0].replace("<br>", " | "))
add("SELECTED TECHNICAL SKILLS", "section")
skills = next(entry["skills"] for entry in resume if entry.get("skills"))
for label, key in [("Languages", "languages"), ("Frameworks", "frameworks"), ("Architecture", "concepts")]:
    add("<b>" + label + ":</b> " + ", ".join(skills[key]))
add('<b>Projects:</b> <a href="https://ingersoll.dev">ingersoll.dev</a>  |  '
    '<b>Music:</b> <a href="https://tyleringersolldrums.com">tyleringersolldrums.com</a>')

def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor("#D5DCE1"))
    canvas.line(42, 34, 570, 34)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(muted)
    canvas.drawString(42, 22, "Tyler Ingersoll | tyleringersoll.com/resume")
    canvas.drawRightString(570, 22, str(doc.page))
    canvas.restoreState()

doc = SimpleDocTemplate(str(output), pagesize=letter, rightMargin=42, leftMargin=42,
                        topMargin=32, bottomMargin=44, title="Tyler Ingersoll - Resume",
                        author="Tyler Ingersoll")
doc.build(story, onFirstPage=footer, onLaterPages=footer)
print(output)
