import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const ADMIN_CONTENT = {
  moveIn: {
    title: "전입신고",
    subtitle: "새로운 주소로 주민등록을 이전하세요",
    intro:
      "이사 후 새로운 거주지로 주민등록 주소를 변경하는 절차입니다. 전입한 날부터 14일 이내에 신고해야 합니다.",
    sections: [
      {
        title: "온라인 신청",
        description: "정부24를 통해 온라인으로 전입신고를 신청할 수 있습니다.",
      },
      {
        title: "신청 전 확인",
        description:
          "본인 인증을 위해 공동인증서, 금융인증서 등의 인증수단이 필요할 수 있습니다.",
      },
      {
        title: "신고 후 확인",
        description:
          "전입신고가 정상적으로 처리되었는지 주민등록 주소를 확인하세요.",
      },
    ],
    button: "정부24에서 신청하기",
  },

  fixedDate: {
    title: "확정일자",
    subtitle: "임대차계약서에 확정일자를 받아두세요",
    intro:
      "확정일자는 임대차계약서에 계약 체결 날짜를 공식적으로 확인받는 절차입니다.",
    sections: [
      {
        title: "왜 필요한가요?",
        description:
          "주택 임대차계약에서 보증금 보호와 관련된 중요한 절차이므로 계약 후 빠르게 받아두는 것이 좋습니다.",
      },
      {
        title: "온라인 신청",
        description:
          "인터넷등기소 등을 통해 온라인으로 확정일자를 신청할 수 있습니다.",
      },
      {
        title: "준비물",
        description: "임대차계약서와 본인 인증에 필요한 수단을 준비하세요.",
      },
    ],
    button: "확정일자 확인하기",
  },

  rentalReport: {
    title: "임대차 신고",
    subtitle: "계약 내용을 신고하세요",
    intro:
      "주택 임대차계약을 체결했다면 신고 대상인지 확인하고 정해진 기간 안에 신고해야 합니다.",
    sections: [
      {
        title: "신고 대상 확인",
        description:
          "보증금이나 월세 등 계약 조건에 따라 신고 대상 여부를 확인하세요.",
      },
      {
        title: "신고 기간",
        description:
          "계약 체결 후 신고 대상에 해당한다면 정해진 기간 안에 신고해야 합니다.",
      },
      {
        title: "온라인 신청",
        description:
          "부동산거래관리시스템을 통해 임대차 신고를 진행할 수 있습니다.",
      },
    ],
    button: "부동산거래관리시스템",
  },

  parking: {
    title: "차량 주차 등록",
    subtitle: "입주 후 차량 등록을 확인하세요",
    intro:
      "아파트나 오피스텔 등 관리사무소에서 차량 등록이 필요한 경우 입주 후 등록 절차를 확인하세요.",
    sections: [
      {
        title: "등록 방법 확인",
        description:
          "거주하는 건물의 관리사무소에 차량 등록 방법과 필요한 서류를 문의하세요.",
      },
      {
        title: "차량 정보 준비",
        description:
          "차량번호와 입주자 정보를 준비하면 등록 절차를 진행하기 편합니다.",
      },
      {
        title: "주차 조건 확인",
        description:
          "주차 가능 대수, 등록비, 방문 차량 등록 방법 등도 함께 확인하세요.",
      },
    ],
    button: "관리사무소에 문의하기",
  },
};

export default function AdminDetailPage() {
  const { type } = useParams();
  const navigate = useNavigate();

  const content = ADMIN_CONTENT[type];

  if (!content) {
    return (
      <div className="min-h-screen bg-white px-5 py-10 max-w-md mx-auto">
        <h1 className="text-xl font-bold text-gray-900">
          페이지를 찾을 수 없어요
        </h1>

        <button
          onClick={() => navigate("/admin")}
          className="mt-6 w-full py-4 rounded-2xl bg-[#25D383] text-white font-bold"
        >
          입주 관리로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-5 py-7 max-w-md mx-auto">
      {/* 제목 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 leading-snug">
          {content.title}
          <br />
          <span className="text-[#25D383]">{content.subtitle}</span>
        </h1>

        <p className="mt-3 text-sm text-gray-500 leading-relaxed">
          {content.intro}
        </p>
      </div>

      {/* 확인 내용 */}
      <div className="mt-7">
        <h2 className="text-base font-bold text-gray-900 mb-3">
          이렇게 확인하세요
        </h2>

        <div className="space-y-3">
          {content.sections.map((section, index) => (
            <div key={section.title} className="p-4 rounded-2xl bg-gray-50">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#EAFEF1] text-[#25D383] flex items-center justify-center shrink-0 text-xs font-bold">
                  {index + 1}
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">{section.title}</h3>

                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {section.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 주요 버튼 */}
      <button
        type="button"
        className="mt-6 w-full py-4 rounded-2xl bg-[#EAFEF1] text-[#25D383] font-bold"
      >
        {content.button}
      </button>

      {/* 목록으로 돌아가기 */}
      <button
        type="button"
        onClick={() => navigate("/admin")}
        className="mt-3 w-full flex items-center justify-center gap-1 py-4 rounded-2xl border border-gray-200 bg-white text-gray-700 font-semibold"
      >
        입주 관리로 돌아가기
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
