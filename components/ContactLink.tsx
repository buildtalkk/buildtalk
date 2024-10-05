import Link from "next/link";

const ContactLink = () => {
  return (
    <Link
      href="https://pf.kakao.com/_xnYaqn"
      className="text-sm text-gray-600 underline text-center mt-2"
      target={"_blank"}
    >
      용도 분류를 모르시겠나요? 전문가에게 문의주세요.
    </Link>
  );
};

export default ContactLink;
