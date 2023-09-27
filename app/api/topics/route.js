import topicModel from "@/models/topicModel";
import dbConnect from "@/utils/mongoose";
import { NextResponse } from "next/server";

async function withDbConnection(handler) {
  try {
    await dbConnect();
    return await handler();
  } catch (error) {
    return NextResponse.json({ code: 500, msg: error.message });
  }
}

export async function GET() {
  return await withDbConnection(async () => {
    const topics = await topicModel.find();
    return NextResponse.json({ code: 200, msg: "success", data: topics });
  });
}

export async function POST(request) {
  const { title, description } = await request.json();
  return await withDbConnection(async () => {
    await topicModel.create({ title, description });
    return NextResponse.json({ code: 200, msg: "success" });
  });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  return await withDbConnection(async () => {
    await topicModel.findByIdAndDelete(id);
    return NextResponse.json({ code: 200, msg: "success" });
  });
}
