import axios from 'axios';
import {
  FetchMovie,
  FetchMovies,
  MovieSearchConditon
} from '@/apis/movies';

jest.mock('axios');

describe('Movie関連の関数のテスト', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('指定した映画のIDに対する情報を取得する', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockResponse = {
      data: {
        id: '1',
        title: 'Test Movie',
        overview: 'Overview of Test Movie',
        // 他のフィールドもモックデータとして追加してください
      }
    };
    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    const result = await FetchMovie('1');
    expect(result.id).toBe('1');
    expect(result.title).toBe('Test Movie');
    // 他のフィールドも確認してください
  });

  it('映画の検索条件に基づいて映画情報を取得する', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockResponse = {
      data: {
        movies: [
          {
            id: '1',
            title: 'Test Movie',
            overview: 'Overview of Test Movie',
            // 他のフィールドもモックデータとして追加してください
          }
          // 他の映画のデータも必要に応じて追加
        ],
        meta: {
          total_count: 1,
          // background_job データもモックとして追加
        }
      }
    };
    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    const searchCondition = new MovieSearchConditon('Test', ['1'], true);
    const result = await FetchMovies(searchCondition);
    expect(result.movies).toHaveLength(1);
    expect(result.totalCount).toBe(1);
    expect(result.movies[0].id).toBe('1');
    expect(result.movies[0].title).toBe('Test Movie');
    // 他のフィールドやbackgroundJobのデータも確認してください
  });
});
