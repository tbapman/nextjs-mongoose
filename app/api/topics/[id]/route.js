import dbConnect from "@/utils/mongoose";
import topicModel from "@/models/topicModel";
import { NextResponse } from "next/server";

async function withDbConnection(handler) {
  try {
    await dbConnect();
    return await handler();
  } catch (error) {
    return NextResponse.json({ code: 500, msg: error.message });
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  const { newTitle: title, newDescription: description } = await request.json();
  return await withDbConnection(async () => {
    await topicModel.findByIdAndUpdate(id, { title, description });
    return NextResponse.json({ code: 200, msg: "success" });
  });
}

export async function GET(request, { params }) {
  const { id } = params;

  return await withDbConnection(async () => {
    const data = await topicModel.findOne({ _id: id });
    return NextResponse.json({ code: 200, msg: "success", data });
  });
}
