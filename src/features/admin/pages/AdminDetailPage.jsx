import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight, ExternalLink } from "lucide-react";

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
          "본인 인증을 위해 간편인증 또는 인증서 등의 인증수단이 필요할 수 있습니다.",
      },
      {
        title: "신고 후 확인",
        description:
          "전입신고가 정상적으로 처리되었는지 주민등록 주소를 확인하세요.",
      },
    ],
    button: "정부24에서 신청하기",
    buttonType: "link",
    buttonUrl:
      "https://www.gov.kr/mw/AA020InfoCappView.do?CappBizCD=13100000016",
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
          "임대차계약 후 보증금 보호와 관련된 중요한 절차이므로 빠르게 확인해두는 것이 좋습니다.",
      },
      {
        title: "온라인 신청",
        description:
          "인터넷등기소를 통해 온라인으로 확정일자 관련 서비스를 확인할 수 있습니다.",
      },
      {
        title: "준비물",
        description: "임대차계약서와 본인 인증에 필요한 수단을 준비하세요.",
      },
    ],
    button: "인터넷등기소에서 확인하기",
    buttonType: "link",
    buttonUrl: "https://www.iros.go.kr/",
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
          "신고 대상에 해당한다면 계약 체결일로부터 30일 이내에 신고해야 합니다.",
      },
      {
        title: "온라인 신청",
        description:
          "부동산거래관리시스템을 통해 임대차 신고를 진행할 수 있습니다.",
      },
    ],
    button: "부동산거래관리시스템에서 신고하기",
    buttonType: "link",
    buttonUrl: "https://rtms.molit.go.kr/main/main.do",
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
    buttonType: "disabled",
    helpTitle: "차량 주차 등록은 이렇게 하세요",
    helpDescription:
      "건물마다 차량 등록 방법과 필요한 서류가 다릅니다. 입주 후 관리사무소에 차량 등록 가능 여부와 등록 방법을 문의하세요.",
    helpSteps: [
      "관리사무소에 차량 등록 가능 여부를 확인하세요.",
      "차량번호와 입주자 정보를 준비하세요.",
      "등록비와 주차 가능 대수를 확인하세요.",
      "방문 차량 등록 방법도 함께 확인하세요.",
    ],
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
          이전으로
        </button>
      </div>
    );
  }

  const handleMainButton = () => {
    if (content.buttonType === "link" && content.buttonUrl) {
      window.open(content.buttonUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="min-h-screen bg-white px-5 py-7 pb-10 max-w-md mx-auto">
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

                <div className="min-w-0">
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
        onClick={handleMainButton}
        disabled={content.buttonType === "disabled"}
        className={`mt-6 w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 ${
          content.buttonType === "link"
            ? "bg-[#EAFEF1] text-[#25D383] active:scale-[0.98]"
            : "bg-gray-100 text-gray-400 cursor-default"
        }`}
      >
        {content.button}

        {content.buttonType === "link" && (
          <ExternalLink size={17} strokeWidth={2.5} />
        )}
      </button>

      {/* 외부 사이트 안내 */}
      {content.buttonType === "link" && (
        <p className="mt-2 text-center text-xs text-gray-400">
          버튼을 누르면 외부 사이트로 이동합니다.
        </p>
      )}

      {/* 외부 사이트가 없는 경우 설명 */}
      {content.buttonType === "disabled" && (
        <div className="mt-5 p-4 rounded-2xl bg-gray-50">
          <h3 className="font-bold text-gray-900 text-sm">
            {content.helpTitle}
          </h3>

          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            {content.helpDescription}
          </p>

          <div className="mt-4 space-y-3">
            {content.helpSteps.map((step, index) => (
              <div key={step} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 text-[11px] font-bold text-gray-500">
                  {index + 1}
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 목록으로 돌아가기 */}
      <button
        type="button"
        onClick={() => navigate("/admin")}
        className="mt-4 w-full flex items-center justify-center gap-1 py-4 rounded-2xl border border-gray-200 bg-white text-gray-700 font-semibold"
      >
        이전으로
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
