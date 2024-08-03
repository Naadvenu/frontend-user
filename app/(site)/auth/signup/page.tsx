import Signup from "@/components/Auth/Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up Page - Naadvenu Flute Classes",
  description: "This is Sign Up page for Naadvenu Flute Classes",
  // other metadata
};

export default function Register() {
  return (
    <>
      <Signup />
    </>
  );
}
