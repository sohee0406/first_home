import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const CHECKLIST_CONTENT = {
  registry: {
    title: "등기부등본",
    subtitle: "소유자의 권리관계를 확인하세요",
    intro:
      "등기부등본은 계약하려는 집의 소유자와 권리관계를 확인할 수 있는 중요한 서류입니다.",

    sections: [
      {
        title: "소유자 확인",
        description:
          "등기부등본에 적힌 소유자와 실제 계약하려는 임대인의 정보가 일치하는지 확인하세요.",
      },
      {
        title: "근저당 확인",
        description:
          "집을 담보로 대출이 설정되어 있는지 확인하세요. 근저당이 있다면 채권최고액도 함께 살펴보세요.",
      },
      {
        title: "압류·가압류 확인",
        description:
          "압류, 가압류, 가처분 등 소유권과 관련된 권리관계가 있는지도 확인하세요.",
      },
    ],

    tip: "등기부등본은 계약 당일에도 다시 확인하는 것이 좋습니다.",
  },

  landlord: {
    title: "임대인 정보",
    subtitle: "실제 집주인과 계약하는지 확인하세요",
    intro:
      "계약하는 사람이 실제 소유자인지 확인하는 것은 안전한 계약을 위해 꼭 필요한 과정입니다.",

    sections: [
      {
        title: "신분증 확인",
        description:
          "임대인의 신분증과 등기부등본에 적힌 소유자 정보를 비교해보세요.",
      },
      {
        title: "대리인 계약 확인",
        description:
          "집주인이 아닌 대리인이 나온 경우 위임장과 필요한 서류를 확인하세요.",
      },
      {
        title: "계좌 명의 확인",
        description:
          "보증금이나 계약금을 송금할 때 임대인 또는 적법한 권한이 있는 사람의 계좌인지 확인하세요.",
      },
    ],

    tip: "임대인 정보가 조금이라도 맞지 않는다면 계약 전에 반드시 확인하세요.",
  },

  mortgage: {
    title: "근저당",
    subtitle: "근저당 설정 여부를 확인하세요",
    intro:
      "근저당은 집을 담보로 설정된 권리입니다. 보증금의 안전과 관련될 수 있어 반드시 확인해야 합니다.",

    sections: [
      {
        title: "근저당권 설정 여부",
        description:
          "등기부등본의 을구에서 근저당권이 설정되어 있는지 확인하세요.",
      },
      {
        title: "채권최고액 확인",
        description:
          "근저당이 설정되어 있다면 채권최고액을 확인하고 보증금과 함께 위험성을 살펴보세요.",
      },
      {
        title: "다른 권리관계 확인",
        description:
          "근저당 외에도 압류나 가압류 등이 함께 설정되어 있는지 확인하세요.",
      },
    ],

    tip: "권리관계가 복잡하거나 위험성이 의심된다면 전문가에게 확인받는 것이 좋습니다.",
  },

  "management-fee": {
    title: "관리비",
    subtitle: "관리비 포함 항목을 확인하세요",
    intro:
      "월세 외에 매달 추가로 발생하는 비용을 미리 확인하면 예상하지 못한 지출을 줄일 수 있습니다.",

    sections: [
      {
        title: "관리비 금액",
        description: "매달 고정적으로 납부하는 관리비가 얼마인지 확인하세요.",
      },
      {
        title: "포함 항목",
        description:
          "수도, 인터넷, 공용 전기 등 어떤 항목이 관리비에 포함되는지 확인하세요.",
      },
      {
        title: "별도 비용",
        description:
          "관리비와 별도로 납부해야 하는 전기, 가스, 수도 등의 비용이 있는지도 확인하세요.",
      },
    ],

    tip: "관리비가 얼마인지뿐 아니라 무엇이 포함되어 있는지까지 확인하는 것이 중요합니다.",
  },

  "special-clause": {
    title: "특약사항",
    subtitle: "계약서에 합의한 내용을 남겨두세요",
    intro:
      "특약사항은 임대인과 임차인이 계약 전에 합의한 내용을 계약서에 기록하는 부분입니다.",

    sections: [
      {
        title: "수리 책임",
        description:
          "입주 전 발견된 하자나 수리해야 할 부분에 대한 처리 내용을 확인하세요.",
      },
      {
        title: "계약 조건",
        description:
          "계약 당사자 간 별도로 합의한 내용을 구체적으로 작성하세요.",
      },
      {
        title: "구두 약속 기록",
        description:
          "말로만 약속한 내용이 있다면 계약서에 기록되어 있는지 확인하세요.",
      },
    ],

    tip: "특약은 모호하게 작성하기보다 누가, 언제, 무엇을 할지 구체적으로 작성하는 것이 좋습니다.",
  },
};

export default function ContractChecklistDetailPage() {
  const { type } = useParams();
  const navigate = useNavigate();

  const content = CHECKLIST_CONTENT[type];

  // 잘못된 주소로 접근했을 경우
  if (!content) {
    return (
      <div className="min-h-screen bg-white px-5 py-10 max-w-md mx-auto">
        <h1 className="text-xl font-bold text-gray-900">
          페이지를 찾을 수 없어요
        </h1>

        <button
          onClick={() => navigate("/checklist/contract")}
          className="mt-6 w-full py-4 rounded-2xl bg-emerald-500 text-white font-bold"
        >
          계약 체크리스트로 돌아가기
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
          <span className="text-emerald-500">{content.subtitle}</span>
        </h1>

        <p className="mt-3 text-sm text-gray-500 leading-relaxed">
          {content.intro}
        </p>
      </div>

      {/* 확인 항목 */}
      <div className="mt-7">
        <h2 className="text-base font-bold text-gray-900 mb-3">
          이렇게 확인하세요
        </h2>

        <div className="space-y-3">
          {content.sections.map((section, index) => (
            <div key={section.title} className="p-4 rounded-2xl bg-gray-50">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-xs font-bold">
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

      {/* TIP */}
      <div className="mt-6 p-4 rounded-2xl border border-emerald-100 bg-emerald-50">
        <p className="text-sm font-semibold text-emerald-700">TIP</p>

        <p className="mt-1 text-sm text-gray-600 leading-relaxed">
          {content.tip}
        </p>
      </div>

      {/* 목록으로 */}
      <button
        onClick={() => navigate("/checklist/contract")}
        className="mt-6 w-full flex items-center justify-center gap-1 py-4 rounded-2xl border border-gray-200 bg-white text-gray-700 font-semibold"
      >
        계약 체크리스트 보기
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
