import { api } from '@/app/api/client';

import { deleteJdResumeQuestion, updateJdResumeQuestion } from './index';

jest.mock('@/app/api/client', () => ({
  api: {
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockApiPatch = api.patch as jest.MockedFunction<typeof api.patch>;
const mockApiDelete = api.delete as jest.MockedFunction<typeof api.delete>;

describe('updateJdResumeQuestion', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockApiPatch.mockResolvedValue(undefined);
  });

  test('calls PATCH with coerced jdId, questionId, and trimmed content', async () => {
    await updateJdResumeQuestion('42', 7, { content: '  수정할 자기소개서 문항입니다.  ' });

    expect(mockApiPatch).toHaveBeenCalledTimes(1);
    expect(mockApiPatch).toHaveBeenCalledWith(
      '/api/v1/resume/jd/42/questions/7',
      { content: '수정할 자기소개서 문항입니다.' },
    );
  });

  test('accepts numeric jdId', async () => {
    await updateJdResumeQuestion(10, 3, { content: '문항 내용' });

    expect(mockApiPatch).toHaveBeenCalledWith('/api/v1/resume/jd/10/questions/3', {
      content: '문항 내용',
    });
  });

  test('rejects empty content before calling API', async () => {
    await expect(updateJdResumeQuestion('1', 1, { content: '   ' })).rejects.toThrow();

    expect(mockApiPatch).not.toHaveBeenCalled();
  });

  test('rejects invalid questionId before calling API', async () => {
    await expect(
      updateJdResumeQuestion('1', 0, { content: '문항' }),
    ).rejects.toThrow();

    expect(mockApiPatch).not.toHaveBeenCalled();
  });
});

describe('deleteJdResumeQuestion', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockApiDelete.mockResolvedValue(undefined);
  });

  test('calls DELETE with coerced jdId and questionId', async () => {
    await deleteJdResumeQuestion('99', 12);

    expect(mockApiDelete).toHaveBeenCalledTimes(1);
    expect(mockApiDelete).toHaveBeenCalledWith('/api/v1/resume/jd/99/questions/12');
  });

  test('accepts numeric jdId', async () => {
    await deleteJdResumeQuestion(5, 2);

    expect(mockApiDelete).toHaveBeenCalledWith('/api/v1/resume/jd/5/questions/2');
  });

  test('rejects invalid questionId before calling API', async () => {
    await expect(deleteJdResumeQuestion('1', -1)).rejects.toThrow();

    expect(mockApiDelete).not.toHaveBeenCalled();
  });

  test('rejects invalid jdId before calling API', async () => {
    await expect(deleteJdResumeQuestion('abc', 1)).rejects.toThrow();

    expect(mockApiDelete).not.toHaveBeenCalled();
  });
});
