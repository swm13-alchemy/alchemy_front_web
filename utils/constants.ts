import { MergedNutrientDataType } from './types'

// export const ESSENTIAL_NUTRIENTS_LIST: string[] = ['VitaminC', 'VitaminD', 'VitaminB1', 'VitaminB2', 'VitaminB3',
//   'VitaminB5', 'VitaminB6', 'VitaminB7', 'VitaminB9', 'VitaminB12', 'Omega-3', 'Magnesium', 'Calcium', 'Probiotics']
// C, D, B군, 오메가3, 마그네슘, 칼슘, 프로바이오틱스(유산균)
export type Essential14Nutrients = '비타민C' | '비타민D' | '비타민B1' | '비타민B2' | '나이아신(B3)' | '판토텐산(B5)' | '비타민B6' |
  '비오틴' | '엽산' | '비타민B12' | '오메가3(EPA+DHA)' | '마그네슘' | '칼슘' | '프로바이오틱스(유산균)'
export type EssentialNutrientsTakeCheckType = {
  [essentialNutrient in Essential14Nutrients]: boolean
}
export const ESSENTIAL_NUTRIENTS_LIST = [
  {
    "id": 121,
    "name": "비타민C",
    "tips": [
      "비타민C는 몸에 잘 저장되지 않아 꾸준히 섭취를 해주는 것이 좋아요.",
      "✔️ [영양제]로서 일일섭취량은 30~1000mg을 권장하고 있어요.\n✔️ [식품]으로서 1일 영양성분 기준치는 100mg이에요.\n✔️ [한국인 영양소 섭취기준]에 따르면, \n식사와 영양제를 모두 포함해서 100~2000mg를 섭취하도록 권장하고 있어요. 나이와 성별에 따라 범위가 달라져요. \n\n평소 균형 잡힌 식사를 하고 있다면 영양제로는 200~500μg정도를 챙겨드시는 것이 적절해요. 한꺼번에 너무 많이 복용하기 보다는 적당한 양을 꾸준히 복용하는 것이 좋아요.\n\n\n많이 먹어도 소변으로 배출되기 때문에 고용량을 먹어도 괜찮지만, 한번에 너무 많이 섭취하는 것은 흡수 효율이 낮아요. 한번에 1000mg이하로 여러번 나눠서 충분한 물과 함께 드시는 걸 추천해요."
    ],
    "unit": "mg",
    "sub_names": ["아스코르브산"],
    "lack_info": "잇몸에서 피가 나거나, 상처가 잘 낫지 않아요. 콜라겐 합성이 원활하지 않아서 모세혈관이 약해지기 때문이에요. 쉽게 피곤해지거나, 면역력이 낮아지기도 해요.",
    "over_info": "속이 쓰리거나, 설사를 할 수 있어요. 수분 섭취가 부족하면 요로결석이 생길 수 있으니 주의하세요."
  },
  {
    "id": 105,
    "name": "비타민D",
    "tips": [
      "적당한 양을 꾸준히 섭취하시는 게 가장 좋지만, 상황에 따라서는 고용량을 섭취하시는 것도 가능해요.",
      "✔️ [영양제]로서 일일섭취량은 3~10μg을 권장하고 있어요.\n✔️ [식품]으로서 1일 영양성분 기준치는 10μg이에요.\n✔️ [한국인 영양소 섭취기준]에 따르면, \n식사와 영양제를 모두 포함해서 10~100μg를 섭취하도록 권장하고 있어요. 나이와 성별에 따라 범위가 달라져요. \n\n건강한 사람이 매일 적당히 섭취하려면 25~50μg의 제품을 고르는 걸 추천해요. 50~100μg 정도 고용량의 비타민D를 드실때에는 혈액검사를 통해 비타민D 수치를 확인하시는 것이 좋아요!\n\n비타민D는 비타민D는 섭취했을 때 간이나 지방세포에 저장돼, 몸에 오래 남아 있는 영양소에요. 그래서 적당한 용량을 매일매일 복용해도 되지만, 고용량을 며칠에 한번씩 섭취하는 것도 가능해요."
    ],
    "unit": "μg",
    "sub_names": ["콜레칼시페롤(D3)", "에르고칼시페롤(D2)"],
    "lack_info": "골다공증 위험이 높아질 수 있어요. 면역세포들이 건강하게 만들어지지 않아서, 면역력이 낮아지기도 해요.",
    "over_info": "속이 불편하거나 변비 또는 설사가 생길 수 있어요. 심하면 혈관이나 관절에 칼슘이 쌓여서 딱딱하게 굳는 '석회화'가 생길 수 있어요."
  },
  {
    "id": 122,
    "name": "비타민B1",
    "tips": [
      "비타민B1은 수용성 비타민으로, 몸에 잘 남아있지 않고 쉽게 배출되는 성질을 가지고 있어요. 그래서 필요한 만큼 사용되고 남으면 소변을 통해 빠져나가요.",
      "✔️ [영양제]로서 일일섭취량은 0.36~100mg을 권장하고 있어요.\n✔️ [식품]으로서 1일 영양성분 기준치는 1.2g이에요.\n✔️ [한국인 영양소 섭취기준]에 따르면, \n식사와 영양제를 모두 포함해서 1.1mg이상 섭취하도록 권장하고 있어요. 나이와 성별에 따라 범위가 달라져요. \n✔️ 피로회복 같은 효과를 얻기 위해서는 나에게 맞는 섭취량을 찾는 것이 중요해요. 일반적으로 50mg 이상 고용량을 섭취했을때 효과가 나타나는 경우가 많아요."
    ],
    "unit": "mg",
    "sub_names": ["티아민", "벤포티아민", "푸르설티아민", "비스벤티아민"],
    "lack_info": "활력이 낮아지고, 피로가 심해져요. 근육통이 생기거나 근력이 약해지고, 신경세포에도 문제가 생겨서 감각에 이상이 생길 수도 있어요.",
    "over_info": "나타날 수 있는 문제는 흔하지 않아요."
  },
  {
    "id": 128,
    "name": "비타민B2",
    "tips": [
      "비타민B2는 수용성 비타민으로, 몸에 잘 남아있지 않고 쉽게 배출되는 성질을 가지고 있어요. 그래서 필요한 만큼 사용되고 남으면 소변을 통해 빠져나가요.",
      ""
    ],
    "unit": "mg",
    "sub_names": ["리보플라빈", "리보플라빈부티레이트", "리보플라빈포스페이트"],
    "lack_info": "활력이 낮아지고, 피로가 심해져요. 눈이나 입, 피부에 염증이 잘 생길 수 있어요.",
    "over_info": "나타날 수 있는 문제는 흔하지 않아요."
  },
  {
    "id": 131,
    "name": "나이아신(B3)",
    "tips": [
      "영양성분의 형태에 따라 최적섭취량이 달라요",
      "나이아신은 수용성 비타민으로, 몸에 잘 남아있지 않고 쉽게 배출되는 성질을 가지고 있어요. 그래서 필요한 만큼 사용되고 남으면 소변을 통해 빠져나가요."
    ],
    "unit": "",
    "sub_names": ["비타민B3", "NMN", "NR", "NAD"],
    "lack_info": "활력이 낮아지고, 피로가 심해져요. 피부에 염증이 잘 생기거나, 설사를 자주 할 수 있어요. 피부나 장 세포가 손상되었을 때, 건강하게 재생되지 않기 때문이에요.",
    "over_info": "모세혈관이 넓어져서 얼굴이 붉어지고, 두드러기가 생길 수 있어요. 심하면 간기능이 나빠질 수 있다는 보고가 있으니 주의하세요."
  },
  {
    "id": 147,
    "name": "판토텐산(B5)",
    "tips": [
      "50mg 이상 섭취하시는 게 가장 좋아요!",
      "판토텐산은 수용성 비타민으로, 몸에 잘 남아있지 않고 쉽게 배출되는 성질을 가지고 있어요. 그래서 필요한 만큼 사용되고 남으면 소변을 통해 빠져나가요."
    ],
    "unit": "",
    "sub_names": ["비타민B5"],
    "lack_info": "스트레스를 조절하는 호르몬이 잘 만들어지지 않아 피로하고 면역력이 낮아질 수 있어요. 흔하지 않지만, 혈당을 조절하는 호르몬이 잘 만들어지지 않아 어지러운 '저혈당' 증상이 나타날 수 있어요.",
    "over_info": "나타날 수 있는 문제는 흔하지 않지만, 설사를 할 수 있으니 주의하세요."
  },
  {
    "id": 136,
    "name": "비타민B6",
    "tips": [
      "50mg 이상 섭취하시는 게 가장 좋아요!",
      "비타민B6는 수용성 비타민으로, 몸에 잘 남아있지 않고 쉽게 배출되는 성질을 가지고 있어요. 그래서 필요한 만큼 사용되고 남으면 소변을 통해 빠져나가요."
    ],
    "unit": "mg",
    "sub_names": ["피리독신", "피리독살포스페이트"],
    "lack_info": "세포가 건강하게 재생되지 못해서 피부나 입 주위에 염증이 잘 생길 수 있어요. 산소를 전달해주는 적혈구도 정상적으로 만들어지지 않아, 쉽게 피곤해지거나 어지럽고 집중력이 낮아질 수 있어요.",
    "over_info": "손발이 저리거나 감각이 무뎌질 수 있어요. 특히 6개월 이상 지속적으로 500mg 이상 섭취하거나, 단기간이라도 1일 1g 이상 섭취하면 신경에 심각한 문제가 생길 수 있으니 반드시 주의하세요!"
  },
  {
    "id": 148,
    "name": "비오틴",
    "tips": [
      "50μg 이상 섭취하시는 게 가장 좋아요!",
      "비오틴은 수용성 비타민으로, 몸에 잘 남아있지 않고 쉽게 배출되는 성질을 가지고 있어요. 그래서 필요한 만큼 사용되고 남으면 소변을 통해 빠져나가요."
    ],
    "unit": "μg",
    "sub_names": ["비타민B7"],
    "lack_info": "머리카락이 건강하게 자라지 못하고, 손톱이 약해질 수 있어요. 모발과 손톱의 재료가 되는 '케라틴'을 잘 합성하지 못하기 때문이에요. 지루성 피부염이 생기기도 해요.",
    "over_info": "나타날 수 있는 문제는 흔하지 않아요. 다만 갑상선이나 심장에 질환이 있는지 확인하는 진단 검사에 오류가 생길 수 있다는 보고가 있으니, 고용량 비오틴을 섭취하고 있다면 건강 검진을 할 때 의료진에게 미리 알리는 게 좋아요."
  },
  {
    "id": 139,
    "name": "엽산",
    "tips": [
      "400μg 이상 섭취하시는 게 가장 좋아요!",
      "엽산은 수용성 비타민으로, 몸에 잘 남아있지 않고 쉽게 배출되는 성질을 가지고 있어요. 그래서 필요한 만큼 사용되고 남으면 소변을 통해 빠져나가요."
    ],
    "unit": "μg",
    "sub_names": ["비타민B9", "폴레이트", "폴산", "쿼트라폴릭"],
    "lack_info": "산소를 전달해주는 적혈구가 정상적으로 만들어지지 않아, 쉽게 피곤해지거나 어지럽고 집중력이 낮아질 수 있어요.",
    "over_info": "속이 불편하거나 설사를 할 수 있어요. 심하면 신장에 무리가 가거나, 신경이 손상될 위험이 있으니 주의하세요."
  },
  {
    "id": 142,
    "name": "비타민B12",
    "tips": [
      "50μg 이상 섭취하시는 게 가장 좋아요!",
      "비타민B12는 수용성 비타민으로, 몸에 잘 남아있지 않고 쉽게 배출되는 성질을 가지고 있어요. 그래서 필요한 만큼 사용되고 남으면 소변을 통해 빠져나가요."
    ],
    "unit": "μg",
    "sub_names": ["코발라민", "시아노코발라민", "히드록소코발라민", "메코발라민"],
    "lack_info": "손발이 저리고, 어깨나 허리 같은 곳이 아플 수 있어요. 신경세포가 건강하게 재생되지 못하기 때문이에요. 산소를 전달해주는 적혈구도 정상적으로 만들어지지 않아, 쉽게 피곤해지거나 어지럽고 집중력이 낮아질 수 있어요.",
    "over_info": "나타날 수 있는 문제는 흔하지 않아요."
  },
  {
    "id": 369,
    "name": "오메가3(EPA+DHA)",
    "tips": [
      "EPA와 DHA에 대한 연구자료가 가장 많으므로, 이 두 가지를 기준으로 제품을 고르면 돼요.",
      "기대하는 효과에 따라 섭취해야하는 양이 달라져요\n두뇌활동 개선: 0.9~2g\n눈 건강: 0.6~2.24g\n혈액순환 개선: 0.5~2g\n혈중 중성지방 개선: 0.5~2g"
    ],
    "unit": "",
    "sub_names": ["에이코사펜타엔산(EPA)", "도코사헥사엔산(DHA)", "알파리놀렌산(ALA)", "도코사펜타엔산(DPA)"],
    "lack_info": "",
    "over_info": ""
  },
  {
    "id": 203,
    "name": "마그네슘",
    "tips": [
      "200mg 이상 섭취하시는 게 가장 좋아요!",
      "마그네슘을 음식으로 충분히 챙겨 먹는 것은 건강에 좋지만, 영양제로 많이 먹으면 문제가 생길 수 있어요. 영양제를 통해 먹는 마그네슘은 350mg을 넘지 않는 것이 좋아요."
    ],
    "unit": "mg",
    "sub_names": [],
    "lack_info": "눈 밑이 떨리거나 근육이 뭉치고, 몸이 무겁게 느껴질 수 있어요. 편안하게 이완되지 않기 때문에 심리적으로도 불안하게 느껴질 수 있어요.",
    "over_info": "속이 불편하거나 설사를 할 수 있어요. 심하면 신장 기능이 약해지거나 혈압에 문제가 생길 수 있으니 주의하세요."
  },
  {
    "id": 201,
    "name": "칼슘",
    "tips": [
      "평소 자주 먹는 음식을 확인해보고, 부족한만큼 영양제로 보충하는 것이 좋아요",
      "✔️ [영양제]로서 일일섭취량은 210~800mg을 권장하고 있어요.\n✔️ [식품]으로서 1일 영양성분 기준치는 700mg이에요.\n✔️ [한국인 영양소 섭취기준]에 따르면, \n식사와 영양제를 모두 포함해서 700~2500mg를 섭취하도록 권장하고 있어요. 나이와 성별에 따라 범위가 달라져요. \n✔️ [국민건강통계]에 따르면, \n음식으로 섭취하는 비타민A는 평균적으로 약 400~500mg정도에요. \n\n평소 균형 잡힌 식사를 하고 있다면 영양제로는 200~600mg정도를 챙겨드시는 것이 적절해요. 칼슘은 너무 많이 복용하면 혈관에 쌓일 수 있으니, 평소에 칼슘이 많은 식품을 자주 먹는지 확인해보고 영양제를 선택하는 것이 좋아요."
    ],
    "unit": "mg",
    "sub_names": [],
    "lack_info": "뼈가 약해져 골다공증으로 이어질 수 있어요. 혈액 중에 칼슘이 부족하면 뼈에서 칼슘을 가져오기 때문이에요. 또, 근육의 수축과 이완이 원활하지 않아 경련이 일어날 수 있어요.",
    "over_info": "속이 불편하거나 변비가 생길 수 있어요. 신장결석이 잘 생기는 사람의 경우, 발생 위험을 높일 수 있으니 주의하세요."
  },
  {
    "id": 353,
    "name": "프로바이오틱스(유산균)",
    "tips": [
      "제품에서 추천하고 있는 섭취량을 따르고, 내 몸의 반응에 따라 조절하세요.",
      "사람마다 효과가 나타나는 섭취량이 다를 수 있기 때문에 나에게 맞는 섭취량을 찾는 것이 중요해요. 제품에서 추천하는 섭취량을 따르고, 별다른 효과가 없으면 점차 섭취량을 늘려보는 것도 괜찮아요. 3개월 정도가 지나도 효과를 느끼지 못한다면 섭취를 중단하거나 다른 균주가 들어있는 제품으로 바꿔보는 것도 좋아요."
    ],
    "unit": "",
    "sub_names": ["락토바실러스", "비피도박테리움", "락토코커스", "엔테로코커스", "스트렙토코커스"],
    "lack_info": "",
    "over_info": ""
  }
]

