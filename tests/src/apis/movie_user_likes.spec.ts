import axios from 'axios';
import {
  PostMovieUserLike,
  DeleteMovieUserLike,
  FetchMovieUserLikes
} from '@/apis/movie_user_likes';

jest.mock('axios');

describe('MovieUserLike関数群のテスト', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('映画のいいねを登録する', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockResponse = {
      data: {
        id: '1',
        movie_id: '123',
        user_id: '456',
        created_at: '2023-09-30T16:06:00.957Z',
      }
    };
    mockedAxios.post.mockResolvedValueOnce(mockResponse);

    const result = await PostMovieUserLike('123');
    expect(result.id).toBe('1');
    expect(result.movieId).toBe('123');
    expect(result.userId).toBe('456');
  });

  it('映画のいいねを削除する', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockResponse = {
      data: {
        id: '1',
        movie_id: '123',
        user_id: '456',
        created_at: '2023-09-30T16:06:00.957Z',
      }
    };
    mockedAxios.delete.mockResolvedValueOnce(mockResponse);

    const result = await DeleteMovieUserLike('123');
    expect(result.id).toBe('1');
    expect(result.movieId).toBe('123');
    expect(result.userId).toBe('456');
  });

  it('映画のいいね情報を取得する', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockResponse = {
      data: {
        movie_user_likes: [
          {
            id: '1',
            movie_id: '123',
            user_id: '456',
            created_at: '2023-09-30T16:06:00.957Z',
          },
          // 必要に応じて他のデータを追加
        ]
      }
    };
    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    const result = await FetchMovieUserLikes('456', '123');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
    expect(result[0].movieId).toBe('123');
    expect(result[0].userId).toBe('456');
  });
});
