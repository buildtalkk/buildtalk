"use client";
import { sendMessage } from "@/lib/actions";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const Newsletter = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Subscribed!");
  };

  return (
    <section id="newsletter">
      <hr className="w-11/12 mx-auto" />

      <div className="container py-24 sm:py-32">
        <h3 className="text-center text-4xl md:text-5xl font-bold">
          Join Our Daily{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Newsletter
          </span>
        </h3>
        <p className="text-xl text-muted-foreground text-center mt-4 mb-8">
          Lorem ipsum dolor sit amet consectetur.
        </p>

        <form
          className="flex flex-col w-full md:flex-row md:w-6/12 lg:w-4/12 mx-auto gap-4 md:gap-2"
          onSubmit={handleSubmit}
        >
          <Input
            placeholder="buildtalkk@gmail.com"
            className="bg-muted/50 dark:bg-muted/80 "
            aria-label="email"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            disabled={loading}
            onClick={() => {
              setLoading(true);
              sendMessage(`${value} Subscribed!`).then(() => {
                setValue("");
                setLoading(false);
                alert("성공적으로 구독되었습니다!");
              });
            }}
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            구독하기
          </Button>
        </form>
      </div>

      <hr className="w-11/12 mx-auto" />
    </section>
  );
};
