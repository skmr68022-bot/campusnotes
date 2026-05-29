import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getSubject } from "@/data/courses";

type CreateOrderRequest = {
  courseSlug?: string;
  semesterNumber?: number;
  subjectSlug?: string;
};

export async function POST(req: Request) {
  try {
    const { courseSlug, semesterNumber, subjectSlug }: CreateOrderRequest = await req.json();

    if (!courseSlug || !Number.isInteger(semesterNumber) || !subjectSlug) {
      return NextResponse.json({ error: "Invalid subject selection" }, { status: 400 });
    }

    const subject = getSubject(courseSlug, semesterNumber as number, subjectSlug);

    if (!subject || subject.price <= 0) {
      return NextResponse.json({ error: "Subject bundle not available" }, { status: 404 });
    }

    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: "Razorpay keys missing" }, { status: 500 });
    }

    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: subject.price * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: true,
      notes: {
        courseSlug,
        semesterNumber: String(semesterNumber),
        subjectSlug,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("RAZORPAY_ORDER_ERROR:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
