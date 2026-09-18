import { Link, useSearchParams } from "react-router-dom";

const CHECKLISTS = [
  { label: "집 보러 가기 전", to: "/checklist/before-visit" },
  { label: "주변 점검", to: "/checklist/around" },
  { label: "현장 점검", to: "/checklist/on-site" },
  { label: "계약 전", to: "/checklist/contract-final" },
  { label: "입주 전", to: "/checklist/move-in" },
  { label: "입주 후 챙길 일", to: "/admin" },
];

export default function ChecklistHubPage() {
  const [searchParams] = useSearchParams();

  const houseId = searchParams.get("houseId");

  const getPath = (path) => {
    if (!houseId) {
      return path;
    }

    if (path === "/admin") {
      return `${path}?houseId=${houseId}`;
    }

    return `${path}?houseId=${houseId}`;
  };

  return (
    <div className="bg-white px-4 pt-8 pb-12 max-w-md mx-auto flex flex-col justify-start">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">
          어떤 체크리스트를
          <br />
          보실 건가요?
        </h1>

        <p className="text-[14px] text-gray-500 mt-2">
          원하시는 점검 단계를 선택해 확인해보세요.
        </p>
      </div>

      <div className="flex flex-col space-y-3">
        {CHECKLISTS.map((c) => (
          <Link
            key={c.to}
            to={getPath(c.to)}
            className="w-full py-4 px-6 bg-[#F8F9FA]  text-gray-900 font-semibold text-center rounded-2xl transition-all duration-150"
          >
            {c.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