export const CONTENT_GRAPH_DUMMY_DATA: MergedNutrientDataType[] = [
  {
    name: 'VitaminC',
    intakeContent: 0,
    newContent: 200,
    unit: 'mg',
    reqMin: 1500,
    reqAvg: 3000,
    reqLimit: 4000
  },
  {
    name: 'VitaminD',
    intakeContent: 100,
    newContent: 300,
    unit: 'mg',
    reqMin: 200,
    reqAvg: 500,
    reqLimit: 700
  },
  {
    name: 'Magnesium',
    intakeContent: 1200,
    newContent: 2800,
    unit: 'mg',
    reqMin: 200,
    reqAvg: 600,
    reqLimit: 1000
  },
  {
    name: 'Probiotics',
    intakeContent: 500,
    newContent: 500,
    unit: 'mg',
    reqMin: 400,
    reqAvg: 900,
    reqLimit: 1200
  },
  {
    name: 'VitaminC',
    intakeContent: 0,
    newContent: 200,
    unit: 'mg',
    reqMin: 1500,
    reqAvg: 3000,
    reqLimit: 4000
  },
  {
    name: 'VitaminC',
    intakeContent: 0,
    newContent: 200,
    unit: 'mg',
    reqMin: 1500,
    reqAvg: 3000,
    reqLimit: 4000
  },
  {
    name: 'VitaminC',
    intakeContent: 0,
    newContent: 200,
    unit: 'mg',
    reqMin: 1500,
    reqAvg: 3000,
    reqLimit: 4000
  },
  {
    name: 'VitaminC',
    intakeContent: 0,
    newContent: 200,
    unit: 'mg',
    reqMin: 1500,
    reqAvg: 3000,
    reqLimit: 4000
  },
  {
    name: 'VitaminC',
    intakeContent: 0,
    newContent: 200,
    unit: 'mg',
    reqMin: 1500,
    reqAvg: 3000,
    reqLimit: 4000
  },
  {
    name: 'VitaminC',
    intakeContent: 0,
    newContent: 200,
    unit: 'mg',
    reqMin: 1500,
    reqAvg: 3000,
    reqLimit: 4000
  }
]