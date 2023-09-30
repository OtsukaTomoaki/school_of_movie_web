import axios from 'axios'
import {
  FetchAuthToken,
  FetchAuthTokenWithRememberToken,
  SignUpWithSocialAccounts,
  FetchProfile,
  UpdateProfile
} from '@/apis/accounts' // 実際のファイルのパスを入れてください

// axiosのモックを作成
jest.mock('axios')

describe('API関数のテスト', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('認証トークンを取得する', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>
    mockedAxios.post.mockResolvedValueOnce({ data: { token: 'authToken', remember_token: 'rememberToken' } })

    const result = await FetchAuthToken('test@example.com', 'password')
    expect(result).toEqual({ authorizationToken: 'authToken', rememberToken: 'rememberToken' })
  })

  it('リメンバートークンで認証トークンを取得する', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>
    mockedAxios.post.mockResolvedValueOnce({ data: { token: 'authToken', remember_token: 'rememberToken' } })

    const result = await FetchAuthTokenWithRememberToken('test@example.com', 'rememberToken')
    expect(result).toEqual({ authorizationToken: 'authToken', rememberToken: 'rememberToken' })
  })

  it('ソーシャルアカウントでサインアップする', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>
    mockedAxios.post.mockResolvedValueOnce({ data: { token: 'authToken', remember_token: 'rememberToken' } })

    const result = await SignUpWithSocialAccounts('test@example.com', 'onetimeToken')
    expect(result).toEqual({ authorizationToken: 'authToken', rememberToken: 'rememberToken' })
  })

  it('プロファイル情報を取得する', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>
    mockedAxios.get.mockResolvedValueOnce({ data: { id: '1', name: 'John', email: 'john@example.com', tags: ['tag1'] } })

    const result = await FetchProfile()
    expect(result).toEqual({ id: '1', name: 'John', email: 'john@example.com', tags: ['tag1'] })
  })

  it('プロファイル情報を更新する', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>
    const testProfile = { id: '1', name: 'Jane', email: 'jane@example.com', tags: ['tag2'] }
    mockedAxios.put.mockResolvedValueOnce({ data: testProfile })

    const result = await UpdateProfile('1', testProfile, 'avatarImageUrl')
    expect(result).toEqual(testProfile)
  })
})
