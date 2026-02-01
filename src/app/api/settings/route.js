import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.setting.findMany();
    // Convert array of {key, value} to object
    const content = {};
    settings.forEach(s => {
        try {
            content[s.key] = JSON.parse(s.value);
        } catch {
            content[s.key] = s.value;
        }
    });
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching settings' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    // Data is object { aboutUsTitle: "...", ... }
    const promises = Object.keys(data).map(key => {
        return prisma.setting.upsert({
            where: { key },
            update: { value: JSON.stringify(data[key]) },
            create: { key, value: JSON.stringify(data[key]) }
        });
    });
    await Promise.all(promises);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error saving settings' }, { status: 500 });
  }
}
