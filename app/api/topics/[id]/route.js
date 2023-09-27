import dbConnect from "@/utils/mongoose";
import topicModel from "@/models/topicModel";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newTitle: title, newDescription: description } = await request.json();
  await dbConnect();
  await topicModel.findByIdAndUpdate(id, { title, description });
  return NextResponse.json({ code: 200, msg: "success" });
}

export async function GET(request, { params }) {
  const { id } = params;
  await dbConnect();
  const data = await topicModel.findOne({ _id: id });
  return NextResponse.json({ code: 200, msg: "success" ,data});
}
