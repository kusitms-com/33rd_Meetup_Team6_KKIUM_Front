export type HomeJobTypeProfile = {
  roleTypeName: string;
  coreKeywords: readonly string[];
  description: string;
};

export const HOME_JOB_TYPE_PROFILES: readonly HomeJobTypeProfile[] = [
  {
    roleTypeName: '목표 설계자',
    coreKeywords: [
      '전략적 실행',
      '계획력',
      '로드맵 수립',
      '우선순위 설정',
      '목표 세분화',
      '프로세스 설계',
      '마일스톤 관리',
      '리소스 배분',
      '단계별 검토',
      '실행 구조화',
      '완수 지향',
      '성과 역산',
    ],
    description: '목표를 구체적인 단계로 쪼개고 끝까지 완수하는 유형. 기획·운영 직군에서 강점을 발휘한다.',
  },
  {
    roleTypeName: '추진형 실행가',
    coreKeywords: [
      '추진력',
      '빠른 결단',
      '즉각적 행동',
      '돌파력',
      '속도 우선',
      '도전 수용',
      '에너지 전파',
      '위기 대응',
      '결과 집중',
      '기회 포착',
      '과감한 시도',
      '모멘텀 유지',
    ],
    description: '목표가 정해지면 주저 없이 달려드는 유형. 속도와 성과를 중시하며 팀에 에너지를 불어넣는다.',
  },
  {
    roleTypeName: '정밀 분석가',
    coreKeywords: [
      '데이터 기반 사고',
      '정확성',
      '가설 검증',
      '수치 해석',
      '논리적 구조화',
      '리스크 예측',
      '근거 중심 판단',
      '오류 탐지',
      '객관적 평가',
      '통계적 사고',
      '인과 분석',
      '체계적 검토',
    ],
    description: '가설을 세우고 근거로 검증하는 유형. 논리적 완결성을 추구하며 오류를 사전에 잡아낸다.',
  },
  {
    roleTypeName: '관계 연결자',
    coreKeywords: [
      '공감',
      '소통',
      '팀 화합',
      '적극적 경청',
      '신뢰 형성',
      '감정 이해',
      '대화 촉진',
      '관계 유지',
      '분위기 조성',
      '심리적 안전감',
      '비언어적 소통',
      '네트워킹',
      '갈등 완충',
    ],
    description: '구성원 사이에서 신뢰를 쌓고 팀의 분위기를 만드는 유형. 갈등 상황에서도 유연하게 소통한다.',
  },
  {
    roleTypeName: '안정적 지지자',
    coreKeywords: [
      '일관성',
      '신뢰감',
      '서포터',
      '책임감',
      '꾸준함',
      '보조 역할',
      '루틴 준수',
      '기반 유지',
      '조용한 헌신',
      '후방 지원',
      '예측 가능성',
      '변함없는 태도',
      '팀 안착',
    ],
    description: '묵묵히 팀을 뒤에서 받쳐주는 유형. 예측 가능한 퍼포먼스로 동료들에게 안정감을 준다.',
  },
  {
    roleTypeName: '아이디어 탐험가',
    coreKeywords: [
      '창의성',
      '새로운 시각',
      '발산적 사고',
      '틀 깨기',
      '연상 능력',
      '실험 정신',
      '호기심',
      '트렌드 감지',
      '브레인스토밍',
      '다양한 관점',
      '상상력',
      '혁신 제안',
    ],
    description: '기존 틀을 벗어나 독창적인 아이디어를 내는 유형. 새로운 도전을 즐기고 혁신을 이끈다.',
  },
  {
    roleTypeName: '원칙 수호자',
    coreKeywords: [
      '윤리',
      '완벽주의',
      '기준 준수',
      '규범 준수',
      '사명감',
      '품질 고수',
      '기준 설정',
      '자기 엄격함',
      '투명성',
      '도덕적 판단',
      '신념 일관성',
      '책임 추적',
      '세부 검수',
    ],
    description: '높은 기준을 스스로에게 적용하며 신뢰와 사명감으로 일하는 유형. 품질과 원칙을 타협하지 않는다.',
  },
  {
    roleTypeName: '성장 지향자',
    coreKeywords: [
      '학습',
      '자기계발',
      '피드백 수용',
      '반성적 사고',
      '성장 마인드셋',
      '약점 직면',
      '새로운 기술 습득',
      '지식 탐구',
      '멘토 활용',
      '경험 내재화',
      '적응력',
      '실패 수용',
      '역량 확장',
    ],
    description: '부족한 점을 기회로 바라보고 꾸준히 발전하는 유형. 모든 경험에서 배움을 찾는다.',
  },
  {
    roleTypeName: '균형 조율자',
    coreKeywords: [
      '중재',
      '유연성',
      '맥락 파악',
      '다양성 존중',
      '입장 수렴',
      '합의 도출',
      '상황 판단',
      '이해관계 조율',
      '편견 없는 시각',
      '절충안 제시',
      '전체 조망',
      '의견 통합',
      '분위기 전환',
    ],
    description: '다양한 의견을 수렴해 최선의 방향을 찾는 유형. 갈등을 조율하고 팀 합의를 이끌어낸다.',
  },
] as const;

export const HOME_JOB_TYPE_PROFILE_BY_NAME: Readonly<Record<string, HomeJobTypeProfile>> =
  Object.fromEntries(
    HOME_JOB_TYPE_PROFILES.map((profile) => [profile.roleTypeName, profile]),
  );

export const DEFAULT_HOME_JOB_TYPE_PROFILE = HOME_JOB_TYPE_PROFILES[0];

export function mapJobTypeNameToProfile(typeName: string | null | undefined): HomeJobTypeProfile {
  if (!typeName) return DEFAULT_HOME_JOB_TYPE_PROFILE;
  return HOME_JOB_TYPE_PROFILE_BY_NAME[typeName] ?? DEFAULT_HOME_JOB_TYPE_PROFILE;
}
