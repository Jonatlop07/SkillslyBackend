interface RequestParamsWithoutBody {
  url: string;
  params: any;
}

interface RequestParamsWithBody extends RequestParamsWithoutBody {
  body: any;
}

export {
  RequestParamsWithoutBody,
  RequestParamsWithBody
}
