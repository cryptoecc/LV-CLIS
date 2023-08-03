// import axios from "axios";

// const CLINET_ID = process.env.NEXT_PUBLIC_API_KEY_NAVER_ID;
// const CLINET_PW = process.env.NEXT_PUBLIC_API_KEY_NAVER_PW;
// const BASE_PATH = "/v1/search/news.json?";

// var query = "안전";
// export async function onSearch(search: string) {
//   query = search;
//   return axios
//     .get(`/api${BASE_PATH}`, {
//       // /api 제거
//       params: {
//         query: query,
//         sort: "sim",
//         display: 10,
//       },
//       headers: {
//         "X-Requested-With": "XMLHttpRequest",
//         "X-Naver-Client-Id": CLINET_ID,
//         "X-Naver-Client-Secret": CLINET_PW,
//         "Content-Type": "application/json",
//       },
//     })
// }
// export async function NewsList() {
//   return axios
//     .get(`/api${BASE_PATH}`, {
//       // /api 제거
//       params: {
//         query: query,
//         sort: "sim",
//         display: 10,
//       },
//       headers: {
//         "X-Requested-With": "XMLHttpRequest",
//         "X-Naver-Client-Id": CLINET_ID,
//         "X-Naver-Client-Secret": CLINET_PW,
//         "Content-Type": "application/json",
//       },
//     })
//     .then((response) => {
//       const data = response.data.items;
//       // const data = response.data.items.map((item: INews) => ({
//       //   title: item.title,
//       //   originallink: item.originallink,
//       //   link: item.link,
//       //   description: item.description,
//       //   pubDate: item.pubDate,
//       // }));
//       // console.log(INews[0].title);
//       console.log(data[0].title);
//       return data;
//     })
//     .catch((error) => {
//       console.log("오류 발생", error.status);
//       // 오류 처리 부분 - 추후 에러 페이지 추가 후 해당 페이지로 이동
//       if (error.status === 403) {
//         // window.location.href = "/404";
//       }
//       throw error;
//     });
// }
// export function newstitle() {
//   return axios
//     .get(`/api${BASE_PATH}`, {
//       // /api 제거
//       params: {
//         query: query,
//         sort: "sim",
//         display: 10,
//       },
//       headers: {
//         "X-Requested-With": "XMLHttpRequest",
//         "X-Naver-Client-Id": CLINET_ID,
//         "X-Naver-Client-Secret": CLINET_PW,
//         "Content-Type": "application/json",
//       },
//     })
//     .then((response) => {
//       let res = "";
//       const data = response.data.items;
//       const props: any = [];
//       data.forEach((item: any, idx: string) => {
//         const key = idx;
//         props[key] = item.title;
//       });
//       return props;
//     })
//     .catch((error) => {
//       console.log("오류 발생", error.status);
//       // 오류 처리 부분 - 추후 에러 페이지 추가 후 해당 페이지로 이동
//       if (error.status === 403) {
//         // window.location.href = "/404";
//       }
//       throw error;
//     });
// }
import axios from "axios";

const CLINET_ID = process.env.NEXT_PUBLIC_API_KEY_NAVER_ID;
const CLINET_PW = process.env.NEXT_PUBLIC_API_KEY_NAVER_PW;
const BASE_PATH = "/v1/search/news.json?";
const commonParams = {
  query: "오염수",
  sort: "sim",
  display: 10,
};
const commonHeaders = {
  "X-Requested-With": "XMLHttpRequest",
  "X-Naver-Client-Id": CLINET_ID,
  "X-Naver-Client-Secret": CLINET_PW,
  "Content-Type": "application/json",
};

export async function onSearch(search: string) {
  const params = { ...commonParams, query: search };
  const headers = commonHeaders;
  return fetchData(params, headers);
}

async function fetchData(params: any, headers: any) {
  try {
    const response = await axios.get(`/api${BASE_PATH}`, {
      params,
      headers,
    });
    const data = response.data.items;
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

export async function NewsList(search) {
  const params = { ...commonParams, query: search };
  const headers = commonHeaders;
  return fetchData(params, headers);
}

export async function newstitle(search) {
  const params = { ...commonParams, query: search };
  const headers = commonHeaders;
  try {
    const response = await axios.get(`/api${BASE_PATH}`, {
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
