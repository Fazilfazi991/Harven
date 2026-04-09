import urllib.request
import os

try:
    import PyPDF2
except ImportError:
    os.system("pip install PyPDF2")
    import PyPDF2

def read_pdf():
    try:
        reader = PyPDF2.PdfReader("HARVEN-Profile.pdf")
        text = ""
        for i in range(len(reader.pages)):
            text += f"\n--- Page {i+1} ---\n"
            text += reader.pages[i].extract_text()
        with open("pdf_text.txt", "w", encoding="utf-8") as f:
            f.write(text)
        print("Successfully extracted PDF to pdf_text.txt")
    except Exception as e:
        print(f"Error reading PDF: {str(e)}")

read_pdf()
