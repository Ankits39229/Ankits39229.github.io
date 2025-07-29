import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get the PDF file path
    const filePath = path.join(process.cwd(), 'public', 'Ankit_Kumar_Resume.pdf');
    
    // Check if file exists
    try {
      await fs.access(filePath);
    } catch (error) {
      console.error('PDF file not found at:', filePath);
      return new NextResponse('PDF file not found', { status: 404 });
    }
    
    // Read the PDF file
    const pdfBuffer = await fs.readFile(filePath);
    
    // Return the PDF file with proper cache headers
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="Ankit_Kumar_Resume.pdf"',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error serving PDF:', error);
    return new NextResponse('Error serving PDF', { status: 500 });
  }
}
