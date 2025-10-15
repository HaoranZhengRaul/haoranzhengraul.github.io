#!/usr/bin/env python3
"""
Script to add metadata to research paper PDFs for better search engine indexing.
"""

from pypdf import PdfReader, PdfWriter
import sys
from pathlib import Path

def add_metadata_to_pdf(input_path, output_path, metadata):
    """
    Add metadata to a PDF file.

    Args:
        input_path: Path to the input PDF
        output_path: Path to save the output PDF
        metadata: Dictionary containing metadata fields
    """
    # Read the original PDF
    reader = PdfReader(input_path)
    writer = PdfWriter()

    # Copy all pages from reader to writer
    for page in reader.pages:
        writer.add_page(page)

    # Add metadata
    writer.add_metadata(metadata)

    # Write to output file
    with open(output_path, 'wb') as output_file:
        writer.write(output_file)

    print(f"✓ Metadata added successfully to: {output_path}")

def main():
    papers_dir = Path(__file__).parent / "papers"

    # Metadata for "Do AIs Dream of Electric Butterflies?" paper
    butterflies_metadata = {
        '/Title': 'Do AIs Dream of Electric Butterflies? Benchmarking LLM Consciousness via Theory-Grounded Self-Reports',
        '/Author': 'Haoran Zheng',
        '/Subject': 'A benchmark for evaluating consciousness-relevant traits in large language models through theory-grounded self-reports.',
        '/Keywords': 'AI consciousness, AI Consciousness, AI Welfare, AI welfare, LLMs, self-report, benchmark, ConsciousnessBench, cognitive science, large language models, machine consciousness',
        '/Creator': 'Haoran Zheng',
        '/Producer': 'Haoran Zheng Research',
    }

    # Metadata for SCENE paper
    scene_metadata = {
        '/Title': 'SCENE: Evaluating Explainable AI Techniques Using Soft Counterfactuals',
        '/Author': 'Haoran Zheng',
        '/Subject': 'An empirical evaluation framework for explainable AI techniques in NLP tasks using soft counterfactual explanations.',
        '/Keywords': 'explainable AI, XAI, AI Interpretability, counterfactuals, NLP, interpretability, machine learning, SCENE, explainability, natural language processing',
        '/Creator': 'Haoran Zheng',
        '/Producer': 'Haoran Zheng Research',
    }

    # Process Butterflies paper
    butterflies_input = papers_dir / "Do AIs Dream of Electric Butterflies? Benchmarking LLM Consciousness via Theory-Grounded Self-Reports.pdf"
    butterflies_output = papers_dir / "Do AIs Dream of Electric Butterflies? Benchmarking LLM Consciousness via Theory-Grounded Self-Reports.pdf.tmp"

    if butterflies_input.exists():
        print(f"\nProcessing: {butterflies_input.name}")
        add_metadata_to_pdf(butterflies_input, butterflies_output, butterflies_metadata)
        # Replace original with updated version
        butterflies_output.replace(butterflies_input)
        print(f"✓ Original file updated with metadata")
    else:
        print(f"✗ File not found: {butterflies_input}")

    # Process SCENE paper
    scene_input = papers_dir / "SCENE- Evaluating Explainable AI Techniques Using Soft Counterfactuals.pdf"
    scene_output = papers_dir / "SCENE- Evaluating Explainable AI Techniques Using Soft Counterfactuals.pdf.tmp"

    if scene_input.exists():
        print(f"\nProcessing: {scene_input.name}")
        add_metadata_to_pdf(scene_input, scene_output, scene_metadata)
        # Replace original with updated version
        scene_output.replace(scene_input)
        print(f"✓ Original file updated with metadata")
    else:
        print(f"✗ File not found: {scene_input}")

    print("\n" + "="*60)
    print("PDF metadata update complete!")
    print("="*60)

if __name__ == "__main__":
    main()
