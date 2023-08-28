import axios from "axios";

const CLINET_ID = process.env.NEXT_PUBLIC_API_KEY_NAVER_ID;
const CLINET_PW = process.env.NEXT_PUBLIC_API_KEY_NAVER_PW;
const BASE_PATH = "/api/v1/search/news.json?";
const DATALAB_PATH = "/api/v1/datalab/search.json";
const commonParams = {
  query: "오염수",
  sort: "sim",
  display: 100,
};
const commonHeaders = {
  "X-Requested-With": "XMLHttpRequest",
  "X-Naver-Client-Id": CLINET_ID,
  "X-Naver-Client-Secret": CLINET_PW,
};

export async function onSearch(search: string) {
  const params = { ...commonParams, query: search };
  const headers = commonHeaders;
  return fetchData(params, headers);
}

async function fetchData(params: any, headers: any) {
  try {
    const response = await axios.get(`${BASE_PATH}`, {
      params,
      headers,
    });
    const data = response.data.items;
    // console.log(formattingDate(today), formattingDate(Aweek));
    return data;
  } catch (error) {
    console.log("오류 발생", error.status);
    // 오류 처리 부분 - 추후 에러 페이지 추가 후 해당 페이지로 이동
    if (error.status === 403) {
      // window.location.href = "/404";
    }
    throw error;
  }
}

export async function NewsList(search: string) {
  const params = { ...commonParams, query: search };
  const headers = commonHeaders;
  return fetchData(params, headers);
}

export async function newstitle(search: string) {
  const params = { ...commonParams, query: search };
  const headers = commonHeaders;
  try {
    const response = await axios.get(`${BASE_PATH}`, {
      params,
      headers,
    });
    const data = response.data.items;
    const props: any = [];
    data.forEach((item: any, idx: number) => {
      props[idx] = item.title;
    });
    return props;
  } catch (error) {
    console.log("오류 발생", error.status);

    // 오류 처리 부분 - 추후 에러 페이지 추가 후 해당 페이지로 이동
    if (error.status === 403) {
      // window.location.href = "/404";
    }
    throw error;
  }
}
export async function newsURL(search: string) {
  const params = { ...commonParams, query: search };
  const headers = commonHeaders;
  try {
    const response = await axios.get(`${BASE_PATH}`, {
      params,
      headers,
    });
    const data = response.data.items;
    const props: any = [];
    data.forEach((item: any, idx: number) => {
      props[idx] = item.link;
    });
    return props;
  } catch (error) {
    console.log("오류 발생", error.status);

    // 오류 처리 부분 - 추후 에러 페이지 추가 후 해당 페이지로 이동
    if (error.status === 403) {
      // window.location.href = "/404";
    }
    throw error;
  }
}
