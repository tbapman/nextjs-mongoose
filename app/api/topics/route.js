import topicModel from "@/models/topicModel";
import dbConnect from "@/utils/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const topics = await topicModel.find();
  return NextResponse.json({ code: 200, msg: "success", data: topics });
}

export async function POST(request) {
  const { title, description } = await request.json();
  await dbConnect();
  await topicModel.create({ title, description });
  return NextResponse.json({ code: 200, msg: "success" });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await dbConnect();
  await topicModel.findByIdAndDelete(id);
  return NextResponse.json({ code: 200, msg: "success" });
}
