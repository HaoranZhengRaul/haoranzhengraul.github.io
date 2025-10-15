#!/usr/bin/env python3
"""
Script to verify PDF metadata has been added correctly.
"""

from pypdf import PdfReader
from pathlib import Path

def display_metadata(pdf_path):
    """Display metadata from a PDF file."""
    reader = PdfReader(pdf_path)
    metadata = reader.metadata

    print(f"\n{'='*70}")
    print(f"Metadata for: {pdf_path.name}")
    print('='*70)

    if metadata:
        for key, value in metadata.items():
            print(f"{key:20s}: {value}")
    else:
        print("No metadata found in this PDF.")

    print('='*70)

def main():
    papers_dir = Path(__file__).parent / "papers"

    # Check both PDFs
    pdfs = [
        papers_dir / "Do AIs Dream of Electric Butterflies? Benchmarking LLM Consciousness via Theory-Grounded Self-Reports.pdf",
        papers_dir / "SCENE- Evaluating Explainable AI Techniques Using Soft Counterfactuals.pdf"
    ]

    print("\nPDF METADATA VERIFICATION")
    print("="*70)

    for pdf_path in pdfs:
        if pdf_path.exists():
            display_metadata(pdf_path)
        else:
            print(f"\n✗ File not found: {pdf_path}")

    print("\n✓ Verification complete!")

if __name__ == "__main__":
    main()
