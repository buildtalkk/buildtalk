"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "빌드톡은 어떤 서비스인가요?",
    answer:
      "빌드톡은 건축 인허가 절차를 간소화하여, 필요한 서류와 절차를 한눈에 확인할 수 있도록 도와드립니다. ",
    value: "item-1",
  },
  {
    question:
      "건축 인허가 절차가 복잡한데, 빌드톡을 이용하면 어떤 점이 더 쉬워지나요?",
    answer:
      "빌드톡은 건축 인허가 절차를 간소화하여, 필요한 서류와 절차를 한눈에 확인할 수 있도록 도와드립니다.",
    value: "item-2",
  },
  {
    question: "빌드톡의 서비스는 어떤 지역에서 이용할 수 있나요?",
    answer:
      "현재는 제주도 일부지역에서 검토가능하며, 점차 전국으로 확대해나갈 예정입니다.",
    value: "item-3",
  },
  {
    question: "빌드톡의 서비스는 어떤 비용이 발생하나요?",
    answer: "현재 빌드톡의 간단한 검토비용은 무료입니다.",
    value: "item-4",
  },
  {
    question: "전문 건축사와의 상담은 어떻게 이루어지나요?",
    answer:
      "빌드톡 웹사이트에서 간편하게 상담 예약을 할 수 있습니다. 원하는 날짜와 시간을 선택하고 필요한 정보를 입력하면 전문 건축사와의 상담을 예약할 수 있습니다.",
    value: "item-5",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion type="single" collapsible className="w-full AccordionRoot">
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        궁굼한 점이 더 있으신가요? 그렇다면 편하게 연락주세요.{" "}
        <a
          rel="noreferrer noopener"
          href="#https://docs.google.com/forms/d/1yYalkCYn0yUr744ObSHua9cO188HemMJTR0MpT471F4/viewform?edit_requested=true"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
};
