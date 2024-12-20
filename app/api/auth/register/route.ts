import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const { data: { user }, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/auth`,
      },
    });

    if (error) {
      return new NextResponse(error.message, { status: 400 });
    }

    // Check if the user needs to verify their email
    if (user?.identities?.length === 0) {
      return new NextResponse(
        "Account exists. Please check your email for verification.",
        { status: 400 }
      );
    }

    return NextResponse.json({
      user,
      message: "Check your email for the confirmation link.",
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
